"use strict";
//=============================================================================
// Equipment.js
//=============================================================================
/*:
* @plugindesc Changes the equipment scene to make it smaller.
* @author Felski
*
*
*/


(function() {

Scene_Equip.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createStatusWindow(); // RPG Maker MV still needs this, so we hide it later.
    //this.createCommandWindow(); // We dont need a command window.
    this.createSlotWindow();
    this.createItemWindow();
    this.refreshActor();
    this.commandEquip();
};

Scene_Equip.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_EquipStatus(0, this._helpWindow.height);
    this._statusWindow.hide(); // RPG Maker MV still needs this, so we hide it here.
    this.addWindow(this._statusWindow);
};

Scene_Equip.prototype.createSlotWindow = function() {
    //var wx = this._statusWindow.width; // to make the menu fit we adjust this to 0.
    var wx = 0;
    //var wy = this._commandWindow.y + this._commandWindow.height; // adjusted to help window parameters, because we have no command window to work with here.
    var wy = this._helpWindow.y + this._helpWindow.height;
    //var ww = Graphics.boxWidth - this._statusWindow.width; // same as with wx, except this time we take the whole screens width.
    var ww = Graphics.boxWidth;
    var wh = this._statusWindow.height; 
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    //this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this)); // changed the event bind to pop scene (which brings us back to the menu)
    this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
    this.addWindow(this._slotWindow);
};

})();