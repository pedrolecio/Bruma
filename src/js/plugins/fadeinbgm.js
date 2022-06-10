//=============================================================================
// Bluebooth Plugins - BGM Fade In
// BBS_BGMFadeIn.js
//=============================================================================

//=============================================================================
/*:
* @title BGM Fade In
* @author Michael Morris (https://www.*******.com/bluebooth)
* @date Aug 28, 2016
* @filename BBS_BGMFadeIn.js
* If you enjoy my work, consider supporting me on *******!
*
* https://www.*******.com/bluebooth
*
* @plugindesc v1.02 Allows for the current playing BGM and BGS to fade in instead of starting abruptly.
* Special Thanks to Tsukihime for all the help.
* Special Thanks to 'Ramza' Michael Sweeney for all the support.
*
* ============================================================================
* Terms of Use
* ============================================================================
* - Free for use in non-commercial projects with credits
* - Contact me for commercial use
*
* @help
* ============================================================================
* Description
* ============================================================================
*
* Allows for the current playing BGM and/or BGS to fade in instead of starting abruptly.
*
* ============================================================================
* Plugin Commands
* ============================================================================
* BGM fadeInBgm n # Fades in current BGM over n seconds.
* BGM fadeInBgs n # Fades in current BGS over n seconds.
*
* ============================================================================
* Change Log
* ============================================================================
* 1.02 - Added support for fading in BGS, as requested by JoePie.
* 1.01 - Plugin finished.
*
*/
//=============================================================================

//=============================================================================
var Imported = Imported || {} ;
var BBS = BBS || {};
Imported.BGM = 1;
BBS.BGM = BBS.BGM || {};

(function() {

//=============================================================================
// Parameter Variables
//=============================================================================
var parameters = PluginManager.parameters('BBS_BGM');

//=============================================================================
// Game_Interpreter
//=============================================================================
var BBS_BGM_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
if (command === 'BGM')
{
switch (args[0]) {
case 'fadeInBgm':
SceneManager.fadeInBgm(Number(args[1]));
break;
case 'fadeInBgs':
SceneManager.fadeInBgs(Number(args[1]));
break;
};
}
else {
BBS_BGM_Game_Interpreter_pluginCommand.call(this, command, args);
}
};

// Call to built-in function.
SceneManager.fadeInBgm = function(duration) {
AudioManager.fadeInBgm(duration);
};

SceneManager.fadeInBgs = function(duration) {
AudioManager.fadeInBgs(duration);
};

})(BBS.BGM);
//=============================================================================
// End of File
//=============================================================================