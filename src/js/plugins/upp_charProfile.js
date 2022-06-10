/*:
 * @author William TheUnproPro
 * @plugindesc V 1.0 | Profiles for NPCs or Party Members!
 * 
 * @param Profiles
 * @type struct<prof>[]
 * 
 * @param Options
 * 
 * @param Terms
 * @type struct<terms>
 * @parent Options
 * @default {"Name":"Name","Age":"Age","Description":"Description","Finish":"Finish"}
 * 
 * @param Fill Color
 * @type struct<fillColor>
 * @desc Fill color of the section behind text when viewing a profile.
 * @parent Options
 * @default {"Red":"0","Green":"0","Blue":"0","Alpha":"0.500"}
 * 
 * @help
 * This plugin has only one plugin command. To call the scene for
 * displaying a character's profile you can use the plugin command
 * "uppCharProfile #" (without quotes), where # is a number. Example:
 * "uppCharProfile 4".
 * 
 * The number you're looking for can be found in the Profiles parameter
 * (right click 'Profiles' and select Edit).
 * 
 * You can create a new character profile by right clicking an empty
 * space in the Profiles Structure List. If you're confused, see
 * the video I have on the page where you found this plugin.
*/

/*~struct~prof:
 * @param Name
 * @type text
 * @desc Name for the character!
 * 
 * @param Description
 * @type note
 * @desc Description for the character!
 * 
 * @param Bust
 * @type file
 * @require 1
 * @desc Picture displayed for the character!
 * @dir img/
 * 
 * @param Bust Offset X
 * @type number
 * @min -999999
 * @default 0
 * 
 * @param Bust Offset Y
 * @type number
 * @min -999999
 * @default 0
 * 
 * @param Age
 * @type number
 * @min 0
 * 
*/

/*~struct~terms:
 * @param Name
 * @default Name
 * @desc Name of "Name" when viewing a profile.
 * 
 * @param Age
 * @default Age
 * @desc Name of "Age" when viewing a profile.
 * 
 * @param Description
 * @default Description
 * @desc Name of "Description" when viewing a profile.
 * 
 * @param Finish
 * @default Finish
 * @desc Text used for the option to close the profile scene.
*/

/*~struct~fillColor:
 * @param Red
 * @type number
 * @max 255
 * @default 0
 * @desc Red value.
 * 
 * @param Green
 * @type number
 * @max 255
 * @default 0
 * @desc Red value.
 * 
 * @param Blue
 * @type number
 * @max 255
 * @default 0
 * @desc Red value.
 * 
 * @param Alpha
 * @type number
 * @max 1
 * @decimals 3
 * @default 0.5
 * @desc Red value.
*/

(function() {
    var params = PluginManager.parameters("upp_charProfile");

    Window_Base.prototype.drawUppCPSprite = function(pictureName, x, y) {
        var bitmap = pictureName
        var pw = bitmap.width;
        var ph = bitmap.height;
        var sx = 0;
        var sy = 0;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    };

    var profiles = (function() {
        var data = JSON.parse(params.Profiles);
        for (i=0;i<data.length;i++) {
            data[i] = JSON.parse(data[i]);
            data[i].Description = data[i].Description.slice(1, -1)
                                                     .replace(/\\n/g, "\\\n")
                                                     .replace(/\\\\/g, "\\");
            console.log(data[i].Description)
            if(data[i].Bust != '') {
                var sprite = new Sprite();
                var parsed = data[i].Bust.split("/");
                var imgurl = "img/"+parsed[0]+"/";
                sprite.bitmap = ImageManager.loadBitmap(imgurl, parsed[1], 0, false);
            }
        }

        return data;
    })();

    var terms = JSON.parse(params['Terms'])
    var fillColor = (function() {
        var data = JSON.parse(params['Fill Color']);
        color = `rgba(${data.Red}, ${data.Green}, ${data.Blue}, ${data.Alpha})`;
        return color;
    })();
        
    console.log(fillColor)

    var display = 0;


    /**
     * @function PluginCommands
     * @desc Allows the use of PluginCommands.
     */
    var plugAlias = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        plugAlias.apply(this, arguments);

        if(command=="uppCharProfile") {
            display = Number(args[0]);
            SceneManager.push(Scene_UppProfile);
        }
    }

    var dm_save = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = dm_save.apply(this, arguments);
        contents.uppProfiles = profiles;
        return contents;
    }

    var dm_load = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        dm_load.apply(this, arguments);
        _uppProfiles    = (typeof contents.uppProfiles != 'undefined') ? contents.uppProfiles:[]
        profiles = _uppProfiles;
    }

    function Window_UppProfile() {
        this.initialize.apply(this, arguments);
    }

    Window_UppProfile.prototype = Object.create(Window_Base.prototype);
    Window_UppProfile.prototype.constructor = Window_UppProfile;

    Window_UppProfile.prototype.initialize = function(display) {
        Window_Base.prototype.initialize.call(this, Graphics.boxWidth/2 - 320, Graphics.boxHeight/2 - 240, 640, 480);
        this.profile = profiles[display];
        this.refresh();
    }

    Window_UppProfile.prototype.exPadding = function() {
        return 6;
    }

    Window_UppProfile.prototype.refresh = function() {
        this.contents.fontSize = this.contents.fontSize/1.3;
        this.contents.clear();
        this.drawBoxes();
        this.drawBust();
        this.drawName();
        this.drawAge();
        this.drawDescription();
    }

    Window_UppProfile.prototype.drawBoxes = function() {
        this.contents.fillRect(0, 0, this.contents.width/2, this.lineHeight()-1, fillColor);
        this.contents.fillRect(1+this.contents.width/2, 0, this.contents.width/2-1, this.lineHeight()-1, fillColor);

        this.contents.fillRect(0, this.lineHeight(), this.contents.width, this.lineHeight()-1, fillColor);
        this.contents.fillRect(0, this.lineHeight()*2, this.contents.width, this.contents.height-(this.lineHeight()*4), fillColor);
    }

    Window_UppProfile.prototype.drawName = function() {
        var pad = this.exPadding();
        this.drawText(`${terms.Name}: ${this.profile.Name}`, pad, 0);
    }

    Window_UppProfile.prototype.drawAge = function() {
        var pad = this.exPadding();
        this.drawText(`${terms.Age}: ${this.profile.Age}`, 0, 0, this.contents.width-pad, 'right');
    }

    Window_UppProfile.prototype.drawDescription = function() {
        var pad = this.exPadding();
        this.drawText(`${terms.Description}`, pad, this.lineHeight())
        this.drawTextEx(this.profile.Description, pad, 1+this.lineHeight()*2);
    }

    Window_UppProfile.prototype.drawBust = function() {
        var parsed = this.profile.Bust.split("/");
        var imgurl = "img/"+parsed[0]+"/";
        var sprite = ImageManager.loadBitmap(imgurl, parsed[1], 0, false);

        var x = this.profile['Bust Offset X'];
        var y = this.profile['Bust Offset Y'];

        this.drawUppCPSprite(sprite, x, y);
    }

    function Window_UppProfileClose() {
        this.initialize.apply(this, arguments);
    }

    Window_UppProfileClose.prototype = Object.create(Window_Command.prototype);
    Window_UppProfileClose.prototype.constructor = Window_UppProfileClose;

    Window_UppProfileClose.prototype.initialize = function() {
        var winHeight = Window_Base.prototype.lineHeight()*2;
        var x = Graphics.boxWidth/2 - 320;
        var y = Graphics.boxHeight/2 + 240 - winHeight;
        Window_Command.prototype.initialize.call(this, x, y);
        this.opacity = 0;
    }
    
    Window_UppProfileClose.prototype.makeCommandList = function() {
        this.addCommand(`${terms.Finish}`, 'cancel', true);
    }

    function Scene_UppProfile() {
        this.initialize.apply(this, arguments);
    }

    Scene_UppProfile.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_UppProfile.prototype.constructor = Scene_UppProfile;

    Scene_UppProfile.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    }

    Scene_UppProfile.prototype.start = function() {
        this.createWindow();
    }

    Scene_UppProfile.prototype.createWindow = function() {
        this.win = new Window_UppProfile(display);
        this.winChoice = new Window_UppProfileClose();
        this.winChoice.setHandler('cancel', this.popScene.bind(this));
        this.addChild(this.win);
        this.addChild(this.winChoice)
    }
    
    var siui = Scene_ItemBase.prototype.useItem;
    Scene_ItemBase.prototype.useItem = function() {
        siui.apply(this, arguments);
        var ucprof = this.item().meta.uppCharProfile;
        if(typeof ucprof !== 'undefined') {
            display = Number(ucprof);
            SceneManager.push(Scene_UppProfile);
        }
    };
})();