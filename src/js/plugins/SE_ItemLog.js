"use strict";
/*:
╔════════════════╗
║ Plugin Manager ║
╚════════════════╝
 * @plugindesc v1.11 - Item Log. Displays the last looted items.
 * @author Squirting Elephant
   ╔════════════╗
   ║ Parameters ║
   ╚════════════╝
 * @param General
 *
 * @param AutoLootGain
 * @text Automatically Gain Loot
 * @desc Automatically add the loot to the party's inventory?
 * @parent General
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param AutoLogItems
 * @text Automatically Log Items
 * @desc Automatically add items to the log window when added through the GainItem command?
 * @parent General
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param Sound
 *
 * @param DefaultPitch
 * @text Default Pitch
 * @desc The default pitch for all ItemLog SFX.
 * @parent Sound
 * @type number
 * @min 0
 * @default 100
 * 
 * @param DefaultVolume
 * @text Default Volume
 * @desc The default volume level for all ItemLog SFX. Use the value -1 to use the "live AudioManger.seVolume" instead.
 * @parent Sound
 * @type number
 * @min -1
 * @default -1
 *
 * @param GoldSFX
 * @text Gold SFX
 * @desc Automatically play this sound when picking up gold (currency). Leave blank to disable.
 * @parent Sound
 * @default Coin
 *
 * @param ItemSFX
 * @text Item SFX
 * @desc Automatically play this sound when picking up items, armors or weapons. Leave blank to disable.
 * @parent Sound
 * @default Item1
 *
 * @param Positioning & Size
 *
 * @param Window_X
 * @text Window X
 * @desc x-location of itemlog window. If window-alignment is set to Right, this will act as an offset value instead.
 * @parent Positioning & Size
 * @type number
 * @default 0
 *
 * @param Window_Y
 * @text Window Y
 * @desc y-location of itemlog window. If window-alignment is set to Top, this will act as an offset value instead.
 * @parent Positioning & Size
 * @type number
 * @default 0
 * 
 * @param WindowWidth
 * @text Window Width
 * @desc width of the itemlog window.
 * @parent Positioning & Size
 * @type number
 * @default 400
 *
 * @param WindowHeight
 * @text Window Height
 * @desc height of the itemlog window.
 * @parent Positioning & Size
 * @type number
 * @default 160
 *
 * @param WindowAlignmentHorizontal
 * @text Window Horizontal Alignment
 * @parent Positioning & Size
 * @type select
 * @option Left
 * @option Right
 * @default Right
 *
 * @param WindowAlignmentVertical
 * @text Window Vertical Alignment
 * @parent Positioning & Size
 * @type select
 * @option Top
 * @option Bottom
 * @default Top
 *
 * @param Window Content
 *
 * @param FontSize
 * @text Font Size
 * @desc Size of the font.
 * @parent Window Content
 * @type number
 * @min 1
 * @default 24
 *
 * @param TextOffset_X
 * @text Text Offset X
 * @desc Text offset X for the log entries.
 * @parent Window Content
 * @type number
 * @default 10
 *
 * @param TextOffset_Y
 * @text Text Offset Y
 * @desc Text offset Y for the log entries.
 * @parent Window Content
 * @type number
 * @default 6
 *
 * @param StandardPadding
 * @text Standard Padding
 * @desc Leave at default (it's basically an X and Y offset).
 * @parent Window Content
 * @type number
 * @default 0
 *
 * @param PrefixText_Positive
 * @text Positive Prefix Text
 * @desc Prefix text.
 * @parent Window Content
 * @default Received
 *
 * @param PrefixText_Negative
 * @text Negative Prefix Text
 * @desc Prefix text.
 * @parent Window Content
 * @default Lost
 *
 * @param IconOffset_Y
 * @text Icon Y-offset
 * @desc Extra Y-offset for the drawing of the icons to better align them with the sentences.
 * @parent Window Content
 * @type number
 * @default 4
 *
 * @param WindowSkin
 * @text Window Skin
 * @desc Name of the window skin to use for this window.
 * @parent Window Content
 * @default Window_ItemLog
 *
 * @param AutoclearUponFullFade
 * @text Auto-clear Upon Full-fade
 * @desc Clear the items in the item-window if the window fully faded?
 * @parent Window Content
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
 * @param Miscellaneous
 *
 * @param FadeoutDelay
 * @text Fadeout Delay
 * @desc How long before the window starts fading out (in frames).
 * @parent Miscellaneous
 * @type number
 * @min 0
 * @default 240
 *
 * @param FadeoutSpeed
 * @text Fadeout Speed
 * @desc How fast the window fades out.
 * @parent Miscellaneous
 * @type number
 * @default 2
 *
 * @param TextShading
 * @text Text Shading
 * @desc Displays previously looted items in darker text. Set to 0 to disable.
 * @parent Miscellaneous
 * @type number
 * @decimals 2
 * @default -0.15
 *
 * @param GoldIconIndex
 * @text Gold IconIndex
 * @desc iconindex for the gold/currency icon.
 * @parent Miscellaneous
 * @type number
 * @default 163
   ╔══════╗
   ║ Help ║
   ╚══════╝
 * @help
 * License: Attribution 4.0 International (CC BY 4.0) (https://creativecommons.org/licenses/by/4.0/)
 *
 * Installation:
 * Either change the Window Skin parameter to an existing one or put the Window_ItemLog.png here: <project folder>/img/system/Window_ItemLog.png
 * 
 * Plugin Commands:
 * Note that all commands & parameters are NOT case sensitive.
 *
 * ItemLog <loot type> <loot database-index> <amount> <optional: skip (override: does not actually add the item to the inventory)>
 * example to loot 3 potions: ItemLog item 1 3
 * example to loot 5 swords:  ItemLog weapon 1 5
 * example to loot 6 axes:    ItemLog weapon 2 6
 * example to log (but does not add to inventory regardless of the "Auto Gain Loot" parameter) 6 axes:    ItemLog weapon 2 6 skip
 *
 * The exception is gold, examples:
 *                            ItemLog gold 123
 *                            ItemLog gold 999
 *
 * 
 * Show the itemlog window w/o adding anything:
 * ItemLog show 
 *
 * Clear the items in the itemlog window:
 * Itemlog ClearItems
 *
 * Enable/Disable automatic item-logging:
 * ItemLog EnableLogging
 * ItemLog DisableLogging
 *
 * Aliases created for:
 * * DataManager.makeSaveContents()
 * * DataManager.extractSaveContents()
 * * Game_Interpreter.prototype.command125()
 * * Game_Interpreter.prototype.command126()
 * * Game_Interpreter.prototype.command127()
 * * Game_Interpreter.prototype.command128()
 * * Game_Interpreter.prototype.pluginCommand()
 * * Scene_Map.prototype.createDisplayObjects()
 *
 * Version History:
 * v1.11 (12 November 2019)
 * - Fixed a crash when loading a game.
 * 
 * v1.10 (28 September 2019)
 * - Updated this plugin for the latest version of RMMV.
 *
 * v1.09 (16 January 2016)
 * - Added support for Yanfly's Item Core: <Text Color: x> tags.
 *
 * v1.08 (01 January 2016) [parameters changed]
 * - Code refactoring.
 * - Applied my new coding standards.
 * - Moved the Utilities inside the anonymous function.
 * - Added persistence through saving&loading.
 * - Itemlog contents are now stored between battles and between map transfers.
 * - 2 new parameters ("Default Volume" & "Default Pitch").
 *
 * v1.07a (16 December 2015)
 * - Added two new plugin commands to enable/disable auto-logging of items.
 * v1.07 (15 December 2015) [parameters changed]
 * - Rearranged and categorized parameters
 * - Added this plugin to the global variable Imported.
 * - Added a new plugin-command to clear the itemlog.
 * - Added an option to auto-clear the window upon full-fade.
 *
 * v1.06a (13 December 2015) [parameters changed]
 * - Now supports losing items/gold.
 * - Fixed a minor alignment issue when gaining < 10 items, armors or weapons.
 * - Minor refactoring of the 1.06 code.
 *
 * v1.05 (12 December 2015)
 * - Added a version history.
 * - Fixed a bug that used the wrong amount of gold/item/etc. when using a game-variable instead of a fixed amount.
 * - Added this plugin to SE.Plugins.
 * - Changed license to https://creativecommons.org/licenses/by/4.0/
 *
 * v1.00 - v1.04 (November 2015)
 */
 
/*╔═══════════════════════╗
  ║ Plugin Initialization ║
  ╚═══════════════════════╝*/
var Imported = Imported || {};
Imported.SE_ItemLog = { name: 'SE_ItemLog', version: 1.11, author: 'Squirting Elephant', date:'2019-11-12'};
var SE = SE || {};
SE.ItemLog = SE.ItemLog || {};

/*╔═════════════════════════════════════════════════════════════════════════╗
  ║ Queue with a limited size                                               ║
  ║ - A Stack-object with limited size                                      ║
  ║ - Automatically removes the first element(s) if it exceeds it's maxSize ║
  ╚═════════════════════════════════════════════════════════════════════════╝*/
function Queue_LSize(maxSize)
{
	this._maxSize = maxSize;
    this.length = 0;
    this._storage = [];
}

Queue_LSize.prototype.itemByIdx = function(index)
{
	return this._storage[index];
};
 
Queue_LSize.prototype.queue = function(data)
{
    this._storage[this.length] = data;
	this.length++;
	while (this.length > this._maxSize) { this.onAutoRemoval(this.dequeue()); }
};

// For aliasing
Queue_LSize.prototype.onAutoRemoval = function(removed_item) {};
 
 // Remove and return first item in array
Queue_LSize.prototype.dequeue = function()
{
    if (this.length)
	{
        var deletedData = this._storage.shift();
        this.length--;
        return deletedData;
    }
};
// Remove and return last item in array
Queue_LSize.prototype.pop = function()
{
    if (this.length)
	{
        var deletedData = this._storage.pop();
        this.length--;
        return deletedData;
    }
};

/*╔════════════════════════╗
  ║ Parameters & Variables ║
  ╚════════════════════════╝*/
SE.Params = SE.Params || {};

(function()
{
	function parseParameters(string)
	{
		try
		{
			return JSON.parse(string, (key, value) => {
				try { return parseParameters(value); }
				catch (e) { return value; }
			});
		} catch (e) { return string; }
	};

	SE.Params.ItemLog = PluginManager.parameters('SE_ItemLog');
	for (var key in SE.Params.ItemLog) { SE.Params.ItemLog[key] = SE.Params.ItemLog[key].replace('\r', ''); } // Because: fix stupid RMMV bug (https://forums.rpgmakerweb.com/index.php?threads/parameter-string-does-not-equal-string.113697/)
	SE.Params.ItemLog = parseParameters(JSON.stringify(SE.Params.ItemLog));
  

	// Make alias for ease of use.
	var Params = SE.Params.ItemLog;

	SE.ItemLog.Window = null;
	SE.ItemLog.AlreadyPlayedSFX = false;

	// General
	SE.ItemLog.AutoLootGain              = Params.AutoLootGain;
	SE.ItemLog.AutoLogItems              = Params.AutoLogItems;
	// Sound
	SE.ItemLog.DefaultPitch              = Params.DefaultPitch;
	SE.ItemLog.DefaultVolume             = Params.DefaultVolume;
	SE.ItemLog.PickupSFXGold             = Params.GoldSFX;
	SE.ItemLog.PickupSFXItem             = Params.ItemSFX;
	// Positioning & Size
	SE.ItemLog.Window_X                  = Params.Window_X;
	SE.ItemLog.Window_Y                  = Params.Window_Y;
	SE.ItemLog.WindowWidth               = Params.WindowWidth;
	SE.ItemLog.WindowHeight              = Params.WindowHeight;
	SE.ItemLog.WindowHorizontalAlignment = Params.WindowAlignmentHorizontal.toLowerCase();
	SE.ItemLog.WindowVerticalAlignment   = Params.WindowAlignmentVertical.toLowerCase();
	// Window Content
	SE.ItemLog.FontSize                  = Params.FontSize;
	SE.ItemLog.EntryTextOffsetX          = Params.TextOffset_X;
	SE.ItemLog.EntryTextOffsetY          = Params.TextOffset_Y;
	SE.ItemLog.StandardPadding           = Params.StandardPadding;

	SE.ItemLog.PositivePrefixText        = Params.PrefixText_Positive;
	if (SE.ItemLog.PositivePrefixText.slice(-1) != ' ') { SE.ItemLog.PositivePrefixText += ' '; }
	SE.ItemLog.NegativePrefixText        = Params.PrefixText_Negative;
	if (SE.ItemLog.NegativePrefixText.slice(-1) != ' ') { SE.ItemLog.NegativePrefixText += ' '; }

	SE.ItemLog.IconOffsetY               = Params.IconOffset_Y;
	SE.ItemLog.WindowSkin                = Params.WindowSkin;
	SE.ItemLog.AutoClearUponFullFade     = Params.AutoclearUponFullFade;
	// Miscellaneous
	SE.ItemLog.FadeoutDelay              = Params.FadeoutDelay;
	SE.ItemLog.FadeoutSpeed              = Params.FadeoutSpeed;
	SE.ItemLog.TextShadingValue          = Params.TextShading;
	SE.ItemLog.GoldIconIndex             = Params.GoldIconIndex;
	// Non Parameters
	SE.ItemLog.PrefixLength              = Math.max(SE.ItemLog.PositivePrefixText.length, SE.ItemLog.NegativePrefixText.length);
	SE.ItemLog.StoredData                = null;
	SE.ItemLog.TextLines                 = null;
})();

/*╔═══════════╗
  ║ Utilities ║
  ╚═══════════╝*/
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

function lpad(word, padStr, length)
{
	word = String(word);
	while (word.length < length) word = padStr + word;
	return word;
};

function rpad(word, padStr, length)
{
	word = String(word);
	while (word.length < length) word += padStr;
	return word;
};

/*╔══════════════════════════╗
  ║ ItemLog Window Definition║
  ╚══════════════════════════╝*/
function Window_ItemLog() { this.initialize.apply(this, arguments); }
// Inherit from base window
Window_ItemLog.prototype = Object.create(Window_Base.prototype);
// Set Constructor
Window_ItemLog.prototype.constructor = Window_ItemLog;

Window_ItemLog.prototype.loadWindowskin = function() { this.windowskin = ImageManager.loadSystem(SE.ItemLog.WindowSkin); };
Window_ItemLog.prototype.standardPadding = function() { return SE.ItemLog.StandardPadding; };
Window_ItemLog.prototype.standardFontSize = function() { return SE.ItemLog.FontSize; };

Window_ItemLog.AutoLogItems = SE.ItemLog.AutoLogItems;

// Initialization
Window_ItemLog.prototype.initialize = function(x, y, width, height)
{
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._helpWindow = null;
    this._handlers = {};
    this._touching = false;
    this.deactivate();
	this.maxStackLines = parseInt((height - SE.ItemLog.EntryTextOffsetY * 2) / parseFloat(SE.ItemLog.FontSize));
	
	if (!SE.ItemLog.TextLines) { this.clearItems(); }
	this.fadeOutCnt = 0;
	this.isFadingOut = false;
	this.isFadedOut = false;
	
	this.update();
};

// Update
Window_ItemLog.prototype.update = function()
{
    Window_Base.prototype.update.call(this);
	
	SE.ItemLog.AlreadyPlayedSFX = false;
	this.updateFadeOut();
    this.render();
};

// Update Fading Out
Window_ItemLog.prototype.updateFadeOut = function()
{
	if (this.isFadedOut) { return; }
	
	if (!this.isFadingOut)
	{
		this.fadeOutCnt++;
		if (this.fadeOutCnt > SE.ItemLog.FadeoutDelay)
		{
			this.fadeOutCnt = 0;
			this.isFadingOut = true;
		}
	}
	else
	{
		this.fadeOut();
	}
};

Window_ItemLog.prototype.clearItems = function()
{
	SE.ItemLog.TextLines = new Queue_LSize(this.maxStackLines);
};

Window_ItemLog.prototype.fadeOut = function()
{
	this.opacity = this.contentsOpacity -= SE.ItemLog.FadeoutSpeed;
	if (this.opacity <= 0) { this.onFullyFadedOut(); }
};

Window_ItemLog.prototype.onFullyFadedOut = function()
{
	this.isFadedOut = true;
	if (SE.ItemLog.AutoClearUponFullFade) { this.clearItems(); }
};

Window_ItemLog.prototype.resetFade = function()
{
	this.isFadingOut = false;
	this.fadeOutCnt = 0;
	this.opacity = this.contentsOpacity  = 255;
	this.isFadedOut = false;
};

Window_ItemLog.prototype.fadeOutInstantly = function()
{
	this.opacity = this.contentsOpacity = 0;
	this.onFullyFadedOut();
};

// #Draw/#render
Window_ItemLog.prototype.render = function()
{
	if (!SE.ItemLog.TextLines) { return; }
	this.contents.clear();
	
	var textLinesCnt = SE.ItemLog.TextLines.length;
	var text = null;
	for (var i = textLinesCnt - 1; i >= 0; i--)
	{
		this.resetTextColor();
		
		var line = SE.ItemLog.TextLines.itemByIdx(i);
		text = line.t1;
		this.drawText(text, SE.ItemLog.EntryTextOffsetX, SE.ItemLog.EntryTextOffsetY + i * SE.ItemLog.FontSize, 256, 'left');
		var newOffsetX = SE.ItemLog.EntryTextOffsetX + this.contents.measureTextWidth(line.t1);
		this.drawLootIcon(line.iconIndex, newOffsetX, SE.ItemLog.EntryTextOffsetY + i * SE.ItemLog.FontSize + SE.ItemLog.IconOffsetY);
		newOffsetX += SE.ItemLog.FontSize + 4;
		text = line.t2;
		if (Imported.YEP_ItemCore && (typeof line.textColor !== 'undefined') && (line !== null)) { this.changeTextColor(this.textColor(line.textColor)); } // This line is to support Yanfly's item colors.
		this.drawText(text, newOffsetX, SE.ItemLog.EntryTextOffsetY + i * SE.ItemLog.FontSize, 256, 'left');
		
		this.contents.textColor = shadeColor(this.contents.textColor, SE.ItemLog.TextShadingValue);
	}
	
	function shadeColor(color, percent)
	{   
		var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
	}
};

Window_ItemLog.prototype.drawLootIcon = function(iconIndex, x, y)
{
    var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, SE.ItemLog.FontSize, SE.ItemLog.FontSize);
};

/*╔═══════════════════════════╗
  ║ Create the ItemLog Window ║
  ╚═══════════════════════════╝*/
(function()
{
	var SEA_Scene_Map_CreateDisplayObjects = Scene_Map.prototype.createDisplayObjects;
	Scene_Map.prototype.createDisplayObjects = function()
	{
		SEA_Scene_Map_CreateDisplayObjects.apply(this, arguments);
		this.createItemLogWindow();
	};

	Scene_Map.prototype.createItemLogWindow = function()
	{
		var x = 0;
		if (SE.ItemLog.WindowHorizontalAlignment === 'right') { x = Graphics.boxWidth - SE.ItemLog.WindowWidth; }
		var y = 0;
		if (SE.ItemLog.WindowVerticalAlignment === 'bottom') { y = Graphics.boxHeight - SE.ItemLog.WindowHeight; }

		if (SE.ItemLog.Window !== null) { this.removeWindow(SE.ItemLog.Window); }
		SE.ItemLog.Window = new Window_ItemLog(x + SE.ItemLog.Window_X, y + SE.ItemLog.Window_Y, SE.ItemLog.WindowWidth, SE.ItemLog.WindowHeight);
		SE.ItemLog.Window.fadeOutInstantly();
		// if (SE.ItemLog.StoredData) { SE.ItemLog.Window.Textlines = SE.ItemLog.StoredData; }
		
		this.addChildAt(SE.ItemLog.Window, 1);
	};

	// Omg why does RPG Maker not have this method by default...
	Scene_Base.prototype.removeWindow = function(window)
	{
		var index = this.children.indexOf(window);
		if (index > -1) { this.children.splice(index, 1); }
	};

/*╔══════════════════╗
  ║ Saving & Loading ║
  ╚══════════════════╝*/
	var SEA_DataManager_MakeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function()
	{
		var contents = SEA_DataManager_MakeSaveContents.apply(this, arguments);
		contents.itemLogData = SE.ItemLog.TextLines;
		return contents;
	};

	var SEA_DataManager_ExtractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents)
	{
		SEA_DataManager_ExtractSaveContents.apply(this, arguments);
		SE = SE || {};
		SE.ItemLog = SE.ItemLog || {};
		SE.ItemLog.TextLines = contents.itemLogData;
	};

/*╔═══════════════════════════╗
  ║ Automatically add items   ╚══════════════════════════════════════════════════════════════════════════════════════════════════════╗
  ║                                                                                                                                  ║ 
  ║ Explanation of the this._params:                                                                                                 ║
  ║ Gold                                                                                                                             ║
  ║ [0] = 0: increase, 1: decrease                                                                                                   ║
  ║ [1] = 0: value, 1: $gameVariable was used to determine amount of gold.                                                           ║
  ║ [2] = it is a direct amount of gold but if [1] == 1, then this is the gameVariable number that contains the gold-amount instead. ║
  ║                                                                                                                                  ║ 
  ║                                                                                                                                  ║ 
  ║ Items, Weapons & Armor                                                                                                           ║ 
  ║ [0] = armor id matching the $dataArmors index                                                                                    ║ 
  ║ [1] = 0: increase, 1: decrease                                                                                                   ║ 
  ║ [2] = 0: value, 1: $gameVariable was used to determine amount of armors                                                          ║ 
  ║ [3] = it is a direct amount of gold but if [2] == 1, then this is the gameVariable number that contains the gold-amount instead. ║ 
  ║ [4] = include equipment? true/false                                                                                              ║ 
  ╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝*/
	SE.ItemLog.getAmount = function(params) // does not apply to gold! Gold has different parameters.. Yay for RPG Maker...
	{
		return ((params[2] === 0) ? params[3] : $gameVariables.value(params[3])) * (params[1] === 1 ? -1 : 1);
	};

	// Change Gold
	var SEA_Game_Interpreter_Command125 = Game_Interpreter.prototype.command125;
	Game_Interpreter.prototype.command125 = function()
	{
		var amount = (this._params[1] === 0) ? this._params[2] : $gameVariables.value(this._params[2]);
		if (this._params[0] === 1) { amount *= -1; }
		
		var retVal = SEA_Game_Interpreter_Command125.apply(this, arguments);
		if (Window_ItemLog.AutoLogItems) { SE.ItemLog.PluginCommand('ItemLog', ['gold', String(amount), 'skip']); }
		return retVal;
	};

	// Change Items
	var SEA_Game_Interpreter_Command126 = Game_Interpreter.prototype.command126;
	Game_Interpreter.prototype.command126 = function()
	{
		var retVal = SEA_Game_Interpreter_Command126.apply(this, arguments);
		if (Window_ItemLog.AutoLogItems) { SE.ItemLog.PluginCommand('ItemLog', ['item', this._params[0], SE.ItemLog.getAmount(this._params), 'skip']); }
		return retVal;
	};

	// Change Weapons
	var SEA_Game_Interpreter_Command127 = Game_Interpreter.prototype.command127;
	Game_Interpreter.prototype.command127 = function()
	{
		var retVal = SEA_Game_Interpreter_Command127.apply(this, arguments);
		if (Window_ItemLog.AutoLogItems) { SE.ItemLog.PluginCommand('ItemLog', ['weapon', this._params[0], SE.ItemLog.getAmount(this._params), 'skip']); }
		return retVal;
	};

	// Change Armors
	var SEA_Game_Interpreter_Command128 = Game_Interpreter.prototype.command128;
	Game_Interpreter.prototype.command128 = function()
	{
		var retVal = SEA_Game_Interpreter_Command128.apply(this, arguments);
		if (Window_ItemLog.AutoLogItems) { SE.ItemLog.PluginCommand('ItemLog', ['armor', this._params[0], SE.ItemLog.getAmount(this._params), 'skip']); }
		return retVal;
	};

/*╔════════════════╗
  ║ Plugin Command ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════╗
  ║ Note: The items are separated by spaces. The command is the first word and any following words are args. args is an array. ║
  ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝*/
	SE.ItemLog.getPrefixText = function(amount)
	{
		var prefixText = rpad((amount >= 0) ? SE.ItemLog.PositivePrefixText : SE.ItemLog.NegativePrefixText, ' ', SE.ItemLog.PrefixLength);
		return prefixText;
	};

	var SEA_Game_Interpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		SEA_Game_Interpreter_PluginCommand.apply(this, arguments);
		if (command.toLowerCase() === 'itemlog') { SE.ItemLog.PluginCommand(command, args); }
	};

	SE.ItemLog.PluginCommand = function(cmd, args)
	{
		switch(args[0].toLowerCase())
		{
			case 'show':
				SE.ItemLog.Window.resetFade();
				return;
			case 'clearitems':
				SE.ItemLog.Window.clearItems();
				return;
			case 'enablelogging':
				Window_ItemLog.AutoLogItems = true;
				return;
			case 'disablelogging':
				Window_ItemLog.AutoLogItems = false;
				return;
		}	
		
		// arg: item 1 10
		// arg: weapon 2 1
		// arg: weapon 2 1 skip
		// arg: gold 123
		var db = getDatabase(args[0]);
		var lootIdx = parseInt(args[1]);
		var skipAddItemToInventory = (String(args[args.length - 1]).toLowerCase() === 'skip');
		if (db != 'gold')
		{
			var amount = parseInt(args[2]);
			var amountStr = String(args[2]);
			var name = db[lootIdx].name;
			var textColor = db[lootIdx].meta['Text Color']; // Note that <Text Color: x> is case sensitive!
			var iconIndex = db[lootIdx].iconIndex;
			
			var t1 = SE.ItemLog.getPrefixText(amount) + lpad(Math.abs(amountStr), ' ', 2) + 'x ';
			var t2 = name;				
			
			SE.ItemLog.TextLines.queue({t1: t1, iconIndex: iconIndex, t2: t2, textColor: textColor});
			
			// Add loot
			if (SE.ItemLog.AutoLootGain && !skipAddItemToInventory)
			{
				$gameParty.gainItem(db[lootIdx], amount);
			}
			
			// sfx
			if (!SE.ItemLog.AlreadyPlayedSFX)
			{
				Play_SE(SE.ItemLog.PickupSFXItem);
				SE.ItemLog.AlreadyPlayedSFX = true;
			}
		}
		else // Gold
		{
			var amount = parseInt(args[1]);
			SE.ItemLog.TextLines.queue({t1: SE.ItemLog.getPrefixText(amount) + '    ', iconIndex: SE.ItemLog.GoldIconIndex, t2: Math.abs(amount) + ' ' + $dataSystem.currencyUnit, textColor: null});
			
			// Add loot
			if (SE.ItemLog.AutoLootGain && !skipAddItemToInventory)
			{
				$gameParty.gainGold(amount);
			}
			
			// sfx
			if (!SE.ItemLog.AlreadyPlayedSFX)
			{
				Play_SE(SE.ItemLog.PickupSFXGold);
				SE.ItemLog.AlreadyPlayedSFX = true;
			}
		}
		SE.ItemLog.Window.resetFade(); // Reset the fadeout, if any.
		
		function getDatabase(code)
		{
			code = code.toLowerCase();
			if (code.contains('item') || code.contains('itm'))
				return $dataItems;
			if (code.contains('armor'))
				return $dataArmors;
			if (code.contains('weapon') || code.contains('wpn'))
				return $dataWeapons;
			if (code.contains('gold'))
				return 'gold';
			
			throw new Error('getDatabase('+ code + ') ERROR: invalid code.');
		}
		
		function Play_SE(filename)
		{
			var volume = (SE.ItemLog.DefaultVolume > -1) ? SE.ItemLog.DefaultVolume : AudioManager.seVolume;
			AudioManager.playSe({name: filename, volume: volume, pitch: SE.ItemLog.DefaultPitch, pan: 0});
		}
	};

})();
/*╔═════════════╗
  ║ End of File ║
  ╚═════════════╝*/