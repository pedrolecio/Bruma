//=============================================================================
 /*:
 * @plugindesc v1.0.0 Makes item common events not take you to the map after use.
 * @author Helladen.
 *
 * @help
 *
 */
//=============================================================================

var Helladen = Helladen || {};
Helladen.BEC = Helladen.BEC || {};

Helladen.BEC.Scene_ItemBase_checkCommonEvent = Scene_ItemBase.prototype.checkCommonEvent;

Scene_ItemBase.prototype.checkCommonEvent = function() {
    if ($gameTemp.isCommonEventReserved()) {
		//SceneManager.goto(Scene_Map);
    }
};
