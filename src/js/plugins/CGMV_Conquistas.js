/*:
 * @plugindesc CGMV Conquista Script
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
 * Description: This plugin creates an Conquista system for your game.
 * Conquistas can have as many requirements/rewards as you want, and also
 * many other properties. Requirements can be automatically tracked, and
 * rewards are automatically given. Hidden Conquistas are also supported.
 * ---------------------------------------------------------------------------
 * Documentation:
 * This plugin supports the following plugin commands:
 * CGMVConquistas Scene - this calls the Conquista scene.
 * CGMVConquistas ObterID x - this obters the Conquista with id x
 * CGMVConquistas Obter x - this obters the Conquista with name x
 * CGMVConquistas Update - this will look to add new Conquistas which have
 *                           been created after a save game. Previous
 *                           Conquistas will not be touched even if they
 *                           have been modified in the editor.
 * CGMVConquistas Initialize - this re-initializes Conquistas, resetting
 *                               all Conquistas. Meant for use in testing
 *                               saved games where new Conquistas have been
 *                               added or existing Conquistas have been
 *                               changed and the update function is not working
 *                               to resolve issues.
 *
 * To call the Conquista scene via JavaScript command, use:
 * SceneManager.push(CGMV_Scene_Conquistas);
 *
 * ADDITIONAL NOTES:
 * CGMV TOAST
 * This plugin has additional functionality when using CGMV Toast.
 * CGMV Toast allows for the display of a pop-up window on the map screen when
 * an Conquista is obtido. Settings for this can be found under the popup
 * settings for an Conquista.
 *
 * CGMV Encyclopedia
 * This plugin has additional functionality when using CGMV Encyclopedia.
 * CGMV Encyclopedia can be used for Conquistas, such as "Discover the
 * entire encyclopedia"
 *
 * CGMV Professions
 * This plugin has additional functionality when using CGMV Professions.
 * CGMV Professions can be used for Conquistas, such as "Raise a
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
 * - Added customization options for the text in most areas of the Conquista scene.
 *
 * Version 1.2:
 * - Conquistas are now 1-indexed (id same as shown in plugin manager).
 * - Fixed bug with obtering Conquistas by their name.
 * - Added Conquistas for CGMV Encyclopedia w/ Bestiary Plugin.
 * - Secret Conquistas should now display less information about themselves before obter.
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
 * - Fixed a bug with Conquista requirements not having correct Profession JSON in default value.
 *
 * Version 1.6:
 * - Fixed bug with secret Conquistas not showing the correct name.
 *
 * Version 1.7:
 * - Changed how the description displays, it now automatically makes new lines based on text width.
 *
 * @param CGMV Conquistas
 *
 * @param Conquistas
 * @parent CGMV Conquistas
 * @type struct<Conquista>[]
 * @default []
 * @desc Conquistas
 *
 * @param Requires CGMV Toast Plugin
 * 
 * @param ShowConquistaPop
 * @parent Requires CGMV Toast Plugin
 * @type boolean
 * @desc Determines whether a pop window is shown when Conquista is obtido.
 * Default: false
 * @default false
 *
 * @param ConquistaObtidoText
 * @parent Requires CGMV Toast Plugin
 * @desc Text to show on first line of Conquista pop window
 * Default: Conquista Obtido
 * @default Conquista Obtido
 *
 * @param ConquistaObtidoColor
 * @parent Requires CGMV Toast Plugin
 * @type number
 * @min 0
 * @max 31
 * @desc Color for text on the first line of Conquista pop window
 * Note: Uses windowskin colors. Range: 0-31
 * @default 3
 *
 * @param ConquistaObtidoAlignment
 * @parent Requires CGMV Toast Plugin
 * @desc Alignment for pop text.
 * valid values: left, right, center
 * @default center
 *
 * @param ConquistaObtidoSound
 * @parent Requires CGMV Toast Plugin
 * @type file
 * @dir audio/se/
 * @desc Default sound to play when Conquista pop-up window pops
 * default: Applause1
 * @default Applause1
 *
 * @param Conquista Scene Options
 * 
 * @param ConquistaWindowTitle
 * @parent Conquista Scene Options
 * @desc Text to show at the top window of the Conquista scene
 * Default: Conquistas
 * @default Conquistas
 *
 * @param ShowSecretConquistas
 * @parent Conquista Scene Options
 * @type boolean
 * @desc Determine whether secret Conquistas are displayed in the Conquista scene
 * Default: false
 * @default false
 *
 * @param SecretText
 * @parent Conquista Scene Options
 * @desc Text to show as Conquista name if secret Conquista is displayed in scene
 * Default: ??????
 * @default ??????
 *
 * @param ShowCriteriaAfterCompletion
 * @parent Conquista Scene Options
 * @type boolean
 * @desc true = still show criteria, false = stop showing criteria after completion.
 * Default: true
 * @default true
 *
 * @param DateFormat
 * @parent Conquista Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying date format. See CGMV Core help description for help. Valid Range: 0-8
 * Default: 0
 * @default 0
 *
 * @param ScrollSpeed
 * @parent Conquista Scene Options
 * @type number
 * @min 0
 * @desc speed at which the Conquista window display scrolls (if needed)
 * Default: 1
 * @default 1
 *
 * @param ScrollWait
 * @parent Conquista Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * Default: 300
 * @default 300
 *
 * @param Text Options
 * @parent Conquista Scene Options
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
 * @param Unobtido Text
 * @parent Text Options
 * @desc Text to appear at the top of the Conquista
 * window when unobtido.
 * @default Keep playing to obter this Conquista
 *
 * @param Obtido Text
 * @parent Text Options
 * @desc Text to appear at the top of the Conquista
 * window when obtido.
 * @default Conquista obtido on
 *
 * @param Obtido Count Text
 * @parent Text Options
 * @desc Text to appear when counting obtido Conquistas
 * @default Obtido
 *
 * @param Currency Unit Space
 * @parent Text Options
 * @type boolean
 * @desc Add a space between the Currency Value and Currency Unit?
 * @default false
 * 
 * @param Gauge Colors
 * @parent Conquista Scene Options
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
 * @desc Amount of currency needed to obter the Conquista
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items needed to obter the Conquista
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons needed to obter the Conquista
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors needed to obter the Conquista
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches needed to obter the Conquista
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables needed to obter the Conquista
 * @default []
 *
 * @param Saves
 * @type number
 * @min 0
 * @default 0
 * @desc Save count needed to obter the Conquista
 *
 * @param Playtime
 * @type number
 * @min 0
 * @default 0
 * @desc Playtime needed to obter the Conquista
 *
 * @param Steps
 * @type number
 * @min 0
 * @default 0
 * @desc Step count needed to obter the Conquista
 *
 * @param Battles
 * @type number
 * @min 0
 * @default 0
 * @desc Battle count needed to obter the Conquista
 *
 * @param Wins
 * @type number
 * @min 0
 * @default 0
 * @desc Win count needed to obter the Conquista
 *
 * @param Escapes
 * @type number
 * @min 0
 * @default 0
 * @desc Escape count needed to obter the Conquista
 *
 * @param Conquistas Obtido
 * @type number
 * @min 0
 * @default 0
 * @desc Obtido Conquistas needed to obter the Conquista
 *
 * @param Conquista Points
 * @type number
 * @min 0
 * @default 0
 * @desc Conquista points needed to obter the Conquista
 *
 * @param Encyclopedia Total
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia discovered % needed to obter the Conquista
 *
 * @param Encyclopedia Bestiary
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia bestiary discovered % needed to obter the Conquista
 *
 * @param Encyclopedia Items
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia items discovered % needed to obter the Conquista
 *
 * @param Encyclopedia Armors
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia armors discovered % needed to obter the Conquista
 *
 * @param Encyclopedia Weapons
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia weapons discovered % needed to obter the Conquista
 *
 * @param Encyclopedia Skills
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia skills discovered % needed to obter the Conquista
 *
 * @param Encyclopedia States
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia states discovered % needed to obter the Conquista
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
 * @desc Amount of currency to award upon Conquista obter
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items to award upon Conquista obter
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons to award upon Conquista obter
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors to award upon Conquista obter
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches to manipulate upon Conquista obter
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables to manipulate upon Conquista obter
 * @default []
 */
/*~struct~Popup:
 * @param Display?
 * @type boolean
 * @default true
 * @desc Display a pop up window on the map on Conquista obter?
 * No popup will display if not using CGMV Toast Manager
 *
 * @param Sound
 * @type file
 * @dir audio/se/
 * @desc Sound to play on Conquista obter
 * 
 * @param Image
 * @type file
 * @dir img/pictures
 * @desc Image to show on Conquista obter
 * Leave blank to show a text window instead
 * 
 * @param Color
 * @type number
 * @min 0
 * @max 31
 * @default 0
 * @desc Color to show Conquista name with in text window
 * upon obter. No effect if showing image instead.
 */
 /*~struct~Conquista:
 * @param Name
 * @type text
 * @desc Name of the Conquista
 * 
 * @param Points
 * @type number
 * @min 0
 * @default 10
 * @desc Amount of points the Conquista is worth
 *
 * @param Pre Description
 * @type note
 * @default ""
 * @desc Conquista description before it is obtido
 *
 * @param Post Description
 * @type note
 * @default ""
 * @desc Conquista description after it is obtido.
 * Leave blank to always use Pre Description
 *
 * @param Difficulty
 * @type text
 * @default Easy
 * @desc Conquista difficulty
 *
 * @param Secret
 * @type boolean
 * @default false
 * @desc Is the Conquista a secret Conquista?
 *
 * @param Automatic
 * @type boolean
 * @default false
 * @desc Automatically track the Conquista progress?
 *
 * @param Rewards
 * @type struct<Reward>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]"}
 * @desc Conquista Rewards
 *
 * @param Requirements
 * @type struct<Requirement>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Saves":"0","Playtime":"0","Steps":"0","Battles":"0","Wins":"0","Escapes":"0","Conquistas Obtido":"0","Conquista Points":"0","Encyclopedia Total":"0","Encyclopedia Bestiary":"0","Encyclopedia Items":"0","Encyclopedia Armors":"0","Encyclopedia Weapons":"0","Encyclopedia Skills":"0","Encyclopedia States":"0","Professions":"[]"}
 * @desc Conquista Requirements
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
Imported.CGMV_Conquistas = true;
var CGMV = CGMV || {};
CGMV.Conquistas = CGMV.Conquistas || {};
CGMV.Conquistas.version = 1.7;
CGMV.Conquistas.parameters = PluginManager.parameters('CGMV_Conquistas');
CGMV.Conquistas.FileName = CGMV.Conquistas.parameters["File"] || "Conquistas.txt";
CGMV.Conquistas.FolderName = CGMV.Conquistas.parameters["Folder"] || "Data";
CGMV.Conquistas.ShowConquistaPop = (CGMV.Conquistas.parameters["ShowConquistaPop"] === "true") ? true : false;
CGMV.Conquistas.ConquistaObtidoText = CGMV.Conquistas.parameters["ConquistaObtidoText"] || "Conquista Obtido";
CGMV.Conquistas.ConquistaObtidoColor = Number(CGMV.Conquistas.parameters["ConquistaObtidoColor"]) || 0;
CGMV.Conquistas.ConquistaObtidoAlignment = CGMV.Conquistas.parameters["ConquistaObtidoAlignment"] || "center";
CGMV.Conquistas.ConquistaObtidoSound = CGMV.Conquistas.parameters["ConquistaObtidoSound"] || "Applause1";
CGMV.Conquistas.ConquistaWindowTitle = CGMV.Conquistas.parameters["ConquistaWindowTitle"] || "Conquistas";
CGMV.Conquistas.ShowSecretConquistas = (CGMV.Conquistas.parameters["ShowSecretConquistas"] === "true") ? true : false;
CGMV.Conquistas.SecretText = CGMV.Conquistas.parameters["SecretText"] || "??????";
CGMV.Conquistas.ShowCriteriaAfterCompletion = (CGMV.Conquistas.parameters["ShowCriteriaAfterCompletion"] === "true") ? true : false;
CGMV.Conquistas.DateFormat = Number(CGMV.Conquistas.parameters["DateFormat"]) || 0;
CGMV.Conquistas.CurrencyGaugeColor1 = Number(CGMV.Conquistas.parameters["CurrencyGaugeColor1"]) || 6;
CGMV.Conquistas.CurrencyGaugeColor2 = Number(CGMV.Conquistas.parameters["CurrencyGaugeColor2"]) || 17;
CGMV.Conquistas.GenericGaugeColor1 = Number(CGMV.Conquistas.parameters["GenericGaugeColor1"]) || 28;
CGMV.Conquistas.GenericGaugeColor2 = Number(CGMV.Conquistas.parameters["GenericGaugeColor2"]) || 29;
CGMV.Conquistas.ItemGaugeColor1 = Number(CGMV.Conquistas.parameters["ItemGaugeColor1"]) || 22;
CGMV.Conquistas.ItemGaugeColor2 = Number(CGMV.Conquistas.parameters["ItemGaugeColor2"]) || 23;
CGMV.Conquistas.SwitchVarGaugeColor1 = Number(CGMV.Conquistas.parameters["SwitchVarGaugeColor1"]) || 20;
CGMV.Conquistas.SwitchVarGaugeColor2 = Number(CGMV.Conquistas.parameters["SwitchVarGaugeColor2"]) || 21;
CGMV.Conquistas.ScrollSpeed = Number(CGMV.Conquistas.parameters["ScrollSpeed"]) || 1;
CGMV.Conquistas.ScrollWait = Number(CGMV.Conquistas.parameters["ScrollWait"]) || 300;
CGMV.Conquistas.CurrencyUnitSpace = (CGMV.Conquistas.parameters["Currency Unit Space"] === "true") ? true : false;
CGMV.Conquistas.RewardText = CGMV.Conquistas.parameters["Reward Text"] || "Rewards";
CGMV.Conquistas.RequirementText = CGMV.Conquistas.parameters["Requirement Text"] || "Requirements";
CGMV.Conquistas.DifficultyText = CGMV.Conquistas.parameters["Difficulty Text"] || "Difficulty";
CGMV.Conquistas.DescriptionText = CGMV.Conquistas.parameters["Description Text"] || "Description";
CGMV.Conquistas.PointsText = CGMV.Conquistas.parameters["Points Text"] || "Points";
CGMV.Conquistas.UnobtidoText = CGMV.Conquistas.parameters["Unobtido Text"] || "Keep playing to obter this Conquista";
CGMV.Conquistas.ObtidoText = CGMV.Conquistas.parameters["Obtido Text"] || "Conquista obtido on";
CGMV.Conquistas.ObtidoCountText = CGMV.Conquistas.parameters["Obtido Count Text"] || "Obtido";
CGMV.Conquistas.Conquistas = JSON.parse(CGMV.Conquistas.parameters["Conquistas"]);
//=============================================================================
// CGMV_Conquista
//-----------------------------------------------------------------------------
// Store and manage Conquista data.
//=============================================================================
function CGMV_Conquista() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Conquista
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.initialize = function(ConquistaData, id) {
	this._id = id;
	this._obtido = false;
	this._obterdate = "";
	ConquistaData = JSON.parse(ConquistaData);
	this._name = ConquistaData["Name"];
	this._points = Number(ConquistaData["Points"]);
	this._difficulty = ConquistaData["Difficulty"];
	this._predesc = JSON.parse(ConquistaData["Pre Description"].replace(/\\n/g, " \\\\n "));
	this._postdesc = JSON.parse(ConquistaData["Post Description"].replace(/\\n/g, " \\\\n "));
	if(this._postdesc === "") {
		this._postdesc = this._predesc;
	}
	this._automatic = (ConquistaData["Automatic"] === "true") ? true : false;
	this._secret = (ConquistaData["Secret"] === "true") ? true : false;
	var popupData = JSON.parse(ConquistaData["Popup"]);
	this._popup = {"display": (popupData["Display?"] === "true") ? true : false, "sound": popupData["Sound"],
					"image": popupData["Image"], "color": Number(popupData["Color"])};
	var rewards = JSON.parse(ConquistaData["Rewards"]);
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
	var requirements = JSON.parse(ConquistaData["Requirements"]);
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
	this._requirements["alcancetotal"] = Number(requirements["Conquistas Obtido"]);
	this._requirements["alcancepts"] = Number(requirements["Conquista Points"]);
	this._requirements["playtime"] = Math.floor(Number(requirements["Playtime"]) / 60);
	this._requirements["encyclopediatotal"] = Number(requirements["Encyclopedia Total"]);
	this._requirements["encyclopediabestiary"] = Number(requirements["Encyclopedia Bestiary"]);
	this._requirements["encyclopediaitems"] = Number(requirements["Encyclopedia Items"]);
	this._requirements["encyclopediaweapons"] = Number(requirements["Encyclopedia Weapons"]);
	this._requirements["encyclopediaarmors"] = Number(requirements["Encyclopedia Armors"]);
	this._requirements["encyclopediaskills"] = Number(requirements["Encyclopedia Skills"]);
	this._requirements["encyclopediastates"] = Number(requirements["Encyclopedia States"]);
	this._requirements["professions"] = this.initializeProfessionRequirements(requirements["Professions"]);
	this.setRewardFlag(this._rewards);
	this.setRequirementFlag(this._requirements);
};
//-----------------------------------------------------------------------------
// Initialize Conquista items (requirement or reward)
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.initializeItems = function(itemArray, JSONtext, idText, amtText, type) {
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
// Initialize Conquista switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.initializeSwitches = function(switchArray, JSONtext, idText, valueText, descText) {
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
// Initialize Conquista switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.initializeVariables = function(variableArray, JSONtext, idText, valueText, descText, opText) {
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
// Initialize Conquista profession requirements
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.initializeProfessionRequirements = function(reqs) {
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
// Set flag if Conquista has rewards
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.setRewardFlag = function(rewards) {
	this._hasRewards = (rewards.currency > 0 || rewards.items.length > 0 || 
						rewards.switches.length > 0 || rewards.variables.length > 0);
};
//-----------------------------------------------------------------------------
// Set flag if Conquista has requirements
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.setRequirementFlag = function(req) {
	this._hasRequirements = (req.currency > 0 || req.items.length > 0 || req.switches.length > 0 ||
							req.variables.length > 0 || req.saves > 0 || req.steps > 0 ||
							req.playtime > 0 || req.wins > 0 || req.battles > 0 || req.escapes > 0 ||
							req.alcancepts > 0 || req.alcancetotal > 0 || req.encyclopediatotal ||
							req.encyclopediaarmors || req.encyclopediabestiary || req.encyclopediaitems ||
							req.encyclopediaweapons || req.encyclopediaskills || req.encyclopediastates ||
							req.professions.length > 0);
};
//-----------------------------------------------------------------------------
// Get Conquista name
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.getName = function() {
	return this._name;
};
//-----------------------------------------------------------------------------
// Determine if Conquista should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.isAutomatic = function() {
	return this._automatic;
};
//-----------------------------------------------------------------------------
// Determine if Conquista should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.isSecret = function() {
	return this._secret;
};
//-----------------------------------------------------------------------------
// Determine if Conquista should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.isObtido = function() {
	return this._obtido;
};
//-----------------------------------------------------------------------------
// Determine if Conquista should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.hasRewards = function() {
	return this._hasRewards;
};
//-----------------------------------------------------------------------------
// Determine if Conquista should be automatically tracked
//-----------------------------------------------------------------------------
CGMV_Conquista.prototype.hasRequirements = function() {
	return this._hasRequirements;
};
//=============================================================================
// CGMV
//-----------------------------------------------------------------------------
// Manage Conquista data. Stored as an array of Conquista objects.
// alias functions: createPluginData
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Call Initialize for Conquistas
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_createPluginData = CGMV_Core.prototype.createPluginData;
CGMV_Core.prototype.createPluginData = function() {
	alias_CGMV_Conquistas_createPluginData.call(this);
	this.initializeConquistas(false);
};
//-----------------------------------------------------------------------------
// Initializes Conquistas
// If new Conquistas have been added, these will be added onto the end of the
// existing array.
//-----------------------------------------------------------------------------
CGMV_Core.prototype.initializeConquistas = function(reinitialize) {
	if(!this._Conquistas || reinitialize) {
		this.setupConquistaVariables();
	}
	var id = this._Conquistas.length + 1;
	for(var i = 0; i < CGMV.Conquistas.Conquistas.length; i++) {
		var Conquista = new CGMV_Conquista(CGMV.Conquistas.Conquistas[i], id);
		if(!this.getConquistaByName(Conquista.getName())) {
			this.commitConquista(Conquista);
			id++;
		}
	}
};
//-----------------------------------------------------------------------------
// Set up variables for Conquistas
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupConquistaVariables = function() {
	this._Conquistas = [];
	this.setupConquistaCriteriaTypeArrays();
	this._usingConquistaPoints = false;
	this._alcancetotal = 0;
	this._alcancepts = 0;
};
//-----------------------------------------------------------------------------
// Commit the Conquista to the Conquista array
// Also store Conquista criteria informations
//-----------------------------------------------------------------------------
CGMV_Core.prototype.commitConquista = function(Conquista) {
	this._Conquistas.push(Conquista);
	if(Conquista._points > 0) {
		this._usingConquistaPoints = true;
	}
	if(Conquista.hasRequirements() && Conquista.isAutomatic()) {
		var req = Conquista._requirements
		if(req.currency > 0) {
			this._ConquistaTypes.currency.push(Conquista._id);
		}
		if(req.steps > 0) {
			this._ConquistaTypes.steps.push(Conquista._id);
		}
		if(req.saves > 0) {
			this._ConquistaTypes.saves.push(Conquista._id);
		}
		if(req.playtime > 0) {
			this._ConquistaTypes.playtime.push(Conquista._id);
		}
		if(req.battles > 0) {
			this._ConquistaTypes.battles.push(Conquista._id);
		}
		if(req.escapes > 0) {
			this._ConquistaTypes.escapes.push(Conquista._id);
		}
		if(req.wins > 0) {
			this._ConquistaTypes.wins.push(Conquista._id);
		}
		if(req.alcancepts > 0) {
			this._ConquistaTypes.alcancepts.push(Conquista._id);
		}
		if(req.alcancetotal > 0) {
			this._ConquistaTypes.alcancetotal.push(Conquista._id);
		}
		if(req.encyclopediatotal > 0) {
			this._ConquistaTypes.encyclopedia.push(Conquista._id);
		}
		if(req.encyclopediabestiary > 0) {
			this._ConquistaTypes.encyclopedia.push(Conquista._id);
		}
		if(req.encyclopediaarmors > 0) {
			this._ConquistaTypes.encyclopedia.push(Conquista._id);
		}
		if(req.encyclopediaitems > 0) {
			this._ConquistaTypes.encyclopedia.push(Conquista._id);
		}
		if(req.encyclopediaweapons > 0) {
			this._ConquistaTypes.encyclopedia.push(Conquista._id);
		}
		if(req.encyclopediaskills > 0) {
			this._ConquistaTypes.encyclopedia.push(Conquista._id);
		}
		if(req.encyclopediastates > 0) {
			this._ConquistaTypes.encyclopedia.push(Conquista._id);
		}
		if(req.items.length > 0) {
			this._ConquistaTypes.items.push(Conquista._id);
		}
		if(req.switches.length > 0) {
			this._ConquistaTypes.switches.push(Conquista._id);
		}
		if(req.variables.length > 0) {
			this._ConquistaTypes.variables.push(Conquista._id);
		}
		if(req.professions.length > 0) {
			this._ConquistaTypes.professions.push(Conquista._id);
		}
	}
};
//-----------------------------------------------------------------------------
// Setup Conquista Type Arrays (for faster checking criteria)
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupConquistaCriteriaTypeArrays = function() {
	this._ConquistaTypes = {}; // each property stores IDs of Conquistas with those criteria
	this._ConquistaTypes.currency = [];
	this._ConquistaTypes.steps = [];
	this._ConquistaTypes.battles = [];
	this._ConquistaTypes.escapes = [];
	this._ConquistaTypes.wins = [];
	this._ConquistaTypes.playtime = [];
	this._ConquistaTypes.saves = [];
	this._ConquistaTypes.alcancetotal = [];
	this._ConquistaTypes.alcancepts = [];
	this._ConquistaTypes.items = [];
	this._ConquistaTypes.switches = [];
	this._ConquistaTypes.variables = [];
	this._ConquistaTypes.encyclopedia = [];
	this._ConquistaTypes.professions = [];
};
//-----------------------------------------------------------------------------
// Obter Conquista
//-----------------------------------------------------------------------------
CGMV_Core.prototype.obterConquista = function(id) {
	var Conquista = this.getConquistaByID(id);
	if(Conquista.isObtido()) {
		return;
	}
	Conquista._obtido = true;
	this._alcancetotal++;
	this._alcancepts += Conquista._points;
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	Conquista._obterdate = $cgmvTemp.createDateText(day, month, year, CGMV.Conquistas.DateFormat, "/");
	if(Conquista.hasRewards()) {
		this.giveConquistaRewards(Conquista._rewards);
	}
	if(Imported.CGMV_Toast && CGMV.Conquistas.ShowConquistaPop) {
		this.setupConquistaToast(Conquista);
	}
	this.checkConquistaAlcanceptsCriteria();
	this.checkConquistaAlcancetotalCriteria();
};
//-----------------------------------------------------------------------------
// Give Conquista rewards
//-----------------------------------------------------------------------------
CGMV_Core.prototype.giveConquistaRewards = function(reward) {
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
// Sets up Conquista toast window
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupConquistaToast = function(Conquista) {
	var toastobj = {};
	var pop = Conquista._popup;
	var seName = (pop.sound === "") ? CGMV.Conquistas.ConquistaObtidoSound : pop.sound;
	toastobj.SE = {name: seName, pan: 100, pitch: 100, volume: 100};
	if(pop.image !== "") {
		toastobj.CGMVPicToast = true;
		toastobj.picture = pop.image;
	}
	else {
		toastobj.CGMVToast = true;
		toastobj.align = CGMV.Conquistas.ConquistaObtidoAlignment;
		toastobj.line1 = CGMV.Conquistas.ConquistaObtidoText;
		toastobj.line1color = CGMV.Conquistas.ConquistaObtidoColor;
		toastobj.line2 = Conquista._name;
		toastobj.line2color = pop.color;
	}
	this.createNewToast(toastobj);
};
//-----------------------------------------------------------------------------
// Check Conquista Criteria and Award if Conquista is obtido
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaForObter = function(Conquista) {
	if(!this.needCriteriaCheck(Conquista)) {
		return;
	}
	var criteria = Conquista._requirements;
	if(criteria.currency > 0 && $gameParty.gold() < criteria.currency) return;
	if(criteria.steps > 0 && $gameParty.steps() < criteria.steps) return;
	if(criteria.saves > 0 && $gameSystem.saveCount() < criteria.saves) return;
	if(criteria.battles > 0 && $gameSystem.battleCount() < criteria.battles) return;
	if(criteria.wins > 0 && $gameSystem.winCount() < criteria.wins) return;
	if(criteria.escapes > 0 && $gameSystem.escapeCount() < criteria.escapes) return;
	if(criteria.alcancepts > 0 && this._alcancepts < criteria.alcancepts) return;
	if(criteria.alcancetotal > 0 && this._alcancetotal < criteria.alcancetotal) return;
	if(criteria.playtime > 0 && $gameSystem.playtime() < criteria.playtime) return;
	if(criteria.encyclopediatotal > 0 && this.getEncyclopediaTotalPercent() < criteria.encyclopediatotal) return;
	if(criteria.encyclopediabestiary > 0 && this.getEncyclopediaBestiaryPercent() < criteria.encyclopediabestiary) return;
	if(criteria.encyclopediaitems > 0 && this.getEncyclopediaItemsPercent() < criteria.encyclopediaitems) return;
	if(criteria.encyclopediaarmors > 0 && this.getEncyclopediaArmorsPercent() < criteria.encyclopediaarmors) return;
	if(criteria.encyclopediaweapons > 0 && this.getEncyclopediaWeaponsPercent() < criteria.encyclopediaweapons) return;
	if(criteria.encyclopediaskills > 0 && this.getEncyclopediaSkillsPercent() < criteria.encyclopediaskills) return;
	if(criteria.encyclopediastates > 0 && this.getEncyclopediaStatesPercent() < criteria.encyclopediastates) return;
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
	this.obterConquista(Conquista._id);
};
//-----------------------------------------------------------------------------
// Determine if need to check for criteria?
//-----------------------------------------------------------------------------
CGMV_Core.prototype.needCriteriaCheck = function(Conquista) {
	if(Conquista._obtido) {
		return false;
	}
	return Conquista.hasRequirements();
};
//-----------------------------------------------------------------------------
// Check Conquista Currency Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaCurrencyCriteria = function() {
	this._ConquistaTypes.currency.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($gameParty.gold() >= Conquista._requirements.currency) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Steps Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistastepsCriteria = function() {
	this._ConquistaTypes.steps.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($gameParty.steps() >= Conquista._requirements.steps) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Saves Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistasavesCriteria = function() {
	this._ConquistaTypes.saves.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($gameSystem.saveCount() >= Conquista._requirements.saves) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Battles Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaBattlesCriteria = function() {
	this._ConquistaTypes.battles.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($gameSystem.battleCount() >= Conquista._requirements.battles) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Wins Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaWinsCriteria = function() {
	this._ConquistaTypes.wins.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($gameSystem.winCount() >= Conquista._requirements.wins) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Escapes Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaEscapesCriteria = function() {
	this._ConquistaTypes.escapes.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($gameSystem.escapeCount() >= Conquista._requirements.escapes) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Playtime Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaPlaytimeCriteria = function() {
	this._ConquistaTypes.playtime.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($gameSystem.playtime() >= Conquista._requirements.playtime) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Alcancepts Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaAlcanceptsCriteria = function() {
	this._ConquistaTypes.alcancepts.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($cgmv.countObtidoConquistaPoints() >= Conquista._requirements.alcancepts) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Alcancetotal Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaAlcancetotalCriteria = function() {
	this._ConquistaTypes.alcancetotal.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if($cgmv.countObtidoConquistas() >=  Conquista._requirements.alcancetotal) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Encyclopedia Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaEncyclopediaCriteria = function() {
	this._ConquistaTypes.encyclopedia.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		if(Conquista._requirements.encyclopediatotal > 0 && $cgmv.getEncyclopediaTotalPercent() >= Conquista._requirements.encyclopediatotal) {
			this.checkConquistaForObter(Conquista);
		}
		else if(Conquista._requirements.encyclopediabestiary > 0 && $cgmv.getEncyclopediaBestiaryPercent() >= Conquista._requirements.encyclopediabestiary) {
			this.checkConquistaForObter(Conquista);
		}
		else if(Conquista._requirements.encyclopediaitems > 0 && $cgmv.getEncyclopediaItemsPercent() >= Conquista._requirements.encyclopediaitems) {
			this.checkConquistaForObter(Conquista);
		}
		else if(Conquista._requirements.encyclopediaarmors > 0 && $cgmv.getEncyclopediaArmorsPercent() >= Conquista._requirements.encyclopediaarmors) {
			this.checkConquistaForObter(Conquista);
		}
		else if(Conquista._requirements.encyclopediaweapons > 0 && $cgmv.getEncyclopediaWeaponsPercent() >= Conquista._requirements.encyclopediaweapons) {
			this.checkConquistaForObter(Conquista);
		}
		else if(Conquista._requirements.encyclopediaskills > 0 && $cgmv.getEncyclopediaSkillsPercent() >= Conquista._requirements.encyclopediaskills) {
			this.checkConquistaForObter(Conquista);
		}
		else if(Conquista._requirements.encyclopediastates > 0 && $cgmv.getEncyclopediaStatesPercent() >= Conquista._requirements.encyclopediastates) {
			this.checkConquistaForObter(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Professions Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaProfessionCriteria = function() {
	this._ConquistaTypes.professions.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		var needCheck = true;
		for(var i = 0; i < Conquista._requirements.professions.length; i++) {
			var profession = $cgmv.getProfession(Conquista._requirements.professions[i].name);
			if(Conquista._requirements.professions[i].level > profession._level) {
				needCheck = false;
			}
		}
		if(needCheck) this.checkConquistaForObter(Conquista);
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Items Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaItemsCriteria = function() {
	this._ConquistaTypes.items.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		var criteria = Conquista._requirements;
		for(var i = 0; i < criteria.items.length; i++) {
			var item = criteria.items[i];
			if(item.type === "item") {
				if($gameParty.numItems($dataItems[item.id]) >= item.amt) {
					this.checkConquistaForObter(Conquista);
					return;
				}
			}
			else if(item.type === "weapon") {
				if($gameParty.numItems($dataWeapons[item.id]) >= item.amt) {
					this.checkConquistaForObter(Conquista);
					return;
				}
			}
			else if(item.type === "armor") {
				if($gameParty.numItems($dataArmors[item.id]) >= item.amt) {
					this.checkConquistaForObter(Conquista);
					return;
				}
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Switches Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaswitchesCriteria = function() {
	this._ConquistaTypes.switches.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		var criteria = Conquista._requirements;
		for(var i = 0; i < criteria.switches.length; i++) {
			var switchObj = criteria.switches[i];
			if(switchObj.value == $gameSwitches.value(switchObj.id)) {
				this.checkConquistaForObter(Conquista);
				return;
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Conquista Variables Criteria
//-----------------------------------------------------------------------------
CGMV_Core.prototype.checkConquistaVariablesCriteria = function() {
	this._ConquistaTypes.variables.forEach(function(id) {
		var Conquista = this.getConquistaByID(id);
		var criteria = Conquista._requirements;
		for(var i = 0; i < criteria.variables.length; i++) {
			var variableObj = criteria.variables[i];
			var gameVariable = $gameVariables.value(variableObj.id);
			if(variableObj.operator === ">") {
				if(gameVariable > variableObj.value) {
					this.checkConquistaForObter(Conquista);
					return;
				}
			}
			else if(variableObj.operator === ">=") {
				if(gameVariable >= variableObj.value) {
					this.checkConquistaForObter(Conquista);
					return;
				}
			}
			else if(variableObj.operator === "=") {
				if(gameVariable == variableObj.value) {
					this.checkConquistaForObter(Conquista);
					return;
				}
			}
			else if(variableObj.operator === "<=") {
				if(gameVariable <= variableObj.value) {
					this.checkConquistaForObter(Conquista);
					return;
				}
			}
			else if(variableObj.operator === "<") {
				if(gameVariable < variableObj.value) {
					this.checkConquistaForObter(Conquista);
					return;
				}
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Get Conquista array
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getConquistas = function() {
	return this._Conquistas;
};
//-----------------------------------------------------------------------------
// Get Conquista by ID, returns false if no Conquista found
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getConquistaByID = function(id) {
	for(var i = 0; i < this._Conquistas.length; i++) {
		if(this._Conquistas[i]._id === id) {
			return this._Conquistas[i];
		}
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get Conquista by ID, returns false if no Conquista found
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getConquistaByName = function(achname) {
	for(var i = 0; i < this._Conquistas.length; i++) {
		if(this._Conquistas[i].getName() === achname) {
			return this._Conquistas[i];
		}
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get Conquista obtido count
//-----------------------------------------------------------------------------
CGMV_Core.prototype.countObtidoConquistas = function() {
	return this._alcancetotal;
};
//-----------------------------------------------------------------------------
// Get Conquista point count
//-----------------------------------------------------------------------------
CGMV_Core.prototype.countObtidoConquistaPoints = function() {
	return this._alcancepts;
};
//-----------------------------------------------------------------------------
// Conquistas have points?
//-----------------------------------------------------------------------------
CGMV_Core.prototype.usingConquistaPoints = function() {
	return this._usingConquistaPoints;
};
//-----------------------------------------------------------------------------
// Alias. Handles Conquista plugin commands
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_pluginCommand = CGMV_Core.prototype.pluginCommand;
CGMV_Core.prototype.pluginCommand = function(command, args) {
	alias_CGMV_Conquistas_pluginCommand.call(this, command, args);
	if(command == "CGMVConquistas") {
		if(args[0] == "Scene") {
			SceneManager.push(CGMV_Scene_Conquistas);
		}
		else if(args[0] == "ObterID") {
			var Conquista = this.getConquistaByID(Number(args[1]));
			if(Conquista) {
				this.obterConquista(Conquista._id);
			}
		}
		else if(args[0] == "Obter") {
			var nameString = "";
			for(var i = 1; i < args.length; i++) {
				if(i != 1) nameString = nameString + " ";
				nameString = nameString + args[i];
			}
			var Conquista = this.getConquistaByName(nameString);
			if(Conquista) {
				this.obterConquista(Conquista._id);
			}
		}
		else if(args[0] == "Initialize") {
			this.initializeConquistas(true);
		}
		else if(args[0] == "Update") {
			this.initializeConquistas(false);
		}
	}
};
//=============================================================================
// CGMV_Scene_Conquistas
//-----------------------------------------------------------------------------
// Scene that controls Conquista display windows.
// Call with SceneManager.push(CGMV_Scene_Conquistas);
//=============================================================================
function CGMV_Scene_Conquistas() {
    this.initialize.apply(this, arguments);
}
CGMV_Scene_Conquistas.prototype = Object.create(Scene_MenuBase.prototype);
CGMV_Scene_Conquistas.prototype.constructor = CGMV_Scene_Conquistas;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Scene_Conquistas.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create Conquista windows
//-----------------------------------------------------------------------------
CGMV_Scene_Conquistas.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createTitleWindow();
	this.createListWindow();
	this.createTotalsWindow();
	this.createConquistaWindow();
};
//-----------------------------------------------------------------------------
// Create Conquista title window
//-----------------------------------------------------------------------------
CGMV_Scene_Conquistas.prototype.createTitleWindow = function() {
    this._titleWindow = new CGMV_Window_Title(0, 0, CGMV.Conquistas.ConquistaWindowTitle);
	this._titleWindow.refresh();
    this.addWindow(this._titleWindow);
};
//-----------------------------------------------------------------------------
// Create Conquista list window
//-----------------------------------------------------------------------------
CGMV_Scene_Conquistas.prototype.createListWindow = function() {
	var wh = Graphics.boxHeight-this._titleWindow.height;
	var ww = Graphics.boxWidth/3;
    this._listWindow = new CGMV_Conquista_Window_List(0, this._titleWindow.height, wh, ww);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Create Conquista totals window
//-----------------------------------------------------------------------------
CGMV_Scene_Conquistas.prototype.createTotalsWindow = function() {
	var wy = this._titleWindow.height + this._listWindow.height;
	var ww = Graphics.boxWidth/3;
    this._totalsWindow = new CGMV_Conquista_Window_Totals(0, wy, ww);
	this._totalsWindow.refresh();
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Create Conquista window
//-----------------------------------------------------------------------------
CGMV_Scene_Conquistas.prototype.createConquistaWindow = function() {
	var wy = this._titleWindow.height;
	var wx = this._listWindow.width;
	var ww = Graphics.boxWidth-wx;
	var wh = Graphics.boxHeight-wy;
    this._ConquistaWindow = new CGMV_Conquista_Window_Display(wx, wy, ww, wh);
	this._listWindow.setHelpWindow(this._ConquistaWindow);
	this._ConquistaWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
	this._ConquistaWindow.deactivate();
    this.addWindow(this._ConquistaWindow);
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMV_Scene_Conquistas.prototype.onListOk = function() {
	this._ConquistaWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMV_Scene_Conquistas.prototype.onDisplayCancel = function() {
    this._ConquistaWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMV_Conquista_Window_List
//-----------------------------------------------------------------------------
// Selectable window for choosing an Conquista in a list.
// Will not show hidden Conquistas.
//=============================================================================
function CGMV_Conquista_Window_List() {
    this.initialize.apply(this, arguments);
}
CGMV_Conquista_Window_List.prototype = Object.create(Window_Selectable.prototype);
CGMV_Conquista_Window_List.prototype.constructor = CGMV_Conquista_Window_List;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.initialize = function(x, y, height, width) {
	var newHeight = height;
	newHeight -= ($cgmv.usingConquistaPoints()) ? this.fittingHeight(2) : this.fittingHeight(1); // height of total window
    Window_Selectable.prototype.initialize.call(this, x, y, width, newHeight);
    this.refresh();
    this.select(0);
};
//-----------------------------------------------------------------------------
// Max Conquistas to be shown
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Currently selected Conquista
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Determine if current item enabled
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.isCurrentItemEnabled = function() {
    return true;
};
//-----------------------------------------------------------------------------
// Determine if Conquista is enabled
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.isEnabled = function(Conquista) {
    return (Conquista && Conquista.isObtido());
};
//-----------------------------------------------------------------------------
// Refresh window
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make list of Conquistas
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.makeItemList = function() {
    this._data = [];
	var Conquistas = $cgmv.getConquistas();
	Conquistas.forEach(function(Conquista) {
		if(!Conquista.isSecret() || Conquista.isObtido() || CGMV.Conquistas.ShowSecretConquistas) {
			this._data.push(Conquista);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Draw Conquista names
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.drawItem = function(index) {
    var Conquista = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(Conquista));
	if(Conquista.isSecret() && !Conquista.isObtido()) {
		this.drawText(CGMV.Conquistas.SecretText, rect.x, rect.y, rect.width, 'left');
	}
	else {
		this.drawText(Conquista.getName(), rect.x, rect.y, rect.width, 'left');
	}
    this.changePaintOpacity(true);
};
//-----------------------------------------------------------------------------
// Update helper window
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_List.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};
//=============================================================================
// CGMV_Conquista_Window_Totals
//-----------------------------------------------------------------------------
// Window displaying total Conquistas obtido and points (if applicable)
//=============================================================================
function CGMV_Conquista_Window_Totals() {
    this.initialize.apply(this, arguments);
}
CGMV_Conquista_Window_Totals.prototype = Object.create(Window_Base.prototype);
CGMV_Conquista_Window_Totals.prototype.constructor = CGMV_Conquista_Window_Totals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_Totals.prototype.initialize = function(x, y, width) {
    var height = ($cgmv.usingConquistaPoints()) ? this.fittingHeight(2) : this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_Totals.prototype.refresh = function() {
    this.contents.clear();
	var width = this.contents.width - this.textPadding() * 2;
	var obtido = $cgmv.countObtidoConquistas();
	var text = CGMV.Conquistas.ObtidoCountText + ": " + obtido;
    this.drawText(text, 0, 0, width, 'left');
	if($cgmv.usingConquistaPoints()) {
		var points = $cgmv.countObtidoConquistaPoints();
		text = CGMV.Conquistas.PointsText + ": " + points;
		this.drawText(text, 0, this.lineHeight(), width, 'left');
	}
};
//=============================================================================
// CGMV_Conquista_Window_Display
//-----------------------------------------------------------------------------
// Window displaying total Conquistas obtido and points (if applicable)
//=============================================================================
function CGMV_Conquista_Window_Display() {
    this.initialize.apply(this, arguments);
}
CGMV_Conquista_Window_Display.prototype = Object.create(CGMV_Window_Scrollable.prototype);
CGMV_Conquista_Window_Display.prototype.constructor = CGMV_Conquista_Window_Display;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_Display.prototype.initialize = function(x, y, width, height) {
	var heightMultiplier = 4; // maximum of 4 windows tall of data to scroll
    CGMV_Window_Scrollable.prototype.initialize.call(this, x, y, width, height, heightMultiplier, CGMV.Conquistas.ScrollWait, CGMV.Conquistas.ScrollSpeed);
	this._Conquista = null;
};
//-----------------------------------------------------------------------------
// Set the Conquista to be displayed
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_Display.prototype.setItem = function(Conquista) {
	this._Conquista = Conquista;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_Display.prototype.refresh = function() {
	if(this._Conquista == null) {
		return;
	}
	this.setupWindowForNewEntry();
	var Conquista = this._Conquista;
	var totalWidth = this.contents.width - this.textPadding() * 2;
	if(Conquista.isSecret() && !Conquista.isObtido()) {
		this.drawText(CGMV.Conquistas.SecretText, 0, 0, totalWidth, 'center')
	} else {
		this.drawText(Conquista.getName(), 0, 0, totalWidth, 'center');
	}
	var descriptor = "";
	var x = 0;
	var lines = 1;
	if(Conquista.isObtido()) {
		descriptor = CGMV.Conquistas.ObtidoText + ": ";
		this.changeTextColor(this.systemColor());
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		x = this.textWidth(descriptor);
		descriptor = Conquista._obterdate;
		this.changeTextColor(this.normalColor());
		this.drawText(descriptor, x, this.lineHeight()*lines, totalWidth-x, 'left');
	}
	else {
		this.changeTextColor(this.normalColor());
		descriptor = CGMV.Conquistas.UnobtidoText;
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
	}
	lines++;
	if(Conquista._difficulty !== "") {
		descriptor = CGMV.Conquistas.DifficultyText + ": ";
		this.changeTextColor(this.systemColor());
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		x = this.textWidth(descriptor);
		descriptor = Conquista._difficulty;
		this.changeTextColor(this.normalColor());
		this.drawText(descriptor, x, this.lineHeight()*lines, totalWidth-x, 'left');
		lines++;
	}
	if(Conquista._points > 0) {
		descriptor = CGMV.Conquistas.PointsText + ": ";
		this.changeTextColor(this.systemColor());
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		x = this.textWidth(descriptor);
		descriptor = Conquista._points;
		this.changeTextColor(this.normalColor());
		this.drawText(descriptor, x, this.lineHeight()*lines, totalWidth-x, 'left');
		lines++;
	}
	if(Conquista._predesc !== "" && !Conquista.isObtido()) {
		lines = this.drawConquistaDescription(Conquista._predesc, lines);
	}
	else if(Conquista._postdesc !== "" && Conquista.isObtido()) {
		lines = this.drawConquistaDescription(Conquista._postdesc, lines);
	}
	// Colors used for currency criteria gauges
	var currencyColor1 = this.textColor(CGMV.Conquistas.CurrencyGaugeColor1);
	var currencyColor2 = this.textColor(CGMV.Conquistas.CurrencyGaugeColor2);
	// Colors used for item criteria gauges
	var itemGaugeColor1 = this.textColor(CGMV.Conquistas.ItemGaugeColor1);
	var itemGaugeColor2 = this.textColor(CGMV.Conquistas.ItemGaugeColor2);
	// Colors used for switch and variable gauges
	var switchVarGaugeColor1 = this.textColor(CGMV.Conquistas.SwitchVarGaugeColor1);
	var switchVarGaugeColor2 = this.textColor(CGMV.Conquistas.SwitchVarGaugeColor2);
	// Common colors used for multiple criteria gauges
	var genericGaugeColor1 = this.textColor(CGMV.Conquistas.GenericGaugeColor1);
	var genericGaugeColor2 = this.textColor(CGMV.Conquistas.GenericGaugeColor1);
	// Draw criteria
	if(this.canShowCriteria(Conquista)) {
		var req = Conquista._requirements;
		this.changeTextColor(this.systemColor());
		descriptor = CGMV.Conquistas.RequirementText + ": ";
		x = this.textWidth(descriptor);
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		this.changeTextColor(this.normalColor());
		if(req.currency > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameParty.gold(), req.currency,
											  currencyColor1, currencyColor2, TextManager.currencyUnit, Conquista);
			x = 0;
		}
		if(req.steps > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameParty.steps(), req.steps,
											  genericGaugeColor1, genericGaugeColor2, "Steps", Conquista);
			x = 0;
		}
		if(req.saves > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameSystem.saveCount(), req.saves,
											  genericGaugeColor1, genericGaugeColor2, "Saves", Conquista);
			x = 0;
		}
		if(req.battles > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameSystem.battleCount(), req.battles,
											  genericGaugeColor1, genericGaugeColor2, "Battles", Conquista);
			x = 0;
		}
		if(req.wins > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameSystem.winCount(), req.wins,
											  genericGaugeColor1, genericGaugeColor2, "Wins", Conquista);
			x = 0;
		}
		if(req.escapes > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $gameSystem.escapeCount(), req.escapes,
											  genericGaugeColor1, genericGaugeColor2, "Escapes", Conquista);
			x = 0;
		}
		if(req.alcancetotal > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.countObtidoConquistas(), req.alcancetotal,
											  genericGaugeColor1, genericGaugeColor2, "Conquistas", Conquista);
			x = 0;
		}
		if(req.alcancepts > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.countObtidoConquistaPoints(), req.alcancepts,
											  genericGaugeColor1, genericGaugeColor2, "Points", Conquista);
			x = 0;
		}
		if(req.encyclopediatotal > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getEncyclopediaTotalPercent(), req.encyclopediatotal,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Total", Conquista);
			x = 0;
		}
		if(req.encyclopediabestiary > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getEncyclopediaBestiaryPercent(), req.encyclopediabestiary,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Bestiary", Conquista);
			x = 0;
		}
		if(req.encyclopediaitems > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getEncyclopediaItemsPercent(), req.encyclopediaitems,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Items", Conquista);
			x = 0;
		}
		if(req.encyclopediaweapons > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getEncyclopediaWeaponsPercent(), req.encyclopediaweapons,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Weapons", Conquista);
			x = 0;
		}
		if(req.encyclopediaarmors > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getEncyclopediaArmorsPercent(), req.encyclopediaarmors,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Armors", Conquista);
			x = 0;
		}
		if(req.encyclopediaskills > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getEncyclopediaSkillsPercent(), req.encyclopediaskills,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. Skills", Conquista);
			x = 0;
		}
		if(req.encyclopediastates > 0) {
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, $cgmv.getEncyclopediaStatesPercent(), req.encyclopediastates,
											  genericGaugeColor1, genericGaugeColor2, "% Enc. States", Conquista);
			x = 0;
		}
		for(var i = 0; i < req.professions.length; i++) {
			var name = req.professions[i].name;
			var profession = $cgmv.getProfession(name);
			lines = this.drawCriteriaProgress(x, lines, totalWidth-x, profession._level, req.professions[i].level,
											  genericGaugeColor1, genericGaugeColor2, " " + name + " Level", Conquista);
			x = 0;
		}
		if(req.playtime > 0) {
			var max = $gameSystem.playtime();
			if(Conquista.isObtido() || max > req.playtime) {
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
			lines = this.drawCriteriaItems(Conquista.isObtido(), req.items, x, lines, totalWidth-x,
										   itemGaugeColor1, itemGaugeColor2);
			x = 0;
		}
		if(req.switches.length > 0) {
			lines = this.drawCriteriaSwitches(Conquista.isObtido(), req.switches, x, lines, totalWidth-x,
										   switchVarGaugeColor1, switchVarGaugeColor2);
			x = 0;
		}
		if(req.variables.length > 0) {
			lines = this.drawCriteriaVariables(Conquista.isObtido(), req.variables, x, lines, totalWidth-x,
											   switchVarGaugeColor1, switchVarGaugeColor2);
			x = 0;
		}
	}
	if(this.canShowRewards(Conquista)) {
		var rew = Conquista._rewards;
		this.changeTextColor(this.systemColor());
		descriptor = CGMV.Conquistas.RewardText + ": ";
		x = this.textWidth(descriptor);
		this.drawText(descriptor, 0, this.lineHeight()*lines, totalWidth, 'left');
		this.changeTextColor(this.normalColor());
		if(rew.currency > 0) {
			var space = CGMV.Conquistas.CurrencyUnitSpace ? " " : "";
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
CGMV_Conquista_Window_Display.prototype.drawCriteriaProgress = function(x, lines, width, numerator, denominator,
																		  color1, color2, criteriaText, Conquista) {
	var y = this.lineHeight()*lines;
	var max = numerator;
	if(Conquista.isObtido() || numerator > denominator) {
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
CGMV_Conquista_Window_Display.prototype.drawCriteriaItems = function(obtido, itemArray, x, lines, width,
																		  color1, color2) {
	for(var i = 0; i < itemArray.length; i++) {
		var y = this.lineHeight()*lines;
		var criteriaObj = itemArray[i];
		var item = this.getItemObject(criteriaObj);
		var max = $gameParty.numItems(item);
		if(obtido || max > criteriaObj.amt) {
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
CGMV_Conquista_Window_Display.prototype.drawCriteriaSwitches = function(obtido, switchArray, x, lines, width,
																		  color1, color2) {
	for(var i = 0; i < switchArray.length; i++) {
		var y = this.lineHeight()*lines;
		var switchObj = switchArray[i];
		var switchval = $gameSwitches.value(switchObj.id);
		var max = (switchval == switchObj.value) ? 1 : 0;
		if(obtido) {
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
CGMV_Conquista_Window_Display.prototype.drawCriteriaVariables = function(obtido, variableArray, x, lines, width,
																		  color1, color2) {
	for(var i = 0; i < variableArray.length; i++) {
		var y = this.lineHeight()*lines;
		var variableObj = variableArray[i];
		if(variableObj.operator != ">" && variableObj.operator != ">=") {
			var max = 0
			if(obtido) {
				max = 1;
			}
			var rate = max/1;
			var descriptor = variableObj.description + " " + max.toString() + " / 1";
		}
		else {
			var trueVal = (variableObj.operator === '>') ? variableObj.value+1 : variableObj.value;
			var max = $gameVariables.value(variableObj.id);
			if(obtido || max > trueVal) {
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
CGMV_Conquista_Window_Display.prototype.drawRewardsItems = function(itemArray, x, lines, width) {
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
CGMV_Conquista_Window_Display.prototype.drawRewardsSwitches = function(switchArray, x, lines, width) {
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
CGMV_Conquista_Window_Display.prototype.drawRewardsVariables = function(variableArray, x, lines, width) {
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
CGMV_Conquista_Window_Display.prototype.getItemObject = function(itemObj) {
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
CGMV_Conquista_Window_Display.prototype.canShowCriteria = function(Conquista) {
	if(Conquista.isObtido() && !CGMV.Conquistas.ShowCriteriaAfterCompletion) return false;
	if(Conquista.isSecret() && !Conquista.isObtido()) return false;
	return Conquista.hasRequirements();
};
//-----------------------------------------------------------------------------
// Determine if the window should show rewards
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_Display.prototype.canShowRewards = function(Conquista) {
	if(Conquista.isSecret() && !Conquista.isObtido()) return false;
	return Conquista.hasRewards();
};
//-----------------------------------------------------------------------------
// Draw Conquista description - returns y-value of line below last line drawn
//-----------------------------------------------------------------------------
CGMV_Conquista_Window_Display.prototype.drawConquistaDescription = function(description, lines) {
	var descriptor1 = CGMV.Conquistas.DescriptionText + ": ";
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
// Alias: Check Conquistas that have currency criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameParty_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    alias_CGMV_Conquistas_GameParty_gainGold.call(this, amount);
	if(amount > 0) {
		$cgmv.checkConquistaCurrencyCriteria();
	}
};
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have steps criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameParty_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
	alias_CGMV_Conquistas_GameParty_increaseSteps.call(this);
	$cgmv.checkConquistastepsCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have items criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    alias_CGMV_Conquistas_GameParty_gainItem.call(this, item, amount, includeEquip);
	if(amount > 0) {
		$cgmv.checkConquistaItemsCriteria();
	}
};
//=============================================================================
// Game_System
//-----------------------------------------------------------------------------
// Automatic tracking for battles, wins, escapes, saves
// modified functions: onBattleStart, onBattleEscape, onBattleWin, onBeforeSave
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have battles criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameSystem_onBattleStart = Game_System.prototype.onBattleStart;
Game_System.prototype.onBattleStart = function() {
    alias_CGMV_Conquistas_GameSystem_onBattleStart.call(this);
	$cgmv.checkConquistaBattlesCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have wins criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameSystem_onBattleWin = Game_System.prototype.onBattleWin;
Game_System.prototype.onBattleWin = function() {
    alias_CGMV_Conquistas_GameSystem_onBattleWin.call(this);
	$cgmv.checkConquistaWinsCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have escapes criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameSystem_onBattleEscape = Game_System.prototype.onBattleEscape;
Game_System.prototype.onBattleEscape = function() {
	alias_CGMV_Conquistas_GameSystem_onBattleEscape.call(this);
    $cgmv.checkConquistaEscapesCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have saves criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameSystem_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
	alias_CGMV_Conquistas_GameSystem_onBeforeSave.call(this);
    $cgmv.checkConquistasavesCriteria();
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Automatic tracking for playtime (Using Scene Map so playtime Conquistas do
// not update in battle or mid-scene
// modified functions: update
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have playtime criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	alias_CGMV_Conquistas_SceneMap_update.call(this);
	if(Graphics.frameCount % 60 == 0) {
        $cgmv.checkConquistaPlaytimeCriteria();
    }
};
//=============================================================================
// Game_Switches
//-----------------------------------------------------------------------------
// Automatic tracking for switches
// modified functions: onChange
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have switch criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameSwitches_onChange = Game_Switches.prototype.onChange;
Game_Switches.prototype.onChange = function() {
    alias_CGMV_Conquistas_GameSwitches_onChange.call(this);
	$cgmv.checkConquistaswitchesCriteria();
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Automatic tracking for variables
// modified functions: onChange
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check Conquistas that have variable criteria
//-----------------------------------------------------------------------------
var alias_CGMV_Conquistas_GameVariables_onChange = Game_Variables.prototype.onChange;
Game_Variables.prototype.onChange = function() {
    alias_CGMV_Conquistas_GameVariables_onChange.call(this);
	$cgmv.checkConquistaVariablesCriteria();
};