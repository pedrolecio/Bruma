/*=============================================================================
* Gilgamar - State Common Event
* By Gilgamar
* G_StateCE.js
* Version: 1.02
* Free for commercial and non commercial use.
*=============================================================================*/

var Imported = Imported || {};
Imported.G_StateCE = true;

var StateCE = {};

/*:
* @plugindesc v1.02 Enable state common events.
* @author Gilgamar
*
* @param Actor
* @desc ID of game variaable to use.
* Contains ID of actor affected by state change.
* @default 0
*
* @param Occurs
* @desc ID of game variaable to use.
* Shows if state is onadd, onremove or onexpire.
* @default 0
*
* @help
* ============================================================================
* Introduction
* ============================================================================
* Enables state add/remove common events via notetags. Ex:
*
* <StateCE Event: 1 onadd>
* <StateCE Event: 2 onremove>
* <StateCE Event: 3 onexpire>
*
* The precedling lines will run common event ID 001 on state add, ID 002
* on state remove, and ID 003 on state expire for the state tagged.
*
* Use the game variable assigned in param Actor to determine which actor was
* affected by state change in your common event.
*
* Use the game variable assigned in param Occurs to determine which state
* change was applied. You can use this instead of separate common events.
* 1 = onadd
* 2 = onremove
* 3 = onexpire
*
* ============================================================================
* Changelog
* ============================================================================
* Version 1.02:
* - Added Actor param so we can see who was affected by state change
* - Added Occurs param so we can if state is add/remove or expire
*
* Version 1.01:
* - Added onexpire notetag for progressive states
* - Compatibile with Yanfly BattleEngine (turn-based and tick-based)
*
* Version 1.00:
* - Enables state add/remove common events via notetags
*/

//=============================================================================
// Parameters
//=============================================================================

StateCE.Parameters = PluginManager.parameters('G_StateCE');
StateCE.Param = StateCE.Param || {};
StateCE.Param.Actor = String(StateCE.Parameters['Actor']);
StateCE.Param.Occurs = String(StateCE.Parameters['Occurs']);

//=============================================================================
// Notetags
//=============================================================================

StateCE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
if (!StateCE.DataManager_isDatabaseLoaded.call(this)) return false;
DataManager.processSTATECENotetags1($dataStates);
return true;
};

DataManager.processSTATECENotetags1 = function(group) {
// Check if function called more than once
if (DataManager.processSTATECENotetags1.calledTimes++ > 1) return;

var note1 = /<(?:STATECE EVENT):[ ](\d+)[ ](ONADD)>/i;
var note2 = /<(?:STATECE EVENT):[ ](\d+)[ ](ONREMOVE)>/i;
var note3 = /<(?:STATECE EVENT):[ ](\d+)[ ](ONEXPIRE)>/i;

for (var n = 1; n < group.length; n++) {
var obj = group[n];
var notedata = obj.note.split(/[\r\n]+/);
// console.log(notedata)
obj.commonEvents = [];
for (var i = 0; i < notedata.length; i++) {
var line = notedata;
if (line.match(note1)) {
obj.commonEvents.push({
eventId: parseInt(RegExp.$1),
occurs: 'onadd'
});
} else if (line.match(note2)) {
obj.commonEvents.push({
eventId: parseInt(RegExp.$1),
occurs: 'onremove'
});
} else if (line.match(note3)) {
obj.commonEvents.push({
eventId: parseInt(RegExp.$1),
occurs: 'onexpire'
});
}
}
}
// console.log(group)

};
DataManager.processSTATECENotetags1.calledTimes = 0;

//=============================================================================
// StateCE Functions
//=============================================================================

// Queue the common event associated with the state
StateCE.changeState = function(actor, stateId, occurs) {
var state = $dataStates[stateId];
for (var i = 0; i < state.commonEvents.length; i++){
var commonEvent = state.commonEvents;
if (commonEvent.occurs === occurs) {

// DEBUGGING
console.log('Actor', actor._actorId)
console.log('State', occurs)
console.log(commonEvent)

// Saving ID of actor affected by state change
$gameVariables.setValue(StateCE.Param.Actor, actor._actorId);
// Saving state occurs
if (occurs === 'onadd') $gameVariables.setValue(StateCE.Param.Occurs, 1);
if (occurs === 'onremove') $gameVariables.setValue(StateCE.Param.Occurs, 2);
if (occurs === 'onexpire') $gameVariables.setValue(StateCE.Param.Occurs, 3);
// Update common events
$gameTemp.reserveCommonEvent(commonEvent.eventId);
}
}
}
StateCE.onAdd = function(actor, stateId) {this.changeState(actor, stateId, 'onadd')}
StateCE.onRemove = function(actor, stateId) {this.changeState(actor, stateId, 'onremove')}
StateCE.onExpire = function(actor, stateId) {this.changeState(actor, stateId, 'onexpire')}

// Borrowed this function from Himeworks progressive states
Game_Battler.prototype.compareStates = function(oldStates, newStates) {
for (var i = 0, len = oldStates.length; i < len; i++) {
var stateId = oldStates;
var state = $dataStates[stateId];
if (!newStates.contains(stateId)) {
StateCE.onExpire(this, stateId);
}
}
}

//=============================================================================
// RPG Maker Overrides for State Add/Remove
//=============================================================================

StateCE.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
StateCE.Game_Battler_removeState.call(this, stateId);
StateCE.onRemove(this, stateId);
};

StateCE.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
StateCE.Game_Battler_addState.call(this, stateId);
StateCE.onAdd(this, stateId);
};

//=============================================================================
// RPG Maker Overrides for State Expiry
//=============================================================================

/* Remove by walking */
StateCE.GameActor_updateStateSteps = Game_Actor.prototype.updateStateSteps;
Game_Actor.prototype.updateStateSteps = function(state) {
StateCE.GameActor_updateStateSteps.call(this, state);
if (!this.isStateAffected(state.id)) { StateCE.onExpire(this, state.id) }
};

/* Remove by damage */
StateCE._GameBattler_removeStatesByDamage = Game_Battler.prototype.removeStatesByDamage;
Game_Battler.prototype.removeStatesByDamage = function() {
var oldStates = this._states.clone();
StateCE._GameBattler_removeStatesByDamage.call(this);
var newStates = this._states;
this.compareStates(oldStates, newStates);
};

/* Remove by turn end and action end */
if (Imported.YEP_BattleEngineCore) {

StateCE.Game_BattlerBase_updateStateTurnTiming = Game_BattlerBase.prototype.updateStateTurnTiming;
Game_BattlerBase.prototype.updateStateTurnTiming = function(timing) {
var oldStates = this._states.clone();
StateCE.Game_BattlerBase_updateStateTurnTiming.call(this, timing);
var newStates = this._states;
this.compareStates(oldStates, newStates);
};

StateCE.Game_BattlerBase_updateStateTicks = Game_BattlerBase.prototype.updateStateTicks;
Game_BattlerBase.prototype.updateStateTicks = function() {
var oldStates = this._states.clone();
StateCE.Game_BattlerBase_updateStateTicks.call(this);
var newStates = this._states;
this.compareStates(oldStates, newStates);
};

} else {

StateCE._GameBattler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
Game_Battler.prototype.removeStatesAuto = function(timing) {
var oldStates = this._states.clone();
StateCE._GameBattler_removeStatesAuto.call(this, timing);
var newStates = this._states;
this.compareStates(oldStates, newStates);
};

};

//=============================================================================
// RPG Maker Code References
//=============================================================================

// Game_Actor.prototype.updateStateSteps = function(state) {
// if (state.removeByWalking) {
// if (this._stateSteps[state.id] > 0) {
// if (--this._stateSteps[state.id] === 0) {
// this.removeState(state.id);
// }
// }
// }
// };
//
// Game_Battler.prototype.removeStatesByDamage = function() {
// this.states().forEach(function(state) {
// if (state.removeByDamage && Math.randomInt(100) < state.chanceByDamage) {
// this.removeState(state.id);
// }
// }, this);
// };
//
// Game_Battler.prototype.removeStatesAuto = function(timing) {
// this.states().forEach(function(state) {
// if (this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
// this.removeState(state.id);
// }
// }, this);
// };
//
// Game_Battler.prototype.removeState = function(stateId) {
// if (this.isStateAffected(stateId)) {
// if (stateId === this.deathStateId()) {
// this.revive();
// }
// this.eraseState(stateId);
// this.refresh();
// this._result.pushRemovedState(stateId);
// }
// };
//
// Game_Battler.prototype.addState = function(stateId) {
// if (this.isStateAddable(stateId)) {
// if (!this.isStateAffected(stateId)) {
// this.addNewState(stateId);
// this.refresh();
// }
// this.resetStateCounts(stateId);
// this._result.pushAddedState(stateId);
// }
// };


