/*:
 * @plugindesc Counts total playtime accurately regardless of framerate
 * @help This plugin is plug-n-play and requires no parameters to set.
 */

(function()
{   
    var startTime = 0;
    var loadedTime = 0;
    
    var _DataManager_setupNewGame = DataManager.setupNewGame;
    var _GameSystem_initialize = Game_System.prototype.initialize;
    var _GameSystem_onBeforeSave = Game_System.prototype.onBeforeSave;
    var _GameSystem_onAfterLoad = Game_System.prototype.onAfterLoad;

    DataManager.setupNewGame = function()
    {
        _DataManager_setupNewGame.call(this);
        startTime = Date.now();
    };
    
    Game_System.prototype.initialize = function() {
        _GameSystem_initialize.call(this);
        this._playtime = null;
    };

    Game_System.prototype.onBeforeSave = function()
    {
        _GameSystem_onBeforeSave.call(this);
        var saveTime = Date.now() - startTime;
        this._playtime = saveTime;
    };

    Game_System.prototype.onAfterLoad = function()
    {
        _GameSystem_onAfterLoad.call(this);
        loadedTime = this._playtime;
        startTime = Date.now();
    };

    Game_System.prototype.playtime = function()
    {
        return Math.floor((Date.now() - startTime + loadedTime) / 1000);
    };
    
})();
