// =============================================================================
// LTN_WindoWPop.js
// =============================================================================
/* eslint-disable camelcase */
/*:
* @plugindesc V.2.4.2 A popup window to display custom messages & items/gold gained
*
* @author LTN Games
* @param -- AutoPop Settings --
*
* @param Auto Pop
* @desc The defualt behaviour of auto pop when starting new game. true = on, false = off.
* @default true
*
* @param Auto Pop Switch
* @desc Set this to an in-game switch, so you can turn auto pop off & on.
* @default 1
*
* @param Font Type
* @desc Set the font type you will use. Ensure Font is in /fonts folder.
* @default GameFont
*
* @param Font Size
* @desc Set the font size.
* @default 28
*
* @param Auto Pop Alignment
* @desc The alignment of the item name & icon. Left, or Center.
* @default Left
*
* @param Gain String
* @desc The string when gaining an item. Message Code(s) allowed
* @default \C[3]Found \C[0]x
*
* @param Lose String
* @desc The string when losing an item. Message Code(s) allowed
* @default \C[2]Lost \C[0]x
*
* @param Gold Icon
* @desc The icon to display everytime you gain gold. 0 = No Icon
* @default 208
*
* @param Window Pop SE
* @desc The sound effect you would like to play on popup.
* @default Jump1
*
* @param SE Pitch
* @desc Pitch of the SE on popup.
* @default 100
*
* @param SE Volume
* @desc Volume of the SE on popup.
* @default 100
*
* @param -- Pop Animation Settings --
*
* @param Pop Up Delay
* @desc Set the timer between each pop up before displaying another.
* @default 60
*
* @param Pop Fade Speed
* @desc The speed at which the pop up fades out. Higher the value, slower the fade.
* @default 50
*
* @param Pop Slide Speed
* @desc You can slide the popup down/up the screen by setting the speed here.
* @default 0
*
* @param -- Map Settings --
* @param Map Display Name
* @desc Turn this on to allow the Window Pop to take control of the Map Display Name
* @default true
*
* @param Map Pop Switch
* @desc Set this to an in-game switch, to turn on and off map name popup
* @default 2
*
* @param Map Display SE
* @desc Choose to use the auto pop sound effect for the map display name or not.
* @default true
*
* @param -- Collector Settings--
* @param Collection String
* @desc The string for when collecting items
* @default Obtained
*
* @param Plural String
* @desc The string at the end of the item name. Defualt (s)
* @default (s)
*
* @param -- Window Settings --
* @param Window X Position
* @desc X Position on screen for the window pop.
* @default 0
*
* @param Window Y Position
* @desc Y Position on screen for the window pop.
* @default 0
*
* @param Window Width
* @desc The width of the window pop.
* @default 360
*
* @param Background Type
* @desc Choose the type of BG you want.'Image' or 'Gradient' without quotes.
* @default Gradient
*
* @param WindowBG Gradient 1
* @desc Change the color of the 1st gradient. RGBA
* @default rgba(0, 0, 0, 0.6)
*
* @param WindowBG Gradient 2
* @desc Change the color of the 2nd gradient. RGBA
* @default rgba(0, 0, 0, 0)
*
* @param BG Image Filename
* @desc The filename of the bg image you want.Place in the folder System/
* @default
*
* @param BG X Offset
* @desc The BG Image x position.  Not constraint to the windows width.
* @default 0
*
* @param BG Y Offset
* @desc The BG Image y position.  Not constraint to the window height.
* @default 0
*
* @param -- History Settings--
*
* @param Max History
* @desc The max amount of popups to keep in the history window.
* @default 10
*
* @param Open/Close Key
* @desc The keyboard key which will open & close history window.
* @default tab
*
* @param History Window Height
* @desc The height of the history window.
* @default 303
*
* @param History Window Y
* @desc The y position on the screen for the history window.
* @default 0
*
* @param History Window X
* @desc The x position on the screen for the history window.
* @default 0
*
* @param History Bg Type
* @desc Choose the type of BG you want.'Image' or 'Gradient' without quotes.
* @default Gradient
*
* @param History Bg Gradient 1
* @desc Change the color of the 1st gradient for the history window. RGBA
* @default rgba(0, 0, 0, 0.6)
*
* @param History Bg Gradient 2
* @desc Change the color of the 2nd gradient for the history window. RGBA
* @default rgba(0, 0, 0, 0)
*
* @param History BG Image
* @desc The BG Image for the history window.
* @default
*
* @param History BG Offset X
* @desc The BG Image x position.  Not constraint to the windows width.
* @default 0
*
* @param  History BG Offset Y
* @desc The BG Image y position.  Not constraint to the windows width.
* @default 0
*
* @help
*
==============================================================================
TERMS OF USE
==============================================================================
Credit must be given to: LTN Games

Exclusive to https://ltngames.net, please don't share anywhere else unless given strict
permission by the author of the plugin.

The plugin may be used in commerical and non-commerical products.
Credit must be given!

Please report all bugs to https://ltngames.net/Support

==============================================================================
INSTRUCTIONS
==============================================================================
Change the setting in the plugin manager to adjust how the Window Pop appears
on map.

If Auto pop is enabled in the plugin manager, a window will pop up For  each
item or gold gained or lost.
==============================================================================
USING PLUGIN COMMANDS, SCRIPT CALLS, & Notetags
==============================================================================
----------===========----------------------
AUTO POPUP SWITCHES
----------===========----------------------
You can set an in-game siwtch to turn auto item pop, off and on.
Inside the plugin manager set the switch to any number youd like, and when you
don't want window pop to pop up set the game switch to false.

----------===========----------------------
COLLECTION MODE
----------===========----------------------
You can use collection mode for window pop. The window will still popup
for every item/gold gained but with a few extra plugin commands you can setup
some in game variables and keep track of how many of each item has been gained.

The window will now reflect this as well, so instead of displaying
"Obtained x1 Potion"
it will now display a max value and how much of each item is gained like so
"Obtained 2/10 Potion(s)"
-----------------------------------
PLUGIN COMMANDS FOR COLLECTION MODE
------------------------------------
WPOPCMODE TRUE/FALSE
This command turns collection mode on / true and off / false

WPOPCSET ITEMTYPE ITEMID VARIABLE MAXVALUE
This is where you setup all your items and match them with a variable & max value.

--
ITEMTYPE = Weapon, Armor Or Item.

Item = The Item ID which you want to store as a collection item.

VARIABLE = The in game variable you want to set the item to.

Max Value = The max value for the item..  1/10  <-- 10 is the max value
--

WPOPCRESET ITEMTYPE ITEM

This will remove the item from the collection array and the next time you
collect an item it will no longer display in collection mode.

ITEM TYPE = The type of item, weapon item or armor
ITEM = The item ID in the database
----------------------------
EXAMPLES FOR COLLECTION MODE
-------------------------------
WPOPCMODE TRUE   -- Turn on collection mode

WPOPCSET Item 1 1 25   --- Set Item 1, to Variable 1 in game & the max amount to
collect is 25.
WPOPCSET Weapon 5 2 15   --- Set item 5, to Variable 2, & the max amount is 15

Now whenever I gain these items above, it will display the amount I have already
collected and  the amount I still need to collect.

I collected all of the items above and now I want to remove them and reset the
variable so I will do something like this.

WPOPCRESET Item 1
WPOPCRESET Weapon 5

The above WPOPCRESET commands will remove the items from the array and reset
the in game variable back to 0. In other words the items will now act as they
should before collection mode was turned on.

----------===========----------------------
MAP DISPLAY NAME CUSTOMIZATIONS
----------===========----------------------
If enabled in the plugin manager, window pop will take control of the
Map Display Name, so you can add message codes to make the name pop out!

You can now use message codes for your maps display name!
All you have to do is go into the maps setting from the editor
and add your own message code to the Map Display Name text field.
You can use the icon message code if you want to include icons.

----------===========----------------------
THE ITEM NOTETAG:
----------===========----------------------
You can now use a notetag in the items section of the database to chnage the
colors of the items, when they auto pop up. This can be good for Item Rarity.
Notetag to use: <WPOP_Color:x> (x = the # of the color code you want to use)

You can also change the sound effect for each item using a simple notetag.
Using the notetag will force window pop to use that sound effect instead of the
defualt se in the plugin manager.
Notetag to use  <WPOP_Sound:Absorb2>

-------------------------------------------
EXAMPLE NOTETAGS For Items, Weapons & Armor
--------------------------------------------
<WPOP_Color:1>  // Changes to white
<WPOP_Color:2>  // Changed to color 2 in the color pallete of window.png

<WPOP_Sound:Absorb2> // Change the SE on pop to Absorb2
<WPOP_Sound:Attack1> // Change the SE on pop to Attack1

To set a custom window pop, you can use either a plugin command or Script
call.
----------===========----------------------
THE PLUGIN COMMAND FOR CUSTOM POPUP:
----------===========----------------------
Plugin Command: WPOP Align Icon String

In the Icon slot put the icon index # - No icon = 0

In the Duration slot put a number to set how long before window fades out.

In the Align slot, put left, right or center, to align your string in the window.

In the string slot put the string you want to pop up.

-------------------------------------------
EXAMPLE COMMANDS
---------------------------------------------
Message codes work with window pop, I would recommend only sticking with The
codes that change color, show variables, actor name, etc. Some codes like text
size, and draw icon, may break the alignment of the message.

Example: WPOP Left 5 Welome To Oakville
WPOP Center 5 \C[3] Quest Log Updated
WPOP Center 2 \C[2] \N[1] \C[3]Is Poisoned!

----------===========----------------------
NOTES TO REMEBER:
----------===========----------------------

*/

'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof LTN === 'undefined') {
  var strA = 'You need to install the LTN Core plugin';
  var strB = 'in order for this plugin to work! Please visit';
  var strC = '\n http://ltngames.net/ltn-core';
  var strD = ' to download the latest verison.';
  throw new Error(`${strA} ${strB} ${strC} ${strD}`);
} else {
  LTN.PluginRegistrar.registerPlugin('WindowPop', '2.4.2', 'LTNGames');
}

(function ($) {
  // =============================================================================
  // PARAMETERS
  //
  $.Param = $.Param || {};
  $.Parameters = PluginManager.parameters('LTN_WindowPop');
  // Auto Pop Display Parameters
  $.Param.autoPop = String($.Parameters['Auto Pop']).toLowerCase();
  $.Param.collectString = String($.Parameters['Collection String']);
  $.Param.pluralString = String($.Parameters['Plural String']);
  $.Param.aPopSwitch = Number($.Parameters['Auto Pop Switch']);
  $.Param.gainString = String($.Parameters['Gain String']);
  $.Param.loseString = String($.Parameters['Lose String']);
  $.Param.goldIcon = Number($.Parameters['Gold Icon']);
  $.Param.autoPopAlign = String($.Parameters['Auto Pop Alignment']).toLowerCase();
  $._mapDisplayName = String($.Parameters['Map Display Name']).toLowerCase();
  $.Param.fontFace = String($.Parameters['Font Type']).toLowerCase();
  $.Param.fontSize = Number($.Parameters['Font Size']);
  // Sound Parmeters
  $.Param.mapDisplaySe = String($.Parameters['Map Display SE']).toLowerCase();
  $.Param.popSe = String($.Parameters['Window Pop SE']);
  $.Param.popPitch = Number($.Parameters['SE Pitch']);
  $.Param.popVol = Number($.Parameters['SE Volume']);
  // Popup Window Paramters
  $.Param.windowX = Number($.Parameters['Window X Position']);
  $.Param.windowY = Number($.Parameters['Window Y Position']);
  $.Param.windowWidth = Number($.Parameters['Window Width']);
  $.Param.bgType = String($.Parameters['Background Type']).toLowerCase();
  $.Param.bgImage = String($.Parameters['BG Image Filename']);
  $.Param.bgOffsetX = Number($.Parameters['BG X Offset']);
  $.Param.bgOffsetY = Number($.Parameters['BG Y Offset']);
  $.Param.windowGradA = String($.Parameters['WindowBG Gradient 1']);
  $.Param.windowGradB = String($.Parameters['WindowBG Gradient 2']);
  // Popup Animation Paramters
  $.Param.popFade = Number($.Parameters['Pop Fade Speed']);
  $.Param.popSlideSpeed = Number($.Parameters['Pop Slide Speed']);
  $.Param.popUpDelay = Number($.Parameters['Pop Up Delay']);
  // History Window Paramters
  $.Param.historyMax = Number($.Parameters['Max History']);
  $.Param.historyHeight = Number($.Parameters['History Window Height']);
  $.Param.historyX = Number($.Parameters['History Window X']);
  $.Param.historyY = Number($.Parameters['History Window Y']);
  $.Param.historyBgType = String($.Parameters['History Bg Type']).toLowerCase();
  $.Param.historyGradA = String($.Parameters['History Bg Gradient 1']);
  $.Param.historyGradB = String($.Parameters['History Bg Gradient 2']);
  $.Param.historyBg = String($.Parameters['History BG Image']);
  $.Param.historyBgX = Number($.Parameters['History BG Offset X']);
  $.Param.historyBgY = Number($.Parameters['History BG Offset Y']);
  $.Param.historyKey = String($.Parameters['Open/Close Key']).toLowerCase();
  // =============================================================================
  // New Static Class: Window Pop Manager
  // =============================================================================
  // - Handles most Window Pop Functions, Queue System, Collection Mode & Note Tags
  // - functions include: sortItemType, addColorTo, cleanString, getNotetag, etc...
  //
  function WinPopManager() {}
  // Public variables - Call using this.
  WinPopManager.popQueue = [];
  WinPopManager.popUps = [];
  WinPopManager.popUpDelay = 0;
  WinPopManager._align = 'left';
  WinPopManager.collectMode = 'false';
  // ----------------------------------------------------------------------------
  // Window Pop Queue Functions
  // - Handles queue arrays & adds to scene map, & animations.
  //
  WinPopManager.autoPopSwitch = function () {
    if ($gameSwitches.value($.Param.aPopSwitch) === true) {
      return true;
    }
    return false;
  };

  WinPopManager.addToSceneMap = function () {
    if (this.popUpDelay > 0) this.popUpDelay--;
    if (this.popQueue.length > 0 && this.popUpDelay <= 0) {
      var curPop = this.popQueue[0];
      this.adjustCollectionVar(curPop.item, curPop.amount);
      var newPop = new Window_Pop(this.popQueue[0], this.x, this.y);
      this.popQueue.shift();
      this.popUps.push(newPop);
      SceneManager._scene.addChild(newPop);
      this.popUpDelay = $.Param.popUpDelay;
    }
    this.slideDownPop();
  };
  // Animate: slide down pop ups.
  WinPopManager.slideDownPop = function () {
    var _this = this;

    if (this.popUps.length > 0) {
      this.popUps.forEach(function (popup) {
        popup.y += $.Param.popSlideSpeed;
        popup.alpha -= 0.5 / $.Param.popFade;
        if (popup.alpha <= 0) {
          SceneManager._scene.removeChild(popup);
          _this.popUps.splice(_this.popUps.indexOf(popup), 1);
        }
      });
    }
  };
  // Animate: slide down pop ups.
  WinPopManager.stackPop = function () {
    if (this.popUps.length > 0) {
      for (var i = this.popUps.length - 1; i >= 0; i--) {
        this.popUps[i].y += $.Param.popSlideSpeed;
        this.popUps[i].alpha -= 0.5 / $.Param.popFade;
        if (this.popUps[i].alpha <= 0) {
          SceneManager._scene.removeChild(this.popUps[i]);
          this.popUps.splice(this.popUps.indexOf(this.popUps[i]), 1);
        }
      }
    }
  };
  // -------=====---------
  // Set & Add to Queue Array
  // -------=====---------
  WinPopManager.addToQueue = function (type, icon, item, amount) {
    if (SceneManager._scene.constructor !== Scene_Map) return;
    var pop = this.createEmptyPop();
    pop.type = type || 'item';
    pop.icon = icon || 0;
    pop.item = item || '';
    pop.amount = amount || 0;
    this.popQueue.push(pop);
  };
  // Create empty object for queueing
  WinPopManager.createEmptyPop = function () {
    var empty = {};
    empty.type = '';
    empty.icon = 0;
    empty.string = '';
    empty.amount = 0;
    return empty;
  };
  //
  // ------------------------------------------------------------------------------
  // Popup History Function
  //  - To handle all object arrays input from the plugin command
  //
  WinPopManager.addHistoryToScene = function () {
    var historyWindow = new Window_PopHistory('this.popHistory', this.x, this.y);
    SceneManager._scene.addChild(historyWindow);
  };
  //
  // ------------------------------------------------------------------------------
  // Collection Mode Functions.
  //  - To handle all object arrays input from the plugin command
  //
  WinPopManager.pushToObjArray = function (itemType, itemId, gameVar, maxValue) {
    var obj = $gameSystem.collectionObject();

    switch (itemType) {
      case 'item':
        if (this.itemIdIndex('item', itemId) < 0) {
          obj.item.gameVar.push(gameVar);
          obj.item.itemId.push(itemId);
          obj.item.itemMax.push(maxValue);
        }
        break;
      case 'armor':
        if (this.itemIdIndex('armor', itemId) < 0) {
          obj.armor.gameVar.push(gameVar);
          obj.armor.itemId.push(itemId);
          obj.armor.itemMax.push(maxValue);
        }
        break;
      case 'weapon':
        if (this.itemIdIndex('weapon', itemId) < 0) {
          obj.weapon.gameVar.push(gameVar);
          obj.weapon.itemId.push(itemId);
          obj.weapon.itemMax.push(maxValue);
        }
        break;
    }
  };

  // For Plugin Command: Remove an Item(elements) from the array and reset variable
  WinPopManager.removeFromArray = function (itemType, itemId) {
    var obj = $gameSystem.collectionObject();
    var index = this.itemIdIndex('item', itemId);
    switch (itemType) {
      case 'item':
        if (this.itemIdIndex('item', itemId) > -1) {
          obj.item.gameVar.splice(index, 1);
          obj.item.itemId.splice(index, 1);
          obj.item.itemMax.splice(index, 1);
          $gameVariables.setValue(index, 0);
        }
        break;
      case 'armor':
        if (this.itemIdIndex('armor', itemId) > -1) {
          obj.item.gameVar.splice(index, 1);
          obj.armor.itemId.splice(index, 1);
          obj.armor.itemMax.splice(index, 1);
          $gameVariables.setValue(index, 0);
        }
        break;
      case 'weapon':
        if (this.itemIdIndex('weapon', itemId) > -1) {
          obj.item.gameVar.splice(index, 1);
          obj.weapon.itemId.splice(index, 1);
          obj.weapon.itemMax.splice(index, 1);
          $gameVariables.setValue(index, 0);
        }
        break;
    }
  };
  // Check if current item poping is a match with collect object's arrays
  WinPopManager.itemIsMatch = function (item, itemId) {
    var obj = $gameSystem.collectionObject();
    var index = String(itemId);
    var itemType = this.sortItemType(item);
    var value = false;
    switch (itemType) {
      case 'item':
        if (obj.item.itemId.indexOf(index) > -1) value = true;
        break;
      case 'armor':
        if (obj.armor.itemId.indexOf(index) > -1) value = true;
        break;
      case 'weapon':
        if (obj.weapon.itemId.indexOf(index) > -1) value = true;
        break;
    }
    return value;
  };
  // Get the index from the array for current item poping
  WinPopManager.itemIdIndex = function (itemType, itemId) {
    var obj = $gameSystem.collectionObject();
    var index = String(itemId);
    var objIndex = 0;
    if (itemType === 'item') objIndex = obj.item.itemId.indexOf(index);
    if (itemType === 'armor') objIndex = obj.armor.itemId.indexOf(index);
    if (itemType === 'weapon') objIndex = obj.weapon.itemId.indexOf(index);
    return objIndex;
  };
  // get value from arrays, by using current array position
  WinPopManager.getValueFromObj = function (type, item, itemId) {
    var itemType = this.sortItemType(item);
    var index = this.itemIdIndex(itemType, itemId);
    var obj = $gameSystem.collectionObject();
    var value = '';
    switch (type) {
      case 'gameVar':
        if (itemType === 'item') value = obj.item.gameVar[index];
        if (itemType === 'armor') value = obj.armor.gameVar[index];
        if (itemType === 'weapon') value = obj.weapon.gameVar[index];
        break;
      case 'itemMax':
        if (itemType === 'item') value = obj.item.itemMax[index];
        if (itemType === 'armor') value = obj.armor.itemMax[index];
        if (itemType === 'weapon') value = obj.weapon.itemMax[index];
        break;
    }
    return value;
  };

  // Add +1 to gamevariables for collection mode.
  WinPopManager.adjustCollectionVar = function (item, amount) {
    if (!item) return;
    if (this.collectMode === 'true' && this.itemIsMatch(item, item.id)) {
      var gameVar = this.getValueFromObj('gameVar', item, item.id);
      var oldValue = $gameVariables.value(gameVar);
      if (amount > 0) $gameVariables.setValue(gameVar, oldValue + amount);
    }
  };
  //
  // -----------------------------------------------------------------------------
  // Window Pop Functions
  //

  // Sort through item notetags if sound note tag is there change se otherwise defualt
  WinPopManager.changePopSound = function (sound, item) {
    var newSound = this.getSoundTagByItemType(item);
    var itemType = this.sortItemType(item);
    if (newSound && itemType === 'item') {
      sound.name = String(newSound).trim();
    } else {
      sound.name = $.Param.popSe;
    }
  };

  // Add the color code from notetag to string
  WinPopManager.addColorCodeTo = function (item) {
    var colorCode = this.getColorTagByItemType(item);
    var oldString = item.name ? item.name : item;
    var newString = '';
    if (colorCode) {
      var colorCodeString = '\\C[' + colorCode + ']';
      newString = colorCodeString.replace(/\s/g, '') + oldString;
      return newString;
    }
    return oldString;
  };

  // New Method: Clean the string, to remove the minus (-) symbol from item.amount
  WinPopManager.cleanString = function (string) {
    var oldString = String(string);
    if (!oldString) return;
    var cleanString = oldString.replace(/(^-)/g, '');
    return cleanString;
  };

  // Check the amount of of item being gained or lost, & change string accordingly
  WinPopManager.checkIncrement = function (amount) {
    var gainString = $.Param.gainString;
    var loseString = $.Param.loseString;
    var increment = '';
    if (amount > 0) {
      increment = gainString;
    } else if (amount < 0) {
      increment = loseString;
    }
    return increment || '';
  };

  // Sort items, and set the item type.
  WinPopManager.sortItemType = function (item) {
    var itemType = '';
    if (DataManager.isItem(item)) {
      itemType = 'item';
    } else if (DataManager.isWeapon(item)) {
      itemType = 'weapon';
    } else if (DataManager.isArmor(item)) {
      itemType = 'armor';
    } else {
      itemType = '';
    }
    return itemType;
  };

  // Find notetag according to item being gained
  WinPopManager.getSoundTagByItemType = function (item) {
    var soundNotetag = '';
    var itemType = this.sortItemType(item);
    switch (itemType) {
      case 'armor':
        soundNotetag = $dataArmors[item.id].meta.WPOP_Sound;
        break;
      case 'item':
        soundNotetag = $dataItems[item.id].meta.WPOP_Sound;
        break;
      case 'weapon':
        soundNotetag = $dataWeapons[item.id].meta.WPOP_Sound;
        break;
    }
    return soundNotetag || $.Param.popSe;
  };

  // Set the notetag according to type of item
  WinPopManager.getColorTagByItemType = function (item) {
    var colorNotetag = '';
    var itemType = this.sortItemType(item);
    switch (itemType) {
      case 'armor':
        colorNotetag = $dataArmors[item.id].meta.WPOP_Color;
        break;
      case 'item':
        colorNotetag = $dataItems[item.id].meta.WPOP_Color;
        break;
      case 'weapon':
        colorNotetag = $dataWeapons[item.id].meta.WPOP_Color;
        break;
    }
    return colorNotetag;
  };

  // =============================================================================
  //  WINDOW POP. The main window which pops up.
  // =============================================================================
  //
  //
  //

  var Window_Pop = function (_Window_Base) {
    _inherits(Window_Pop, _Window_Base);

    function Window_Pop(pop, x, y) {
      _classCallCheck(this, Window_Pop);

      var _this2 = _possibleConstructorReturn(this, (Window_Pop.__proto__ || Object.getPrototypeOf(Window_Pop)).call(this));

      _this2._pop = pop;
      var width = $.Param.windowWidth;
      var height = _this2.lineHeight(3);
      var px = $.Param.windowX;
      var py = $.Param.windowY;
      Window_Base.prototype.initialize.call(_this2, px, py, width, height);
      _this2.opacity = 0;
      _this2.padding = 0;
      _this2.historyCache = $gameSystem.popHistoryCache();
      _this2.refresh();
      return _this2;
    }

    _createClass(Window_Pop, [{
      key: 'refresh',
      value: function refresh() {
        this.contents.clear();
        this.backgroundManager($.Param.bgType);
        this.contentManager(this._pop.type, this._pop.icon, this._pop.item, this._pop.amount);
        if (this._pop.type === 'map' && $.Param.mapDisplaySe === 'false') {
          return;
        }
        this.popSe(this._pop.item);
      }
    }, {
      key: 'standardFontFace',
      value: function standardFontFace() {
        return $.Param.fontFace;
      }
    }, {
      key: 'standardFontSize',
      value: function standardFontSize() {
        return $.Param.fontSize;
      }
    }, {
      key: 'contentManager',
      value: function contentManager(type, icon, item, amount) {
        var align = $.Param.autoPopAlign;
        switch (type) {
          case 'item':
            this.drawItemContents(item.iconIndex, item, amount, align);
            break;
          case 'itemC':
            if (WinPopManager.itemIsMatch(item, item.id) && amount > 0) {
              this.drawItemCollector(item.iconIndex, item, align);
            }
            break;
          case 'gold':
            this.drawGoldContents(icon, amount, align);
            break;
          case 'custom':
            this.drawCustomContents(icon, item, align);
            break;
          case 'map':
            this.drawMapDisplay(align);
            break;
        }
      }
    }, {
      key: 'backgroundManager',
      value: function backgroundManager(type) {
        var bgWidth = $.Param.windowWidth;
        // Check which BG to use.
        switch (type) {
          // Image choice
          case 'image':
            this.drawBackgroundImage();
            break;
          // Gradient Choice
          case 'gradient':
            this.drawBackgroundGradient(0, 0, bgWidth, this.lineHeight(2));
            break;
          // Defualt Choice
          default:
            this.drawBackgroundGradient(0, 0, bgWidth, this.lineHeight(2));
            break;
        }
      }
    }, {
      key: 'drawMapDisplay',
      value: function drawMapDisplay(align) {
        var mapName = $gameMap.displayName();
        var x = this.alignPopText(mapName, $.Param.windowWidth, align);
        if (mapName) {
          this.drawTextEx(mapName, x, 0);
          this.addToHistory(0, mapName);
        }
      }
    }, {
      key: 'drawItemContents',
      value: function drawItemContents(icon, item, amount, align) {
        var increment = WinPopManager.checkIncrement(amount);
        var newAmount = WinPopManager.cleanString(amount);
        var coloredItem = WinPopManager.addColorCodeTo(item);
        var itemString = '';
        itemString = increment + newAmount + ' ' + coloredItem;
        var tx = this.alignPopText(itemString, $.Param.windowWidth, align);
        var ix = tx - 32;

        this.addToHistory(icon, itemString);
        this.drawIcon(icon, ix, 2);
        this.drawTextEx(itemString, tx, 0);
      }
    }, {
      key: 'drawItemCollector',
      value: function drawItemCollector(icon, item, align) {
        // String Variables
        var coloredItem = WinPopManager.addColorCodeTo(item);
        var itemString = '';
        var gainString = $.Param.collectString;
        var pluralString = $.Param.pluralString;
        // Collection Object Variables
        var varVal = WinPopManager.getValueFromObj('gameVar', item, item.id);
        var itemMax = WinPopManager.getValueFromObj('itemMax', item, item.id);
        var itemVar = $gameVariables.value(varVal);
        itemString = gainString + ' ' + itemVar + '/' + itemMax + ' ' + coloredItem + pluralString;
        var tx = this.alignPopText(itemString, $.Param.windowWidth, align);
        var ix = tx - 32;

        this.addToHistory(icon, itemString);
        this.drawIcon(icon, ix, 2);
        this.drawTextEx(itemString, tx, 0);
      }
    }, {
      key: 'drawGoldContents',
      value: function drawGoldContents(icon, amount, align) {
        var increment = WinPopManager.checkIncrement(amount);
        var newAmount = WinPopManager.cleanString(amount);
        var goldString = increment + newAmount + ' ' + TextManager.currencyUnit;
        var tx = this.alignPopText(goldString, $.Param.windowWidth, align);
        var ix = tx - 32;

        this.addToHistory(icon, goldString);
        this.drawIcon(icon, ix, 2);
        this.drawTextEx(goldString, tx, 0);
        // }
      }
    }, {
      key: 'drawCustomContents',
      value: function drawCustomContents(icon, string, align) {
        var tx = this.alignPopText(string, $.Param.windowWidth, align);
        var ix = tx - 32;

        this.addToHistory(icon, string);
        this.drawTextEx(string, tx, 0);
        this.drawIcon(icon, ix, 2);
      }
    }, {
      key: 'drawBackgroundGradient',
      value: function drawBackgroundGradient(x, y, width, height) {
        var color1 = $.Param.windowGradA;
        var color2 = $.Param.windowGradB;
        this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
        this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
      }
    }, {
      key: 'drawBackgroundImage',
      value: function drawBackgroundImage() {
        this._backSprite = ImageManager.loadSystem($.Param.bgImage);
        this._backSprite1 = new Sprite(this._backSprite);
        this._backSprite1.x = $.Param.bgOffsetX;
        this._backSprite1.y = $.Param.bgOffsetY;
        this.addChildToBack(this._backSprite1);
        //
      }
    }, {
      key: 'standardPadding',
      value: function standardPadding(actor) {
        return 0;
      }
    }, {
      key: 'addToHistory',
      value: function addToHistory(icon, string) {
        this.historyCache.icon.push(icon);
        this.historyCache.string.push(string);
      }
    }, {
      key: 'alignPopText',
      value: function alignPopText(string, maxWidth, align) {
        var messageCodesWidth = this.adjustStringWidth(string);
        var textWidth = this.textWidth(string);
        var stringWidth = textWidth - messageCodesWidth;
        var finalX = 0;
        switch (align) {
          case 'center':
            finalX = (maxWidth - stringWidth) / 2;
            break;
          case 'left':
            finalX = 32;
            break;
          case 'right':
            finalX = maxWidth - stringWidth;
            break;
        }
        if (finalX < 32) finalX = 32;
        return finalX;
      }
    }, {
      key: 'adjustStringWidth',
      value: function adjustStringWidth(string) {
        var widthToRemove = '';
        var toAdjust = string.match(/(\\[CNVG]\[\d*\])/g);
        if (!toAdjust) return 0;
        for (var i = 0; i < toAdjust.length; i++) {
          widthToRemove += toAdjust[i];
        }
        var removedWidth = this.textWidth(widthToRemove);
        return removedWidth;
      }
      // -------=====---------
      // New Method: popSe, Setup sound effect object
      // -------=====---------

    }, {
      key: 'popSe',
      value: function popSe(item) {
        var popSe = {};
        WinPopManager.changePopSound(popSe, item);
        popSe.pitch = $.Param.popPitch;
        popSe.volume = $.Param.popVol;
        popSe.pan = 0;
        AudioManager.playSe(popSe);
      }
    }]);

    return Window_Pop;
  }(Window_Base);

  // =============================================================================
  //  WINDOW POP HISTORY: The main window which shows previous pop ups.
  // =============================================================================
  //
  //
  //

  var Window_PopHistory = function (_Window_Pop) {
    _inherits(Window_PopHistory, _Window_Pop);

    function Window_PopHistory(pop, x, y) {
      _classCallCheck(this, Window_PopHistory);

      var _this3 = _possibleConstructorReturn(this, (Window_PopHistory.__proto__ || Object.getPrototypeOf(Window_PopHistory)).call(this));

      _this3.popHistory = pop;
      var width = $.Param.windowWidth;
      var height = $.Param.historyHeight;
      var phx = $.Param.historyX;
      var phy = $.Param.historyY;
      _this3.key = $.Param.historyKey;
      _get(Window_PopHistory.prototype.__proto__ || Object.getPrototypeOf(Window_PopHistory.prototype), 'initialize', _this3).call(_this3, _this3, phx, phy, width, height);
      _this3.opacity = 0;
      _this3.visible = false;
      _this3.hy = 0;
      _this3.historyCache = $gameSystem.popHistoryCache();
      _this3.refresh();
      return _this3;
    }

    _createClass(Window_PopHistory, [{
      key: 'standardPadding',
      value: function standardPadding(actor) {
        return 8;
      }
    }, {
      key: 'historyBgManager',
      value: function historyBgManager(type) {
        var bgWidth = $.Param.windowWidth;
        // Check which BG to use.
        switch (type) {
          // Image choice
          case 'image':
            this.drawHistoryBgImage();
            break;
          // Gradient Choice
          case 'gradient':
            this.drawHistoryBgGradient(0, 0, bgWidth, this.height);
            break;
          // Defualt Choice
          default:
            this.drawHistoryBgGradient(0, 0, bgWidth, this.height);
            break;
        }
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.contents.clear();
        this.iy = 0;
        this.sy = 0;
        if (this.visible) {
          this.historyBgManager($.Param.historyBgType);
          this.drawHistoryList();
        }
      }
    }, {
      key: 'update',
      value: function update() {
        this.onKeyPress();
        this.historyItemMax();
      }
    }, {
      key: 'open',
      value: function open() {
        this.visible = true;
        this.refresh();
      }
    }, {
      key: 'close',
      value: function close() {
        this.visible = false;
      }
    }, {
      key: 'onKeyPress',
      value: function onKeyPress() {
        if (Input.isTriggered(this.key) && !this.visible) {
          SoundManager.playOk();
          this.open();
        } else if (Input.isTriggered(this.key) && this.visible) {
          SoundManager.playCancel();
          this.close();
        }
      }

      /* Ensure's history items don't exceed max. */

    }, {
      key: 'historyItemMax',
      value: function historyItemMax() {
        if (this.historyCache.string.length > $.Param.historyMax) {
          this.historyCache.string.shift();
        }
        if (this.historyCache.icon.length > $.Param.historyMax) {
          this.historyCache.icon.shift();
        }
      }
    }, {
      key: 'drawHistoryList',
      value: function drawHistoryList() {
        var _this4 = this;

        if (this.historyCache.icon.length > 0) {
          this.historyCache.icon.forEach(function (icon) {
            _this4.drawIcon(icon, 0, _this4.iy);
            _this4.iy += _this4.lineHeight();
          });
        }
        if (this.historyCache.string.length > 0) {
          this.historyCache.string.forEach(function (string) {
            _this4.drawTextEx(string, 32, _this4.sy);
            _this4.sy += _this4.lineHeight();
          });
        }
      }
    }, {
      key: 'drawHistoryBgGradient',
      value: function drawHistoryBgGradient(x, y, width, height) {
        var color1 = $.Param.historyGradA;
        var color2 = $.Param.historyGradB;
        this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
        this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
      }
    }, {
      key: 'drawHistoryBgImage',
      value: function drawHistoryBgImage() {
        this._historySprite = ImageManager.loadSystem($.Param.historyBg);
        this._historySprite1 = new Sprite(this._historySprite);
        this._historySprite1.x = $.Param.historyBgX;
        this._historySprite1.y = $.Param.historyBgY;
        this.addChildToBack(this._historySprite1);
        //
      }
    }]);

    return Window_PopHistory;
  }(Window_Pop);

  // =============================================================================
  // Game_System
  // =============================================================================


  $.WindowPop_oldGS_init = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    $.WindowPop_oldGS_init.call(this);
    // Collection Mode Object, for handling array & types. Saves to savefile!
    this.collectObj = {
      item: { itemId: [], itemMax: [], gameVar: [] },
      armor: { itemId: [], itemMax: [], gameVar: [] },
      weapon: { itemId: [], itemMax: [], gameVar: [] }
    };
    // For popup history, in game system to store on game save.
    this.historyCache = { icon: [], string: [] };
  };
  Game_System.prototype.collectionObject = function () {
    return this.collectObj;
  };

  Game_System.prototype.popHistoryCache = function () {
    return this.historyCache;
  };
  // =============================================================================
  // Game Party: Assign Auto Pop Variables
  // =============================================================================
  //
  // Alias Nethod: Gain Gold
  $.WindowPop_gameParty_GainGold = Game_Party.prototype.gainGold;

  Game_Party.prototype.gainGold = function (amount) {
    if (WinPopManager.autoPopSwitch() === true) {
      WinPopManager.addToQueue('gold', $.Param.goldIcon, TextManager.currencyUnit, amount);
    }
    $.WindowPop_gameParty_GainGold.call(this, amount);
  };

  $.WindowPop_oldGP_gainItem = Game_Party.prototype.gainItem;

  Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
    $.WindowPop_oldGP_gainItem.call(this, item, amount, includeEquip);
    if (WinPopManager.autoPopSwitch() === true && item) {
      if (WinPopManager.collectMode === 'true' && WinPopManager.itemIsMatch(item, item.id)) {
        WinPopManager.addToQueue('itemC', item.iconIndex, item, amount);
      } else {
        WinPopManager.addToQueue('item', item.iconIndex, item, amount);
      }
    }
    $gameMap.requestRefresh();
  };

  // ===========================================================================
  // Scene Map: Implement Window Pop Into Scene_Map
  // ===========================================================================
  //
  //
  // -----------
  // Set the game switch to true on Scene_Map Initialize;
  // ----------
  $.WindowPop_SceneMap_Init = Scene_Map.prototype.initialize;
  Scene_Map.prototype.initialize = function () {
    $.WindowPop_SceneMap_Init.call(this);
    if ($.Param.autoPop === 'true') $gameSwitches.setValue($.Param.aPopSwitch, true);
  };
  // -----------------
  // Aliased Nethod:  Create Window Pop in Scene_Map
  // -----------------
  $.WindowPop_SceneMap_Update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    $.WindowPop_SceneMap_Update.call(this);
    WinPopManager.addToSceneMap();
  };

  // ----------
  // Aliased Nethod:  Create Window Pop in Scene_Map
  // ----------
  $.WindowPop_SceneMap_CreateAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    $.WindowPop_SceneMap_CreateAllWindows.call(this);
    WinPopManager.addHistoryToScene();
  };
  // ----------------
  // Alised Method:  If using the Map Display name feature, overwrite to use WindowPop
  // ----------------
  $.WindowPop_oldSceneMap_Start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    if ($._mapDisplayName === 'true') {
      var mapName = $gameMap.displayName();
      Scene_Base.prototype.start.call(this);
      SceneManager.clearStack();
      if (this._transfer) {
        this.fadeInForTransfer();
        if (mapName) {
          WinPopManager.addToQueue('map', 0, mapName, 0);
        }
        $gameMap.autoplay();
      } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
      }
      this.menuCalling = false;
    } else {
      $.WindowPop_oldSceneMap_Start.call(this);
    }
  };

  // =============================================================================
  // Game_Interpreter.. Create Plugin Command
  // =============================================================================
  $.WPOP_oldGPpluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    var pluginString = '';
    switch (command) {
      // WPOP ALIGN ICON STRING
      case 'WPOP':
        var j = args.length;
        for (var i = 2; i < j; i++) {
          if (i < j) {
            pluginString += args[i] ? args[i] : '';
            pluginString += ' ';
          }
        }
        var align = args[0] ? String(args[0]).toLowerCase() : 'left';
        var icon = args[1] ? Number(args[1]) : 0;
        var string = pluginString;
        WinPopManager._align = align;
        WinPopManager.addToQueue('custom', icon, string, 0);
        break;
      // WPOPCMODE TRUE/FALSE
      case 'WPOPCMODE':
        WinPopManager.collectMode = args[0] ? String(args[0]).toLowerCase() : 'false';
        break;
      // WPOPCSET ItemType ItemId Variable MaxValue
      case 'WPOPCSET':
        WinPopManager.pushToObjArray(args[0].toLowerCase(), args[1], args[2], args[3]);
        break;
      // WPOPCRESET ItemType ItemId
      case 'WPOPCRESET':
        WinPopManager.removeFromArray(args[0].toLowerCase(), args[1]);
        break;
      default:
        $.WPOP_oldGPpluginCommand.call(this, command, args);
    }
  };
})(LTN.PluginRegistrar.requirePlugin(false, 'WindowPop'));
// =============================================================================
// THE END, Based On A True Story!
// =============================================================================