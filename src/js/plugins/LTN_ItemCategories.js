// =============================================================================
// LTN_ItemCategories.js
// =============================================================================
// Version 1.1.0
/*:
* @plugindesc v 1.1.0 Gives you more categories for your items.
<LTN_ItemCategories>

@author LTN Games (https://ltngames.net)

@param Retain Default
@desc Retain the default item categories? If true default
categories will remain.
@type boolean
@default false

@param Item Categories
@type text[]
@desc Input the amount of categories you want for your items.
@default ["Potions", "Herbs", "Battle", "Quest"]

@param Max Columns
@type number
@desc How many columns for the category commands.
@default 4

@help
================================================================================
▼ TERMS OF USE
================================================================================
Credit must be given to: LTN Games

Exclusive to https://ltngames.net, please don't share anywhere else unless given strict
permission by the author of the plugin.

The plugin may be used in commerical and non-commerical products.
Credit must be given!

Please report all bugs to https://ltngames.net/Support

===============================================================================
▼ DEPENDENCIES
===============================================================================
Requires LTN Core.

===============================================================================
▼ COMPATABILITY
===============================================================================
This plugin overwrites the default method Window_ItemLlist.includes()
So any plugin which uses it in some way may become broken due to this plugin.

Compatiable with Yanfly Item Core.

 ============================================================================
 ▼ DONATIONS
 ============================================================================
Most of the plugins I write are free to use commercially, and I put a lot of
hours into the development of my plugins, If you like my work and want to see
more of it in the future, I ask that you consider offering a donation.

If you do wish to provide your support, you can do so by sending your
contribution via PayPal to: LTNGamesDevelopment at gmail.com

===============================================================================
▼ INFORMATION
===============================================================================
This plugin gives you the ability to add more categories for your items, instead
of the default Item, Armor, Weapons & Key Items categoires you may keep these
and add more or remove those and use only your custom categories.

===============
CATEGORY SETUP
===============
Simply input the amount of categories you want in the parameter "Item Categories"

Now the Item scene will have these categories, the next step is to setup the
items category using a notetag.

All the notetags will be the category name you input in the parameters, so the
default cateogires:
Potions, Herbs, Battle, Quest

Are also the notetags you use for each item that should go under that category.

To setup a notetag simply use the keyword followed by the category name
<Category: Category Name>

You may also use the shorthand version <Cat: CategoryName>

<Category: Potions>, <Category: Herbs>, <Cat: Battle>, <Cat: Quest>

Giving all potion type items the notetag <Cat: Potions> then these items
will show up under the category "Potions" in the item scene.

===============================================================================
▼ INSTRUCTIONS
===============================================================================

*/
'use strict';

if (typeof LTN === 'undefined') {
  var strA = 'You need to install the LTN Core plugin';
  var strB = 'in order for this plugin to work! Please visit';
  var strC = '\n http://ltngames.net/ltn-core';
  var strD = ' to download the latest verison.';
  throw new Error(strA + strB + strC + strD);
} else {
  LTN.PluginRegistrar.registerPlugin('ItemCategories', '1.1.0', 'LTNGames');
}

(function ($) {
  $.Alias = $.Alias || {};
  // Require Utility functions
  var $Utils = LTN.Utilities;

  $.Parameters = PluginManager.getPluginParameters('LTN_ItemCategories');
  $.Param = $.Param || {};

  $.Param.categories = $Utils.toArray($.Parameters['Item Categories']);
  $.Param.retainDefault = $Utils.toBool($.Parameters['Retain Default']);
  $.Param.maxCols = Number($.Parameters['Max Columns']);
  $.Param.maxRows = Number($.Parameters['Max Rows']);

  /** -----------------------------------------------------------------------
   * Window_ItemCategory >>
   *
   *
   ------------------------------------------------------------------------ */
  /**
   * @function
   * @desc This closure function extends and overwrites to the Window_ItemCategory class
   */
  (function ($, Param, Alias) {
    // eslint-disable-line no-shadow
    Alias.Window_ItemCategory_maxCols = $.maxCols;
    $.maxCols = function () {
      if (typeof Yanfly !== 'undefined') {
        if (Yanfly.hasOwnProperty('Item')) {
          return Alias.Window_ItemCategory_maxCols.call(this);
        }
      }
      return Param.maxCols;
    };

    Alias.Window_ItemCategory_makeCmdList = $.makeCommandList;
    $.makeCommandList = function () {
      if (Param.retainDefault) {
        Alias.Window_ItemCategory_makeCmdList.call(this);
      }
      this.makeExtraCommands();
    };

    $.makeExtraCommands = function () {
      var categories = Param.categories;
      var max = categories.length;
      for (var i = 0; i < max; i++) {
        this.addCommand(categories[i], categories[i].toLowerCase());
      }
    };
  })(Window_ItemCategory.prototype, $.Param, $.Alias);

  /** -----------------------------------------------------------------------
   * Window_ItemList >>
   *
   *
   ------------------------------------------------------------------------ */
  /**
   * @function
   * @desc This closure function extends and overwrites to the Window_ItemList class
   */

  (function ($, Param) {
    // eslint-disable-line no-shadow
    $.includes = function (item) {
      switch (this._category) {
        case 'item':
          return DataManager.isItem(item) && item.itypeId === 1;
        case 'weapon':
          return DataManager.isWeapon(item);
        case 'armor':
          return DataManager.isArmor(item);
        case 'keyItem':
          return DataManager.isItem(item) && item.itypeId === 2;
        default:
          if (SceneManager.isScene(Scene_Item) || SceneManager.isScene(Scene_Shop)) {
            return this.extraIncludes(item);
          }
      }
    };

    $.extraIncludes = function (item) {
      var includes = Param.categories;
      var includesMax = includes.length;
      var meta = $Utils.getMetaData(item, 'Category');
      var meta2 = $Utils.getMetaData(item, 'Cat');
      for (var i = 0; i < includesMax; i++) {
        if (this._category === includes[i].toLowerCase() && item !== null) {
          return item && (meta === includes[i] || meta2 === includes[i]);
        }
      }
    };
  })(Window_ItemList.prototype, $.Param);
})(LTN.PluginRegistrar.requirePlugin(false, 'ItemCategories'));