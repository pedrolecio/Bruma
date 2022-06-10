/*:
 * @plugindesc CGMV Achievement Script
 * @author Casper Gaming
 * @help
 * ===========================================================================
 * For terms and conditions using this plugin in your game please visit:
 * http://caspergaming.com/dev/terms_of_use/
 * ===========================================================================
 * Become a Patron to get access to a demo as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ===========================================================================
 * Version: 1.7
 * ---------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.1
 * ---------------------------------------------------------------------------
 * Description: This plugin creates an achievement system for your game.
 * Achievements can have as many requirements/rewards as you want, and also
 * many other properties. Requirements can be automatically tracked, and
 * rewards are automatically given. Hidden achievements are also supported.
 * ---------------------------------------------------------------------------
 * Documentation:
 * This plugin supports the following plugin commands:
 * CGMVAchievements Scene - this calls the achievement scene.
 * CGMVAchievements EarnID x - this earns the achievement with id x
 * CGMVAchievements Earn x - this earns the achievement with name x
 * CGMVAchievements Update - this will look to add new achievements which have
 *                           been created after a save game. Previous
 *                           achievements will not be touched even if they
 *                           have been modified in the editor.
 * CGMVAchievements Initialize - this re-initializes achievements, resetting
 *                               all achievements. Meant for use in testing
 *                               saved games where new achievements have been
 *                               added or existing achievements have been
 *                               changed and the update function is not working
 *                               to resolve issues.
 *
 * To call the achievement scene via JavaScript command, use:
 * SceneManager.push(CGMV_Scene_Achievements);
 *
 * ADDITIONAL NOTES:
 * CGMV TOAST
 * This plugin has additional functionality when using CGMV Toast.
 * CGMV Toast allows for the display of a pop-up window on the map screen when
 * an achievement is earned. Settings for this can be found under the popup
 * settings for an achievement.
 *
 * CGMV Info
 * This plugin has additional functionality when using CGMV Info.
 * CGMV Info can be used for achievements, such as "Discover the
 * entire info"
 *
 * CGMV Professions
 * This plugin has additional functionality when using CGMV Professions.
 * CGMV Professions can be used for achievements, such as "Raise a
 * profession to max level"
 *
 * Date Format Option help:
 * 0: MM/DD/YYYY     (ex: 1/20/2001)
 * 1: DD/MM/YYYY     (ex: 20/1/2001)
 * 2: YYYY/MM/DD     (ex: 2001/1/20)
 * 3: Month DD, YYYY (ex: January 20, 2001)
 * 4: DD Month YYYY  (ex: 20 January 2001)
 * 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
 * 6: DD Mon. YYYY   (ex: 20 Jan 2001)
 * 7: MM/DD          (ex: 1/20)
 * 8: DD/MM          (ex: 20/1)
 *
 * Version History:
 * ---------------------------------------------------------------------------
 * Version 1.0 - Initial Release
 * 
 * Version 1.1:
 * - Added customization options for the text in most areas of the achievement scene.
 *
 * Version 1.2:
 * - Achievements are now 1-indexed (id same as shown in plugin manager).
 * - Fixed bug with earning achievements by their name.
 * - Added achievements for CGMV Info w/ Bestiary Plugin.
 * - Secret achievements should now display less information about themselves before earn.
 *
 * Version 1.3:
 * - Can now scroll with Arrow Keys and Mouse Wheel
 * - No longer relies on deprecated CGMV Core commands
 *
 * Version 1.4:
 * - Added support for CGMV Professions
 *
 * Version 1.5:
 * - Updated for newest version of CGMV Core
 * - Fixed a bug with achievement requirements not having correct Profession JSON in default value.
 *
 * Version 1.6:
 * - Fixed bug with secret achievements not showing the correct name.
 *
 * Version 1.7:
 * - Changed how the description displays, it now automatically makes new lines based on text width.
 *
 * @param CGMV Achievements
 *
 * @param Achievements
 * @parent CGMV Achievements
 * @type struct<Achievement>[]
 * @default []
 * @desc Achievements
 *
 * @param Requires CGMV Toast Plugin
 * 
 * @param ShowAchievementPop
 * @parent Requires CGMV Toast Plugin
 * @type boolean
 * @desc Determines whether a pop window is shown when achievement is earned.
 * Default: false
 * @default false
 *
 * @param AchievementEarnedText
 * @parent Requires CGMV Toast Plugin
 * @desc Text to show on first line of achievement pop window
 * Default: Achievement Earned
 * @default Achievement Earned
 *
 * @param AchievementEarnedColor
 * @parent Requires CGMV Toast Plugin
 * @type number
 * @min 0
 * @max 31
 * @desc Color for text on the first line of achievement pop window
 * Note: Uses windowskin colors. Range: 0-31
 * @default 3
 *
 * @param AchievementEarnedAlignment
 * @parent Requires CGMV Toast Plugin
 * @desc Alignment for pop text.
 * valid values: left, right, center
 * @default center
 *
 * @param AchievementEarnedSound
 * @parent Requires CGMV Toast Plugin
 * @type file
 * @dir audio/se/
 * @desc Default sound to play when achievement pop-up window pops
 * default: Applause1
 * @default Applause1
 *
 * @param Achievement Scene Options
 * 
 * @param AchievementWindowTitle
 * @parent Achievement Scene Options
 * @desc Text to show at the top window of the achievement scene
 * Default: Achievements
 * @default Achievements
 *
 * @param ShowSecretAchievements
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine whether secret achievements are displayed in the achievement scene
 * Default: false
 * @default false
 *
 * @param SecretText
 * @parent Achievement Scene Options
 * @desc Text to show as achievement name if secret achievement is displayed in scene
 * Default: ??????
 * @default ??????
 *
 * @param ShowCriteriaAfterCompletion
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true = still show criteria, false = stop showing criteria after completion.
 * Default: true
 * @default true
 *
 * @param DateFormat
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying date format. See CGMV Core help description for help. Valid Range: 0-8
 * Default: 0
 * @default 0
 *
 * @param ScrollSpeed
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc speed at which the achievement window display scrolls (if needed)
 * Default: 1
 * @default 1
 *
 * @param ScrollWait
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * Default: 300
 * @default 300
 *
 * @param Text Options
 * @parent Achievement Scene Options
 *
 * @param Reward Text
 * @parent Text Options
 * @desc Text to describe Rewards
 * Default: Rewards
 * @default Rewards
 *
 * @param Requirement Text
 * @parent Text Options
 * @desc Text to describe Requirements
 * Default: Requirements
 * @default Requirements
 *
 * @param Difficulty Text
 * @parent Text Options
 * @desc Text to describe Difficulty
 * Default: Difficulty
 * @default Difficulty
 *
 * @param Description Text
 * @parent Text Options
 * @desc Text to describe Description
 * Default: Description
 * @default Description
 *
 * @param Points Text
 * @parent Text Options
 * @desc Text to describe Points
 * Default: Points
 * @default Points
 *
 * @param Unearned Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement
 * window when unearned.
 * @default Keep playing to earn this achievement
 *
 * @param Earned Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement
 * window when earned.
 * @default Achievement earned on
 *
 * @param Earned Count Text
 * @parent Text Options
 * @desc Text to appear when counting earned achievements
 * @default Earned
 *
 * @param Currency Unit Space
 * @parent Text Options
 * @type boolean
 * @desc Add a space between the Currency Value and Currency Unit?
 * @default false
 * 
 * @param Gauge Colors
 * @parent Achievement Scene Options
 * 
 * @param CurrencyGaugeColor1
 * @type number
 * @min 0
 * @max 31
 * @parent Gauge Colors
 * @desc Color 1 for currency gauge
 * Default: 6
 * @default 6
 *
 * @param CurrencyGaugeColor2
 * @type number
 * @min 0
 * @max 31
 * @parent Gauge Colors
 * @desc Color 2 for currency gauge
 * Default: 17
 * @default 17
 *
 * @param GenericGaugeColor1
 * @type number
 * @min 0
 * @max 31
 * @parent Gauge Colors
 * @desc Color 1 for miscellaneous gauges
 * Default: 28
 * @default 28
 *
 * @param GenericGaugeColor2
 * @type number
 * @min 0
 * @max 31
 * @parent Gauge Colors
 * @desc Color 2 for miscellaneous gauges
 * Default: 29
 * @default 29
 *
 * @param ItemGaugeColor1
 * @type number
 * @min 0
 * @max 31
 * @parent Gauge Colors
 * @desc Color 1 for item gauges
 * Default: 22
 * @default 22
 *
 * @param ItemGaugeColor2
 * @type number
 * @min 0
 * @max 31
 * @parent Gauge Colors
 * @desc Color 2 for item gauges
 * Default: 23
 * @default 23
 *
 * @param SwitchVarGaugeColor1
 * @type number
 * @min 0
 * @max 31
 * @parent Gauge Colors
 * @desc Color 1 for switch and variable gauges
 * Default: 20
 * @default 20
 *
 * @param SwitchVarGaugeColor2
 * @type number
 * @min 0
 * @max 31
 * @parent Gauge Colors
 * @desc Color 2 for switch and variable gauges
 * Default: 21
 * @default 21
*/
/*~struct~Item:
 * @param Item
 * @type item
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
 */
/*~struct~Weapon:
 * @param Weapon
 * @type weapon
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
 */
/*~struct~Armor:
 * @param Armor
 * @type armor
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
 */
/*~struct~Switch:
 * @param Switch
 * @type switch
 * 
 * @param On/Off
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 *
 * @param Description
 * @type text
 * @default
 * @desc description for this switch
 */
/*~struct~Variable:
 * @param Variable
 * @type variable
 * 
 * @param Operator
 * @type text
 * @desc valid operators for criteria: < <= > >= =
 * valid operators for reward: + - / * % =
 * @default >
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Criteria: the value to check the variable against
 * Reward: the value to award to the variable
 *
 * @param Description
 * @type text
 * @default
 * @desc description for this variable
 */
/*~struct~Requirement:
 * @param Currency
 * @type number
 * @default 0
 * @desc Amount of currency needed to earn the achievement
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items needed to earn the achievement
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons needed to earn the achievement
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors needed to earn the achievement
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches needed to earn the achievement
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables needed to earn the achievement
 * @default []
 *
 * @param Saves
 * @type number
 * @min 0
 * @default 0
 * @desc Save count needed to earn the achievement
 *
 * @param Playtime
 * @type number
 * @min 0
 * @default 0
 * @desc Playtime needed to earn the achievement
 *
 * @param Steps
 * @type number
 * @min 0
 * @default 0
 * @desc Step count needed to earn the achievement
 *
 * @param Battles
 * @type number
 * @min 0
 * @default 0
 * @desc Battle count needed to earn the achievement
 *
 * @param Wins
 * @type number
 * @min 0
 * @default 0
 * @desc Win count needed to earn the achievement
 *
 * @param Escapes
 * @type number
 * @min 0
 * @default 0
 * @desc Escape count needed to earn the achievement
 *
 * @param Achievements Earned
 * @type number
 * @min 0
 * @default 0
 * @desc Earned achievements needed to earn the achievement
 *
 * @param Achievement Points
 * @type number
 * @min 0
 * @default 0
 * @desc Achievement points needed to earn the achievement
 *
 * @param Info Total
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Info discovered % needed to earn the achievement
 *
 * @param Info Bestiary
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Info bestiary discovered % needed to earn the achievement
 *
 * @param Info Items
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Info items discovered % needed to earn the achievement
 *
 * @param Info Armors
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Info armors discovered % needed to earn the achievement
 *
 * @param Info Weapons
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Info weapons discovered % needed to earn the achievement
 *
 * @param Info Skills
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Info skills discovered % needed to earn the achievement
 *
 * @param Info States
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Info states discovered % needed to earn the achievement
 *
 * @param Professions
 * @type struct<profession>[]
 * @default []
 * @desc profession requirements
 */
 /*~struct~Reward:
 * @param Currency
 * @type number
 * @default 0
 * @desc Amount of currency to award upon achievement earn
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items to award upon achievement earn
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons to award upon achievement earn
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors to award upon achievement earn
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches to manipulate upon achievement earn
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables to manipulate upon achievement earn
 * @default []
 */
/*~struct~Popup:
 * @param Display?
 * @type boolean
 * @default true
 * @desc Display a pop up window on the map on achievement earn?
 * No popup will display if not using CGMV Toast Manager
 *
 * @param Sound
 * @type file
 * @dir audio/se/
 * @desc Sound to play on achievement earn
 * 
 * @param Image
 * @type file
 * @dir img/pictures
 * @desc Image to show on achievement earn
 * Leave blank to show a text window instead
 * 
 * @param Color
 * @type number
 * @min 0
 * @max 31
 * @default 0
 * @desc Color to show achievement name with in text window
 * upon earn. No effect if showing image instead.
 */
 /*~struct~Achievement:
 * @param Name
 * @type text
 * @desc Name of the achievement
 * 
 * @param Points
 * @type number
 * @min 0
 * @default 10
 * @desc Amount of points the achievement is worth
 *
 * @param Pre Description
 * @type note
 * @default ""
 * @desc Achievement description before it is earned
 *
 * @param Post Description
 * @type note
 * @default ""
 * @desc Achievement description after it is earned.
 * Leave blank to always use Pre Description
 *
 * @param Difficulty
 * @type text
 * @default Easy
 * @desc Achievement difficulty
 *
 * @param Secret
 * @type boolean
 * @default false
 * @desc Is the achievement a secret achievement?
 *
 * @param Automatic
 * @type boolean
 * @default false
 * @desc Automatically track the achievement progress?
 *
 * @param Rewards
 * @type struct<Reward>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]"}
 * @desc Achievement Rewards
 *
 * @param Requirements
 * @type struct<Requirement>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Saves":"0","Playtime":"0","Steps":"0","Battles":"0","Wins":"0","Escapes":"0","Achievements Earned":"0","Achievement Points":"0","Info Total":"0","Info Bestiary":"0","Info Items":"0","Info Armors":"0","Info Weapons":"0","Info Skills":"0","Info States":"0","Professions":"[]"}
 * @desc Achievement Requirements
 *
 * @param Popup
 * @type struct<Popup>
 * @default {"Display?":"true","Sound":"Applause1","Image":"","Color":"0"}
 * @desc Settings for the pop up window if using
 * CGMV Toast Manager
 */
 /*~struct~Profession:
 * @param Name
 * @type text
 * @desc The name of the profession to track
 * 
 * @param Level Requirement
 * @type number
 * @min 1
 * @default 1
 * @desc The level requirement for the profession.
 */
var Imported = Imported || {};
Imported.CGMV_Achievements = true;
var CGMV = CGMV || {};
CGMV.Achievements = CGMV.Achievements || {};
CGMV.Achievements.version = 1.7;
CGMV.Achievements.parameters = PluginManager.parameters('CGMV_Achievements');
CGMV.Achievements.FileName = CGMV.Achievements.parameters["File"] || "Achievements.txt";
CGMV.Achievements.FolderName = CGMV.Achievements.parameters["Folder"] || "Data";
CGMV.Achievements.ShowAchievementPop = (CGMV.Achievements.parameters["ShowAchievementPop"] === "true") ? true : false;
CGMV.Achievements.AchievementEarnedText = CGMV.Achievements.parameters["AchievementEarnedText"] || "Achievement Earned";
CGMV.Achievements.AchievementEarnedColor = Number(CGMV.Achievements.parameters["AchievementEarnedColor"]) || 0;
CGMV.Achievements.AchievementEarnedAlignment = CGMV.Achievements.parameters["AchievementEarnedAlignment"] || "center";
CGMV.Achievements.AchievementEarnedSound = CGMV.Achievements.parameters["AchievementEarnedSound"] || "Applause1";
CGMV.Achievements.AchievementWindowTitle = CGMV.Achievements.parameters["AchievementWindowTitle"] || "Achievements";
CGMV.Achievements.ShowSecretAchievements = (CGMV.Achievements.parameters["ShowSecretAchievements"] === "true") ? true : false;
CGMV.Achievements.SecretText = CGMV.Achievements.parameters["SecretText"] || "??????";
CGMV.Achievements.ShowCriteriaAfterCompletion = (CGMV.Achievements.parameters["ShowCriteriaAfterCompletion"] === "true") ? true : false;
CGMV.Achievements.DateFormat = Number(CGMV.Achievements.parameters["DateFormat"]) || 0;
CGMV.Achievements.CurrencyGaugeColor1 = Number(CGMV.Achievements.parameters["CurrencyGaugeColor1"]) || 6;
CGMV.Achievements.CurrencyGaugeColor2 = Number(CGMV.Achievements.parameters["CurrencyGaugeColor2"]) || 17;
CGMV.Achievements.GenericGaugeColor1 = Number(CGMV.Achievements.parameters["GenericGaugeColor1"]) || 28;
CGMV.Achievements.GenericGaugeColor2 = Number(CGMV.Achievements.parameters["GenericGaugeColor2"]) || 29;
CGMV.Achievements.ItemGaugeColor1 = Number(CGMV.Achievements.parameters["ItemGaugeColor1"]) || 22;
CGMV.Achievements.ItemGaugeColor2 = Number(CGMV.Achievements.parameters["ItemGaugeColor2"]) || 23;
CGMV.Achievements.SwitchVarGaugeColor1 = Number(CGMV.Achievements.parameters["SwitchVarGaugeColor1"]) || 20;
CGMV.Achievements.SwitchVarGaugeColor2 = Number(CGMV.Achievements.parameters["SwitchVarGaugeColor2"]) || 21;
CGMV.Achievements.ScrollSpeed = Number(CGMV.Achievements.parameters["ScrollSpeed"]) || 1;
CGMV.Achievements.ScrollWait = Number(CGMV.Achievements.parameters["ScrollWait"]) || 300;
CGMV.Achievements.CurrencyUnitSpace = (CGMV.Achievements.parameters["Currency Unit Space"] === "true") ? true : false;
CGMV.Achievements.RewardText = CGMV.Achievements.parameters["Reward Text"] || "Rewards";
CGMV.Achievements.RequirementText = CGMV.Achievements.parameters["Requirement Text"] || "Requirements";
CGMV.Achievements.DifficultyText = CGMV.Achievements.parameters["Difficulty Text"] || "Difficulty";
CGMV.Achievements.DescriptionText = CGMV.Achievements.parameters["Description Text"] || "Description";
CGMV.Achievements.PointsText = CGMV.Achievements.parameters["Points Text"] || "Points";
CGMV.Achievements.UnearnedText = CGMV.Achievements.parameters["Unearned Text"] || "Keep playing to earn this achievement";
CGMV.Achievements.EarnedText = CGMV.Achievements.parameters["Earned Text"] || "Achievement earned on";
CGMV.Achievements.EarnedCountText = CGMV.Achievements.parameters["Earned Count Text"] || "Earned";
CGMV.Achievements.Achievements = JSON.parse(CGMV.Achievements.parameters["Achievements"]);
//=============================================================================
// CGMV_Achievement
//-----------------------------------------------------------------------------
// Store and manage achievement data.
//=============================================================================
function CGMV_Achievement() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Achievement
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.initialize = function(achievementData, id) {
	this._id = id;
	this._earned = false;
	this._earndate = "";
	achievementData = JSON.parse(achievementData);
	this._name = achievementData["Name"];
	this._points = Number(achievementData["Points"]);
	this._difficulty = achievementData["Difficulty"];
	this._predesc = JSON.parse(achievementData["Pre Description"].replace(/\\n/g, " \\\\n "));
	this._postdesc = JSON.parse(achievementData["Post Description"].replace(/\\n/g, " \\\\n "));
	if(this._postdesc === "") {
		this._postdesc = this._predesc;
	}
	this._automatic = (achievementData["Automatic"] === "true") ? true : false;
	this._secret = (achievementData["Secret"] === "true") ? true : false;
	var popupData = JSON.parse(achievementData["Popup"]);
	this._popup = {"display": (popupData["Display?"] === "true") ? true : false, "sound": popupData["Sound"],
					"image": popupData["Image"], "color": Number(popupData["Color"])};
	var rewards = JSON.parse(achievementData["Rewards"]);
	this._rewards = {};
	this._rewards["items"] = [];
	this._rewards["switches"] = [];
	this._rewards["variables"] = [];
	this._rewards["currency"] = Number(rewards["Currency"]);
	this.initializeItems(this._rewards.items, rewards["Items"], "Item", "Amount", "item");
	this.initializeItems(this._rewards.items, rewards["Weapons"], "Weapon", "Amount", "weapon");
	this.initializeItems(this._rewards.items, rewards["Armors"], "Armor", "Amount", "armor");
	this.initializeSwitches(this._rewards.switches, rewards["Switches"], "Switch", "On/Off", "Description");
	this.initializeVariables(this._rewards.variables, rewards["Variables"], "Variable", "Amount", "Description", "Operator");
	var requirements = JSON.parse(achievementData["Requirements"]);
	this._requirements = {};
	this._requirements["items"] = [];
	this._requirements["switches"] = [];
	this._requirements["variables"] = [];
	this._requirements["currency"] = Number(requirements["Currency"]);
	this.initializeItems(this._requirements.items, requirements["Items"], "Item", "Amount", "item");
	this.initializeItems(this._requirements.items, requirements["Weapons"], "Weapon", "Amount", "weapon");
	this.initializeItems(this._requirements.items, requirements["Armors"], "Armor", "Amount", "armor");
	this.initializeSwitches(this._requirements.switches, requirements["Switches"], "Switch", "On/Off", "Description");
	this.initializeVariables(this._requirements.variables, requirements["Variables"], "Variable", "Amount", "Description", "Operator");
	this._requirements["saves"] = Number(requirements["Saves"]);
	this._requirements["steps"] = Number(requirements["Steps"]);
	this._requirements["battles"] = Number(requirements["Battles"]);
	this._requirements["wins"] = Number(requirements["Wins"]);
	this._requirements["escapes"] = Number(requirements["Escapes"]);
	this._requirements["achievetotal"] = Number(requirements["Achievements Earned"]);
	this._requirements["achievepts"] = Number(requirements["Achievement Points"]);
	this._requirements["playtime"] = Math.floor(Number(requirements["Playtime"]) / 60);
	this._requirements["infototal"] = Number(requirements["Info Total"]);
	this._requirements["infobestiary"] = Number(requirements["Info Bestiary"]);
	this._requirements["infoitems"] = Number(requirements["Info Items"]);
	this._requirements["infoweapons"] = Number(requirements["Info Weapons"]);
	this._requirements["infoarmors"] = Number(requirements["Info Armors"]);
	this._requirements["infoskills"] = Number(requirements["Info Skills"]);
	this._requirements["infostates"] = Number(requirements["Info States"]);
	this._requirements["professions"] = this.initializeProfessionRequirements(requirements["Professions"]);
	this.setRewardFlag(this._rewards);
	this.setRequirementFlag(this._requirements);
};
//-----------------------------------------------------------------------------
// Initialize Achievement items (requirement or reward)
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.initializeItems = function(itemArray, JSONtext, idText, amtText, type) {
	if(JSONtext !== "[]") {
		var parsedItems = JSON.parse(JSONtext);
		for(var i = 0; i < parsedItems.length; i++) {
			var obj = JSON.parse(parsedItems[i]);
			var id = Number(obj[idText]);
			var amt = Number(obj[amtText]);
			itemArray.push({"type": type, "id": id, "amt": amt});
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.initializeSwitches = function(switchArray, JSONtext, idText, valueText, descText) {
	if(JSONtext !== "[]") {
		var parsedItems = JSON.parse(JSONtext);
		for(var i = 0; i < parsedItems.length; i++) {
			var obj = JSON.parse(parsedItems[i]);
			var id = Number(obj[idText]);
			var value = (obj[valueText] === "true") ? true : false;
			var description = obj[descText];
			switchArray.push({"value": value, "id": id, "description": description});
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.initializeVariables = function(variableArray, JSONtext, idText, valueText, descText, opText) {
	if(JSONtext !== "[]") {
		var parsedItems = JSON.parse(JSONtext);
		for(var i = 0; i < parsedItems.length; i++) {
			var obj = JSON.parse(parsedItems[i]);
			var id = Number(obj[idText]);
			var value = Number(obj[valueText]);
			var operator = obj[opText];
			var description = obj[descText];
			variableArray.push({"value": value, "id": id, "description": description, "operator": operator});
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement profession requirements
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.initializeProfessionRequirements = function(reqs) {
	var required = [];
	if(Imported.CGMV_Professions) {
		reqs = JSON.parse(reqs);
		for(var i = 0; i < reqs.length; i++) {
			var reqTemp = JSON.parse(reqs[i]);
			var req = {};
			req.name = reqTemp.Name;
			req.level = Number(reqTemp["Level Requirement"]);
			required.push(req);
		}
	}
	return required;
};
//-----------------------------------------------------------------------------
// Set flag if achievement has rewards
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.setRewardFlag = function(rewards) {
	this._hasRewards = (rewards.currency > 0 || rewards.items.length > 0 || 
						rewards.switches.length > 0 || rewards.variables.length > 0);
};
//-----------------------------------------------------------------------------
// Set flag if achievement has requirements
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.setRequirementFlag = function(req) {
	this._hasRequirements = (req.currency > 0 || req.items.length > 0 || req.switches.length > 0 ||
							req.variables.length > 0 || req.saves > 0 || req.steps > 0 ||
							req.playtime > 0 || req.wins > 0 || req.battles > 0 || req.escapes > 0 ||
							req.achievepts > 0 || req.achievetotal > 0 || req.infototal ||
							req.infoarmors || req.infobestiary || req.infoitems ||
							req.infoweapons || req.infoskills || req.infostates ||
							req.professions.length > 0);
};
//-----------------------------------------------------------------------------
// Get achievement name
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.getName = function() {
	return this._name;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.isAutomatic = function() {
	return this._automatic;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.isSecret = function() {
	return this._secret;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.isEarned = function() {
	return this._earned;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.hasRewards = function() {
	return this._hasRewards;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Achievement.prototype.hasRequirements = function() {
	return this._hasRequirements;
};
//=============================================================================
// CGMV
//-----------------------------------------------------------------------------
// Manage achievement data. Stored as an array of achievement objects.
// alias functions: createPluginData
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Call Initialize for achievements
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_createPluginData = CGMV_Core.prototype.createPluginData;
CGMV_Core.prototype.createPluginData = function() {
	alias_CGMV_Achievements_createPluginData.call(this);
	this.initializeAchievements(false);
};
//-----------------------------------------------------------------------------
// Initializes achievements
// If new achievements have been added, these will be added onto the end of the
// existing array.
//-----------------------------------------------------------------------------
CGMV_Core.prototype.initializeAchievements = function(reinitialize) {
	if(!this._achievements || reinitialize) {
		this.setupAchievementVariables();
	}
	var id = this._achievements.length + 1;
	for(var i = 0; i < CGMV.Achievements.Achievements.length; i++) {
		var achievement = new CGMV_Achievement(CGMV.Achievements.Achievements[i], id);
		if(!this.getAchievementByName(achievement.getName())) {
			this.commitAchievement(achievement);
			id++;
		}
	}
};
//-----------------------------------------------------------------------------
// Set up variables for achievements
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupAchievementVariables = function() {
	this._achievements = [];
	this.setupAchievementCriteriaTypeArrays();
	this._usingAchievementPoints = false;
	this._achievetotal = 0;
	this._achievepts = 0;
};
//-----------------------------------------------------------------------------
// Commit the achievement to the achievement array
// Also store achievement criteria informations
//-----------------------------------------------------------------------------
CGMV_Core.prototype.commitAchievement = function(achievement) {
	this._achievements.push(achievement);
	if(achievement._points > 0) {
		this._usingAchievementPoints = true;
	}
	if(achievement.hasRequirements() && achievement.isAutomatic()) {
		var req = achievement._requirements
		if(req.currency > 0) {
			this._achievementTypes.currency.push(achievement._id);
		}
		if(req.steps > 0) {
			this._achievementTypes.steps.push(achievement._id);
		}
		if(req.saves > 0) {
			this._achievementTypes.saves.push(achievement._id);
		}
		if(req.playtime > 0) {
			this._achievementTypes.playtime.push(achievement._id);
		}
		if(req.battles > 0) {
			this._achievementTypes.battles.push(achievement._id);
		}
		if(req.escapes > 0) {
			this._achievementTypes.escapes.push(achievement._id);
		}
		if(req.wins > 0) {
			this._achievementTypes.wins.push(achievement._id);
		}
		if(req.achievepts > 0) {
			this._achievementTypes.achievepts.push(achievement._id);
		}
		if(req.achievetotal > 0) {
			this._achievementTypes.achievetotal.push(achievement._id);
		}
		if(req.infototal > 0) {
			this._achievementTypes.info.push(achievement._id);
		}
		if(req.infobestiary > 0) {
			this._achievementTypes.info.push(achievement._id);
		}
		if(req.infoarmors > 0) {
			this._achievementTypes.info.push(achievement._id);
		}
		if(req.infoitems > 0) {
			this._achievementTypes.info.push(achievement._id);
		}
		if(req.infoweapons > 0) {
			this._achievementTypes.info.push(achievement._id);
		}
		if(req.infoskills > 0) {
			this._achievementTypes.info.push(achievement._id);
		}
		if(req.infostates > 0) {
			this._achievementTypes.info.push(achievement._id);
		}
		if(req.items.length > 0) {
			this._achievementTypes.items.push(achievement._id);
		}
		if(req.switches.length > 0) {
			this._achievementTypes.switches.push(achievement._id);
		}
		if(req.variables.length > 0) {
			this._achievementTypes.variables.push(achievement._id);
		}
		if(req.professions.length > 0) {
			this._achievementTypes.professions.push(achievement._id);
		}
	}
};
//-----------------------------------------------------------------------------
// Setup Achievement Type Arrays (for faster checking criteria)
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupAchievementCriteriaTypeArrays = function() {
	this._achievementTypes = {}; // each property stores IDs of achievements with those criteria
	this._achievementTypes.currency = [];
	this._achievementTypes.steps = [];
	this._achievementTypes.battles = [];
	this._achievementTypes.escapes = [];
	this._achievementTypes.wins = [];
	this._achievementTypes.playtime = [];
	this._achievementTypes.saves = [];
	this._achievementTypes.achievetotal = [];
	this._achievementTypes.achievepts = [];
	this._achievementTypes.items = [];
	this._achievementTypes.switches = [];
	this._achievementTypes.variables = [];
	this._achievementTypes.info = [];
	this._achievementTypes.professions = [];
};
//-----------------------------------------------------------------------------
// Earn achievement
//-----------------------------------------------------------------------------
CGMV_Core.prototype.earnAchievement = function(id) {
	var achievement = this.getAchievementByID(id);
	if(achievement.isEarned()) {
		return;
	}
	achievement._earned = true;
	this._achievetotal++;
	this._achievepts += achievement._points;
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	achievement._earndate = $cgmvTemp.createDateText(day, month, year, CGMV.Achievements.DateFormat, "/");
	if(achievement.hasRewards()) {
		this.giveAchievementRewards(achievement._rewards);
	}
	if(Imported.CGMV_Toast && CGMV.Achievements.ShowAchievementPop) {
		this.setupAchievementToast(achievement);
	}
	this.checkAchievementAchieveptsCriteria();
	this.checkAchievementAchievetotalCriteria();
};
//-----------------------------------------------------------------------------
// Give achievement rewards
//-----------------------------------------------------------------------------
CGMV_Core.prototype.giveAchievementRewards = function(reward) {
	if(reward.currency > 0) {
		$gameParty.gainGold(reward.currency);
	}
	if(reward.items.length > 0) {
		reward.items.forEach(function(item) {
			if(item.type === "item") {
				$gameParty.gainItem($dataItems[item.id], item.amt);
			}
			else if(item.type === "weapon") {
				$gameParty.gainItem($dataWeapons[item.id], item.amt);
			}
			else if(item.type === "armor") {
				$gameParty.gainItem($dataArmors[item.id], item.amt);
			}
		});
	}
	if(reward.switches.length > 0) {
		reward.switches.forEach(function(switchobj) {
			$gameSwitches.setValue(switchobj.id, switchobj.value);
		});
	}
	if(reward.variables.length > 0) {
		var oldValue;
		reward.variables.forEach(function(variableobj) {
			try {
				oldValue = $gameVariables.value(variableobj.id);
				if(variableobj.operator == '=') {
					$gameVariables.setValue(variableobj.id, variableobj.value);
				}
				else if(variableobj.operator == '+') {
					$gameVariables.setValue(variableobj.id, oldValue + variableobj.value);
				}
				else if(variableobj.operator == '-') {
					$gameVariables.setValue(variableobj.id, oldValue - variableobj.value);
				}
				else if(variableobj.operator == '*') {
					$gameVariables.setValue(variableobj.id, oldValue * variableobj.value);
				}
				else if(variableobj.operator == '/') {
					$gameVariables.setValue(variableobj.id, oldValue / variableobj.value);
				}
				else if(variableobj.operator == '%') {
					$gameVariables.setValue(variableobj.id, oldValue % variableobj.value);
				}
			} catch (e) {
				$gameVariables.setValue(variableobj.id, 0);
			}
		});
	}
};
//-----------------------------------------------------------------------------
// Sets up achievement toast window
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupAchievementToast = function(achievement) {
	var toastobj = {};
	var pop = achievement._popup;
	var seName = (pop.sound === "") ? CGMV.Achievements.AchievementEarnedSound : pop.sound;
	toastobj.SE = {name: seName, pan: 100, pitch: 100, volume: 100};
	if(pop.image !== "") {
		toastobj.CGMVPicToast = true;
		toastobj.picture = pop.image;
	}
	else {
		toastobj.CGMVToast = true;
		toastobj.align = CGMV.Achievements.AchievementEarnedAlignment;
		toastobj.line1 = CGMV.Achievements.AchievementEarnedText;
		toastobj.line1color = CGMV.Achievements.AchievementEarnedColor;
		toastobj.line2 = achievement._name;
		toastobj.line2color = pop.color;
	}
	this.createNewToast(toastobj);
};
//-----------------------------------------------------------------------------
// Check Achievement Criteria and Award if achievement is earned
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementForEarn = function(achievement) {
	if(!this.needCriteriaCheck(achievement)) {
		return;
	}
	var criteria = achievement._requirements;
	if(criteria.currency > 0 && $gameParty.gold() < criteria.currency) return;
	if(criteria.steps > 0 && $gameParty.steps() < criteria.steps) return;
	if(criteria.saves > 0 && $gameSystem.saveCount() < criteria.saves) return;
	if(criteria.battles > 0 && $gameSystem.battleCount() < criteria.battles) return;
	if(criteria.wins > 0 && $gameSystem.winCount() < criteria.wins) return;
	if(criteria.escapes > 0 && $gameSystem.escapeCount() < criteria.escapes) return;
	if(criteria.achievepts > 0 && this._achievepts < criteria.achievepts) return;
	if(criteria.achievetotal > 0 && this._achievetotal < criteria.achievetotal) return;
	if(criteria.playtime > 0 && $gameSystem.playtime() < criteria.playtime) return;
	if(criteria.infototal > 0 && this.getInfoTotalPercent() < criteria.infototal) return;
	if(criteria.infobestiary > 0 && this.getInfoBestiaryPercent() < criteria.infobestiary) return;
	if(criteria.infoitems > 0 && this.getInfoItemsPercent() < criteria.infoitems) return;
	if(criteria.infoarmors > 0 && this.getInfoArmorsPercent() < criteria.infoarmors) return;
	if(criteria.infoweapons > 0 && this.getInfoWeaponsPercent() < criteria.infoweapons) return;
	if(criteria.infoskills > 0 && this.getInfoSkillsPercent() < criteria.infoskills) return;
	if(criteria.infostates > 0 && this.getInfoStatesPercent() < criteria.infostates) return;
	for(var i = 0; i < criteria.professions.length; i++) {
		var profession = $cgmv.getProfession(criteria.professions[i].name);
		if(profession._level < criteria.professions[i].level) return;
	}
	for(var i = 0; i < criteria.items.length; i++) {
		var item = criteria.items[i];
		if(item.type === "item") {
			if($gameParty.numItems($dataItems[item.id]) < item.amt) return;
		}
		else if(item.type === "weapon") {
			if($gameParty.numItems($dataWeapons[item.id]) < item.amt) return;
		}
		else if(item.type === "armor") {
			if($gameParty.numItems($dataArmors[item.id]) < item.amt) return;
		}
	}
	for(var i = 0; i < criteria.switches.length; i++) {
		var switchObj = criteria.switches[i];
		if(switchObj.value != $gameSwitches.value(switchObj.id)) return;
	}
	for(var i = 0; i < criteria.variables.length; i++) {
		var variableObj = criteria.variables[i];
		var gameVariable = $gameVariables.value(variableObj.id);
		if(variableObj.operator === ">") {
			if(gameVariable <= variableObj.value) return;
		}
		else if(variableObj.operator === ">=") {
			if(gameVariable < variableObj.value) return;
		}
		else if(variableObj.operator === "=") {
			if(variableObj.value != gameVariable) return;
		}
		else if(variableObj.operator === "<=") {
			if(gameVariable > variableObj.value) return;
		}
		else if(variableObj.operator === "<") {
			if(gameVariable >= variableObj.value) return;
		}
	}
	this.earnAchievement(achievement._id);
};
//-----------------------------------------------------------------------------
// Determine if need to check for criteria?
//-----------------------------------------------------------------------------
CGMV_Core.prototype.needCriteriaCheck = function(achievement) {
	if(achievement._earned) {
		return false;
	}
	return achievement.hasRequirements();
};
//-----------------------------------------------------------------------------
// Check Achievement Currency Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementCurrencyCriteria = function() {
	this._achievementTypes.currency.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($gameParty.gold() >= achievement._requirements.currency) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Steps Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementStepsCriteria = function() {
	this._achievementTypes.steps.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($gameParty.steps() >= achievement._requirements.steps) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Saves Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementSavesCriteria = function() {
	this._achievementTypes.saves.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($gameSystem.saveCount() >= achievement._requirements.saves) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Battles Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementBattlesCriteria = function() {
	this._achievementTypes.battles.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($gameSystem.battleCount() >= achievement._requirements.battles) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Wins Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementWinsCriteria = function() {
	this._achievementTypes.wins.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($gameSystem.winCount() >= achievement._requirements.wins) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Escapes Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementEscapesCriteria = function() {
	this._achievementTypes.escapes.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($gameSystem.escapeCount() >= achievement._requirements.escapes) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Playtime Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementPlaytimeCriteria = function() {
	this._achievementTypes.playtime.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($gameSystem.playtime() >= achievement._requirements.playtime) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Achievepts Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementAchieveptsCriteria = function() {
	this._achievementTypes.achievepts.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($cgmv.countEarnedAchievementPoints() >= achievement._requirements.achievepts) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Achievetotal Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementAchievetotalCriteria = function() {
	this._achievementTypes.achievetotal.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if($cgmv.countEarnedAchievements() >=  achievement._requirements.achievetotal) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Info Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementInfoCriteria = function() {
	this._achievementTypes.info.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if(achievement._requirements.infototal > 0 && $cgmv.getInfoTotalPercent() >= achievement._requirements.infototal) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.infobestiary > 0 && $cgmv.getInfoBestiaryPercent() >= achievement._requirements.infobestiary) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.infoitems > 0 && $cgmv.getInfoItemsPercent() >= achievement._requirements.infoitems) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.infoarmors > 0 && $cgmv.getInfoArmorsPercent() >= achievement._requirements.infoarmors) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.infoweapons > 0 && $cgmv.getInfoWeaponsPercent() >= achievement._requirements.infoweapons) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.infoskills > 0 && $cgmv.getInfoSkillsPercent() >= achievement._requirements.infoskills) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.infostates > 0 && $cgmv.getInfoStatesPercent() >= achievement._requirements.infostates) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Professions Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementProfessionCriteria = function() {
	this._achievementTypes.professions.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		var needCheck = true;
		for(var i = 0; i < achievement._requirements.professions.length; i++) {
			var profession = $cgmv.getProfession(achievement._requirements.professions[i].name);
			if(achievement._requirements.professions[i].level > profession._level) {
				needCheck = false;
			}
		}
		if(needCheck) this.checkAchievementForEarn(achievement);
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Items Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementItemsCriteria = function() {
	this._achievementTypes.items.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		var criteria = achievement._requirements;
		for(var i = 0; i < criteria.items.length; i++) {
			var item = criteria.items[i];
			if(item.type === "item") {
				if($gameParty.numItems($dataItems[item.id]) >= item.amt) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(item.type === "weapon") {
				if($gameParty.numItems($dataWeapons[item.id]) >= item.amt) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(item.type === "armor") {
				if($gameParty.numItems($dataArmors[item.id]) >= item.amt) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Switches Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementSwitchesCriteria = function() {
	this._achievementTypes.switches.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		var criteria = achievement._requirements;
		for(var i = 0; i < criteria.switches.length; i++) {
			var switchObj = criteria.switches[i];
			if(switchObj.value == $gameSwitches.value(switchObj.id)) {
				this.checkAchievementForEarn(achievement);
				return;
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Variables Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkAchievementVariablesCriteria = function() {
	this._achievementTypes.variables.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		var criteria = achievement._requirements;
		for(var i = 0; i < criteria.variables.length; i++) {
			var variableObj = criteria.variables[i];
			var gameVariable = $gameVariables.value(variableObj.id);
			if(variableObj.operator === ">") {
				if(gameVariable > variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === ">=") {
				if(gameVariable >= variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "=") {
				if(gameVariable == variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "<=") {
				if(gameVariable <= variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "<") {
				if(gameVariable < variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Get achievement array
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getAchievements = function() {
	return this._achievements;
};
//-----------------------------------------------------------------------------
// Get achievement by ID, returns false if no achievement found
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getAchievementByID = function(id) {
	for(var i = 0; i < this._achievements.length; i++) {
		if(this._achievements[i]._id === id) {
			return this._achievements[i];
		}
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get achievement by ID, returns false if no achievement found
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getAchievementByName = function(achname) {
	for(var i = 0; i < this._achievements.length; i++) {
		if(this._achievements[i].getName() === achname) {
			return this._achievements[i];
		}
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get achievement earned count
//-----------------------------------------------------------------------------
CGMV_Core.prototype.countEarnedAchievements = function() {
	return this._achievetotal;
};
//-----------------------------------------------------------------------------
// Get achievement point count
//-----------------------------------------------------------------------------
CGMV_Core.prototype.countEarnedAchievementPoints = function() {
	return this._achievepts;
};
//-----------------------------------------------------------------------------
// Achievements have points?
//-----------------------------------------------------------------------------
CGMV_Core.prototype.usingAchievementPoints = function() {
	return this._usingAchievementPoints;
};
//-----------------------------------------------------------------------------
// Alias. Handles achievement plugin commands
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_pluginCommand = CGMV_Core.prototype.pluginCommand;
CGMV_Core.prototype.pluginCommand = function(command, args) {
	alias_CGMV_Achievements_pluginCommand.call(this, command, args);
	if(command == "CGMVAchievements") {
		if(args[0] == "Scene") {
			SceneManager.push(CGMV_Scene_Achievements);
		}
		else if(args[0] == "EarnID") {
			var achievement = this.getAchievementByID(Number(args[1]));
			if(achievement) {
				this.earnAchievement(achievement._id);
			}
		}
		else if(args[0] == "Earn") {
			var nameString = "";
			for(var i = 1; i < args.length; i++) {
				if(i != 1) nameString = nameString + " ";
				nameString = nameString + args[i];
			}
			var achievement = this.getAchievementByName(nameString);
			if(achievement) {
				this.earnAchievement(achievement._id);
			}
		}
		else if(args[0] == "Initialize") {
			this.initializeAchievements(true);
		}
		else if(args[0] == "Update") {
			this.initializeAchievements(false);
		}
	}
};
//=============================================================================
// CGMV_Scene_Achievements
//-----------------------------------------------------------------------------
// Scene that controls achievement display windows.
// Call with SceneManager.push(CGMV_Scene_Achievements);
//=============================================================================
function CGMV_Scene_Achievements() {
    this.initialize.apply(this, arguments);
}
CGMV_Scene_Achievements.prototype = Object.create(Scene_MenuBase.prototype);
CGMV_Scene_Achievements.prototype.constructor = CGMV_Scene_Achievements;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Scene_Achievements.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create achievement windows
//-----------------------------------------------------------------------------
CGMV_Scene_Achievements.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createTitleWindow();
	this.createListWindow();
	this.createTotalsWindow();
	this.createAchievementWindow();
};
//-----------------------------------------------------------------------------
// Create achievement title window
//-----------------------------------------------------------------------------
CGMV_Scene_Achievements.prototype.createTitleWindow = function() {
    this._titleWindow = new CGMV_Window_Title(0, 0, CGMV.Achievements.AchievementWindowTitle);
	this._titleWindow.refresh();
    this.addWindow(this._titleWindow);
};
//-----------------------------------------------------------------------------
// Create achievement list window
//-----------------------------------------------------------------------------
CGMV_Scene_Achievements.prototype.createListWindow = function() {
	var wh = Graphics.boxHeight-this._titleWindow.height;
	var ww = Graphics.boxWidth/3;
    this._listWindow = new CGMV_Achievement_Window_List(0, this._titleWindow.height, wh, ww);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Create achievement totals window
//-----------------------------------------------------------------------------
CGMV_Scene_Achievements.prototype.createTotalsWindow = function() {
	var wy = this._titleWindow.height + this._listWindow.height;
	var ww = Graphics.boxWidth/3;
    this._totalsWindow = new CGMV_Achievement_Window_Totals(0, wy, ww);
	this._totalsWindow.refresh();
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Create achievement window
//-----------------------------------------------------------------------------
CGMV_Scene_Achievements.prototype.createAchievementWindow = function() {
	var wy = this._titleWindow.height;
	var wx = this._listWindow.width;
	var ww = Graphics.boxWidth-wx;
	var wh = Graphics.boxHeight-wy;
    this._achievementWindow = new CGMV_Achievement_Window_Display(wx, wy, ww, wh);
	this._listWindow.setHelpWindow(this._achievementWindow);
	this._achievementWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
	this._achievementWindow.deactivate();
    this.addWindow(this._achievementWindow);
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMV_Scene_Achievements.prototype.onListOk = function() {
	this._achievementWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMV_Scene_Achievements.prototype.onDisplayCancel = function() {
    this._achievementWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMV_Achievement_Window_List
//-----------------------------------------------------------------------------
// Selectable window for choosing an achievement in a list.
// Will not show hidden achievements.
//=============================================================================
function CGMV_Achievement_Window_List() {
    this.initialize.apply(this, arguments);
}
CGMV_Achievement_Window_List.prototype = Object.create(Window_Selectable.prototype);
CGMV_Achievement_Window_List.prototype.constructor = CGMV_Achievement_Window_List;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.initialize = function(x, y, height, width) {
	var newHeight = height;
	newHeight -= ($cgmv.usingAchievementPoints()) ? this.fittingHeight(2) : this.fittingHeight(1); // height of total window
    Window_Selectable.prototype.initialize.call(this, x, y, width, newHeight);
    this.refresh();
    this.select(0);
};
//-----------------------------------------------------------------------------
// Max achievements to be shown
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Currently selected achievement
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Determine if current item enabled
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.isCurrentItemEnabled = function() {
    return true;
};
//-----------------------------------------------------------------------------
// Determine if achievement is enabled
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.isEnabled = function(achievement) {
    return (achievement && achievement.isEarned());
};
//-----------------------------------------------------------------------------
// Refresh window
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make list of achievements
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.makeItemList = function() {
    this._data = [];
	var achievements = $cgmv.getAchievements();
	achievements.forEach(function(achievement) {
		if(!achievement.isSecret() || achievement.isEarned() || CGMV.Achievements.ShowSecretAchievements) {
			this._data.push(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Draw achievement names
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.drawItem = function(index) {
    var achievement = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(achievement));
	if(achievement.isSecret() && !achievement.isEarned()) {
		this.drawText(CGMV.Achievements.SecretText, rect.x, rect.y, rect.width, 'left');
	}
	else {
		this.drawText(achievement.getName(), rect.x, rect.y, rect.width, 'left');
	}
    this.changePaintOpacity(true);
};
//-----------------------------------------------------------------------------
// Update helper window
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_List.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};
//=============================================================================
// CGMV_Achievement_Window_Totals
//-----------------------------------------------------------------------------
// Window displaying total achievements earned and points (if applicable)
//=============================================================================
function CGMV_Achievement_Window_Totals() {
    this.initialize.apply(this, arguments);
}
CGMV_Achievement_Window_Totals.prototype = Object.create(Window_Base.prototype);
CGMV_Achievement_Window_Totals.prototype.constructor = CGMV_Achievement_Window_Totals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Totals.prototype.initialize = function(x, y, width) {
    var height = ($cgmv.usingAchievementPoints()) ? this.fittingHeight(2) : this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Totals.prototype.refresh = function() {
    this.contents.clear();
	var width = this.contents.width - this.textPadding() * 2;
	var earned = $cgmv.countEarnedAchievements();
	var text = CGMV.Achievements.EarnedCountText + ": " + earned;
    this.drawText(text, 0, 0, width, 'left');
	if($cgmv.usingAchievementPoints()) {
		var points = $cgmv.countEarnedAchievementPoints();
		text = CGMV.Achievements.PointsText + ": " + points;
		this.drawText(text, 0, this.lineHeight(), width, 'left');
	}
};
//=============================================================================
// CGMV_Achievement_Window_Display
//-----------------------------------------------------------------------------
// Window displaying total achievements earned and points (if applicable)
//=============================================================================
function CGMV_Achievement_Window_Display() {
    this.initialize.apply(this, arguments);
}
CGMV_Achievement_Window_Display.prototype = Object.create(CGMV_Window_Scrollable.prototype);
CGMV_Achievement_Window_Display.prototype.constructor = CGMV_Achievement_Window_Display;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.initialize = function(x, y, width, height) {
	var heightMultiplier = 4; // maximum of 4 windows tall of data to scroll
    CGMV_Window_Scrollable.prototype.initialize.call(this, x, y, width, height, heightMultiplier, CGMV.Achievements.ScrollWait, CGMV.Achievements.ScrollSpeed);
	this._achievement = null;
};
//-----------------------------------------------------------------------------
// Set the achievement to be displayed
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.setItem = function(achievement) {
	this._achievement = achievement;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.refresh = function() {
	if(this._achievement == null) {
		return;
	}
	this.setupWindowForNewEntry();
	var achievement = this._achievement;
	var totalWidth = this.contents.width - this.textPadding() * 2;
	if(achievement.isSecret() && !achievement.isEarned()) {
		this.drawText(CGMV.Achievements.SecretText, 0, 0, totalWidth, 'center')
	} else {
		this.drawText(achievement.getName(), 0, 0, totalWidth, 'center');
	}
	var descriptor = "";
	var x = 0;
	var lines = 1;
	if(achievement.isEarned()) {
		descriptor = CGMV.Achievements.EarnedText + ": ";
		this.changeTextColor(this.systemColor());
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		x = this.textWidth(descriptor);
		descriptor = achievement._earndate;
		this.changeTextColor(this.normalColor());
		this.drawText(descriptor, x, this.lineHeight()*lines, totalWidth-x, 'left');
	}
	else {
		this.changeTextColor(this.normalColor());
		descriptor = CGMV.Achievements.UnearnedText;
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
	}
	lines++;
	if(achievement._difficulty !== "") {
		descriptor = CGMV.Achievements.DifficultyText + ": ";
		this.changeTextColor(this.systemColor());
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		x = this.textWidth(descriptor);
		descriptor = achievement._difficulty;
		this.changeTextColor(this.normalColor());
		this.drawText(descriptor, x, this.lineHeight()*lines, totalWidth-x, 'left');
		lines++;
	}
	if(achievement._points > 0) {
		descriptor = CGMV.Achievements.PointsText + ": ";
		this.changeTextColor(this.systemColor());
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		x = this.textWidth(descriptor);
		descriptor = achievement._points;
		this.changeTextColor(this.normalColor());
		this.drawText(descriptor, x, this.lineHeight()*lines, totalWidth-x, 'left');
		lines++;
	}
	if(achievement._predesc !== "" && !achievement.isEarned()) {
		lines = this.drawAchievementDescription(achievement._predesc, lines);
	}
	else if(achievement._postdesc !== "" && achievement.isEarned()) {
		lines = this.drawAchievementDescription(achievement._postdesc, lines);
	}
	// Colors used for currency criteria gauges
	var currencyColor1 = this.textColor(CGMV.Achievements.CurrencyGaugeColor1);
	var currencyColor2 = this.textColor(CGMV.Achievements.CurrencyGaugeColor2);
	// Colors used for item criteria gauges
	var itemGaugeColor1 = this.textColor(CGMV.Achievements.ItemGaugeColor1);
	var itemGaugeColor2 = this.textColor(CGMV.Achievements.ItemGaugeColor2);
	// Colors used for switch and variable gauges
	var switchVarGaugeColor1 = this.textColor(CGMV.Achievements.SwitchVarGaugeColor1);
	var switchVarGaugeColor2 = this.textColor(CGMV.Achievements.SwitchVarGaugeColor2);
	// Common colors used for multiple criteria gauges
	var genericGaugeColor1 = this.textColor(CGMV.Achievements.GenericGaugeColor1);
	var genericGaugeColor2 = this.textColor(CGMV.Achievements.GenericGaugeColor1);
	// Draw criteria
	if(this.canShowCriteria(achievement)) {
		var req = achievement._requirements;
		this.changeTextColor(this.systemColor());
		descriptor = CGMV.Achievements.RequirementText + ": ";
		x = this.textWidth(descriptor);
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		this.changeTextColor(this.normalColor());
		if(req.currency > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameParty.gold(), req.currency,
											  currencyColor1, currencyColor2, TextManager.currencyUnit, achievement);
			x = 0;
		}
		if(req.steps > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameParty.steps(), req.steps,
											  genericGaugeColor1, genericGaugeColor2, "Steps", achievement);
			x = 0;
		}
		if(req.saves > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameSystem.saveCount(), req.saves,
											  genericGaugeColor1, genericGaugeColor2, "Saves", achievement);
			x = 0;
		}
		if(req.battles > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameSystem.battleCount(), req.battles,
											  genericGaugeColor1, genericGaugeColor2, "Battles", achievement);
			x = 0;
		}
		if(req.wins > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameSystem.winCount(), req.wins,
											  genericGaugeColor1, genericGaugeColor2, "Wins", achievement);
			x = 0;
		}
		if(req.escapes > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameSystem.escapeCount(), req.escapes,
											  genericGaugeColor1, genericGaugeColor2, "Escapes", achievement);
			x = 0;
		}
		if(req.achievetotal > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.countEarnedAchievements(), req.achievetotal,
											  genericGaugeColor1, genericGaugeColor2, "Achievements", achievement);
			x = 0;
		}
		if(req.achievepts > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.countEarnedAchievementPoints(), req.achievepts,
											  genericGaugeColor1, genericGaugeColor2, "Points", achievement);
			x = 0;
		}
		if(req.infototal > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getInfoTotalPercent(), req.infototal,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Total", achievement);
			x = 0;
		}
		if(req.infobestiary > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getInfoBestiaryPercent(), req.infobestiary,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Bestiary", achievement);
			x = 0;
		}
		if(req.infoitems > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getInfoItemsPercent(), req.infoitems,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Items", achievement);
			x = 0;
		}
		if(req.infoweapons > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getInfoWeaponsPercent(), req.infoweapons,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Weapons", achievement);
			x = 0;
		}
		if(req.infoarmors > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getInfoArmorsPercent(), req.infoarmors,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Armors", achievement);
			x = 0;
		}
		if(req.infoskills > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getInfoSkillsPercent(), req.infoskills,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Skills", achievement);
			x = 0;
		}
		if(req.infostates > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getInfoStatesPercent(), req.infostates,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. States", achievement);
			x = 0;
		}
		for(var i = 0; i < req.professions.length; i++) {
			var name = req.professions[i].name;
			var profession = $cgmv.getProfession(name);
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, profession._level, req.professions[i].level,
											  genericGaugeColor1, genericGaugeColor2, " " + name + " Level", achievement);
			x = 0;
		}
		if(req.playtime > 0) {
			var max = $gameSystem.playtime();
			if(achievement.isEarned() || max > req.playtime) {
				max = req.playtime;
			}
			var rate = max/req.playtime;
			var timeArray1 = $cgmvTemp.approximateTimeValue(req.playtime);
			var timeArray2 = $cgmvTemp.approximateTimeValue(max);
			var descriptor = timeArray2[0].toString() + " " + timeArray2[1] + " / " + timeArray1[0].toString() + " " + timeArray1[1] + " Played";
			this.drawGauge(x, this.lineHeight()*lines, totalWidth-x, rate, genericGaugeColor1, genericGaugeColor2);
			this.drawText(descriptor, x, this.lineHeight()*lines, totalWidth-x, 'left');
			lines++;
			x = 0;
		}
		if(req.items.length > 0) {
			lines = this.drawCriteriaItems(achievement.isEarned(), req.items, x, lines, totalWidth-x,
										   itemGaugeColor1, itemGaugeColor2);
			x = 0;
		}
		if(req.switches.length > 0) {
			lines = this.drawCriteriaSwitches(achievement.isEarned(), req.switches, x, lines, totalWidth-x,
										   switchVarGaugeColor1, switchVarGaugeColor2);
			x = 0;
		}
		if(req.variables.length > 0) {
			lines = this.drawCriteriaVariables(achievement.isEarned(), req.variables, x, lines, totalWidth-x,
											   switchVarGaugeColor1, switchVarGaugeColor2);
			x = 0;
		}
	}
	if(this.canShowRewards(achievement)) {
		var rew = achievement._rewards;
		this.changeTextColor(this.systemColor());
		descriptor = CGMV.Achievements.RewardText + ": ";
		x = this.textWidth(descriptor);
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		this.changeTextColor(this.normalColor());
		if(rew.currency > 0) {
			var space = CGMV.Achievements.CurrencyUnitSpace ? " " : "";
			var descriptor = rew.currency.toString() + space + TextManager.currencyUnit;
			this.drawText(descriptor, x, this.lineHeight()*lines, totalWidth, 'left');
			x = 0;
			lines++;
		}
		if(rew.items.length > 0) {
			lines = this.drawRewardsItems(rew.items, x, lines, totalWidth-x);
			x = 0;
		}
		if(rew.switches.length > 0) {
			lines = this.drawRewardsSwitches(rew.switches, x, lines, totalWidth);
			x = 0;
		}
		if(rew.variables.length > 0) {
			lines = this.drawRewardsSwitches(rew.variables, x, lines, totalWidth);
			x = 0;
		}
	}
	this._neededHeight = this.lineHeight()*lines;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw criteria progress with gauge
// Returns the line counter + 1 (this function draws 1 line when called)
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.drawCriteriaProgress = function(x, lines, width, numerator, denominator,
																		  color1, color2, criteriaText, achievement) {
	var y = this.lineHeight()*lines;
	var max = numerator;
	if(achievement.isEarned() || numerator > denominator) {
		max = denominator;
	}
	var rate = max/denominator;
	var descriptor = max.toString() + " / " + denominator.toString() + " " + criteriaText;
	this.drawGauge(x, y, width, rate, color1, color2);
	this.drawText(descriptor, x, y, width, 'left');
	return lines + 1;
};
//-----------------------------------------------------------------------------
// Draw criteria items progress
// Returns the line counter + amount of lines drawn via this function
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.drawCriteriaItems = function(earned, itemArray, x, lines, width,
																		  color1, color2) {
	for(var i = 0; i < itemArray.length; i++) {
		var y = this.lineHeight()*lines;
		var criteriaObj = itemArray[i];
		var item = this.getItemObject(criteriaObj);
		var max = $gameParty.numItems(item);
		if(earned || max > criteriaObj.amt) {
			max = criteriaObj.amt;
		}
		var rate = max/criteriaObj.amt;
		var descriptor = max.toString() + " / " + criteriaObj.amt.toString() + " ";
		this.drawGauge(x, y, width, rate, color1, color2);
		this.drawText(descriptor, x, y, width, 'left');
		var newWidth = width - this.textWidth(descriptor);
		x += this.textWidth(descriptor);
		this.drawItemName(item, x, y, newWidth);
		width = this.contents.width - this.textPadding() * 2;
		x = 0;
		lines++;
	}
	return lines;
};
//-----------------------------------------------------------------------------
// Draw criteria switches progress
// Returns the line counter + amount of lines drawn via this function
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.drawCriteriaSwitches = function(earned, switchArray, x, lines, width,
																		  color1, color2) {
	for(var i = 0; i < switchArray.length; i++) {
		var y = this.lineHeight()*lines;
		var switchObj = switchArray[i];
		var switchval = $gameSwitches.value(switchObj.id);
		var max = (switchval == switchObj.value) ? 1 : 0;
		if(earned) {
			max = 1;
		}
		var rate = max/1;
		var descriptor = switchObj.description + " " + max.toString() + " / 1";
		this.drawGauge(x, y, width, rate, color1, color2);
		this.drawText(descriptor, x, y, width, 'left');
		width = this.contents.width - this.textPadding() * 2;
		x = 0;
		lines++;
	}
	return lines;
};
//-----------------------------------------------------------------------------
// Draw criteria variables progress
// Due to so many options for variables and not really making sense for gauges,
// it treats it like a switch.
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.drawCriteriaVariables = function(earned, variableArray, x, lines, width,
																		  color1, color2) {
	for(var i = 0; i < variableArray.length; i++) {
		var y = this.lineHeight()*lines;
		var variableObj = variableArray[i];
		if(variableObj.operator != ">" && variableObj.operator != ">=") {
			var max = 0
			if(earned) {
				max = 1;
			}
			var rate = max/1;
			var descriptor = variableObj.description + " " + max.toString() + " / 1";
		}
		else {
			var trueVal = (variableObj.operator === '>') ? variableObj.value+1 : variableObj.value;
			var max = $gameVariables.value(variableObj.id);
			if(earned || max > trueVal) {
				max = trueVal;
			}
			var rate = max/trueVal;
			var descriptor = variableObj.description + " " + max.toString() + " / " + trueVal.toString();
		}
		this.drawGauge(x, y, width, rate, color1, color2);
		this.drawText(descriptor, x, y, width, 'left');
		width = this.contents.width - this.textPadding() * 2;
		x = 0;
		lines++;
	}
	return lines;
};
//-----------------------------------------------------------------------------
// Draw item rewards
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.drawRewardsItems = function(itemArray, x, lines, width) {
	for(var i = 0; i < itemArray.length; i++) {
		var y = this.lineHeight()*lines;
		var rewardObj = itemArray[i];
		var item = this.getItemObject(rewardObj);
		var descriptor = rewardObj.amt.toString() + "x ";
		this.drawText(descriptor, x, y, width, 'left');
		var newWidth = width - this.textWidth(descriptor);
		x += this.textWidth(descriptor);
		this.drawItemName(item, x, y, newWidth);
		width = this.contents.width - this.textPadding() * 2;
		x = 0;
		lines++;
	}
	return lines;
};
//-----------------------------------------------------------------------------
// Draw switch rewards
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.drawRewardsSwitches = function(switchArray, x, lines, width) {
	if(x != 0) {
		lines++;
		x = 0;
	}
	for(var i = 0; i < switchArray.length; i++) {
		var y = this.lineHeight()*lines;
		var descriptor = switchArray[i].description;
		this.drawText(descriptor, x, y, width, 'left');
		lines++;
	}
	return lines;
};
//-----------------------------------------------------------------------------
// Draw variable rewards
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.drawRewardsVariables = function(variableArray, x, lines, width) {
	if(x != 0) {
		lines++;
		x = 0;
	}
	for(var i = 0; i < variableArray.length; i++) {
		var y = this.lineHeight()*lines;
		var descriptor = variableArray[i].description;
		this.drawText(descriptor, x, y, width, 'left');
		lines++;
	}
	return lines;
};
//-----------------------------------------------------------------------------
// Returns the item object from system data type.
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.getItemObject = function(itemObj) {
	var item = null;
	if(itemObj.type === "item") {
		item = $dataItems[itemObj.id];
	}
	else if(itemObj.type === "weapon") {
		item = $dataWeapons[itemObj.id];
	}
	else if(itemObj.type === "armor") {
		item = $dataArmors[itemObj.id];
	}
	return item;
};
//-----------------------------------------------------------------------------
// Determine if the window should show criteria
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.canShowCriteria = function(achievement) {
	if(achievement.isEarned() && !CGMV.Achievements.ShowCriteriaAfterCompletion) return false;
	if(achievement.isSecret() && !achievement.isEarned()) return false;
	return achievement.hasRequirements();
};
//-----------------------------------------------------------------------------
// Determine if the window should show rewards
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.canShowRewards = function(achievement) {
	if(achievement.isSecret() && !achievement.isEarned()) return false;
	return achievement.hasRewards();
};
//-----------------------------------------------------------------------------
// Draw achievement description - returns y-value of line below last line drawn
//-----------------------------------------------------------------------------
CGMV_Achievement_Window_Display.prototype.drawAchievementDescription = function(description, lines) {
	var descriptor1 = CGMV.Achievements.DescriptionText + ": ";
	var descriptor2 = description.split(" ");
	var x = 0;
	var y = this.lineHeight()*lines;
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor1, x, y, this.contents.width, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(this.normalColor());
	for(var i = 0; i < descriptor2.length; i++) {
		if(descriptor2[i] === "") continue;
		if(descriptor2[i] === '\\n') {
			y += this.lineHeight();
			lines++;
			x = 0;
			continue;
		}
		var tempWidth = this.textWidth(descriptor2[i] + " ");
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				lines++;
				x = 0;
			}
		}
		this.drawText(descriptor2[i] + " ", x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return lines + 1;
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Automatic tracking for gold, steps, and items
// modified functions: gainGold, increaseSteps, gainItem
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have currency criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameParty_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    alias_CGMV_Achievements_GameParty_gainGold.call(this, amount);
	if(amount > 0) {
		$cgmv.checkAchievementCurrencyCriteria();
	}
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have steps criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameParty_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
	alias_CGMV_Achievements_GameParty_increaseSteps.call(this);
	$cgmv.checkAchievementStepsCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have items criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    alias_CGMV_Achievements_GameParty_gainItem.call(this, item, amount, includeEquip);
	if(amount > 0) {
		$cgmv.checkAchievementItemsCriteria();
	}
};
//=============================================================================
// Game_System
//-----------------------------------------------------------------------------
// Automatic tracking for battles, wins, escapes, saves
// modified functions: onBattleStart, onBattleEscape, onBattleWin, onBeforeSave
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have battles criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameSystem_onBattleStart = Game_System.prototype.onBattleStart;
Game_System.prototype.onBattleStart = function() {
    alias_CGMV_Achievements_GameSystem_onBattleStart.call(this);
	$cgmv.checkAchievementBattlesCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have wins criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameSystem_onBattleWin = Game_System.prototype.onBattleWin;
Game_System.prototype.onBattleWin = function() {
    alias_CGMV_Achievements_GameSystem_onBattleWin.call(this);
	$cgmv.checkAchievementWinsCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have escapes criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameSystem_onBattleEscape = Game_System.prototype.onBattleEscape;
Game_System.prototype.onBattleEscape = function() {
	alias_CGMV_Achievements_GameSystem_onBattleEscape.call(this);
    $cgmv.checkAchievementEscapesCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have saves criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameSystem_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
	alias_CGMV_Achievements_GameSystem_onBeforeSave.call(this);
    $cgmv.checkAchievementSavesCriteria();
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Automatic tracking for playtime (Using Scene Map so playtime achievements do
// not update in battle or mid-scene
// modified functions: update
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have playtime criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	alias_CGMV_Achievements_SceneMap_update.call(this);
	if(Graphics.frameCount % 60 == 0) {
        $cgmv.checkAchievementPlaytimeCriteria();
    }
};
//=============================================================================
// Game_Switches
//-----------------------------------------------------------------------------
// Automatic tracking for switches
// modified functions: onChange
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have switch criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameSwitches_onChange = Game_Switches.prototype.onChange;
Game_Switches.prototype.onChange = function() {
    alias_CGMV_Achievements_GameSwitches_onChange.call(this);
	$cgmv.checkAchievementSwitchesCriteria();
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Automatic tracking for variables
// modified functions: onChange
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have variable criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Achievements_GameVariables_onChange = Game_Variables.prototype.onChange;
Game_Variables.prototype.onChange = function() {
    alias_CGMV_Achievements_GameVariables_onChange.call(this);
	$cgmv.checkAchievementVariablesCriteria();
};