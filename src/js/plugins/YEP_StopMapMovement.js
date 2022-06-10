//=============================================================================
// Yanfly Engine Plugins - Stop Map Movement
// YEP_StopMapMovement.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_StopMapMovement = true;

var Yanfly = Yanfly || {};
Yanfly.Stop = Yanfly.Stop || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 A utility plugin to stop events from automatically
 * moving by themselves all across your map.
 * @author Yanfly Engine Plugins
 *
 * @param Stop During Events
 * @desc Stop automatic movement during events?
 * NO - false     YES - true
 * @default true
 *
 * @param Stop During Message
 * @desc Stop automatic movement during message displaying?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A feature that was removed from RPG Maker 2000 and RPG Maker 2003 was the
 * Stop Event Movement event. This event prevented events from automatically
 * moving by themselves, so they don't intrude on cutscenes, catch up to the
 * player during messages, etc.
 *
 * This plugin recreates that feature in the form of a plugin command for you
 * to use with RPG Maker MV!
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use the following plugin commands to produce the following effects:
 *
 * Plugin Command
 *
 *   StopEventMovement
 *   Stops events from automatically moving by themselves. You can still move
 *   events through movement routes set by your active event.
 *
 *   AllowEventMovement
 *   Allows events to move automatically by themselves again. If you have any
 *   of the plugin parameters disabling events from moving during either events
 *   or messages, this will not bypass it.
 *
 *   StopPlayerMovement
 *   Stops player from being able to move via input. You can still move the
 *   player through movement routes set by your active event.
 *
 *   AllowPlayerMovement
 *   Allows player to move again via input.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Optimized updating performance to reduce lag on maps with many events.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_StopMapMovement');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.StopEvent = eval(String(Yanfly.Parameters['Stop During Events']));
Yanfly.Param.StopMsg = eval(String(Yanfly.Parameters['Stop During Message']));

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.stopMapEventMovement = function() {
    this._stopMapEvents = true;
};

Game_Temp.prototype.stopMapPlayerMovement = function() {
    this._stopMapPlayer = true;
};

Game_Temp.prototype.allowMapEventMovement = function() {
    this._stopMapEvents = false;
};

Game_Temp.prototype.allowMapPlayerMovement = function() {
    this._stopMapPlayer = false;
};

Game_Temp.prototype.isStopMapEventMovement = function() {
    return this._stopMapEvents;
};

Game_Temp.prototype.isStopMapPlayerMovement = function() {
    return this._stopMapPlayer;
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.Stop.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if ($gameTemp.isStopMapPlayerMovement()) return false;
    return Yanfly.Stop.Game_Player_canMove.call(this);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.Stop.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if (this.preventSelfMovement()) return;
    Yanfly.Stop.Game_Event_updateSelfMovement.call(this);
};

Game_Event.prototype.preventSelfMovement = function() {
    if (this._moveType === 0) return true;
    if ($gameTemp.isStopMapEventMovement()) return true;
    if (Yanfly.Param.StopMsg && $gameMessage.isBusy()) return true;
    if (Yanfly.Param.StopEvent && $gameMap.isEventRunQuick()) return true;
    return false;
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.isEventRunQuick = function() {
    return this._interpreter.isRunning() || this.isAnyEventStartingQuick();
};

Game_Map.prototype.isAnyEventStartingQuick = function() {
    var max = this._events.length;
    for (var i = 0; i < max; ++i) {
      var ev = this._events[i];
      if (ev && ev.isStarting()) return true;
    }
    return false;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Stop.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Stop.Game_Interpreter_pluginCommand.call(this, command, args)
  if (command === 'StopEventMovement') $gameTemp.stopMapEventMovement();
  if (command === 'AllowEventMovement') $gameTemp.allowMapEventMovement();
  if (command === 'StopPlayerMovement') $gameTemp.stopMapPlayerMovement();
  if (command === 'AllowPlayerMovement') $gameTemp.allowMapPlayerMovement();
};

//=============================================================================
// End of File
//=============================================================================

/*
     FILE ARCHIVED ON 00:12:25 Mar 21, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:19:44 Jan 24, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.datanode: 175.402 (4)
  exclusion.robots.policy: 0.285
  esindex: 0.018
  RedisCDXSource: 318.569
  captures_list: 487.471
  LoadShardBlock: 148.999 (3)
  load_resource: 109.145
  exclusion.robots: 0.306
  PetaboxLoader3.resolve: 73.713
  CDXLines.iter: 14.995 (3)
*/