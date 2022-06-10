/*:
-------------------------------------------------------------------------
@title HMS: Choice Display Mode
@author Hime --> HimeWorks (http://himeworks.com)
@date Oct 24, 2016
@version 1.3
@filename HIME_HMSChoiceDisplayMode.js
@url http://himeworks.com/2016/04/hms-choice-display-mode/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.3 - Customize the way choices are displayed
@help 
-------------------------------------------------------------------------------
== Description ==

By default, when you present players with a set of choices for them to
select, the choices will be displayed in a window separate from the message
window.

However, what if you wanted to present your choices differently in certain
situations?

This plugin allows you to display the choices in-line with your messages,
with the option to switch between the default display method and the new
display method.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.3 - Oct 24, 2016
 * Upgrade to 1.3.3 libraries: Window.prototype._maskWindow changed
1.2 - Aug 12, 2016
 * Upgrade to 1.3.0 libraries
1.1 - Apr 27, 2016
 * Implemented dynamic visible row calculation
 * Fixed bug where choices are not shown correctly for empty message
 * Display informative message when choices provided with no message 
1.0 - Apr 27, 2016
 * initial release

== Usage ==

--- Choice Display Mode ---

There are two ways to display choices

1. Default
2. Embedded

Default mode means the choices will be displayed outside of the message as
usual.

Embedded mode means the choices will be displayed inside the message.

--- Changing Display Mode ---

To switch between modes, use the script call

  HMS.setChoiceMode( MODE )
  
Where MODE is one of

  Default
  Embed
  
All choices displayed after will use the specified mode.

--- Choice Indentation ---

When the choices are embedded in the message window, you can choose how
much indentation they will have in the plugin parameters.

By default, it is 36 pixels.

-------------------------------------------------------------------------------
@param Default Choice Mode
@desc Choice mode to begin the game with.
Options: Default, Embed (default: Default)
@default Default

@param Choice Indent
@desc Number of pixels that the choices should be indented
@default 36
-------------------------------------------------------------------------------
*/ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.HMSChoiceDisplayMode = 1;
TH.HMSChoiceDisplayMode = TH.HMSChoiceDisplayMode || {};

var HMS = HMS || {};

(function ($) {

  $._modes = {
    "DEFAULT" : 0,
    "EMBED" : 1,
    "KEYWORD" : 2
  };

  $.params = PluginManager.parameters("HIME_HMSChoiceDisplayMode");
  $.defaultMode = $._modes[$.params["Default Choice Mode"].toUpperCase()];
  $.indent = Math.floor($.params["Choice Indent"]);
  
  HMS.setChoiceMode = function(mode, msgId) {
    msgId = msgId || 1;
    var mode = $._modes[mode.toUpperCase()];
    $gameMessage.setChoiceMode(mode);
  };
  
  var TH_GameMessage_initialize = Game_Message.prototype.initialize;
  Game_Message.prototype.initialize = function() {
    TH_GameMessage_initialize.call(this);
    this.setChoiceMode($.defaultMode);
  };
  
  Game_Message.prototype.setChoiceMode = function(mode) {
    this._choiceMode = mode;
  };
  
  Game_Message.prototype.choiceMode = function() {
    return this._choiceMode;
  };
  
  var TH_WindowChoiceList_start = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function() {
    this.updateChoiceMode();
    TH_WindowChoiceList_start.call(this);
  };
    
  Window_ChoiceList.prototype.updateChoiceMode = function() {
    this._choiceMode = $gameMessage.choiceMode();
  };
  
  var TH_WindowChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function() {  
    TH_WindowChoiceList_updatePlacement.call(this);
    if (this._choiceMode === 1) {
      var messageY = this._messageWindow.y;    
      var textState = this._messageWindow._textState;    
      if (!textState) {
        throw new Error("Displaying embedded choices must have a Show Text command");
      }
      this.x = this._messageWindow.newLineX() + $.indent;     
      var y = messageY + (textState.y)
      
      // if message is not empty, increase y-position
      if (textState.text !== '') {
        y += textState.height
      }
      this.y = y;
    }
  };    
  
  var TH_WindowChoiceList_updateBackground = Window_ChoiceList.prototype.updateBackground;
  Window_ChoiceList.prototype.updateBackground = function() {
    TH_WindowChoiceList_updateBackground.call(this);
    if (this._choiceMode === 1) {
      this._background = $gameMessage.choiceBackground();
      this.setBackgroundType(2);
    }
  };
  
  /* TO DO. Currently only supports one option per row as defualt */
  Window_ChoiceList.prototype.maxCols = function() {
    return 1;
  };

  /* Number of visible rows is determined by how much space is in the
   * message window. TO-DO, automatic scrolling
   */
  var TH_WindowChoiceList_numVisibleRows = Window_ChoiceList.prototype.numVisibleRows;
  Window_ChoiceList.prototype.numVisibleRows = function() {  
    // need to calculate how much space is left 
    if (this._choiceMode === 1) {
      var textState = this._messageWindow._textState;
      var y = textState.y;
      var textHeight = textState.height;
      var messageHeight = this._messageWindow.height - this.padding * 2
      if (textState.text !== '') {
        y += textHeight;
      }
      return Math.floor((messageHeight - y) / textHeight);
    }
    else {
      return TH_WindowChoiceList_numVisibleRows.call(this);
    }    
  };
  
  // IAVRA windowlayer fix for now
  delete WindowLayer.prototype._renderCanvas;
  delete WindowLayer.prototype._canvasClearWindowRect;
  delete WindowLayer.prototype._renderWebGL;
  delete WindowLayer.prototype._webglMaskOutside;
  delete WindowLayer.prototype._webglMaskWindow;
  delete WindowLayer.prototype._webglMaskRect;

  /* 1.3.3 windowlayer masking fix */
  var TH_WindowLayer_maskWindow = WindowLayer.prototype._maskWindow;
  WindowLayer.prototype._maskWindow = function(window, shift) {
    if (window instanceof Window_ChoiceList || window instanceof Window_Message) {
      return
    }
    else {
      TH_WindowLayer_maskWindow.call(this, window, shift);
    }
  };

})(TH.HMSChoiceDisplayMode);