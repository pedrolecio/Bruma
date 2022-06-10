/*:
 * @plugindesc CGMV Info
 * @author Casper Gaming
 * @help
 * ===========================================================================
 * For terms and conditions using this plugin in your game please visit:
 * http://caspergaming.com/dev/terms_of_use/
 * ===========================================================================
 * Become a Patron to get a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ===========================================================================
 * Version: 1.7
 * ---------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.1
 * Requires CGMV Core version 1.3+
 * ---------------------------------------------------------------------------
 * Description: This plugin allows you to add a powerful Info system
 * to your game. It can include things such as discovered enemies (bestiary),
 * items, weapons, armors, etc. and even states or custom categories.
 * ---------------------------------------------------------------------------
 * Documentation:
 * This plugin supports the following Plugin Commands:
 * - CGMVInfo Discover [symbol] [id]
 * This plugin command discovered the item with id for the category symbol.
 * Also works for custom categories.
 * Ex: CGMVInfo Discover bestiary 1
 *
 * - CGMVInfo Scene
 * This plugin command calls the Info Scene
 *
 * - CGMVInfo Initialize
 * This plugin command reinitializes the Info data. Only use for
 * testing with saved games where the data stored in the Info has
 * changed.
 *
 * Custom categories must be manually tracked. Default categories (bestiary,
 * item, weapon, armor, skill, state) will all be automatically tracked if
 * included except for some uncommon circumstances.
 *
 * This plugin supports the following notetags:
 * <cgmvdesc:[description]> - Puts a "note" in the Info display page
 *
 * <cgmvInfohide> - Does not include the item in the Info
 *
 * Large Icon Multiplier Option Help:
 * This option changes the size of the icon displayed by default for items,
 * armors, weapons, states, and skills. It displaces text to the right based
 * on its height. Here are some common multiplier sizes that play nice with
 * text:
 * Lines displaced: 1, use multiplier size: 1.1
 * Lines displaced: 2, use multiplier size: 2.2
 * Lines displaced: 3, use multiplier size: 3.3
 *
 * Version History:
 * 1.0 - Initial release
 *
 * 1.1:
 * - Can now scroll with Arrow Keys and Mouse Wheel
 * - No longer relies on deprecated CGMV Core commands
 *
 * 1.2:
 * - Fixed an issue with states not tracking properly for achievements
 *
 * 1.3:
 * - Compatibility patch for SRD SuperToolsEngine
 *
 * 1.4:
 * - Fixed bug that could cause game to crash when discovering the last item in the database
 *
 * 1.5:
 * - Fixed bug with skills mixing up TP and MP cost.
 *
 * 1.6:
 * - Fixed initialization bug that could occur with some other plugins.
 *
 * 1.7:
 * - Fixed bug with Discover plugin command not working.
 *
 * @param Category Options
 * 
 * @param Include Bestiary
 * @type boolean
 * @desc Determines to include the bestiary part of the Info
 * @default true
 * @parent Category Options
 * 
 * @param Include Items
 * @type boolean
 * @desc Determines to include the items part of the Info
 * @default true
 * @parent Category Options
 * 
 * @param Include Armors
 * @type boolean
 * @desc Determines to include the armors part of the Info
 * @default true
 * @parent Category Options
 * 
 * @param Include Weapons
 * @type boolean
 * @desc Determines to include the weapons part of the Info
 * @default true
 * @parent Category Options
 * 
 * @param Include Skills
 * @type boolean
 * @desc Determines to include the skills part of the Info
 * @default true
 * @parent Category Options
 * 
 * @param Include States
 * @type boolean
 * @desc Determines to include the states part of the Info
 * @default true
 * @parent Category Options
 *
 * @param Categories
 * @type struct<Category>[]
 * @default ["{\"Category Name\":\"Bestiary\",\"Category Symbol\":\"bestiary\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Items\",\"Category Symbol\":\"items\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Armors\",\"Category Symbol\":\"armors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Weapons\",\"Category Symbol\":\"weapons\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Skills\",\"Category Symbol\":\"skills\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"States\",\"Category Symbol\":\"states\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}"]
 * @desc Categories for the Info to select from in the Info scene.
 * @parent Category Options
 *
 * @param Custom Entry Options
 *
 * @param Custom Entries
 * @parent Custom Entry Options
 * @type struct<Custom>[]
 * @default []
 * @desc Custom entries not already covered in the Info
 *
 * @param Info Scene Options
 *
 * @param Info Scene Title
 * @desc Text to put in the title window at the top of the Info scene
 * @default Info
 * @parent Info Scene Options
 *
 * @param Unknown Entry
 * @desc Text to put in the list window for an unknown entry
 * @default ? ? ? ? ?
 * @parent Info Scene Options
 *
 * @param Unknown Entry Display
 * @desc Text to put in the display window for an unknown entry
 * @default This has not yet been discovered.
 * @parent Info Scene Options
 *
 * @param Total Window Text
 * @desc Text to put for the total completion %
 * @default Total
 * @parent Info Scene Options
 *
 * @param Total Window Rounding
 * @desc How many decimals to round to.
 * @type number
 * @min 1
 * @default 2
 * @parent Info Scene Options
 *
 * @param Number Entries
 * @type boolean
 * @desc Number each entry in the list window?
 * @default true
 * @parent Info Scene Options
 *
 * @param Display Window Options
 *
 * @param Scroll Wait
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * Default: 300
 * @default 300
 *
 * @param Scroll Speed
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * Default: 1
 * @default 1
 *
 * @param Large Icon Multiplier
 * @desc Determines the factor to increase the icon size by for a large icon
 * @type number
 * @decimals 1
 * @min 0.1
 * @default 3.3
 * @parent Display Window Options
 *
 * @param Text Options
 *
 * @param Yes Text
 * @desc Word to use for a yes answer
 * @default Yes
 * @parent Text Options
 *
 * @param No Text
 * @desc Word to use for a no answer
 * @default No
 * @parent Text Options
 *
 * @param Price Text
 * @desc Text to show when describing the price
 * @default Price
 * @parent Text Options
 *
 * @param No Price Text
 * @desc Text to show when describing the price when the item is unsellable
 * @default Not for sale
 * @parent Text Options
 *
 * @param Key Item Text
 * @desc Text to show when describing a key item or not key item
 * @default Key Item
 * @parent Text Options
 *
 * @param Possession Text
 * @desc Text to show when describing how many of an item the player has
 * @default Possession
 * @parent Text Options
 *
 * @param Equip Type Text
 * @desc Text to show when describing what slot the equipment goes in (equip type)
 * @default Equip Slot
 * @parent Text Options
 *
 * @param Armor Type Text
 * @desc Text to show when describing what type of armor it is (armor type)
 * @default Armor Type
 * @parent Text Options
 *
 * @param No Armor Type Text
 * @desc Text to show when armor has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Weapon Type Text
 * @desc Text to show when describing what type of weapon it is (weapon type)
 * @default Weapon Type
 * @parent Text Options
 *
 * @param No Weapon Type Text
 * @desc Text to show when weapon has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Skill Type Text
 * @desc Text to show when describing what type of skill it is (skill type)
 * @default Skill Type
 * @parent Text Options
 *
 * @param No Skill Type Text
 * @desc Text to show when skill has no type in database
 * @default Basic
 * @parent Text Options
 *
 * @param Drops Text
 * @desc Text to show when describing rewards from an enemy
 * @default Drops
 * @parent Text Options
 *
 * @param Show Drop Chances
 * @desc Determine whether drop chances are shown in the Info
 * @type boolean
 * @default true
 * @parent Text Options
 *
 * @param Drop Chance Text
 * @desc Text to show when describing drop chance for an item
 * @default Chance
 * @parent Text Options
 *
 * @param Sketch Text
 * @desc Text to show when describing a sketch for an item
 * @default Sketch
 * @parent Text Options
 *
 * @param Note Text
 * @desc Text to describe what is found in meta notes
 * @default Note
 * @parent Text Options
 *
 * @param Success Rate Text
 * @desc Text to describe success rate of an item
 * @default Success Rate
 * @parent Text Options
 *
 * @param Consumable Text
 * @desc Text to describe whether an item is consumable
 * @default Consumable
 * @parent Text Options
 *
 * @param Effects Text
 * @desc Text to describe effects
 * @default Item Effects
 * @parent Text Options
 *
 * @param HP Effect Text
 * @desc Text to describe when an item has an HP effect
 * @default HP Effect
 * @parent Text Options
 *
 * @param MP Effect Text
 * @desc Text to describe when an item has an MP effect
 * @default MP Effect
 * @parent Text Options
 *
 * @param TP Effect Text
 * @desc Text to describe when an item has a TP effect
 * @default TP Effect
 * @parent Text Options
 *
 * @param Add State Text
 * @desc Text to describe when an item has an add state effect
 * @default Causes
 * @parent Text Options
 *
 * @param Remove State Text
 * @desc Text to describe when an item has a remove state effect
 * @default Cures
 * @parent Text Options
 *
 * @param Add Buff Text
 * @desc Text to describe when an item has a buff effect
 * @default Buffs
 * @parent Text Options
 *
 * @param Add Debuff Text
 * @desc Text to describe when an item has a debuff effect
 * @default Debuffs
 * @parent Text Options
 *
 * @param Remove Buff Text
 * @desc Text to describe when an item removes a buff effect
 * @default Remove Buffs
 * @parent Text Options
 *
 * @param Remove Debuff Text
 * @desc Text to describe when an item removes a debuff effect
 * @default Clear Debuffs
 * @parent Text Options
 *
 * @param Grow Text
 * @desc Text to describe when an item has a grow effect
 * @default Trains
 * @parent Text Options
 *
 * @param Learn Spell Text
 * @desc Text to describe when an item has a learn skill effect
 * @default Teaches
 * @parent Text Options
 *
 * @param Party Ability Text
 * @desc Text to describe when an armor or weapon has a party ability trait
 * @default Special Effect
 * @parent Text Options
 *
 * @param Half Encounter Text
 * @desc Text to describe party ability half encounter
 * @default Half Encounter Rate
 * @parent Text Options
 *
 * @param No Encounter Text
 * @desc Text to describe party ability no encounter
 * @default No Encounters
 * @parent Text Options
 *
 * @param Cancel Surprise Text
 * @desc Text to describe party ability cancel surprise
 * @default Cancel Surprise
 * @parent Text Options
 *
 * @param Raise Preemptive Text
 * @desc Text to describe party ability raise preemptive
 * @default Raise Preemptive
 * @parent Text Options
 *
 * @param Gold Double Text
 * @desc Text to describe party ability gold double
 * @default 2x Gold Drops
 * @parent Text Options
 *
 * @param Drop Item Double Text
 * @desc Text to describe party ability drop item double
 * @default 2x Item Drops
 * @parent Text Options
 *
 * @param Description Text
 * @desc Text to describe item description
 * @default Description
 * @parent Text Options
 *
 * @param Element Text
 * @desc Text to describe attack element trait
 * @default Element
 * @parent Text Options
 *
 * @param Attack Speed Text
 * @desc Text to describe attack speed trait
 * @default Speed Effect
 * @parent Text Options
 *
 * @param Attack Times Text
 * @desc Text to describe attack times + trait
 * @default Additional Attacks
 * @parent Text Options
 *
 * @param Attack State Text
 * @desc Text to describe attack apply state trait
 * @default Applies
 * @parent Text Options
 *
 * @param MP Cost Text
 * @desc Text to describe MP Cost
 * @default MP Cost
 * @parent Text Options
 *
 * @param TP Cost Text
 * @desc Text to describe TP Cost
 * @default TP Cost
 * @parent Text Options
 *
 * @param User TP Gain Text
 * @desc Text to describe user TP Gain
 * @default User TP Gain
 * @parent Text Options
 *
 * @param Battle Removal Text
 * @desc Text to describe state removal after battle property
 * @default Removed after battle
 * @parent Text Options
 *
 * @param Walking Removal Text
 * @desc Text to describe state removal after walking property
 * @default Removed after walking
 * @parent Text Options
 *
 * @param Damage Removal Text
 * @desc Text to describe state removal after damage property
 * @default Removed after damage
 * @parent Text Options
 *
 * @param Duration Text
 * @desc Text to describe state auto-removal duration
 * @default Duration
 * @parent Text Options
 *
 * @param Infinite Text
 * @desc Text to describe when state not automatically removed after some number of turns
 * @default Infinite
 * @parent Text Options
 *
 * @param Turns Text
 * @desc Text to describe turns in battle
 * @default Turns
 * @parent Text Options
 *
 * @param Seal Skill Types Text
 * @desc Text to describe trait that seals skill types
 * @default Locks
 * @parent Text Options
 *
 * @param Add Skill Types Text
 * @desc Text to describe trait that adds skill types
 * @default Unlocks
 * @parent Text Options
 *
 * @param Seal Skill Text
 * @desc Text to describe trait that seals skills
 * @default Locks
 * @parent Text Options
 *
 * @param Add Skill Text
 * @desc Text to describe trait that adds skills
 * @default Grants
 * @parent Text Options
 *
 * @param State Resist Text
 * @desc Text to describe trait that resists states
 * @default Resists
 * @parent Text Options
*/
/*~struct~Category:
 * @param Category Name
 * @type text
 * @desc Text to show for category name
 * 
 * @param Category Symbol
 * @type text
 * @desc Internal recognition of category, see documentation for help
 *
 * @param Category Display Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to show up in category window
 * 
 * @param Category Enable Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to be enabled and selectable
 */
 /*~struct~Requirements:
 * @param Item
 * @type item
 * 
 * @param Switch
 * @type switch
 */
  /*~struct~Custom:
 * @param Name
 * @type text
 * @desc The entry name.
 * 
 * @param Category Symbol
 * @type text
 * @desc Category this entry belongs to.
 *
 * @param Description
 * @type note
 * @desc Description to display for the entry.
 * 
 * @param Sketch
 * @dir img/
 * @type file
 * @desc image to show at bottom of entry.
 */
var Imported = Imported || {};
Imported.CGMV_Info = true;
var CGMV = CGMV || {};
CGMV.Info = CGMV.Info || {};
CGMV.Info.version = 1.7;
CGMV.Info.parameters = PluginManager.parameters('CGMV_Info');
CGMV.Info.IncludeBestiary = (CGMV.Info.parameters["Include Bestiary"] === "true") ? true : false;
CGMV.Info.IncludeItems = (CGMV.Info.parameters["Include Items"] === "true") ? true : false;
CGMV.Info.IncludeArmors = (CGMV.Info.parameters["Include Armors"] === "true") ? true : false;
CGMV.Info.IncludeWeapons = (CGMV.Info.parameters["Include Weapons"] === "true") ? true : false;
CGMV.Info.IncludeSkills = (CGMV.Info.parameters["Include Skills"] === "true") ? true : false;
CGMV.Info.IncludeStates = (CGMV.Info.parameters["Include States"] === "true") ? true : false;
CGMV.Info.NumberEntries = (CGMV.Info.parameters["Number Entries"] === "true") ? true : false;
CGMV.Info.ShowDropChances = (CGMV.Info.parameters["Show Drop Chances"] === "true") ? true : false;
CGMV.Info.InfoWindowTitle = CGMV.Info.parameters["Info Scene Title"] || "Info";
CGMV.Info.UnknownEntry = CGMV.Info.parameters["Unknown Entry"] || "? ? ? ? ?";
CGMV.Info.UnknownEntryDisplay = CGMV.Info.parameters["Unknown Entry Display"] || "This has not yet been discovered.";
CGMV.Info.TotalText = CGMV.Info.parameters["Total Window Text"] || "Total";
CGMV.Info.PriceText = CGMV.Info.parameters["Price Text"] || "Price";
CGMV.Info.NoPriceText = CGMV.Info.parameters["No Price Text"] || "Not for sale";
CGMV.Info.KeyItemText = CGMV.Info.parameters["Key Item Text"] || "Key Item";
CGMV.Info.PossessionText = CGMV.Info.parameters["Possession Text"] || "Possession";
CGMV.Info.EquipTypeText = CGMV.Info.parameters["Equip Type Text"] || "Equip Slot";
CGMV.Info.ArmorTypeText = CGMV.Info.parameters["Armor Type Text"] || "Armor Type";
CGMV.Info.NoArmorTypeText = CGMV.Info.parameters["No Armor Type Text"] || "None";
CGMV.Info.WeaponTypeText = CGMV.Info.parameters["Weapon Type Text"] || "Weapon Type";
CGMV.Info.NoWeaponTypeText = CGMV.Info.parameters["No Weapon Type Text"] || "None";
CGMV.Info.SkillTypeText = CGMV.Info.parameters["Skill Type Text"] || "Skill Type";
CGMV.Info.NoSkillTypeText = CGMV.Info.parameters["No Skill Type Text"] || "Basic";
CGMV.Info.DropsText = CGMV.Info.parameters["Drops Text"] || "Drops";
CGMV.Info.DropChanceText = CGMV.Info.parameters["Drop Chance Text"] || "Chance";
CGMV.Info.SketchText = CGMV.Info.parameters["Sketch Text"] || "Sketch";
CGMV.Info.NoteText = CGMV.Info.parameters["Note Text"] || "Note";
CGMV.Info.SuccessRateText = CGMV.Info.parameters["Success Rate Text"] || "Success Rate";
CGMV.Info.ConsumableText = CGMV.Info.parameters["Consumable Text"] || "Consumable";
CGMV.Info.EffectsText = CGMV.Info.parameters["Effects Text"] || "Effects";
CGMV.Info.HPEffectText = CGMV.Info.parameters["HP Effect Text"] || "HP Effect";
CGMV.Info.MPEffectText = CGMV.Info.parameters["MP Effect Text"] || "MP Effect";
CGMV.Info.TPEffectText = CGMV.Info.parameters["TP Effect Text"] || "TP Effect";
CGMV.Info.AddStateText = CGMV.Info.parameters["Add State Text"] || "Causes";
CGMV.Info.RemoveStateText = CGMV.Info.parameters["Remove State Text"] || "Cures";
CGMV.Info.AddBuffText = CGMV.Info.parameters["Add Buff Text"] || "Buffs";
CGMV.Info.AddDebuffText = CGMV.Info.parameters["Add Debuff Text"] || "Debuffs";
CGMV.Info.BuffRemovalText = CGMV.Info.parameters["Remove Buff Text"] || "Remove Buffs";
CGMV.Info.DebuffRemovalText = CGMV.Info.parameters["Remove Debuff Text"] || "Clear Debuffs";
CGMV.Info.GrowText = CGMV.Info.parameters["Grow Text"] || "Trains";
CGMV.Info.LearnSkillText = CGMV.Info.parameters["Learn Skill Text"] || "Teaches";
CGMV.Info.PartyAbilityText = CGMV.Info.parameters["Party Ability Text"] || "Special Effect";
CGMV.Info.HalfEncounterText = CGMV.Info.parameters["Half Encounter Text"] || "Half Encounter Rate";
CGMV.Info.NoEncounterText = CGMV.Info.parameters["No Encounter Text"] || "No Encounters";
CGMV.Info.CancelSurpriseText = CGMV.Info.parameters["Cancel Surprise Text"] || "Cancel Surprise";
CGMV.Info.RaisePreemptiveText = CGMV.Info.parameters["Raise Preemptive Text"] || "Raise Preemptive";
CGMV.Info.GoldDoubleText = CGMV.Info.parameters["Gold Double Text"] || "2x Gold Drops";
CGMV.Info.DropItemDoubleText = CGMV.Info.parameters["Drop item Double Text"] || "2x Item Drops";
CGMV.Info.DescriptionText = CGMV.Info.parameters["Description Text"] || "Description";
CGMV.Info.ElementText = CGMV.Info.parameters["Element Text"] || "Element";
CGMV.Info.AttackSpeedText = CGMV.Info.parameters["Attack Speed Text"] || "Speed Bonus";
CGMV.Info.AttackTimesText = CGMV.Info.parameters["Attack Times Text"] || "Additional Attacks";
CGMV.Info.AttackStateText = CGMV.Info.parameters["Attack State Text"] || "Applies";
CGMV.Info.MPCostText = CGMV.Info.parameters["MP Cost Text"] || "MP Cost";
CGMV.Info.TPCostText = CGMV.Info.parameters["TP Cost Text"] || "TP Cost";
CGMV.Info.UserTPGainText = CGMV.Info.parameters["User TP Gain Text"] || "User TP Gain";
CGMV.Info.BattleRemovalText = CGMV.Info.parameters["Battle Removal Text"] || "Removed after battle";
CGMV.Info.WalkingRemovalText = CGMV.Info.parameters["Walking Removal Text"] || "Removed after walking";
CGMV.Info.DamageRemovalText = CGMV.Info.parameters["Damage Removal Text"] || "Removed after damage";
CGMV.Info.DurationText = CGMV.Info.parameters["Duration Text"] || "Duration";
CGMV.Info.InfiniteText = CGMV.Info.parameters["Infinite Text"] || "Infinite";
CGMV.Info.TurnsText = CGMV.Info.parameters["Turns Text"] || "Turns";
CGMV.Info.SealSkillTypesText = CGMV.Info.parameters["Seal Skill Types Text"] || "Locks";
CGMV.Info.AddSkillTypesText = CGMV.Info.parameters["Add Skill Types Text"] || "Unlocks";
CGMV.Info.SealSkillText = CGMV.Info.parameters["Seal Skill Text"] || "Locks";
CGMV.Info.AddSkillText = CGMV.Info.parameters["Add Skill Text"] || "Grants";
CGMV.Info.StateResistText = CGMV.Info.parameters["State Resist Text"] || "Resists";
CGMV.Info.YesText = CGMV.Info.parameters["Yes Text"] || "Yes";
CGMV.Info.NoText = CGMV.Info.parameters["No Text"] || "No";
CGMV.Info.DecimalSpots = Number(CGMV.Info.parameters["Total Window Rounding"]) || 2;
CGMV.Info.ScrollWait = Number(CGMV.Info.parameters["Scroll Wait"]) || 300;
CGMV.Info.ScrollSpeed = Number(CGMV.Info.parameters["Scroll Speed"]) || 1;
CGMV.Info.LargeIconMultiplier = parseFloat(CGMV.Info.parameters["Large Icon Multiplier"]) || 3.0;
CGMV.Info.Categories = JSON.parse(CGMV.Info.parameters["Categories"]);
CGMV.Info.CustomEntries = JSON.parse(CGMV.Info.parameters["Custom Entries"]);
//=============================================================================
// CGMV_InfoData
//-----------------------------------------------------------------------------
// Class that stores the id and discovery of built-in Info classes
// such as enemies or items. Not for custom category data.
//=============================================================================
function CGMV_InfoData(id, index) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMV_InfoData.prototype.initialize = function(id, index) {
	this._id = id;
	this._index = index;
	this._discovered = false;
};
//=============================================================================
// CGMV_CustomInfoData
//-----------------------------------------------------------------------------
// Class that stores the data of custom entries in the Info
//=============================================================================
function CGMV_CustomInfoData(id, data) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMV_CustomInfoData.prototype.initialize = function(id, data) {
	this._id = id+1;
	this._index = id+1;
	this._discovered = false;
	this._name = data.Name;
	this._sketch = (data.Sketch == "") ? null : "img/" + data.Sketch;
	this._description = data.Description;
};
//=============================================================================
// CGMV_Info
//-----------------------------------------------------------------------------
// Store and manage Info data.
//=============================================================================
function CGMV_Info() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Info
//-----------------------------------------------------------------------------
CGMV_Info.prototype.initialize = function() {
	this._bestiary = [];
	this._items = [];
	this._armors = [];
	this._weapons = [];
	this._skills = [];
	this._states = [];
	this.initializeData(this._bestiary, $dataEnemies.length-1, 'bestiary'); // -1 because $data are not
	this.initializeData(this._items, $dataItems.length-1, 'items');      // 0-indexed, but have null
	this.initializeData(this._armors, $dataArmors.length-1, 'armors');    // for first value instead
	this.initializeData(this._weapons, $dataWeapons.length-1, 'weapons');
	this.initializeData(this._skills, $dataSkills.length-1, 'skills');
	this.initializeData(this._states, $dataStates.length-1, 'states');
	this._totalDiscovered = 0;
	this._bestiaryDiscovered = 0;
	this._itemsDiscovered = 0;
	this._armorsDiscovered = 0;
	this._weaponsDiscovered = 0;
	this._skillsDiscovered = 0;
	this._statesDiscovered = 0;
	this._customData = {};
	this._customDiscovered = {};
	this.initializeCustomData();
	this._totalEntries = this.calculateTotalEntries();
};
//-----------------------------------------------------------------------------
// Initialize any Info data array to all undiscovered.
//-----------------------------------------------------------------------------
CGMV_Info.prototype.initializeData = function(array, length, symbol) {
	switch(symbol) {
		case 'bestiary':
			if(!CGMV.Info.IncludeBestiary) return;
			var gameData = $dataEnemies;
			break;
		case 'items':
			if(!CGMV.Info.IncludeItems) return;
			var gameData = $dataItems;
			break;
		case 'armors':
			if(!CGMV.Info.IncludeArmors) return;
			var gameData = $dataArmors;
			break;
		case 'weapons':
			if(!CGMV.Info.IncludeWeapons) return;
			var gameData = $dataWeapons;
			break;
		case 'skills':
			if(!CGMV.Info.IncludeSkills) return;
			var gameData = $dataSkills;
			break;
		case 'states':
			if(!CGMV.Info.IncludeStates) return;
			var gameData = $dataStates;
	}
	var index = 1;
	for(var i = 0; i < length; i++) {
		if(gameData[i+1] && gameData[i+1].meta && gameData[i+1].meta.cgmvInfohide) continue;
		var data = new CGMV_InfoData(i+1, index); // i+1 because $data are not 0-indexed
		array.push(data);
		index++;
	}
};
//-----------------------------------------------------------------------------
// Initialize custom data
//-----------------------------------------------------------------------------
CGMV_Info.prototype.initializeCustomData = function() {
	var customData = CGMV.Info.CustomEntries;
	for(var i = 0; i < customData.length; i++) {
		var data = JSON.parse(customData[i]);
		var symbol = data["Category Symbol"];
		if(!this._customData.hasOwnProperty(symbol)) {
			this._customData[symbol] = [];
			this._customDiscovered[symbol] = 0;
		}
		var obj = new CGMV_CustomInfoData(this._customData[symbol].length, data);
		this._customData[symbol].push(obj);
	}
};
//-----------------------------------------------------------------------------
// Calculate total amount of entries
//-----------------------------------------------------------------------------
CGMV_Info.prototype.calculateTotalEntries = function() {
	var total = 0;
	if(CGMV.Info.IncludeBestiary) total += this._bestiary.length;
	if(CGMV.Info.IncludeItems) total += this._items.length;
	if(CGMV.Info.IncludeArmors) total += this._armors.length;
	if(CGMV.Info.IncludeWeapons) total += this._weapons.length;
	if(CGMV.Info.IncludeSkills) total += this._skills.length;
	if(CGMV.Info.IncludeStates) total += this._states.length;
	if(this._customData) {
		var keyArray = Object.keys(this._customData);
		for(var i = 0; i < keyArray.length; i++) {
			total += this._customData[keyArray[i]].length;
		}
	}
	return total;
};
//-----------------------------------------------------------------------------
// Processing a (potential) new discovery
//-----------------------------------------------------------------------------
CGMV_Info.prototype.processDiscovery = function(symbol, id) {
	symbol = symbol.toLowerCase();
	var dataArray = this.getInfoData(symbol);
	if(dataArray.length < 1) return;
	var dataObject = this.getInfoObject(dataArray, Number(id));
	if(dataObject && !dataObject._discovered) { // Actually is new discovery
		this._totalDiscovered++;
		switch(symbol) {
			case 'bestiary':
				this._bestiaryDiscovered++;
				break;
			case 'items':
				this._itemsDiscovered++;
				break;
			case 'armors':
				this._armorsDiscovered++;
				break;
			case 'weapons':
				this._weaponsDiscovered++;
				break;
			case 'skills':
				this._skillsDiscovered++;
				break;
			case 'states':
				this._statesDiscovered++;
				break;
			default:
				this._customDiscovered[symbol]++;
		}
		dataObject._discovered = true;
		if(Imported.CGMV_Achievements && CGMV.Achievements.version > 1.1) $cgmv.checkAchievementInfoCriteria(); // 1.2 version when enc. ach added
	}
};
//-----------------------------------------------------------------------------
// Get Info Object from Array
// Possible that arrays are not in order of the ID, in this case it will find proper ID.
//-----------------------------------------------------------------------------
CGMV_Info.prototype.getInfoObject = function(array, id) {
	if(array[id-1] && array[id-1]._id === id) return array[id-1];
	for(var i = 0; i < array.length; i++) {
		if(array[i]._id === id) return array[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get Info Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMV_Info.prototype.getAmountDiscovered = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalDiscovered;
		case 'bestiary': return this._bestiaryDiscovered;
		case 'items': return this._itemsDiscovered;
		case 'armors': return this._armorsDiscovered;
		case 'weapons': return this._weaponsDiscovered;
		case 'skills': return this._skillsDiscovered;
		case 'states': return this._statesDiscovered;
		default: return (this._customDiscovered[symbol] || this._customDiscovered[symbol] === 0) ? this._customDiscovered[symbol] : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Info Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMV_Info.prototype.getAmountEntries = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalEntries;
		case 'bestiary': return this._bestiary.length;
		case 'items': return this._items.length;
		case 'armors': return this._armors.length;
		case 'weapons': return this._weapons.length;
		case 'skills': return this._skills.length;
		case 'states': return this._states.length;
		default: return (this._customData[symbol]) ? this._customData[symbol].length : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Info Data
// Returns data array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMV_Info.prototype.getInfoData = function(symbol) {
	switch(symbol) {
		case 'bestiary': return this._bestiary;
		case 'items': return this._items;
		case 'armors': return this._armors;
		case 'weapons': return this._weapons;
		case 'skills': return this._skills;
		case 'states': return this._states;
		default: return (this._customData[symbol]) ? this._customData[symbol] : [];
	}
};
//-----------------------------------------------------------------------------
// Discover troop enemies
//-----------------------------------------------------------------------------
CGMV_Info.prototype.discoverTroop = function(troopId) {
	if(!CGMV.Info.IncludeBestiary) return;
	var troop = $dataTroops[troopId];
	troop.members.forEach(function(member) {
		if ($dataEnemies[member.enemyId]) {
			this.processDiscovery('bestiary', member.enemyId);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Discover items, weapons, or armors
//-----------------------------------------------------------------------------
CGMV_Info.prototype.discoverItem = function(id, symbol) {
	if(symbol == "item") {
		if(!CGMV.Info.IncludeItems) return;
		this.processDiscovery('items', id);
	}
	else if(symbol == "weapon") {
		if(!CGMV.Info.IncludeWeapons) return;
		this.processDiscovery('weapons', id);
	}
	else if(symbol == "armor") {
		if(!CGMV.Info.IncludeArmors) return;
		this.processDiscovery('armors', id);
	}
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMV_Info.prototype.discoverSkill = function(id) {
	if(!CGMV.Info.IncludeSkills) return;
	this.processDiscovery('skills', id);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMV_Info.prototype.discoverState = function(id) {
	if(!CGMV.Info.IncludeStates) return;
	this.processDiscovery('states', id);
};
//=============================================================================
// CGMV
//-----------------------------------------------------------------------------
// Manage Info data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize Info data
//-----------------------------------------------------------------------------
var alias_CGMV_Info_createPluginData = CGMV_Core.prototype.createPluginData;
CGMV_Core.prototype.createPluginData = function() {
	alias_CGMV_Info_createPluginData.call(this);
	this.initializeInfoData(false);
};
//-----------------------------------------------------------------------------
// Initialize Info data
//-----------------------------------------------------------------------------
CGMV_Core.prototype.initializeInfoData = function(reinitialize) {
	if(!this._Info || reinitialize) {
		this.setupInfoVariables();
	}
};
//-----------------------------------------------------------------------------
// Initialize Info variables
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupInfoVariables = function() {
	this._Info = new CGMV_Info();
};
//-----------------------------------------------------------------------------
// Alias. Handles Info plugin commands
//-----------------------------------------------------------------------------
var alias_CGMV_Info_pluginCommand = CGMV_Core.prototype.pluginCommand;
CGMV_Core.prototype.pluginCommand = function(command, args) {
	alias_CGMV_Info_pluginCommand.call(this, command, args);
	if(command == "CGMVInfo") {
		if(args[0] == "Scene") {
			SceneManager.push(CGMV_Scene_Info);
		}
		else if(args[0] == "Discover") {
			this.InfoDiscovery(args[1], args[2]);
		}
		else if(args[0] == "Initialize") {
			this.initializeInfoData(true);
		}
	}
};
//-----------------------------------------------------------------------------
// Discover Info entry manually
//-----------------------------------------------------------------------------
CGMV_Core.prototype.InfoDiscovery = function(symbol, id) {
	this._Info.processDiscovery(symbol, id);
};
//-----------------------------------------------------------------------------
// Get Info Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoDiscovered = function(symbol) {
	return this._Info.getAmountDiscovered(symbol);
};
//-----------------------------------------------------------------------------
// Get Info Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoEntries = function(symbol) {
	return this._Info.getAmountEntries(symbol);
};
//-----------------------------------------------------------------------------
// Get Info Data Array
// Returns proper array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoData = function(symbol) {
	return this._Info.getInfoData(symbol);
};
//-----------------------------------------------------------------------------
// Get Info Object
// Returns data object from array
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoObject = function(symbol, id) {
	var array = this._Info.getInfoData(symbol);
	return this._Info.getInfoObject(array, id);
};
//-----------------------------------------------------------------------------
// Discover enemies from a troop
//-----------------------------------------------------------------------------
CGMV_Core.prototype.InfoDiscoverTroop = function(troopId) {
	this._Info.discoverTroop(troopId);
};
//-----------------------------------------------------------------------------
// Discover items, weapons, and armors (symbol = "item", "weapon", "armor")
//-----------------------------------------------------------------------------
CGMV_Core.prototype.InfoDiscoverItem = function(id, symbol) {
	this._Info.discoverItem(id, symbol);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMV_Core.prototype.InfoDiscoverSkill = function(skillId) {
	this._Info.discoverSkill(skillId);
};
//-----------------------------------------------------------------------------
// Discover states
//-----------------------------------------------------------------------------
CGMV_Core.prototype.InfoDiscoverState = function(stateId) {
	this._Info.discoverState(stateId);
};
//-----------------------------------------------------------------------------
// Get total discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoTotalPercent = function() {
	var percentage = this._Info.getAmountDiscovered('total') / this._Info.getAmountEntries('total');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Info.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get bestiary discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoBestiaryPercent = function() {
	var percentage = this._Info.getAmountDiscovered('bestiary') / this._Info.getAmountEntries('bestiary');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Info.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get items discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoItemsPercent = function() {
	var percentage = this._Info.getAmountDiscovered('items') / this._Info.getAmountEntries('items');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Info.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get weapons discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoWeaponsPercent = function() {
	var percentage = this._Info.getAmountDiscovered('weapons') / this._Info.getAmountEntries('weapons');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Info.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get armors discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoArmorsPercent = function() {
	var percentage = this._Info.getAmountDiscovered('armors') / this._Info.getAmountEntries('armors');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Info.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get skills discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoSkillsPercent = function() {
	var percentage = this._Info.getAmountDiscovered('skills') / this._Info.getAmountEntries('skills');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Info.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get states discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoStatesPercent = function() {
	var percentage = this._Info.getAmountDiscovered('states') / this._Info.getAmountEntries('states');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Info.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get custom discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getInfoCustomPercent = function(symbol) {
	var percentage = this._Info.getAmountDiscovered(symbol) / this._Info.getAmountEntries(symbol);
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Info.DecimalSpots));
};
//=============================================================================
// CGMV_Scene_Info
//-----------------------------------------------------------------------------
// Handle the Info scene
//=============================================================================
function CGMV_Scene_Info() {
    this.initialize.apply(this, arguments);
}
CGMV_Scene_Info.prototype = Object.create(Scene_MenuBase.prototype);
CGMV_Scene_Info.prototype.constructor = CGMV_Scene_Info;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create Info windows
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createTitleWindow();
	this.createCategoryWindow();
	this.createTotalsWindow();
	this.createListWindow();
	this.createDummyWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create Info title window
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.createTitleWindow = function() {
    this._titleWindow = new CGMV_Window_Title(0, 0, CGMV.Info.InfoWindowTitle);
	this._titleWindow.refresh();
    this.addWindow(this._titleWindow);
};
//-----------------------------------------------------------------------------
// Create Info category window
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.createCategoryWindow = function() {
    this._categoryWindow = new CGMV_Window_InfoCategory(0, this._titleWindow.height);
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Create Totals Window
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.createTotalsWindow = function() {
    this._totalsWindow = new CGMV_Window_InfoTotals(0, 0);
	this._categoryWindow.setTotalWindow(this._totalsWindow);
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Create List Window
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.createListWindow = function() {
	var width = Graphics.boxWidth/3;
	var height = Graphics.boxHeight - this._titleWindow.height - this._categoryWindow.height - this._totalsWindow.height;
	var y = this._titleWindow.height + this._categoryWindow.height;
    this._listWindow = new CGMV_Window_InfoList(0, y, width, height);
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._categoryWindow.setListWindow(this._listWindow);
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Create Dummy Window
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.createDummyWindow = function() {
    var x = this._listWindow.width;
	var y = this._titleWindow.height + this._categoryWindow.height;
	var width = Graphics.boxWidth*2/3
	var height = Graphics.boxHeight - this._titleWindow.height - this._categoryWindow.height;
    this._dummyWindow = new Window_Base(x, y, width, height);
    this.addWindow(this._dummyWindow);
};
//-----------------------------------------------------------------------------
// Create Display Window
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.createDisplayWindow = function() {
    var x = this._dummyWindow.x;
	var y = this._dummyWindow.y;
	var width = this._dummyWindow.width;
	var height = this._dummyWindow.height;
    this._displayWindow = new CGMV_Window_InfoDisplay(x, y, width, height);
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.hide();
	this._displayWindow.deactivate();
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// On category OK
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.onCategoryOk = function() {
	this._dummyWindow.hide();
	this._displayWindow.show();
    this._categoryWindow.deactivate();
	this._listWindow.activate();
	this._listWindow.select(0);
};
//-----------------------------------------------------------------------------
// On list cancel
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.onListCancel = function() {
	this._dummyWindow.show();
	this._displayWindow.hide();
    this._categoryWindow.activate();
	this._listWindow.deactivate();
	this._listWindow.deselect();
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMV_Scene_Info.prototype.onDisplayCancel = function() {
    this._displayWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMV_Window_InfoCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category in the Info
//=============================================================================
function CGMV_Window_InfoCategory(x, y) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_InfoCategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMV_Window_InfoCategory.prototype.constructor = CGMV_Window_InfoCategory;
//-----------------------------------------------------------------------------
// Window Width
//-----------------------------------------------------------------------------
CGMV_Window_InfoCategory.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMV_Window_InfoCategory.prototype.makeCommandList = function() {
	for(var i = 0; i < CGMV.Info.Categories.length; i++) {
		var categoryData = JSON.parse(CGMV.Info.Categories[i]);
		if(this.canShowCommand(categoryData)) {
			var name = categoryData["Category Name"];
			var symbol = categoryData["Category Symbol"];
			this.addCommand(name, symbol, this.enableInfoCommand(categoryData));
		}
	}
};
//-----------------------------------------------------------------------------
// Can Show Category?
//-----------------------------------------------------------------------------
CGMV_Window_InfoCategory.prototype.canShowCommand = function(categoryData) {
	if(categoryData["Category Symbol"] === "bestiary" && !CGMV.Info.IncludeBestiary) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "items" && !CGMV.Info.IncludeItems) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "armors" && !CGMV.Info.IncludeArmors) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "weapons" && !CGMV.Info.IncludeWeapons) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "skills" && !CGMV.Info.IncludeSkills) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "states" && !CGMV.Info.IncludeStates) {
		return false;
	}
	var showReqs = JSON.parse(categoryData["Category Display Requirements"]);
	var itemID = Number(showReqs["Item"]);
	var switchID = Number(showReqs["Switch"]);
	if(itemID > 0 && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID > 0 && $gameSwitches.value(switchID) != true) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Command Enabled?
//-----------------------------------------------------------------------------
CGMV_Window_InfoCategory.prototype.enableInfoCommand = function(categoryData) {
	var enableReqs = JSON.parse(categoryData["Category Enable Requirements"]);
	var itemID = Number(enableReqs["Item"]);
	var switchID = Number(enableReqs["Switch"]);
	if(itemID > 0 && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID > 0 && $gameSwitches.value(switchID) != true) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Set total (helper) window
//-----------------------------------------------------------------------------
CGMV_Window_InfoCategory.prototype.setTotalWindow = function(totalWindow) {
	this._totalWindow = totalWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMV_Window_InfoCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMV_Window_InfoCategory.prototype.callUpdateHelp = function() {
	if(this.active) {
		this.updateHelperWindows();
	}
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMV_Window_InfoCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) {
		this._listWindow.setItem(this.currentData());
	}
	if(this._totalWindow) {
		this._totalWindow.setItem(this.currentData());
	}
};
//=============================================================================
// CGMV_Window_InfoTotals
//-----------------------------------------------------------------------------
// Shows completion % for Info
//=============================================================================
function CGMV_Window_InfoTotals(x, y) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_InfoTotals.prototype = Object.create(Window_Base.prototype);
CGMV_Window_InfoTotals.prototype.constructor = CGMV_Window_InfoTotals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_InfoTotals.prototype.initialize = function(x, y) {
	var width = Graphics.boxWidth/3; // 1/3 of the screen wide
	var height = this.fittingHeight(2); // 2 lines tall
	y = Graphics.boxHeight - height;
	this._symbol = null;
	this._name = null;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMV_Window_InfoTotals.prototype.setItem = function(data) {
	this._symbol = data.symbol;
	this._name =  data.name;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_InfoTotals.prototype.refresh = function() {
	this.contents.clear();
	this.drawSpecificCompletion(this._symbol, this._name);
	this.drawTotalCompletion();
};
//-----------------------------------------------------------------------------
// Draw overall completion %
//-----------------------------------------------------------------------------
CGMV_Window_InfoTotals.prototype.drawTotalCompletion = function() {
	var descriptor = CGMV.Info.TotalText + ": ";
	var totalWidth = this.contents.width - this.textPadding()*2;
	var x = this.textWidth(descriptor);
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, this.lineHeight(), totalWidth, 'left');
	this.changeTextColor(this.normalColor());
	var totalDiscovered = $cgmv.getInfoDiscovered('total');
	var totalEntries = $cgmv.getInfoEntries('total');
	var completion = Number((totalDiscovered/totalEntries)*100).toFixed(CGMV.Info.DecimalSpots);
	if(completion == 100) completion = 100;
	this.drawText(completion + "%", x, this.lineHeight(), totalWidth-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw specific category completion
//-----------------------------------------------------------------------------
CGMV_Window_InfoTotals.prototype.drawSpecificCompletion = function(symbol, name) {
	var descriptor = name + ": ";
	var totalWidth = this.contents.width - this.textPadding()*2;
	var x = this.textWidth(descriptor);
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, 0, totalWidth*0.75, 'left');
	var discovered = $cgmv.getInfoDiscovered(symbol);
	var entries = $cgmv.getInfoEntries(symbol);
	var completion = Number((discovered/entries)*100).toFixed(CGMV.Info.DecimalSpots);
	if(completion == 100) completion = 100;
	if(totalWidth-x > totalWidth*0.25) {
		width = totalWidth-x
	}
	else {
		width = totalWidth*0.25;
		x = totalWidth*0.75;
	}
	this.changeTextColor(this.normalColor());
	this.drawText(completion + "%", x, 0, width, 'left');
};
//=============================================================================
// CGMV_Window_InfoList
//-----------------------------------------------------------------------------
// Selectable window for choosing an entry in a list.
//=============================================================================
function CGMV_Window_InfoList(x, y, w, h) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_InfoList.prototype = Object.create(Window_Selectable.prototype);
CGMV_Window_InfoList.prototype.constructor = CGMV_Window_InfoList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.initialize = function(x, y, w, h) {
    Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this._symbol = null;
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.setItem = function(data) {
	this._symbol = data.symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.makeItemList = function() {
    this._data = $cgmv.getInfoData(this._symbol);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
	var number = CGMV.Info.NumberEntries ? item._index + ". " : "";
	var name = item._discovered ? this.getItemName(this._symbol, item._id) : CGMV.Info.UnknownEntry;
    this.drawText(number + name, rect.x, rect.y, rect.width, 'left');
    this.changePaintOpacity(true);
};
//-----------------------------------------------------------------------------
// Determine if item is enabled
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.isEnabled = function(item) {
    return item._discovered;
};
//-----------------------------------------------------------------------------
// Get the name of the object
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.getItemName = function(symbol, id) {
    switch(symbol) {
		case 'bestiary': return $dataEnemies[id].name;
		case 'items': return $dataItems[id].name;
		case 'armors': return $dataArmors[id].name;
		case 'weapons': return $dataWeapons[id].name;
		case 'skills': return $dataSkills[id].name;
		case 'states': return $dataStates[id].name;
		default:
			var obj = $cgmv.getInfoObject(symbol, id);
			return (obj) ? obj._name : CGMV.Info.UnknownEntry;
	}
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this.updateHelp();
	}
};
//-----------------------------------------------------------------------------
// Update display window
//-----------------------------------------------------------------------------
CGMV_Window_InfoList.prototype.updateHelp = function() {
    this._displayWindow.setItem(this.item(), this._symbol);
};
//=============================================================================
// CGMV_Window_InfoDisplay
//-----------------------------------------------------------------------------
// Shows completion % for Info
//=============================================================================
function CGMV_Window_InfoDisplay(x, y, w, h) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_InfoDisplay.prototype = Object.create(CGMV_Window_Scrollable.prototype);
CGMV_Window_InfoDisplay.prototype.constructor = CGMV_Window_InfoDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.initialize = function(x, y, w, h) {
	var heightMultiplier = 4; // maximum of 4 windows tall of data to scroll
    CGMV_Window_Scrollable.prototype.initialize.call(this, x, y, w, h, heightMultiplier, CGMV.Info.ScrollWait, CGMV.Info.ScrollSpeed);
	this._data = null;
	this._bitmap = null;
	this._bitmapNeedsDrawing = false;
	this._bitmapY = 0;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this._largeIconWidth = Window_Base._iconWidth*CGMV.Info.LargeIconMultiplier;
	this._largeIconHeight = Window_Base._iconHeight*CGMV.Info.LargeIconMultiplier;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Add drawing of bitmap since not always loaded
// Also updates for scroll (if needed)
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.update = function() {
	CGMV_Window_Scrollable.prototype.update.call(this);
	if(this._bitmapNeedsDrawing && ImageManager.isReady()) {
		var pw = this._bitmap.width;
		var ph = this._bitmap.height;
		var sx = 0;
		var sy = 0;
		var dw = (this.contents.width < pw) ? this.contents.width : pw;
		var dh = (dw/pw)*ph;
		var x = this.contents.width/2-dw/2;
		this.contents.blt(this._bitmap, 0, 0, pw, ph, x, this._bitmapY, dw, dh);
		this._bitmapNeedsDrawing = false;
		this._neededHeight += dh;
		this.checkForScroll();
	}
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.setItem = function(item, symbol) {
	if(!item) return;
	this._data = item;
	this._symbol = symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.refresh = function() {
	this.setupWindowForNewEntry();
	if(this._data) this.drawInfoEntry();
};
//-----------------------------------------------------------------------------
// Draw Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoEntry = function() {
	if(!this._data._discovered) {
		this.drawUnknownItem();
	}
	else {
		switch(this._symbol) {
			case 'bestiary': this.drawBestiary();
							 break;
			case 'items':	 this.drawItem();
							 break;
			case 'armors': 	 this.drawArmor();
							 break;
			case 'weapons':	 this.drawWeapon();
							 break;
			case 'skills': 	 this.drawSkill();
							 break;
			case 'states': 	 this.drawState();
							 break;
			default: 		 this.drawCustom();
		}
	}
	this._neededHeight += this.standardPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawUnknownItem = function() {
	this.drawText(CGMV.Info.UnknownEntryDisplay, 0, 0, this.contents.width, 'center');
	this._neededHeight = this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Bestiary Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawBestiary = function() {
	var enemy = $dataEnemies[this._data._id];
	this.drawInfoName(enemy.name);
	this.drawInfoStats(enemy.params, this.lineHeight());
	this.drawInfoCenteredText(CGMV.Info.DropsText, this.lineHeight()*5, true);
	this.drawInfoBestiaryRewards(enemy.exp, enemy.gold);
	var y = this.drawInfoBestiaryDrops(enemy.dropItems);
	y = this.drawInfoMeta(enemy.meta.cgmvdesc, y);
	y = this.drawInfoBestiarySketch(enemy.battlerHue, enemy.battlerName, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Item Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawItem = function() {
	var item = $dataItems[this._data._id];
	this.drawInfoName(item.name);
	this.drawInfoLargeIcon(item.iconIndex);
	this.drawInfoPrice(item.price);
	this.drawInfoKeyItem(item.itypeId);
	this.drawInfoPossession($gameParty.numItems(item));
	this.drawInfoSuccessRate(item.successRate);
	this.drawInfoConsumable(item.consumable);
	var y = this.drawUserTPGain(item.tpGain, this.lineHeight()*6);
	y = this.drawInfoEffects(item.effects, y);
	y = this.drawInfoDescription(item.description, y);
	y = this.drawInfoMeta(item.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Armor Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawArmor = function() {
	var armor = $dataArmors[this._data._id];
	this.drawInfoName(armor.name);
	this.drawInfoLargeIcon(armor.iconIndex);
	this.drawInfoPrice(armor.price);
	this.drawInfoType($dataSystem.equipTypes[armor.etypeId], 'equip', this.lineHeight()*2);
	this.drawInfoPossession($gameParty.numItems(armor));
	this.drawInfoType($dataSystem.armorTypes[armor.atypeId], 'armor', this.lineHeight()*4);
	this.drawInfoStats(armor.params, this.lineHeight()*5, true);
	var y = this.drawInfoTrait(armor.traits, this.lineHeight()*9);
	y = this.drawInfoDescription(armor.description, y);
	y = this.drawInfoMeta(armor.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Weapon Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawWeapon = function() {
	var weapon = $dataWeapons[this._data._id];
	this.drawInfoName(weapon.name);
	this.drawInfoLargeIcon(weapon.iconIndex);
	this.drawInfoPrice(weapon.price);
	this.drawInfoType($dataSystem.equipTypes[weapon.etypeId], 'equip', this.lineHeight()*2);
	this.drawInfoPossession($gameParty.numItems(weapon));
	this.drawInfoType($dataSystem.weaponTypes[weapon.wtypeId], 'weapon', this.lineHeight()*4);
	this.drawInfoStats(weapon.params, this.lineHeight()*5, true);
	var y = this.drawInfoTrait(weapon.traits, this.lineHeight()*9);
	y = this.drawInfoDescription(weapon.description, y);
	y = this.drawInfoMeta(weapon.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Skill Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawSkill = function() {
	var skill = $dataSkills[this._data._id];
	this.drawInfoName(skill.name);
	this.drawInfoLargeIcon(skill.iconIndex);
	this.drawInfoType($dataSystem.skillTypes[skill.stypeId], 'skill', this.lineHeight());
	this.drawSkillCosts(skill.mpCost, skill.tpCost);
	this.drawInfoSuccessRate(skill.successRate);
	var y = this.drawUserTPGain(skill.tpGain, this.lineHeight()*5);
	y = this.drawInfoEffects(skill.effects, y);
	y = this.drawInfoDescription(skill.description, y);
	y = this.drawInfoMeta(skill.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw State Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawState = function() {
	var state = $dataStates[this._data._id];
	this.drawInfoName(state.name);
	this.drawInfoLargeIcon(state.iconIndex);
	this.drawStateDuration(state.autoRemovalTiming, state.minTurns, state.maxTurns);
	this.drawStateRemoval(state.removeAtBattleEnd, CGMV.Info.BattleRemovalText, this.lineHeight()*2);
	this.drawStateRemoval(state.removeByWalking, CGMV.Info.WalkingRemovalText, this.lineHeight()*3);
	this.drawStateRemoval(state.removeByDamage, CGMV.Info.DamageRemovalText, this.lineHeight()*4);
	var y = this.drawInfoTrait(state.traits, this.lineHeight()*5);
	y = this.drawInfoMeta(state.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Custom Info Entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawCustom = function() {
	var item = this._data;
	this.drawInfoName(item._name);
	var y = this.drawCustomDescription(item._description);
	y = this.drawCustomBitmap(item._sketch, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Name - Always used for all categories
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoName = function(name) {
	this.contents.CGMVfontBold = true;
	this.drawText(name, 0, 0, this.contents.width, 'center');
	this.contents.CGMVfontBold = false;
};
//-----------------------------------------------------------------------------
// Draws Centered Text
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoCenteredText = function(txt, y, useColor) {
	useColor = useColor || false;
	if(useColor) this.changeTextColor(this.systemColor());
	this.drawText(txt, 0, y, this.contents.width, 'center');
	this.changeTextColor(this.normalColor());
};
//-----------------------------------------------------------------------------
// Draws a standard Info line - used for all categories
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoStandardLine = function(descriptor1, descriptor2, x, y, width) {
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor1, x, y, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(this.normalColor());
	this.drawText(descriptor2, x, y, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draws text array with descriptor in first line.
// Makes sure to have enough space for each item.
// Returns y-value of line below lowest line drawn.
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawTextArray = function(y, descriptor, array, separator) {
	separator = separator || " ";
	var descriptor = descriptor + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	var x = this.textWidth(descriptor);
	this.changeTextColor(this.normalColor());
	for(var i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		if(array[i].includes(" ")) {
			var xy = this.drawWords(y, x, array[i]);
			x = xy[0];
			y = xy[1];
			this.drawText(separator, x, y, this.contents.width, 'left');
			x += this.textWidth(separator);
		}
		else {
			var tempWidth = this.textWidth(array[i] + separator);
			if(tempWidth + x > this.contents.width) {
				if(tempWidth <= this.contents.width) {
					y += this.lineHeight();
					x = 0;
				}
			}
			this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
			x += tempWidth;
		}
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws words. Makes sure to have enough space for each word.
// Returns x-value past last word drawn and y-value of lowest line drawn.
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawWords = function(y, x, string) {
	var array = string.split(" ");
	var separator = " ";
	for(var i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		var tempWidth = this.textWidth(array[i] + separator);
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return [x, y];
};
//-----------------------------------------------------------------------------
// Draw Items (skill, state, etc) - Draws skills with icon with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawItemNames = function(descriptor, x, y, width, itemIds, symbol) {
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, x, y, width, 'left');
	this.changeTextColor(this.normalColor());
	x += this.textWidth(descriptor);
	for(var i = 0; i < itemIds.length; i++) {
		if(symbol == 'skill') var item = $dataSkills[itemIds[i]];
		else if(symbol == 'state') var item = $dataStates[itemIds[i]];
		var widthNeeded = this.textWidth(item.name) + Window_Base._iconWidth + 4;
		if(itemIds.length > i+1) widthNeeded += this.textWidth(", ");
		if(widthNeeded + x > width) {
			y += this.lineHeight();
			x = 0;
		}
		this.drawItemName(item, x, y, width)
		x += widthNeeded;
		if(itemIds.length > i+1) this.drawText(", ", x-this.textWidth(", "), y, width, 'left');
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Large icon - Always used for item, armor, weapon, skill, state.
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoLargeIcon = function(iconIndex) {
	var bitmap = this._iconBitmap;
	var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
	var dw = this._largeIconWidth;
	var dh = this._largeIconHeight;
	var x = 0;
	var y = this.lineHeight();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//-----------------------------------------------------------------------------
// Draw Price - Always used for item, armor, weapon
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoPrice = function(price) {
	var y = this.lineHeight();
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Info.PriceText + ": ";
	var descriptor2 = (price == 0) ? CGMV.Info.NoPriceText : $cgmvTemp.numberSplit(price) + " " + TextManager.currencyUnit;
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Key item - Always used for item
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoKeyItem = function(itype) {
	var y = this.lineHeight()*2;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Info.KeyItemText + ": ";
	var descriptor2 = (itype == 2) ? CGMV.Info.YesText : CGMV.Info.NoText;
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Type - Always used for armor, weapon, skill
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoType = function(typeName, typeSymbol, y) {
	switch(typeSymbol) {
		case 'equip':
			var descriptor1 = CGMV.Info.EquipTypeText + ": ";
			break;
		case 'armor':
			var descriptor1 = CGMV.Info.ArmorTypeText + ": ";
			if(typeName === "") typeName = CGMV.Info.NoArmorTypeText;
			break;
		case 'weapon':
			var descriptor1 = CGMV.Info.WeaponTypeText + ": ";
			if(typeName === "") typeName = CGMV.Info.NoWeaponTypeText;
			break;
		case 'skill':
			var descriptor1 = CGMV.Info.SkillTypeText + ": ";
			if(typeName === "") typeName = CGMV.Info.NoSkillTypeText;
	}
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor2 = typeName;
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Possession - Always used for item
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoPossession = function(amount) {
	var y = this.lineHeight()*3;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Info.PossessionText + ": ";
	var descriptor2 = $cgmvTemp.numberSplit(amount);
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Stats - Always used by armors and bestiary
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoStats = function(params, yStart, useSign) {
	useSign = useSign || false;
	var sign = "";
	var width = this.contents.width/2; // 2 column display
	for(var i = 0; i < 8; i++) {
		var y = this.lineHeight()*(Math.trunc(i/2));
		var x = (i%2 == 0) ? 0 : width;
		var descriptor1 = TextManager.param(i) + ": ";
		var descriptor2 = $cgmvTemp.numberSplit(params[i]);
		sign = (useSign && params[i] > 0) ? "+" : "";
		this.drawInfoStandardLine(descriptor1, sign + descriptor2, x, yStart + y, width*(1+i%2));
	}
};
//-----------------------------------------------------------------------------
// Draw exp and gold of an enemy - Always used by the Bestiary
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoBestiaryRewards = function(exp, gold) {
	var y = this.lineHeight()*6;
	var x = 0;
	var descriptor1 = TextManager.basic(8) + ": "; // full EXP string (not abbr)
	var descriptor2 = $cgmvTemp.numberSplit(exp);
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	descriptor1 = TextManager.currencyUnit + ": ";
	descriptor2 = $cgmvTemp.numberSplit(gold);
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw dropped items of an enemy - Always used by Bestiary
// Returns y-value of line past last drop.
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoBestiaryDrops = function(drops) {
	var width = this.contents.width/2;
	var y = this.lineHeight()*8;
	for(var i =0; i < drops.length; i++) {
		if(drops[i].kind == 0) continue;
		switch(drops[i].kind) {
			case 1: var drop = $dataItems[drops[i].dataId];
				    break;
			case 2: var drop = $dataWeapons[drops[i].dataId];
				    break;
			case 3: var drop = $dataArmors[drops[i].dataId];
		}
		var x = 0;
		this.drawItemName(drop, x, y, width);
		if(CGMV.Info.ShowDropChances) {
			x = width;
			var descriptor = CGMV.Info.DropChanceText + ": ";
			this.changeTextColor(this.systemColor());
			this.drawText(descriptor, x, y, this.contents.width-x, 'left');
			this.changeTextColor(this.normalColor());
			x += this.textWidth(descriptor);
			descriptor = ((1/drops[i].denominator)*100).toFixed(2) + "%";
			this.drawText(descriptor, x, y, this.contents.width, 'left');
		}
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw dropped items of an enemy - Always used by Bestiary
// Returns y-value of line past last drop.
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoBestiarySketch = function(battlerHue, battlerName, y) {
	var descriptor = CGMV.Info.SketchText + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(this.normalColor());
	y += this.lineHeight();
	if ($gameSystem.isSideView()) {
		this._bitmap = ImageManager.loadSvEnemy(battlerName, battlerHue);
	} else {
		this._bitmap = ImageManager.loadEnemy(battlerName, battlerHue);
	}
	this._bitmapY = y;
	this._bitmapNeedsDrawing = true;
	return y;
};
//-----------------------------------------------------------------------------
// Draws meta note if applicable. Returns y-value past last line.
// <cgmvdesc:Description Here>
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoMeta = function(meta, y) {
	if(!meta) return y;
	var txtArray = meta.split(" ");
	return this.drawTextArray(y, CGMV.Info.NoteText, txtArray);
};
//-----------------------------------------------------------------------------
// Draws description if applicable. Returns y-value past last line.
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoDescription = function(description, y) {
	if(description === "") return y;
	var txtArray = description.split(" ");
	return this.drawTextArray(y, CGMV.Info.DescriptionText, txtArray);
};
//-----------------------------------------------------------------------------
// Draws success rate of an item - used for item entries
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoSuccessRate = function(rate) {
	var y = this.lineHeight()*4;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Info.SuccessRateText + ": ";
	var descriptor2 = rate + "%";
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws whether item is consumed on use - used for item entries
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoConsumable = function(consumable) {
	var y = this.lineHeight()*5;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Info.ConsumableText + ": ";
	var descriptor2 = consumable ? CGMV.Info.YesText : CGMV.Info.NoText;
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws item effects as needed - used for item entries
// Returns y value after drawing the last effect
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoEffects = function(effects, y) {
	if(effects.length < 1) return this.lineHeight()*6;
	var tracker = {"HPv1": 0, "HPv2": 0, "MPv1": 0, "MPv2": 0, "TP": 0, "ADDSTATE": [], "REMOVESTATE": [], "BUFFS": [], "DEBUFFS": [],
				   "REMOVEDBUFFS": [], "REMOVEDDEBUFFS": [], "GROW": [], "LEARNS": []};
	for(var i = 0; i < effects.length; i++) {
		if(effects[i].code == 11) { // HP effect
			tracker.HPv1 += effects[i].value1*100;
			tracker.HPv2 += effects[i].value2;
		}
		else if(effects[i].code == 12) { // MP effect
			tracker.MPv1 += effects[i].value1*100;
			tracker.MPv2 += effects[i].value2;
		}
		else if(effects[i].code == 13) { // TP effect
			tracker.TP += effects[i].value1;
		}
		else if(effects[i].code == 21) { // Add State effect
			if(effects[i].dataId != 0) {
				tracker.ADDSTATE.push(effects[i].dataId);
			}
		}
		else if(effects[i].code == 22) { // Remove State effect
			if(effects[i].dataId != 0) {
				tracker.REMOVESTATE.push(effects[i].dataId);
			}
		}
		else if(effects[i].code == 31) { // Add buff effect
			tracker.BUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 32) { // Add debuff effect
			tracker.DEBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 33) { // Remove buff effect
			tracker.REMOVEDBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 34) { // Remove debuff effect
			tracker.REMOVEDDEBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 42) { // Grow effect
			tracker.GROW.push(effects[i].dataId);
		}
		else if(effects[i].code == 43) { // Learn Skill effect
			tracker.LEARNS.push(effects[i].dataId);
		}
	}
	if(!(tracker.HPv1 != 0 || tracker.HPv2 != 0 || tracker.MPv1 != 0 || tracker.MPv2 != 0 || tracker.TP != 0 || 
	   tracker.ADDSTATE.length > 0 || tracker.REMOVESTATE.length > 0 || tracker.BUFFS.length > 0 || tracker.DEBUFFS.length > 0 || 
	   tracker.REMOVEDBUFFS.length > 0 || tracker.REMOVEDDEBUFFS.length > 0 || tracker.GROW.length > 0 || tracker.LEARNS.length > 0)) {
			return this.lineHeight()*6;
	}
	this.drawInfoCenteredText(CGMV.Info.EffectsText, y, true);
	y += this.lineHeight();
	var x = 0;
	var width = this.contents.width;
	var descriptor1 = "";
	var descriptor2 = "";
	if(tracker.HPv1 != 0 || tracker.HPv2 != 0) {
		descriptor1 = CGMV.Info.HPEffectText + ": ";
		if(tracker.HPv1 > 100) tracker.HPv1 = 100;
		if(tracker.HPv1 < -100) tracker.HPv1 = -100;
		if(tracker.HPv1 != 0 && tracker.HPv2 != 0) {
			var sign = (tracker.HPv2 > 0) ? "+ " : "- ";
			descriptor2 = tracker.HPv1 + "% " + sign + $cgmvTemp.numberSplit(Math.abs(tracker.HPv2));
		}
		else if(tracker.HPv1 != 0) {
			descriptor2 = tracker.HPv1 + "%";
			if(tracker.HPv1 > 0) descriptor2 = "+" + descriptor2;
		}
		else {
			descriptor2 = $cgmvTemp.numberSplit(tracker.HPv2);
			if(tracker.HPv2 > 0) descriptor2 = "+" + descriptor2;
		}
		this.drawInfoStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.MPv1 != 0 || tracker.MPv2 != 0) {
		descriptor1 = CGMV.Info.MPEffectText + ": ";
		if(tracker.MPv1 > 100) tracker.MPv1 = 100;
		if(tracker.MPv1 < -100) tracker.MPv1 = -100;
		if(tracker.MPv1 != 0 && tracker.MPv2 != 0) {
			var sign = (tracker.MPv2 > 0) ? "+ " : "- ";
			descriptor2 = tracker.MPv1 + "% " + sign + $cgmvTemp.numberSplit(Math.abs(tracker.MPv2));
		}
		else if(tracker.MPv1 != 0) {
			descriptor2 = tracker.MPv1 + "%";
			if(tracker.MPv1 > 0) descriptor2 = "+" + descriptor2;
		}
		else {
			descriptor2 = $cgmvTemp.numberSplit(tracker.MPv2);
			if(tracker.MPv2 > 0) descriptor2 = "+" + descriptor2;
		}
		this.drawInfoStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.TP != 0) {
		descriptor1 = CGMV.Info.TPEffectText + ": ";
		descriptor2 = $cgmvTemp.numberSplit(tracker.TP);
		if(tracker.TP > 0) descriptor2 = "+" + descriptor2;
		this.drawInfoStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.ADDSTATE.length > 0) {
		y = this.drawItemNames(CGMV.Info.AddStateText + ": ", x, y, width, tracker.ADDSTATE, 'state');
	}
	if(tracker.REMOVESTATE.length > 0) {
		y = this.drawItemNames(CGMV.Info.RemoveStateText + ": ", x, y, width, tracker.REMOVESTATE, 'state');
	}
	if(tracker.BUFFS.length > 0) {
		y = this.drawBuffParameters(CGMV.Info.AddBuffText + ": ", x, y, width, tracker.BUFFS);
	}
	if(tracker.DEBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMV.Info.AddDebuffText + ": ", x, y, width, tracker.DEBUFFS);
	}
	if(tracker.REMOVEDBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMV.Info.BuffRemovalText + ": ", x, y, width, tracker.REMOVEDBUFFS);
	}
	if(tracker.REMOVEDDEBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMV.Info.DebuffRemovalText + ": ", x, y, width, tracker.REMOVEDDEBUFFS);
	}
	if(tracker.GROW.length > 0) {
		y = this.drawBuffParameters(CGMV.Info.GrowText + ": ", x, y, width, tracker.GROW);
	}
	if(tracker.LEARNS.length > 0) {
		y = this.drawItemNames(CGMV.Info.LearnSkillText + ": ", x, y, width, tracker.LEARNS, 'skill');
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw Buff Parameters - Draws buffs/debuffs with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawBuffParameters = function(descriptor, x, y, width, buffArray) {
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, x, y, width, 'left');
	this.changeTextColor(this.normalColor());
	x += this.textWidth(descriptor);
	for(var i = 0; i < buffArray.length; i++) {
		var txt = TextManager.param(buffArray[i]);
		if(buffArray.length > i+1) txt += ", ";
		if(this.textWidth(txt) + x > width) {
			y += this.lineHeight();
			x = 0;
		}
		this.drawText(txt, x, y, width, 'left');
		x += this.textWidth(txt);
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Trait - draws a trait such as attack element or party ability
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawInfoTrait = function(traits, y) {
	if(traits.length < 1) return y;
	var tracker = {"ATKSPEED": 0, "ATKTIMES": 0, "ATKELEMENT": [], "ATKSTATES": [], "PARTYABILITY": [],
				   "ADDSKILLTYPES": [], "SEALSKILLTYPES": [], "ADDSKILLS": [], "SEALSKILLS": [], "STATERESIST": []}
	for(var i = 0; i < traits.length; i++) {
		if(traits[i].code == 31) { // Attack Element
			tracker.ATKELEMENT.push($dataSystem["elements"][traits[i].dataId]);
		}
		else if(traits[i].code == 32) { // Attack State
			tracker.ATKSTATES.push(traits[i].dataId);
		}
		else if(traits[i].code == 33) { // Attack Speed
			tracker.ATKSPEED += traits[i].value;
		}
		else if(traits[i].code == 34) { // Attack Times
			tracker.ATKTIMES += traits[i].value;
		}
		else if(traits[i].code == 41) { // Add Skill Type
			tracker.ADDSKILLTYPES.push($dataSystem.skillTypes[traits[i].dataId]);
		}
		else if(traits[i].code == 42) { // Seal Skill Type
			tracker.SEALSKILLTYPES.push($dataSystem.skillTypes[traits[i].dataId]);
		}
		else if(traits[i].code == 43) { // Add Skill
			tracker.ADDSKILLS.push(traits[i].dataId);
		}
		else if(traits[i].code == 44) { // Seal Skill
			tracker.SEALSKILLS.push(traits[i].dataId);
		}
		else if(traits[i].code == 14) { // State Resist
			tracker.STATERESIST.push(traits[i].dataId);
		}
		else if(traits[i].code == 64) { // party ability
			switch(traits[i].dataId) {
				case 0: tracker.PARTYABILITY.push(CGMV.Info.HalfEncounterText);
						break;
				case 1: tracker.PARTYABILITY.push(CGMV.Info.NoEncounterText);
						break;
				case 2: tracker.PARTYABILITY.push(CGMV.Info.CancelSurpriseText);
						break;
				case 3: tracker.PARTYABILITY.push(CGMV.Info.RaisePreemptiveText);
						break;
				case 4: tracker.PARTYABILITY.push(CGMV.Info.GoldDoubleText);
						break;
				case 5: tracker.PARTYABILITY.push(CGMV.Info.DropItemDoubleText);
			}
		}
	}
	if(!(tracker.ATKSPEED != 0 || tracker.ATKTIMES != 0 || tracker.ATKELEMENT.length > 0 || tracker.ATKSTATES.length > 0 ||
	     tracker.PARTYABILITY.length > 0 || tracker.ADDSKILLTYPES.length > 0 || tracker.SEALSKILLTYPES.length > 0 || 
		 tracker.ADDSKILLS.length > 0 || tracker.SEALSKILLS.length > 0 || tracker.STATERESIST.length > 0)) {
		return y;
	}
	if(tracker.ATKSPEED != 0) {
		this.drawInfoStandardLine(CGMV.Info.AttackSpeedText + ": ", tracker.ATKSPEED, 0, y, this.contents.width);
		y += this.lineHeight();
	}
	if(tracker.ATKTIMES != 0) {
		this.drawInfoStandardLine(CGMV.Info.AttackTimesText + ": ", tracker.ATKTIMES, 0, y, this.contents.width);
		y += this.lineHeight();
	}
	if(tracker.ATKELEMENT.length > 0) {
		y = this.drawTextArray(y, CGMV.Info.ElementText, tracker.ATKELEMENT, ", ");
	}
	if(tracker.ATKSTATES.length > 0) {
		y = this.drawItemNames(CGMV.Info.AttackStateText + ": ", 0, y, this.contents.width, tracker.ATKSTATES, 'state');
	}
	if(tracker.PARTYABILITY.length > 0) {
		y = this.drawTextArray(y, CGMV.Info.PartyAbilityText, tracker.PARTYABILITY, ", ");
	}
	if(tracker.SEALSKILLTYPES.length > 0) {
		y = this.drawTextArray(y, CGMV.Info.SealSkillTypesText, tracker.SEALSKILLTYPES, ", ");
	}
	if(tracker.ADDSKILLTYPES.length > 0) {
		y = this.drawTextArray(y, CGMV.Info.AddSkillTypesText, tracker.ADDSKILLTYPES, ", ");
	}
	if(tracker.ADDSKILLS.length > 0) {
		y = this.drawItemNames(CGMV.Info.AddSkillText + ": ", 0, y, this.contents.width, tracker.ADDSKILLS, 'skill');
	}
	if(tracker.SEALSKILLS.length > 0) {
		y = this.drawItemNames(CGMV.Info.SealSkillText + ": ", 0, y, this.contents.width, tracker.SEALSKILLS, 'skill');
	}
	if(tracker.STATERESIST.length > 0) {
		y = this.drawItemNames(CGMV.Info.StateResistText + ": ", 0, y, this.contents.width, tracker.STATERESIST, 'state');
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill entries
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawSkillCosts = function(mpCost, tpCost) {
	var y = this.lineHeight()*2;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Info.MPCostText + ": ";
	var descriptor3 = CGMV.Info.TPCostText + ": ";
	var descriptor2 = $cgmvTemp.numberSplit(mpCost);
	var descriptor4 = $cgmvTemp.numberSplit(tpCost);
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	this.drawInfoStandardLine(descriptor3, descriptor4, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill/item entries
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawUserTPGain = function(tpGain, y) {
	if(tpGain == 0) return y;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Info.UserTPGainText + ": ";
	var descriptor2 = $cgmvTemp.numberSplit(tpGain);
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	return y;
};
//-----------------------------------------------------------------------------
// Draw generic state removal - Always used state entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawStateRemoval = function(removed, descriptor, y) {
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = descriptor + ": ";
	var descriptor2 = (removed) ? CGMV.Info.YesText : CGMV.Info.NoText;
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw auto removal - Always used state entry
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawStateDuration = function(auto, min, max) {
	var y = this.lineHeight();
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Info.DurationText + ": ";
	if(auto) {
		var descriptor2 = (min == max) ? min + " " + CGMV.Info.TurnsText : min + " - " + max + " " + CGMV.Info.TurnsText;
	}
	else {
		var descriptor2 =  CGMV.Info.InfiniteText;
	}
	this.drawInfoStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws custom description. Some additional parsing required.
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawCustomDescription = function(description) {
	var y = this.lineHeight();
	var descriptor = CGMV.Info.DescriptionText + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(this.normalColor());
	var x = this.textWidth(descriptor);
	description = description.substring(1, description.length-1);
	description = description.replace(/\\n/g, " \\n ");
	description = description.replace(/  \\n/g, " \\n");
	var array = description.split(" ");
	var separator = " ";
	for(var i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		var tempWidth = this.textWidth(array[i] + separator);
		if(array[i] == "\\n") {
			x = 0;
			y += this.lineHeight();
			continue;
		}
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws custom sketch. Does not actually draw the bitmap (image not loaded yet),
// but queues image up to be loaded.
//-----------------------------------------------------------------------------
CGMV_Window_InfoDisplay.prototype.drawCustomBitmap = function(bitmap, y) {
	if(!bitmap) return y;
	var descriptor = CGMV.Info.SketchText + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(this.normalColor());
	y += this.lineHeight();
	var split = bitmap.split("/");
	var folder = split[0] + "/" + split[1] + "/";
	var filename = split[2];
	this._bitmap = ImageManager.loadBitmap(folder, filename, 0, true);
	this._bitmapY = y;
	this._bitmapNeedsDrawing = true;
	return y;
};
//=============================================================================
// BattleManager
//-----------------------------------------------------------------------------
// Discover enemies automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover the enemies when battle starts
//-----------------------------------------------------------------------------
var alias_CGMV_Info_BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    alias_CGMV_Info_BattleManager_setup.call(this, troopId, canEscape, canLose);
	$cgmv.InfoDiscoverTroop(troopId);
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Discover items, weapons, armors automatically.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover items, weapons, armors when party gains them.
//-----------------------------------------------------------------------------
var alias_CGMV_Info_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	alias_CGMV_Info_GameParty_gainItem.call(this, item, amount, includeEquip);
    if (DataManager.isItem(item)) {
        $cgmv.InfoDiscoverItem(item.id, "item");
    } else if (DataManager.isWeapon(item)) {
        $cgmv.InfoDiscoverItem(item.id, "weapon");
    } else if (DataManager.isArmor(item)) {
        $cgmv.InfoDiscoverItem(item.id, "armor");
    }
};
//=============================================================================
// Game_Actor
//-----------------------------------------------------------------------------
// Discover skills automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover skills when actor learns skill.
//-----------------------------------------------------------------------------
var alias_CGMV_Info_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    alias_CGMV_Info_GameActor_learnSkill.call(this, skillId);
	$cgmv.InfoDiscoverSkill(skillId);
};
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Discover states automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover state when actor or enemy afflicted with one
//-----------------------------------------------------------------------------
var alias_CGMV_Info_GameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
	alias_CGMV_Info_GameBattler_addState.call(this, stateId);
    if (this.isStateAddable(stateId)) {
        $cgmv.InfoDiscoverState(stateId);
    }
};