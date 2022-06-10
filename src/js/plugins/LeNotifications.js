/*
#=============================================================================
# Notifications System
# LeNotifications.js
# By Lecode
# Version 1.3
#-----------------------------------------------------------------------------
# TERMS OF USE
#-----------------------------------------------------------------------------
# - Credit required
# - Keep this header
# - Free for commercial use
#-----------------------------------------------------------------------------
# Version History
#-----------------------------------------------------------------------------
# - 1.0 : Initial release
# - 1.1 : Bugfix
# - 1.2 : Bugfix ( Enable Command )
# - 1.3 : The notification visual is now a window,
#         allowing some escape codes to work:
#         \v[x], \c[x], \n[x], \p[x], \i[x] and \g
#         Long text notifications are splited in multiple notifications
#         when you use a new line or "|"
#=============================================================================
*/
var Imported = Imported || {};
Imported.Lecode_Notifications = true;

var Lecode = Lecode || {};
Lecode.S_Notifs = Lecode.S_Notifs || {};
/*:
 * @plugindesc Shows some notifications according to different events in game
 * @author Lecode
 * @version 1.3
 * 
 * @param Background Color
 * @desc CSS Format
 * Default: Black ( #000000 )
 * @default #000000
 *
 * @param Text Color
 * @desc CSS Format
 * Default: White ( #FFFFFF )
 * @default #FFFFFF
 *
 * @param Font Size
 * @desc Font size
 * Default: 18
 * @default 18
 *
 * @param Font Italic ?
 * @desc Font italic ?
 * Default: false
 * @default false
 *
 * @param Text Outline Color
 * @desc Text Outline Color
 * Default: None ( # )
 * @default #
 *
 * @param Text Outline Width
 * @desc Text Outline Width
 * Default: 0
 * @default 0
 *
 * @param Opacity
 * @desc Layout's opacity (0-255)
 * Default: 180
 * @default 180
 *
 * @param Position
 * @desc Layout's position. top-left, bottom-left, top-right, bottom-right
 * Default: top-left
 * @default top-left
 *
 * @param Left-Right Padding
 * @desc Horizontal padding
 * Default: 4
 * @default 4
 *
 * @param Up-Down Padding
 * @desc Vertical padding
 * Default: 4
 * @default 4
 *
 * @param Move Speed
 * @desc The move speed
 * Default: 6
 * @default 6
 *
 * @param Fade Speed
 * @desc The fade speed
 * Default: 4
 * @default 4
 *
 * @param Life Time
 * @desc Duration (in frames)
 * Default: 200
 * @default 200
 *
 * @param Life Time Auto ?
 * @desc If true, the life time is based on the length of the text.
 * ( So, the previous param doesn't matter)
 * Default: true
 * @default true
 *
 * @param Sound Filename
 * @desc Sound to play when a notification appears
 * Default: Book1
 * @default Book1
 *
 * @param Notif Gain Gold
 * @desc Set false to disable.
 * Default: Gold: +[value]
 * @default Gold: +[value]
 *
 * @param Notif Lose Gold
 * @desc Set false to disable.
 * Default: Gold: -[value]
 * @default Gold: -[value]
 *
 * @param Notif Gain Item
 * @desc Set false to disable.
 * Default: Obtained [name] x[amount]
 * @default Obtained [name] x[amount]
 *
 * @param Notif Lose Item
 * @desc Set false to disable.
 * Default: Lost [name] x[amount]
 * @default Lost [name] x[amount]
 *
 * @param Notif Gain Exp
 * @desc Set false to disable.
 * Default: [name]: +[value] Exp
 * @default [name]: +[value] Exp
 *
 * @param Notif Lose Exp
 * @desc Set false to disable.
 * Default: [name]: -[value] Exp
 * @default [name]: -[value] Exp
 *
 * @param Notif LevelUp
 * @desc Set false to disable.
 * Default: [name]: level up !
 * @default [name]: level up !
 *
 * @param Notif LevelDown
 * @desc Set false to disable.
 * Default: [name]: level down !
 * @default [name]: level down !
 *
 * @param Notif BGM
 * @desc Set 'false' to disable
 * Default: Playing '[name]'
 * @default Playing '[name]'
 *
 * @help
 * Plugin Commands:
 *   -> Notification Clear                  ( Delete all notifications )
 *   -> Notification Enable true/false      ( Enable or disable notifications )
 *   -> Notification Position value         ( Change next notifications position )
 *   -> Notification TextColor value        ( Change text color )
 *   -> Notification FontSize value         ( Change font size )
 *   -> Notification FontItalic true/false  ( Change text italic property )
 *   -> Notification OutlineColor value     ( Change outline color set value to '' to remove )
 *   -> Notification OutlineWidth value     ( Change outline width )
 *   -> Notification ResetParameters        ( Reset all parameters )
 * Script call:
 *   -> this.newNotif(text)                 ( Draw a custom text )
*/
//#=============================================================================

//(function() {
/*-------------------------------------------------------------------------
* Get Parameters
-------------------------------------------------------------------------*/
Lecode.parameters = PluginManager.parameters('LeNotifications');
Lecode.S_Notifs.params = {};

Lecode.S_Notifs.params.pBgColor = String(Lecode.parameters['Background Color'] || '#000000');
Lecode.S_Notifs.params.pTextColor = String(Lecode.parameters['Text Color'] || '#FFFFFF');
Lecode.S_Notifs.params.pFontSize = Number(Lecode.parameters['Font Size'] || 18);
Lecode.S_Notifs.params.pFontItalic = ((Lecode.parameters['Font Italic ?'] || 'false') === 'true');
Lecode.S_Notifs.params.pTextOutlineColor = String(Lecode.parameters['Text Outline Color'] || '#');
Lecode.S_Notifs.params.pTextOutlineWidth = Number(Lecode.parameters['Text Outline Width'] || 0);
Lecode.S_Notifs.params.pOpacity = Number(Lecode.parameters['Opacity'] || 180);
Lecode.S_Notifs.params.pPos = String(Lecode.parameters['Position'] || 'top-left');
Lecode.S_Notifs.params.pXPadding = Number(Lecode.parameters['Left-Right Padding'] || 4);
Lecode.S_Notifs.params.pYPadding = Number(Lecode.parameters['Up-Down Padding'] || 4);
Lecode.S_Notifs.params.pMoveSpeed = Number(Lecode.parameters['Move Speed'] || 6);
Lecode.S_Notifs.params.pFadeSpeed = Number(Lecode.parameters['Fade Speed'] || 6);
Lecode.S_Notifs.params.pLifeTime = Number(Lecode.parameters['Life Time'] || 200);
Lecode.S_Notifs.params.pLifeTimeAuto = ((Lecode.parameters['Life Time Auto ?'] || 'true') === 'true');
Lecode.S_Notifs.params.pSoundFile = String(Lecode.parameters['Sound Filename'] || 'Book1');
Lecode.S_Notifs.params.pNotifGainGold = String(Lecode.parameters['Notif Gain Gold'] || 'Gold: +[value]');
Lecode.S_Notifs.params.pNotifLoseGold = String(Lecode.parameters['Notif Lose Gold'] || 'Gold: -[value]');
Lecode.S_Notifs.params.pNotifGainItem = String(Lecode.parameters['Notif Gain Item'] || 'Obtained [name] x[amount]');
Lecode.S_Notifs.params.pNotifLoseItem = String(Lecode.parameters['Notif Lose Item'] || 'Lost [name] x[amount]');
Lecode.S_Notifs.params.pNotifGainExp = String(Lecode.parameters['Notif Gain Exp'] || '[name]: +[value] Exp');
Lecode.S_Notifs.params.pNotifLoseExp = String(Lecode.parameters['Notif Lose Exp'] || '[name]: -[value] Exp');
Lecode.S_Notifs.params.pNotifLevelUp = String(Lecode.parameters['Notif LevelUp'] || '[name]: level up !');
Lecode.S_Notifs.params.pNotifLevelDown = String(Lecode.parameters['Notif LevelDown'] || '[name]: level down !');
Lecode.S_Notifs.params.pNotifBgm = String(Lecode.parameters['Notif BGM'] || "Playing '[name]'");
//Lecode.S_Notifs.params.pIconSize = Number(Lecode.parameters['Icon Size'] || 24);

/*-------------------------------------------------------------------------
* Notification Item <- Window
-------------------------------------------------------------------------*/
function LeNotifItem(text,type) {
    this.initialize.apply(this, arguments);
}

LeNotifItem.prototype = Object.create(Window_Base.prototype);
LeNotifItem.prototype.constructor = LeNotifItem;

//---- Initialization
LeNotifItem.prototype.initialize = function(text,type,parentTxt) {
    Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
    this.hide();
	this.text = text;
    this.parentTxt = parentTxt;
    this.type = type;
    this.destX = 0;
    this.destY = 0;
    this.canFade = false;
    this.canDecreaseLifeTime = false;
    this.onScene = false;
    this.dead = false;
    this.setLifeTime();
	this.createBitmap();
    this.iniPosition();
    this.show();
};

LeNotifItem.prototype.standardPadding = function() {
    return 0;
};

LeNotifItem.prototype.resetFontSettings = function() {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = Lecode.S_Notifs.params.pFontSize;
    this.contents.fontItalic = Lecode.S_Notifs.params.pFontItalic;
    this.resetTextColor();
};

LeNotifItem.prototype.resetTextColor = function() {
    this.contents.textColor = Lecode.S_Notifs.params.pTextColor;
    this.contents.outlineColor = Lecode.S_Notifs.params.pTextOutlineColor;
    this.contents.OutlineWidth = Lecode.S_Notifs.params.pTextOutlineWidth;
};

LeNotifItem.prototype.removeEscapeCodes = function(text) {
    while(text.match(/(\\\w\[\d+\])/i))
        text = text.replace(/(\\\w\[\d+\])/i,"");
    return text;
};

LeNotifItem.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};

//---- Set Life Time
LeNotifItem.prototype.setLifeTime = function() {
    var text = (this.parentTxt != undefined) ? this.parentTxt : this.text;
    text = this.removeEscapeCodes(text);
    if (Lecode.S_Notifs.params.pLifeTimeAuto) {
        this.lifeTime = text.length*8;
    } else {
        this.lifeTime = Lecode.S_Notifs.params.pLifeTime;
    }
}

//---- Create Bitmap
LeNotifItem.prototype.createBitmap = function() {
    var text = this.removeEscapeCodes(this.text);
    var w = this.textWidth(text) + Lecode.S_Notifs.params.pXPadding*2;
    var h = this.contents.fontSize + Lecode.S_Notifs.params.pYPadding*2;
    var x = Lecode.S_Notifs.params.pXPadding;
    var y = h/2 - this.contents.fontSize/2;
    if(this.text.match(/(\\\i\[\d+\])/i)) {
        if(this.contents.fontSize < 32)
            h = 32 + 2 + Lecode.S_Notifs.params.pYPadding*2;
        y = Lecode.S_Notifs.params.pYPadding;
    }
    var dummyText = this.text;
    while(dummyText.match(/(\\\i\[\d+\])/i)) {
        w += 32 + 4;
        dummyText = dummyText.replace(/(\\\i\[\d+\])/i,"");
        if (Lecode.S_Notifs.params.pLifeTimeAuto)
            this.lifeTime += 16;
    }
    //-
    this.move(0,0,w,h);
    this.createContents();
    this.contentsOpacity = Lecode.S_Notifs.params.pOpacity;
    this.backOpacity = 0;
    this._windowFrameSprite.opacity = 0;
    //-
    this.contents.fillAll(Lecode.S_Notifs.params.pBgColor);
    this.drawTextEx(this.text,x,y);
}

//---- Initialize Position
LeNotifItem.prototype.iniPosition = function() {
    switch (Lecode.S_Notifs.params.pPos) {
        case 'top-left':
            this.x = -this.width;
            this.y = 0;
            this.destX = 0;
            this.destY = this.y;
            break;
        case 'bottom-left':
            this.x = -this.width;
            this.y = Graphics.height - this.height;
            this.destX = 0;
            this.destY = this.y;
            break;
        case 'top-right':
            this.x = Graphics.width;
            this.y = 0;
            this.destX = Graphics.width - this.width;
            this.destY = this.y;
            break;
        case 'bottom-right':
            this.x = Graphics.width;
            this.y = Graphics.height - this.height;
            this.destX = Graphics.width - this.width;
            this.destY = this.y;
            break;
    }
}

//---- Update
LeNotifItem.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateMove();
    this.updateLifeTime();
    this.updateFade();
}

//---- Update Move
LeNotifItem.prototype.updateMove = function() {
    if (this.moveFinished()) {
        return;
    }
    //- Moving x
    if (this.destX > this.x) {
        this.x += Lecode.S_Notifs.params.pMoveSpeed;
        if (this.x > this.destX) this.x = this.destX;
    } else {
        this.x -= Lecode.S_Notifs.params.pMoveSpeed;
        if (this.x < this.destX) this.x = this.destX;
    }
    //- Moving y
    if (this.destY > this.y) {
        this.y += Lecode.S_Notifs.params.pMoveSpeed;
        if (this.y > this.destY) this.y = this.destY;
    } else {
        this.y -= Lecode.S_Notifs.params.pMoveSpeed;
        if (this.y < this.destY) this.y = this.destY;
    }
    //- Call onMoveFinished
    if (this.moveFinished()) {
        this.onMoveFinished();
    }
}

//---- Move Finished ?
LeNotifItem.prototype.moveFinished = function() {
    if (this.x == this.destX && this.y == this.destY)
        return true;
    return false;
}

//---- When move is finished
LeNotifItem.prototype.onMoveFinished = function() {
    this.canDecreaseLifeTime = true;
}

//---- Update life time
LeNotifItem.prototype.updateLifeTime = function() {
    if (!this.canDecreaseLifeTime)
        return;
    this.lifeTime -= 1;
    if (this.lifeTime <= 0)
        this.onDeath();
}

//---- When dead
LeNotifItem.prototype.onDeath = function() {
    this.canDecreaseLifeTime = false;
    this.canFade = true;
}

//---- Update Fade
LeNotifItem.prototype.updateFade = function() {
    if (!this.canFade)
        return;
    this.contentsOpacity -= Lecode.S_Notifs.params.pFadeSpeed;
    if (this.contentsOpacity <= 0) {
        this.contentsOpacity = 0;
        this.canFade = false;
        this.onFadeFinished();
    }
}

//---- When fade is finished
LeNotifItem.prototype.onFadeFinished = function() {
    this.visible = false;
    this.dead = true;
}

//---- Shift Down
LeNotifItem.prototype.shiftDown = function(y) {
    this.y += y;
    this.destY += y;
}


/*-------------------------------------------------------------------------
* Notification Manager
-------------------------------------------------------------------------*/
function LeNotifManager() {
    throw new Error('This is a static class');
}
LeNotifManager.notifs = [];
LeNotifManager.enabled = true;

//---- New Notification
LeNotifManager.add = function(text,type,parentTxt) {
    text = text.replace("|","\n");
    if(!text.contains("\n"))
        text = this.autoSplitText(text);
    //- Split the notifications when there is a new line
    var textParts = LeUtilities.stringSplit(text,"\n");
    textParts.reverse();
    if(text.contains("\n")) {
        textParts.forEach(function(txt){
            LeNotifManager.add(txt.replace("\n",""),type,text);
        }.bind(this));
        return;
    }

    if (!this.enabled)
        return;
    type = (typeof type !== 'undefined') ? type : "default";
    var notif = new LeNotifItem(text,type,parentTxt);
    if (Lecode.S_Notifs.params.pPos == 'top-left' || Lecode.S_Notifs.params.pPos == 'top-right') {
        this.notifs.forEach(function(n) {
            n.shiftDown(notif.height);
        });
    } else if (Lecode.S_Notifs.params.pPos == 'bottom-left' || Lecode.S_Notifs.params.pPos == 'bottom-right') {
        var y = 0;
        this.notifs.forEach(function(n) {
            y += n.height;
        });
        notif.shiftDown(-y);
    }
    this.notifs.push(notif);
};

LeNotifManager.autoSplitText = function(text) {
    //- WIP
    return text;
};

//---- Update
LeNotifManager.update = function() {
    this.addNotifsToScene();
    this.notifs.forEach(function(n) {
        if (n.onScene) { n.update; }
    });
    this.removeDeadNotifs();
}

//---- Add notifs to Scene_Map
LeNotifManager.addNotifsToScene = function() {
    this.notifs.forEach(function(n) {
        if (!n.onScene) {
            n.onScene = true;
            SceneManager._scene.addChild(n);
            //- Play a sound
            var audio = {};
            audio.name = Lecode.S_Notifs.params.pSoundFile;
            audio.pitch = 100;
            audio.volume = 90;
            audio.pan = 0;
            AudioManager.playSe(audio);
        }
    });
}

//---- Remove dead notifs
LeNotifManager.removeDeadNotifs = function() {
    var toDelete = [];
    this.notifs.forEach(function(n) {
        if (n.dead) {
            SceneManager._scene.removeChild(n);
            toDelete.push(n);
        }
    });
    for(var i = 0; i < toDelete.length; i++){
        var n = toDelete[i];
        var index = this.notifs.indexOf(n);
        this.compactNotifs(index,n);
        this.notifs.splice(index,1);
    }
}

//---- Compacts notification when some are removed
LeNotifManager.compactNotifs = function(index,notif) {
    if (Lecode.S_Notifs.params.pPos == 'top-left' || Lecode.S_Notifs.params.pPos == 'top-right') {
        this.notifs.forEach(function(n) {
            if (n.y > notif.y) {
                n.shiftDown(-notif.height);
            }
        });
    } else if (Lecode.S_Notifs.params.pPos == 'bottom-left' || Lecode.S_Notifs.params.pPos == 'bottom-right') {
        this.notifs.forEach(function(n) {
            if (n.y < notif.y) {
                n.shiftDown(notif.height);
            }
        });
    }
}

//---- Clear
LeNotifManager.clear = function() {
    this.notifs.forEach(function(n) {
        SceneManager._scene.removeChild(n);
    });
    this.notifs = [];
}


/*-------------------------------------------------------------------------
* Game_Map
-------------------------------------------------------------------------*/
//---- Update
Lecode.S_Notifs.oldUpdateFunc_GM = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    Lecode.S_Notifs.oldUpdateFunc_GM.call(this,sceneActive);
    if (sceneActive) {
        LeNotifManager.update();
    }
}


/*-------------------------------------------------------------------------
* Game_Interpreter
-------------------------------------------------------------------------*/
//---- Plugin Command
Lecode.S_Notifs.old_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Lecode.S_Notifs.old_pluginCommand.call(this, command, args);
    if (command === 'Notification') {
        switch (args[0]) {
        case 'Clear':
            LeNotifManager.clear();
            break;
        case 'Enable':
            LeNotifManager.enabled = (String(args[1]) === "true");
            break;
        case 'Position':
            Lecode.S_Notifs.params.pPos = String(args[1]);
            break;
        case 'TextColor':
            Lecode.S_Notifs.params.pTextColor = String(args[1]);
            break;
        case 'FontSize':
            Lecode.S_Notifs.params.pFontSize = Number(args[1]);
            break;
        case 'FontItalic':
            Lecode.S_Notifs.params.pFontItalic = Boolean(args[1]);
            break;
        case 'OutlineColor':
            Lecode.S_Notifs.params.pTextOutlineColor = String(args[1]);
            break;
        case 'OutlineWidth':
            Lecode.S_Notifs.params.pTextOutlineWidth = Number(args[1]);
            break;
        case 'ResetParameters':
            Lecode.S_Notifs.params.pPos = String(Lecode.parameters['Position'] || 'top-left');
            Lecode.S_Notifs.params.pTextColor = String(Lecode.parameters['Text Color'] || '#FFFFFF');
            Lecode.S_Notifs.params.pFontSize = Number(Lecode.parameters['Font Size'] || 18);
            Lecode.S_Notifs.params.pFontItalic = Boolean(Lecode.parameters['Font Italic ?'] || 'false');
            Lecode.S_Notifs.params.pTextOutlineColor = String(Lecode.parameters['Text Outline Color'] || '#');
            Lecode.S_Notifs.params.pTextOutlineWidth = Number(Lecode.parameters['Text Outline Width'] || 0);
            break;
        }
    }
};

//---- Script Call
Game_Interpreter.prototype.newNotif = function(text,type) {
    LeNotifManager.add(text,type);
}


/*-------------------------------------------------------------------------
* Game_Party
-------------------------------------------------------------------------*/
//---- Gain/Lose Gold
Lecode.S_Notifs.oldGainGold_method = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    Lecode.S_Notifs.oldGainGold_method.call(this,amount);
    if(amount == 0) return;
    var text = "";
    if (amount > 0) {
        if (Lecode.S_Notifs.params.pNotifGainGold === 'false') return;
        text = Lecode.S_Notifs.params.pNotifGainGold.replace('[value]',String(amount));
    } else {
        if (Lecode.S_Notifs.params.pNotifLoseGold === 'false') return;
        text = Lecode.S_Notifs.params.pNotifLoseGold.replace('[value]',String(-amount));
    }
    LeNotifManager.add(text,"gold");
};

//---- Gain/Lose Item
Lecode.S_Notifs.oldGainItem_method = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    Lecode.S_Notifs.oldGainItem_method.call(this,item,amount,includeEquip);
    if ( item == undefined || item.name == undefined || amount === 0)
        return;
    var text = '';
    if (amount > 0) {
        if (Lecode.S_Notifs.params.pNotifGainItem === 'false') return;
        text = Lecode.S_Notifs.params.pNotifGainItem.replace('[amount]',String(amount));
    } else {
        if (Lecode.S_Notifs.params.pNotifLoseItem === 'false') return;
        text = Lecode.S_Notifs.params.pNotifLoseItem.replace('[amount]',String(-amount));
    }
    text = text.replace('[name]',item.name);
    LeNotifManager.add(text,"item"); 
}


/*-------------------------------------------------------------------------
* Game_Interpreter
-------------------------------------------------------------------------*/
//---- Change EXP
Lecode.S_Notifs.oldCommand315_method = Game_Interpreter.prototype.command315;
Game_Interpreter.prototype.command315 = function() {
    Lecode.S_Notifs.oldCommand315_method.call(this);
    var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
    if(value === 0) return;
    var text = '';
    if (value > 0) {
        if (Lecode.S_Notifs.params.pNotifGainExp === 'false') return true;
        text = Lecode.S_Notifs.params.pNotifGainExp.replace('[value]',String(value));
    } else {
        if (Lecode.S_Notifs.params.pNotifLoseExp === 'false') return true;
        text = Lecode.S_Notifs.params.pNotifLoseExp.replace('[value]',String(-value));
    }
    if(this._params[0] === 0 && this._params[1] === 0) {
        text = text.replace('[name]','Party');
        LeNotifManager.add(text,"exp");
    } else {
        this.iterateActorEx(this._params[0], this._params[1], function(actor) {
            var text_i = text.replace('[name]',actor.name());
            LeNotifManager.add(text_i,"exp");
        }.bind(this));
    }
    return true;
};


/*-------------------------------------------------------------------------
* Game_Actor
-------------------------------------------------------------------------*/
//---- Level Up
Lecode.S_Notifs.oldLevelUp_method = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Lecode.S_Notifs.oldLevelUp_method.call(this);
    if (Lecode.S_Notifs.params.pNotifLevelUp === 'false')
        return;
    var text = Lecode.S_Notifs.params.pNotifLevelUp.replace('[name]',this.name());
    LeNotifManager.add(text,"levelup");
};

//---- Level Down
Lecode.S_Notifs.oldLevelDown_method = Game_Actor.prototype.levelDown;
Game_Actor.prototype.levelDown = function() {
    Lecode.S_Notifs.oldLevelDown_method.call(this);
    if (Lecode.S_Notifs.params.pNotifLevelDown === 'false')
        return;
    var text = Lecode.S_Notifs.params.pNotifLevelDown.replace('[name]',this.name());
    LeNotifManager.add(text,"leveldown");
};


/*-------------------------------------------------------------------------
* AudioManager
-------------------------------------------------------------------------*/
//---- Play BGM
Lecode.S_Notifs.oldPlayBgm_method = AudioManager.playBgm;
AudioManager.playBgm = function(bgm, pos) {
    Lecode.S_Notifs.oldPlayBgm_method.call(this,bgm,pos);
    if (Lecode.S_Notifs.params.pNotifBgm === 'false' || bgm == undefined || bgm.name == undefined || bgm.name == '')
        return;
    if (SceneManager._scene instanceof Scene_Map) {
        var text = Lecode.S_Notifs.params.pNotifBgm.replace('[name]',bgm.name);
        LeNotifManager.add(text,"bgm");
    }
};


/*-------------------------------------------------------------------------
* Game_Actor
-------------------------------------------------------------------------*/
//---- Change Equipment
Lecode.S_Notifs.oldChangeEquip_method = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    LeNotifManager.enabled = false;
    Lecode.S_Notifs.oldChangeEquip_method.call(this,slotId,item);
    LeNotifManager.enabled = true;
};

//---- Force Change Equipment
Lecode.S_Notifs.oldForceChangeEquip_method = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    LeNotifManager.enabled = false;
    Lecode.S_Notifs.oldForceChangeEquip_method.call(this,slotId,item);
    LeNotifManager.enabled = true;
};

//---- Trade Item with Party
Lecode.S_Notifs.oldTradewithParty_method = Game_Actor.prototype.tradeItemWithParty;
Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
    LeNotifManager.enabled = false;
    var bool = Lecode.S_Notifs.oldTradewithParty_method.call(this,newItem,oldItem);
    LeNotifManager.enabled = true;
    return bool;
};

//---- Handle Yanfly's methods

if (Imported.YEP_ItemCore === true) {

Lecode.S_Notifs.oldInitIndepenEquips_method = Game_Actor.prototype.initIndependentEquips;
Game_Actor.prototype.initIndependentEquips = function(equips) {
    LeNotifManager.enabled = false;
    Lecode.S_Notifs.oldInitIndepenEquips_method.call(this,equips);
    LeNotifManager.enabled = true;
};

Lecode.S_Notifs.oldChangeEquipById_method = Game_Actor.prototype.changeEquipById;
Game_Actor.prototype.changeEquipById = function(etypeId, itemId) {
    LeNotifManager.enabled = false;
    Lecode.S_Notifs.oldChangeEquipById_method.call(this,etypeId,itemId);
    LeNotifManager.enabled = true;
};

} //-Yanfly check

//})();
