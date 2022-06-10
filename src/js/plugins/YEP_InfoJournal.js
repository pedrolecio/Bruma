//=============================================================================
// Yanfly Engine Plugins - Info Journal System
// YEP_InfoJournal.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_InfoJournal = true;

var Yanfly = Yanfly || {};
Yanfly.Info = Yanfly.Info || {};
Yanfly.Info.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 Insert a Info journal system into your game!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * WARNING: This plugin is to be used with RPG Maker MV 1.5.0 or above! This is
 * because the MV 1.5.0 editor allows for this plugin to be made in an orderly
 * and efficient manner. Please make sure your RPG Maker MV software is up to
 * date before using this plugin.
 *
 * ---
 *
 * A Info journal is a very important tool provided by game developers for the
 * players. It lists various Infos, missions, and objectives that the player
 * can pursue in order to progress further into the game. This can be helpful
 * in reminding the player what needs to be done in the event the player can
 * forget what things there are to do in a vast and large RPG world.
 *
 * This plugin places a Info journal system into your RPG Maker MV game. You
 * can set up how the Info journal appears, move its windows around and/or
 * reshape them to fit your game. There are 100 Info slots provided by this
 * plugin (more can be obtained through extension plugins) and each one of them
 * requires your attention in constructing individually.
 *
 * You can adjust the Info's title, display a difficulty level, remind the
 * player who the Info is from, where that Info is from, various dynamic
 * descriptions explaining the Info, a list of objectives to make, a list of
 * rewards that will be given to the player once the Info is complete, and any
 * subtext footnotes you may wish to insert into each Info.
 *
 * ---
 *
 * Keep in mind that while this plugin does enable a Info journal system into
 * your game, this plugin will NOT automate it. If you have a Info enabled, it
 * is still up to you to add the Info properly into the journal, set its many
 * objectives, when the other objectives appear, what the rewards are, and then
 * giving out the rewards yourself manually. The purpose of this plugin is to
 * simply serve as a visual record for your player to see what Infos have been
 * handed down to him or her.
 *
 * ============================================================================
 * Instructions - Setting Up the Info Category Window
 * ============================================================================
 *
 * The plugin parameter 'Info Category Window' can actually be left as is by
 * default, but should you wish to customize it, here's what there is to know.
 *
 * ---
 *
 * Category Order
 * - This is the order in which the following categories appear in the menu:
 * available, completed, failed, all, cancel. Moving these around will let you
 * adjust how the menu is structured. If you do move them around, by default,
 * the first item will be selected at the start.
 * Default: ["available","completed","failed","all"]
 *
 * Available Text
 * - How the entry for the 'available' category appears. You can use text codes
 * here to give the appearance of icons and/or color. The %1 is a format option
 * that will allow you to display how many available Infos there are.
 * Default: \i[192]Available (%1)
 *
 * Completed Text
 * - How the entry for the 'completed' category appears. You can use text codes
 * here to give the appearance of icons and/or color. The %1 is a format option
 * that will allow you to display how many completed Infos there are.
 * Default: \i[191]Completed (%1)
 *
 * Failed Text
 * - How the entry for the 'failed' category appears. You can use text codes
 * here to give the appearance of icons and/or color. The %1 is a format option
 * that will allow you to display how many failed Infos there are.
 * Default: \i[194]Failed (%1)
 *
 * All Text
 * - How the entry for the 'all' category appears. You can use text codes
 * here to give the appearance of icons and/or color. The %1 is a format option
 * that will allow you to display how many Infos there are in total.
 * Default: \i[189]All Infos (%1)
 *
 * Cancel Text
 * - How the entry for the 'cancel' option appears. You can use text codes
 * here to give the appearance of icons and/or color. There is no format option
 * to be used with this text.
 * Default: \i[161]Close
 *
 * ---
 *
 * Window Settings
 * - If you wish to customize the category window, you can adjust the various
 * settings here to adjust its properties. However, keep in mind that unless
 * you are familiar with JavaScript, you can make errors here that can make the
 * windows not work in your game.
 *
 * Default: 
 *
 * X: 0
 * Y: 0
 * Width: Graphics.boxWidth / 3
 * Height: this.fittingHeight(this.numVisibleRows())
 * Rows: 4
 * Columns: 1
 * Line Height: 36
 * Font Face: GameFont
 * Font Size: 28
 * Standard Padding: 18
 * Text Padding: 6
 * Text Alignment: left
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 *
 * ============================================================================
 * Instructions - Setting Up the Info List Window
 * ============================================================================
 *
 * The plugin parameter 'Info List Window' can be modified to show the various
 * Info types. By default, the plugin will have the following Info types:
 * Main Infos, Side Infos, Character Infos, and Tutorial Infos. Here's what
 * there is to know about the Info List Window.
 *
 * ---
 *
 * Show Types
 * - If this is enabled, it will allow for the Info List Window to display the
 * various Info types. If this is disabled, then those Info types will not
 * appear and all Infos will be displayed without their Info type as their
 * individual header.
 * Default: true
 *
 * Type Order
 * - This is the order for the Info list types and it also enables which types
 * will be available in the Info journal to display. You can use text codes
 * here to add icons and/or colors to the Info types. When you are typing out
 * the Info type names for the individual Info types to fall under, you can
 * omit the \i[x] and \c[x] codes, but everything else must be in tact.
 * Default: ["\\c[6]Main Infos","\\c[4]Side Infos","\\c[3]Character Infos",
 *           "\\c[5]Tutorial Infos"]
 *
 * List Open Symbol
 * - The symbol used to display to show a Info type is opened (showing all of
 * the Infos listed under it) and not closed (not showing any of the Infos
 * listed under it).
 * Default: -
 *
 * List Closed Symbol
 * - The symbol used to display to show a Info type is closed (not showing any
 * of the Infos listed under it) and not opened (showing all of the Infos
 * listed under it).
 * Default: +
 *
 * Type Text Format
 * - The text formating type display the Info types in the Info List Window.
 * %1 will refer to the Open/Closed Symbol. %2 will be the Info type's name.
 * %3 will reveal the number of Infos that are listed under this Info type.
 * Default: %1%2 (%3)
 *
 * Info Indent
 * - This is how much to indent the regular Infos if Info types are shown.
 * This is to help players distinguish Info types from regular Infos, though
 * it isn't necessary if you plan on using icons for your Infos and none for
 * your Info types.
 * Default: 0
 *
 * Show Empty
 * - If enabled, this will show Info types that are empty and have no Infos
 * under them. Otherwise, if it is disabled, Info types that have no Infos
 * will not appear in the Info list and can help reduce clutter.
 * Default: false
 *
 * Read Info
 * - This is how the text appears for the 'Read Info' command. This command
 * will only appear in the List Window if an extension plugin prompting the
 * extra actions list to appear.
 * Default: \i[121]Read Info
 *
 * Cancel
 * - This is how the text appears for the 'Cancel' command. This command will
 * only appear in the List Window if an extension plugin prompting the extra
 * actions list to appear.
 * Default: \i[16]Cancel
 *
 * ---
 *
 * Window Settings
 * - If you wish to customize the category window, you can adjust the various
 * settings here to adjust its properties. However, keep in mind that unless
 * you are familiar with JavaScript, you can make errors here that can make the
 * windows not work in your game.
 * 
 * Default: 
 *
 * X: 0
 * Y: Graphics.boxHeight - height
 * Width: Graphics.boxWidth / 3
 * Height: Graphics.boxHeight - this.fittingHeight(4)
 * Line Height: 36
 * Font Face: GameFont
 * Font Size: 28
 * Standard Padding: 18
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Type Alignment: left
 * Info Alignment: left
 * Window Skin: Window
 *
 * ============================================================================
 * Instructions - Setting Up the Info Title Window
 * ============================================================================
 *
 * The plugin parameter 'Info Title Window' can also be left alone by default,
 * but should you wish to alter it to fit your game's settings, here's what you
 * need to know.
 *
 * ---
 *
 * No Info Title
 * - When there's no Info selected in the Info list window, this text will
 * appear in the Info title window. Otherwise, the selected Info's name will
 * appear above the data window. Text codes may be used here.
 * Default: \c[4]Info Journal
 *
 * ---
 *
 * Window Settings
 * - If you wish to customize the category window, you can adjust the various
 * settings here to adjust its properties. However, keep in mind that unless
 * you are familiar with JavaScript, you can make errors here that can make the
 * windows not work in your game.
 *
 * X: Graphics.boxWidth - width
 * Y: 0
 * Width: Graphics.boxWidth * 2 / 3
 * Height: this.fittingHeight(1)
 * Line Height: 36
 * Font Face: GameFont
 * Font Size: 28
 * Standard Padding: 18
 * Text Padding: 6
 * Text Alignment: center
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 *
 * ============================================================================
 * Instructions - Setting Up the Info Data Window
 * ============================================================================
 *
 * The plugin parameter 'Info Data Window' can be modified to show the various
 * information contained inside of a Info. This data is used by the player to
 * understand just what is required of the player to do in order to fulfill and
 * complete the Info. This window's settings can be left as is, but should you
 * wish to alter it to fit your game, read below:
 *
 * ---
 *
 * No Data Text
 * - This is the text to be displayed in the data window when there is no Info
 * currently selected by the Info list window. You can use text codes here to
 * make the text appear more vivid to your players.
 *
 * Default:
 * Welcome to the \c[4]Info Journal\c[0].
 * 
 * Here, you can review over the various
 * Infos given to you by people from all
 * over the world.
 *
 * Word Wrap Version (Requires YEP_MessageCore.js):
 * <WordWrap>Welcome to the \c[4]Info Journal\c[0].
 * <br>
 * <br>Here, you can review over the various
 * Infos given to you by people from all
 * over the world.
 *
 * Info Data Format
 * - This format is how the data in the Info data window is shown to your
 * players. You can use various text codes to make your Info data window more
 * vivid to your players. %1 will reference the title without any icons or
 * color text codes. %2 will reference the Info's difficulty level. %3 will be
 * who the Info is from. %4 will display where the Info is from. %5 will show
 * the Info's current description, which can change midway through the Info.
 * %6 will show the various objectives the player needs to achieve. %7 will
 * show any rewards the player can earn. And if there are any, %8 will show the
 * subtext for the Info.
 *
 * Default:
 * \{%1\}
 * \c[4]Level:\c[0] %2
 * \c[4]From:\c[0] %3
 * \c[4]Location:\c[0] %4
 * 
 * \c[4]Description:\c[0]
 * %5
 * 
 * \c[4]Objectives:\c[0]
 * %6
 * 
 * \c[4]Rewards:\c[0]
 * %7
 * 
 * %8
 *
 * Word Wrap Version (Requires YEP_MessageCore.js):
 * <WordWrap>\{%1\}
 * <br>\c[4]Level:\c[0] %2
 * <br>\c[4]From:\c[0] %3
 * <br>\c[4]Location:\c[0] %4
 * <br>
 * <br>\c[4]Description:\c[0]
 * <br>%5
 * <br>
 * <br>\c[4]Objectives:\c[0]
 * <br>%6
 * <br>
 * <br>\c[4]Rewards:\c[0]
 * <br>%7
 * <br>
 * <br>%8
 *
 * Uncleared Objective
 * - This is the text format that appears for each objective that is neither
 * completed nor failed. %1 will be replaced with the objective's text.
 * Default: \i[160]%1
 * 
 * Completed Objective
 * - If an objective is completed, this text format will be used instead.
 * %1 will be replaced with the objective's text.
 * Default: \i[165]%1
 *
 * Failed Objective
 * - If an objective is failed, this text format will be used instead.
 * %1 will be replaced with the objective's text.
 * Default: \i[162]%1
 *
 * Unclaimed Reward
 * - This is the text format that appears for each reward item that is neither
 * claimed nor denied. %1 will be replaced with the reward's text.
 * Default: \i[160]%1
 *
 * Claimed Reward
 * - If a reward has been claimed, this text format will be used instead.
 * %1 will be replaced with the reward's text.
 * Default: \i[163]%1
 *
 * Denied Reward
 * - If a reward has been denied, this text format will be used instead.
 * %1 will be replaced with the reward's text.
 * Default: \i[161]%1
 *
 * Load Delay
 * - This is the amount of frames the data window will wait before loading a
 * Info's data onto the window itself. This is to prevent overburdening the
 * game engine by loading every single Info that the cursor passes through,
 * and instead, waits until the cursor has settled on a particular Info entry
 * for x amount of frames before loading it.
 * Default: 30
 *
 * ---
 *
 * Window Settings
 * - If you wish to customize the category window, you can adjust the various
 * settings here to adjust its properties. However, keep in mind that unless
 * you are familiar with JavaScript, you can make errors here that can make the
 * windows not work in your game.
 *
 * X: Graphics.boxWidth - width
 * Y: Graphics.boxHeight - height
 * Width: Graphics.boxWidth * 2 / 3
 * Height: Graphics.boxHeight - this.fittingHeight(1)
 * Line Height: 36
 * Font Face: GameFont
 * Font Size: 28
 * Standard Padding: 18
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * Scroll Speed: 4
 * 
 * ============================================================================
 * Instructions - Setting Up New Infos
 * ============================================================================
 *
 * By default, there aren't any Infos made for you. You must set each one up
 * manually. Go into the plugin parameters for YEP_InfoJournal.js and look for
 * the ---Info List--- section. Each of those entries starts off empty.
 * However, if you decide to modify it, you'll be greeted with a template that
 * explains how to set up your Infos. Here is what each parameter does:
 *
 * ---
 *
 * Title
 * - This is the title of your Info. It will show up in three places: the
 * Info list, the Info title window, and if you format it to show in the data
 * window, it will appear there as well. You can use text codes to change the
 * color of the Info or to give the Info icons.
 *
 * Type
 * - This is the Info type. If you decide to show Info types from the list
 * window, this will be where this Info will be listed under. The template has
 * a drop down window for a few of the popular Info types, but you can enter
 * in your own Info type. Keep in mind that this is case sensitive and will
 * require you to type out the Info type correctly. You can, however, omit any
 * \i[x] or \c[x] text codes.
 *
 * Difficulty
 * - No mechanical purpose. It's just there to label a certain difficulty level
 * for the Info. You can insert any kind of text you wish here and it will be
 * displayed in the Info data window if you decide to keep it in there.
 *
 * From
 * - No mechanical purpose. This can be used to state which character in your
 * game issued this Info so the player can have a reference point in knowing
 * who to return to when it becomes time to deliver the Info results.
 *
 * Location
 * - No mechanical purpose. This can be used to state where the Info has
 * originated from, and can reduce the amount of effort the player needs to in
 * order to figure out where the Info came from.
 *
 * Description
 * - No mechanical purpose. This is often used to describe the contents of the
 * Info to the player and provide a set of general instructions as to what the
 * player has to actually do. You can provide multiple descriptions. However,
 * only the first description will be visible by default. If you do provide
 * multiple descriptions, you can change the entry using the plugin command:
 * 'Info x Change Description Entry To y' to alter the description entry to
 * display something else midway through a Info.
 *
 * Objectives List
 * - No mechanical purpose to the game but does have mechanical aspects. The
 * objectives list is commonly used to display a specific set of instructions
 * the player needs to do in order to complete the Info. Multiple sets of
 * objectives can be displayed to indicate multiple objectives that need to be
 * fulfilled by the player.
 *
 * Visible Objectives
 * - This is a list of the set of objectives that will be visible by default
 * when the Info is added to the game's Info journal. Each number entry in
 * there refers to the objective ID (their order position) found in the
 * 'Objectives List' plugin parameter.
 *
 * Rewards List
 * - No mechanical purpose to the game but does have mechanical aspects. The
 * rewards list is to show what the player has to gain as a result of finishing
 * the Info. Multiple sets of rewards can be displayed to indicate the player
 * will receive more than just one type of reward.
 *
 * Visible Rewards
 * - This is a list of the set of rewards that will be visible by default when
 * the Info is added to the game's Info journal. Each number entry in there
 * refers to the reward ID (their order position) found in the 'Rewards List'
 * plugin parameter.
 *
 * Subtext
 * - No mechanical purpose. This is usually used as a footer to provide the
 * player a message that doesn't fit elsewhere in the data window. You can use
 * this however you like or don't use it at all. Multiple sets of subtexts can
 * be used here in case you wish to update the subtext midway through a Info.
 *
 * ============================================================================
 * Main Menu Manager - Positioning the Info Journal Command
 * ============================================================================
 *
 * For those using the Main Menu Manager and would like to position the Info
 * command in a place you'd like, use the following format:
 *
 *       Name: Yanfly.Param.InfoCmdName
 *     Symbol: Info
 *       Show: $gameSystem.isShowInfo()
 *    Enabled: $gameSystem.isEnableInfo()
 *        Ext: 
 *  Main Bind: this.commandInfo.bind(this)
 * Actor Bind: 
 *
 * Insert the above setup within a Main Menu Manager slot. Provided you copy
 * the exact settings to where you need it, it will appear there while using
 * all of the naming, enabling, disabling, hiding, and showing effects done by
 * the plugin parameters.
 *
 * Remember to turn off 'Auto Place Command' from the plugin parameters.
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * For this plugin, you can use various script calls for certain events to make
 * checks on a Info's progress. Here are the different event types and the
 * various script calls you can use with them:
 *
 *
 * --- Control Variables Event's Script Calls ---
 *
 *
 * $gameSystem.totalInfosAvailable()
 * - Sets the variable's value to the number of available Infos.
 *
 * $gameSystem.totalInfosCompleted()
 * - Sets the variable's value to the number of completed Infos.
 *
 * $gameSystem.totalInfosFailed()
 * - Sets the variable's value to the number of failed Infos.
 *
 * $gameSystem.totalInfosKnown()
 * - Sets the variable's value to the total number of Infos known.
 *
 * $gameSystem.totalInfosInGame()
 * - Sets the variable's value to the total number of Infos in the game.
 *
 * $gameSystem.totalInfoTypes(category, type)
 * - Replace 'category' with either 'available', 'completed', 'failed', or
 * 'all' to designate the category. Replace 'type' with the Info type
 * (ie. 'Main Infos', 'Side Infos', 'Character Infos', etc). Include the
 * quotes around the category and type
 * Example: $gameSystem.totalInfoTypes('all', 'Main Infos')
 *
 * $gameSystem.getInfoDescriptionIndex(InfoId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. This will
 * set the variable to show which description is being used currently.
 * Example: $gameSystem.getInfoDescriptionIndex(50)
 *
 * $gameSystem.totalVisibleInfoObjectives(InfoId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. This will
 * set the variable to show how many Info objectives are visible currently for
 * the selected Info.
 * Example: $gameSystem.totalVisibleInfoObjectives(50)
 *
 * $gameSystem.totalInfoObjectives(InfoId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. This will
 * set the variable to show how many Info objectives are total for the
 * selected Info's settings.
 * Example: $gameSystem.totalInfoObjectives(50)
 *
 * $gameSystem.totalVisibleInfoRewards(InfoId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. This will
 * set the variable to show how many Info rewards are visible currently for
 * the selected Info.
 * Example: $gameSystem.totalVisibleInfoRewards(50)
 *
 * $gameSystem.totalInfoRewards(InfoId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. This will
 * set the variable to show how many Info rewards are total for the selected
 * Info's settings.
 * Example: $gameSystem.totalInfoRewards(50)
 *
 * $gameSystem.getInfoSubtextIndex(InfoId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. This will
 * set the variable to show which subtext is being used currently.
 * Example: $gameSystem.getInfoSubtextIndex(50)
 *
 *
 * --- Conditional Branch Event's Script Calls ---
 *
 * 
 * $gameSystem.isInfoObjectiveCompleted(InfoId, objectiveId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. Replace
 * 'objectiveId' with the ID of the objective you're intending to check. This
 * will make a check in the conditional branch's script call to see if an
 * objective's status is completed (true) or not (false).
 * Example: $gameSystem.isInfoObjectiveCompleted(50, 1)
 *
 * $gameSystem.isInfoObjectiveFailed(InfoId, objectiveId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. Replace
 * 'objectiveId' with the ID of the objective you're intending to check. This
 * will make a check in the conditional branch's script call to see if an
 * objective's status is failed (true) or not (false).
 * Example: $gameSystem.isInfoObjectiveFailed(50, 1)
 *
 * $gameSystem.isInfoObjectiveUncleared(InfoId, objectiveId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. Replace
 * 'objectiveId' with the ID of the objective you're intending to check. This
 * will make a check in the conditional branch's script call to see if an
 * objective's status is neither completed nor failed (true) or either (false).
 * Example: $gameSystem.isInfoObjectiveUncleared(50, 1)
 * 
 * $gameSystem.isInfoRewardClaimed(InfoId, rewardId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. Replace
 * 'rewardId' with the ID of the reward you're intending to check. This will
 * make a check in the conditional branch's script call to see if a reward's
 * status is claimed (true) or not (false).
 * Example: $gameSystem.isInfoRewardClaimed(50, 1)
 * 
 * $gameSystem.isInfoRewardDenied(InfoId, rewardId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. Replace
 * 'rewardId' with the ID of the reward you're intending to check. This will
 * make a check in the conditional branch's script call to see if a reward's
 * status is denied (true) or not (false).
 * Example: $gameSystem.isInfoRewardDenied(50, 1)
 * 
 * $gameSystem.isInfoRewardUnclaimed(InfoId, rewardId)
 * - Replace 'InfoId' with the ID of the Info you're looking for. Replace
 * 'rewardId' with the ID of the reward you're intending to check. This will
 * make a check in the conditional branch's script call to see if a reward's
 * status is neither claimed nor denied (true) or either (false).
 * Example: $gameSystem.isInfoRewardUnclaimed(50, 1)
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * There are various plugin commands you can use to control the Info journal
 * system in your game.
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * Plugin Commands:
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 *   Info Journal Open
 *   - Opens the Info journal system menu with no Info selected.
 *
 *   Info Journal Open To x
 *   - Replace 'x' with the Info ID you wish to open the Info journal system
 *   to. If the Info isn't known to the player at the time this plugin command
 *   takes place, then the Info will be added to the player's Info journal.
 *
 *   ---
 *
 *   Info Journal Show
 *   Info Journal Hide
 *   - Show or hide the Info Journal option from the main menu.
 *
 *   Info Journal Enable
 *   Info Journal Disable
 *   - Enable or disable the Info Journal option in the main menu.
 *
 *   ---
 *
 *   Info Add x
 *   - Replace 'x' with an integer. Adds Info ID 'x' to the Info journal as
 *   an available Info. This will make it viewable from the in-game Info
 *   journal system menu.
 *
 *   Info Add x to y
 *   - Replace 'x' and 'y' with integer values determining the Info ID range
 *   you wish to add in mass amounts to the Info journal.
 *
 *   Info Add x, x, x
 *   - Replace 'x' values with integer values representing the Info ID's you
 *   wish to add to the Info journal.
 *
 *   ---
 *
 *   Info Remove x
 *   - Replace 'x' with an integer. This will remove Info ID 'x' from the
 *   Info journal.
 *
 *   Info Remove x to y
 *   - Replace 'x' and 'y' with integer values determining the Info ID range
 *   you wish to remove in mass amounts from the Info journal.
 *
 *   Info Remove x, x, x
 *   - Replace 'x' values with integer values representing the Info ID's you
 *   wish to remove from the Info journal.
 *
 *   ---
 *
 *   Info Set Completed x
 *   Info Set Failed x
 *   Info Set Available x
 *   - Replace 'x' with the Info ID you wish to change the Info status to
 *   'completed', 'failed', or 'available'.
 *
 *   Info Set Completed x to y
 *   Info Set Failed x to y
 *   Info Set Available x to y
 *   - Replace 'x' and 'y' with integer values determining the Info ID range
 *   you wish to set as completed, failed, or available.
 *
 *   Info Set Completed x, x, x
 *   Info Set Failed x, x, x
 *   Info Set Available x, x, x
 *   - Replace 'x' values with integer values representing the Info ID's you
 *   wish to set as completed, failed, or available.
 *
 *   ---
 *
 *   Info x Change Description Entry To y
 *   - Replace 'x' with the Info ID you want to modify the description of.
 *   Replace 'y' with the description entry ID you wish to change the Info to.
 *   This will make the description, when viewed in-game in the Info journal,
 *   to display the description entry ID 'y' found in the plugin parameters for
 *   Info 'x'. This is used for times you wish to update the description text
 *   midway through a Info.
 *
 *   ---
 *
 *   Info x Show Objective y
 *   Info x Hide Objective y
 *   - Replace 'x' with the Info ID you wish to alter the objective of.
 *   Replace 'y' with the objective ID you wish to make visible/hidden. Infos
 *   can show multiple objectives at once.
 *
 *   Info x Show Objective y to z
 *   Info x Hide Objective y to z
 *   - Replace 'x' with the Info ID you wish to alter the objective of.
 *   Replace 'y' and 'z' with the objective ID range you wish to make
 *   visible/hidden. Infos can show multiple objectives at once.
 *
 *   Info x Show Objective y, y, y
 *   Info x Hide Objective y, y, y
 *   - Replace 'x' with the Info ID you wish to alter the objective of.
 *   Replace 'y' values with integer values representing the objective ID's you
 *   wish to make visible/hidden. Infos can show multiple objectives at once.
 *
 *   Info X Show All Objectives
 *   Info X Hide All Objectives
 *   - Replace 'x' with the Info ID you wish to alter the objectives of.
 *   This will show/hide all of the Info's objectives.
 *
 *   Info x Complete Objective y
 *   Info x Fail Objective y
 *   Info x Normalize Objective y
 *   - Replace 'x' with the Info ID you wish to alter the objective of.
 *   Replace 'y' with the objective ID you wish to change the status of.
 *   Using 'Complete' will mark the objective as completed. Using 'Fail' will
 *   mark the objective as failed. Using 'Normalize' will set the objective's
 *   status to neither completed or failed.
 *
 *   Info x Complete Objective y to z
 *   Info x Fail Objective y to z
 *   Info x Normalize Objective y to z
 *   - Replace 'x' with the Info ID you wish to alter the objective of.
 *   Replace 'y' and 'z' with the objective ID range you wish to change the
 *   status of. Using 'Complete' will mark the objective as completed. Using
 *   'Fail' will mark the objective as failed. Using 'Normalize' will set the
 *   objective's status to neither completed or failed.
 *
 *   Info x Complete Objective y, y, y
 *   Info x Fail Objective y, y, y
 *   Info x Normalize Objective y, y, y
 *   - Replace 'x' with the Info ID you wish to alter the objective of.
 *   Replace 'y' values with integer values representing the objective ID's you
 *   wish to change the status of. Using 'Complete' will mark the objective as
 *   completed. Using 'Fail' will mark the objective as failed. Using
 *   'Normalize' will set the objective's status to neither completed or
 *   failed.
 *
 *   Info x Complete All Objectives
 *   Info x Fail All Objectives
 *   Info x Normalize All Objectives
 *   - Replace 'x' with the Info ID you wish to alter the objectives of.
 *   This will complete/fail/normalize all of the Info's objectives.
 *
 *   ---
 *
 *   Info x Show Reward y
 *   Info x Hide Reward y
 *   - Replace 'x' with the Info ID you wish to alter the reward of. Replace
 *   'y' with the reward ID you wish to make visible/hidden. Infos can show
 *   multiple reward at once.
 *
 *   Info x Show Reward y to z
 *   Info x Hide Reward y to z
 *   - Replace 'x' with the Info ID you wish to alter the reward of. Replace
 *   'y' and 'z' with the reward ID range you wish to make visible/hidden.
 *   Infos can show multiple reward at once.
 *
 *   Info x Show Reward y, y, y
 *   Info x Hide Reward y, y, y
 *   - Replace 'x' with the Info ID you wish to alter the reward of. Replace
 *   'y' values with integer values representing the reward ID's you wish to
 *   make visible/hidden. Infos can show multiple reward at once.
 *
 *   Info x Show All Rewards
 *   Info x Hide All Rewards
 *   - Replace 'x' with the Info ID you wish to alter the rewards of. This
 *   will show/hide all of the Info's rewards.
 *
 *   Info x Claim Reward y
 *   Info x Deny Reward y
 *   Info x Normalize Reward y
 *   - Replace 'x' with the Info ID you wish to alter the reward of. Replace
 *   'y' with the reward ID you wish to change the status of. Using 'Claim'
 *   will mark the reward as claimed. Using 'Deny' will mark the reward as
 *   denied. Using 'Normalize' will set the reward's status to neither claimed
 *   or denied.
 *
 *   Info x Claim Reward y to z
 *   Info x Deny Reward y to z
 *   Info x Normalize Reward y to z
 *   - Replace 'x' with the Info ID you wish to alter the reward of. Replace
 *   'y' and 'z' with the reward ID range you wish to change the status of.
 *   Using 'Claim' will mark the reward as claimed. Using 'Deny' will mark the
 *   reward as denied. Using 'Normalize' will set the reward's status to
 *   neither claimed or denied.
 *
 *   Info x Claim Reward y, y, y
 *   Info x Deny Reward y, y, y
 *   Info x Normalize Reward y, y, y
 *   - Replace 'x' with the Info ID you wish to alter the reward of. Replace
 *   'y' values with integer values representing the reward ID you wish to
 *   change the status of. Using 'Claim' will mark the reward as claimed. Using
 *   'Deny' will mark the reward as denied. Using 'Normalize' will set the
 *   reward's status to neither claimed or denied.
 *
 *   Info x Claim All Rewards
 *   Info x Deny All Rewards
 *   Info x Normalize All Rewards
 *   - Replace 'x' with the Info ID you wish to alter the rewards of. This
 *   will claim/deny/normalize all of the Info's rewards.
 *
 *   ---
 *
 *   Info x Change Subtext Entry To y
 *   - Replace 'x' with the Info ID you want to modify the subtext of. Replace
 *   'y' with the subtext entry ID you wish to change the Info to. This will
 *   make the subtext, when viewed in-game in the Info journal, to display the
 *   subtext entry ID 'y' found in the plugin parameters for Info 'x'. This is
 *   used for times you wish to update the subtext text midway through a Info.
 *
 *   ---
 *
 * ============================================================================
 * Instructions - Lunatic Mode
 * ============================================================================
 *
 * The plugin parameter 'Lunatic Mode' is made for users who are familiar with
 * JavaScript. These parameters allow you to add additional lines of code to
 * their respective functions whenever the respective Info journal function
 * occurs in-game. The timing for them will occur after the function occurred
 * and only if it was successful in delivering a change.
 *
 *   ---
 *
 *   Before Create Windows
 *   After Create Windows
 *   Close Info Menu
 *
 *   ---
 *
 *   Info Add
 *   Info Remove
 *   Info Complete
 *   Info Fail
 *   Info Available
 *
 *   ---
 *
 *   Change Description
 *
 *   ---
 *
 *   Show Objective
 *   Hide Objective
 *   Complete Objective
 *   Fail Objective
 *   Normalize Objective
 *
 *   ---
 *
 *   Show Reward
 *   Hide Reward
 *   Claim Reward
 *   Deny Reward
 *   Normalize Reward
 *
 *   ---
 *
 *   Change Subtext
 *
 *   ---
 *
 * There are a few rules to note. The code for each of those plugin functions
 * will only run if it meets these rules:
 *
 *   1. The code will run for each Info or Info property changed. This means
 *      that if you used a plugin command that alters a group of Infos or
 *      Info properties at once, the code will run multiple times individually
 *      for each Info or Info property.
 *
 *   2. The code will only run if there has been successful changes to a Info
 *      or Info property. For example, if a Info is already set to 'Failed',
 *      running the plugin command to fail that Info again will not trigger
 *      the Lunatic Mode code to run again.
 *
 *   3. When a Info is first added, any default properties added to the Info
 *      will not trigger the Lunatic Mode to run. For example, if the Info
 *      being added has objectives 1 and 2 already visible from the start, then
 *      the Lunatic Mode code will not run for 1 and 2.
 *
 * Make sure you understand these rules so that you know what governs whether
 * or not the custom code runs.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Fixed some bugs regarding certain plugin commands not working properly.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Help
 * ============================================================================
 *
 * @param ---Main Menu---
 * @default
 *
 * @param Info Command
 * @parent ---Main Menu---
 * @desc This is the text used for the main menu command
 * @default Info
 *
 * @param Show Command
 * @parent ---Main Menu---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Info command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @parent ---Main Menu---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Synthesis command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Auto Place Command
 * @parent ---Main Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allow this plugin to decide the menu placement position?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Info Menu---
 * @default
 *
 * @param Info Category Window
 * @parent ---Info Menu---
 * @type struct<CategoryWindow>
 * @desc Adjust the properties for the Info category window here.
 * @default {"---Categories---":"","Category Order":"[\"available\",\"completed\",\"failed\",\"all\"]","Available Text":"\\i[192]Available (%1)","Completed Text":"\\i[191]Completed (%1)","Failed Text":"\\i[194]Failed (%1)","All Text":"\\i[189]All Infos (%1)","Cancel Text":"\\i[161]Close","---Window Settings---":"","X":"0","Y":"0","Width":"Graphics.boxWidth / 3","Height":"this.fittingHeight(this.numVisibleRows())","Rows":"4","Columns":"1","Line Height":"36","Font Face":"GameFont","Font Size":"28","Standard Padding":"18","Text Padding":"6","Text Alignment":"left","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 *
 * @param Info List Window
 * @parent ---Info Menu---
 * @type struct<ListWindow>
 * @desc Adjust the properties for the Info list window here.
 * @default {"---Types---":"","Show Types":"true","Type Order":"[\"\\\\c[6]Main Infos\",\"\\\\c[4]Side Infos\",\"\\\\c[3]Character Infos\",\"\\\\c[5]Tutorial Infos\"]","List Open Symbol":"-","List Closed Symbol":"+","Type Text Format":"%1%2 (%3)","Info Indent":"0","Show Empty":"false","Read Info":"\\i[121]Read Info","Cancel":"\\i[16]Cancel","---Window Settings---":"","X":"0","Y":"Graphics.boxHeight - height","Width":"Graphics.boxWidth / 3","Height":"Graphics.boxHeight - this.fittingHeight(4)","Line Height":"36","Font Face":"GameFont","Font Size":"28","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Type Alignment":"left","Info Alignment":"left","Window Skin":"Window"}
 *
 * @param Info Title Window
 * @parent ---Info Menu---
 * @type struct<TitleWindow>
 * @desc Adjust the properties for the Info title window here.
 * @default {"---Window Settings---":"","No Info Title":"\\c[4]Info Journal","X":"Graphics.boxWidth - width","Y":"0","Width":"Graphics.boxWidth * 2 / 3","Height":"this.fittingHeight(1)","Line Height":"36","Font Face":"GameFont","Font Size":"28","Standard Padding":"18","Text Padding":"6","Text Alignment":"center","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 *
 * @param Info Data Window
 * @parent ---Info Menu---
 * @type struct<DataWindow>
 * @desc Adjust the properties for the Info data window here.
 * @default {"---Data Settings---":"","No Data Text":"\"Welcome to the \\\\c[4]Info Journal\\\\c[0].\\n\\nHere, you can review over the various\\nInfos given to you by people from all\\nover the world.\"","Info Data Format":"\"<WordWrap>\\\\{%1\\\\}\\n<br>\\\\c[4]Level:\\\\c[0] %2\\n<br>\\\\c[4]From:\\\\c[0] %3\\n<br>\\\\c[4]Location:\\\\c[0] %4\\n<br>\\n<br>\\\\c[4]Description:\\\\c[0]\\n<br>%5\\n<br>\\n<br>\\\\c[4]Objectives:\\\\c[0]\\n<br>%6\\n<br>\\n<br>\\\\c[4]Rewards:\\\\c[0]\\n<br>%7\\n<br>\\n<br>%8\"","Uncleared Objective":"\\i[160]%1","Completed Objective":"\\i[165]%1","Failed Objective":"\\i[162]%1","Unclaimed Reward":"\\i[160]%1","Claimed Reward":"\\i[163]%1","Denied Reward":"\\i[161]%1","Load Delay":"30","---Window Settings---":"","X":"Graphics.boxWidth - width","Y":"Graphics.boxHeight - height","Width":"Graphics.boxWidth * 2 / 3","Height":"Graphics.boxHeight - this.fittingHeight(1)","Line Height":"36","Font Face":"GameFont","Font Size":"28","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window","Scroll Speed":"4"}
 *
 * @param Lunatic Mode
 * @parent ---Info Menu---
 * @type struct<LunaticMode>
 * @desc Add custom code to each of the plugin's major functions.
 * @default {"---Info Menu---":"","Before Create Windows":"\"// Variables\\n//   background - background image used for the menu\\n//   windowLayer - sprite layer that contains all windows\\n//\\n// background.bitmap = ImageManager.loadTitle1(\\\"Book\\\");\\n// this.fitScreen(background);\"","After Create Windows":"\"// Variables\\n//   background - background image used for the menu\\n//   windowLayer - sprite layer that contains all windows\"","Close Info Menu":"\"// Variables\\n//   background - background image used for the menu\\n//   windowLayer - sprite layer that contains all windows\"","---Info Status---":"","Info Add":"\"// Variables:\\n//   InfoId - ID of the Info being added\\n//\\n// console.log('Info ' + InfoId + ' successfully added!')\"","Info Remove":"\"// Variables:\\n//   InfoId - ID of the Info being removed\\n//\\n// console.log('Info ' + InfoId + ' successfully removed!')\"","Info Complete":"\"// Variables:\\n//   InfoId - ID of the Info set to completed\\n//\\n// console.log('Info ' + InfoId + ' status changed to Completed!')\"","Info Fail":"\"// Variables:\\n//   InfoId - ID of the Info set to failed\\n//\\n// console.log('Info ' + InfoId + ' status changed to Failed!')\"","Info Available":"\"// Variables:\\n//   InfoId - ID of the Info set to available\\n//\\n// console.log('Info ' + InfoId + ' status changed to Available!')\"","---Description---":"","Change Description":"\"// Variables:\\n//   InfoId - ID of the Info whose description is changed\\n//   index - Description index being changed to\\n//\\n// console.log('Info ' + InfoId + ' description index changed to ' + index)\"","---Objectives---":"","Show Objective":"\"// Variables:\\n//   InfoId - ID of the Info whose objectives are altered\\n//   objectiveId - ID of the objective being shown\\n//\\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to shown!')\"","Hide Objective":"\"// Variables:\\n//   InfoId - ID of the Info whose objectives are altered\\n//   objectiveId - ID of the objective being hidden\\n//\\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to hidden!')\"","Complete Objective":"\"// Variables:\\n//   InfoId - ID of the Info whose objectives are altered\\n//   objectiveId - ID of the objective being completed\\n//\\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to completed!')\"","Fail Objective":"\"// Variables:\\n//   InfoId - ID of the Info whose objectives are altered\\n//   objectiveId - ID of the objective having failed\\n//\\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to failed!')\"","Normalize Objective":"\"// Variables:\\n//   InfoId - ID of the Info whose objectives are altered\\n//   objectiveId - ID of the objective normalized\\n//\\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to normal!')\"","---Rewards---":"","Show Reward":"\"// Variables:\\n//   InfoId - ID of the Info whose rewards are altered\\n//   rewardId - ID of the reward being shown\\n//\\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' becomes shown!')\"","Hide Reward":"\"// Variables:\\n//   InfoId - ID of the Info whose rewards are altered\\n//   rewardId - ID of the reward being hidden\\n//\\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' becomes hidden!')\"","Claim Reward":"\"// Variables:\\n//   InfoId - ID of the Info whose rewards are altered\\n//   rewardId - ID of the reward becoming claimed\\n//\\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' is now claimed!')\"","Deny Reward":"\"// Variables:\\n//   InfoId - ID of the Info whose rewards are altered\\n//   rewardId - ID of the reward becoming denied\\n//\\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' is now denied!')\"","Normalize Reward":"\"// Variables:\\n//   InfoId - ID of the Info whose rewards are altered\\n//   rewardId - ID of the reward normalized\\n//\\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' is normalized!')\"","---Subtext---":"","Change Subtext":"\"// Variables:\\n//   InfoId - ID of the Info whose subtext is changed\\n//   index - Subtext index being changed to\\n//\\n// console.log('Info ' + InfoId + ' subtext index changed to ' + index)\""}
 *
 * @param ---Info List---
 * @default
 *
 * @param Info 1
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 2
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 3
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 4
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 5
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 6
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 7
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 8
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 9
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 10
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 11
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 12
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 13
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 14
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 15
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 16
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 17
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 18
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 19
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 * 
 * @param Info 20
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 21
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 22
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 23
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 24
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 25
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 26
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 27
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 28
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 29
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 30
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 31
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 32
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 33
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 34
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 35
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 36
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 37
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 38
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 39
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 40
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 41
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 42
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 43
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 44
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 45
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 46
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 47
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 48
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 49
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 50
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 51
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 52
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 53
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 54
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 55
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 56
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 57
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 58
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 59
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 60
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 61
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 62
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 63
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 64
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 65
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 66
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 67
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 68
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 69
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 70
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 71
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 72
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 73
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 74
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 75
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 76
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 77
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 78
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 79
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 80
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 81
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 82
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 83
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 84
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 85
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 86
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 87
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 88
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 89
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 90
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 91
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 92
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 93
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 94
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 95
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 96
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 97
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 98
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 99
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Info 100
 * @parent ---Info List---
 * @type struct<Info>
 * @desc Modify the data used by this Info entry.
 * Refer to Help for more information about each setting.
 * @default
 */
//=============================================================================
/* Plugin Parameter Structure Settings
 *=============================================================================
 */
/* ----------------------------------------------------------------------------
 * CategoryWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~CategoryWindow:
 * @param ---Categories---
 * @default
 *
 * @param Category Order
 * @parent ---Categories---
 * @type string[]
 * @desc Order list for the Info type categories.
 * Options: available, completed, failed, all, cancel
 * @default ["available","completed","failed","all"]
 *
 * @param Available Text
 * @parent ---Categories---
 * @desc The text used for available Infos.
 * Text codes allowed. %1 - Info Number
 * @default \i[192]Available (%1)
 *
 * @param Completed Text
 * @parent ---Categories---
 * @desc The text used for completed Infos.
 * Text codes allowed. %1 - Info Number
 * @default \i[191]Completed (%1)
 *
 * @param Failed Text
 * @parent ---Categories---
 * @desc The text used for failed Infos.
 * Text codes allowed. %1 - Info Number
 * @default \i[194]Failed (%1)
 *
 * @param All Text
 * @parent ---Categories---
 * @desc The text used for all Infos.
 * Text codes allowed. %1 - Info Number
 * @default \i[189]All Infos (%1)
 *
 * @param Cancel Text
 * @parent ---Categories---
 * @desc The text used for the Close option.
 * Text codes allowed.
 * @default \i[161]Close
 * 
 * @param ---Window Settings---
 * @default
 *
 * @param X
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc Formula for the window's X position.
 * @default 0
 *
 * @param Y
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc Formula for the window's Y position.
 * @default 0
 *
 * @param Width
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth * 2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth * 3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth * 4 / 5
 * @desc Formula for the window width.
 * @default Graphics.boxWidth / 3
 *
 * @param Height
 * @parent ---Window Settings---
 * @type combo
 * @option this.fittingHeight(1)
 * @option this.fittingHeight(2)
 * @option this.fittingHeight(3)
 * @option this.fittingHeight(4)
 * @option this.fittingHeight(5)
 * @option this.fittingHeight(this.numVisibleRows())
 * @desc Formula for the window height.
 * @default this.fittingHeight(this.numVisibleRows())
 *
 * @param Rows
 * @parent ---Window Settings---
 * @type combo
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @desc Formula for the number of window rows.
 * @default 4
 *
 * @param Columns
 * @parent ---Window Settings---
 * @type combo
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @desc Formula for the number of window columns.
 * @default 1
 *
 * @param Line Height
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc The height used for each line entry.
 * @default 36
 *
 * @param Font Face
 * @parent ---Window Settings---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc The font face used for your game.
 * @default GameFont
 *
 * @param Font Size
 * @parent ---Window Settings---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc Formula for the standard font size.
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc Formula for the window's padding.
 * @default 18
 *
 * @param Text Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc Formula for the padding used before displaying text.
 * @default 6
 *
 * @param Text Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Choose what type of alignment to use for the window's text.
 * left     center     right
 * @default left
 *
 * @param Standard Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc Formula for the standard opacity used by the window.
 * @default 255
 *
 * @param Back Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc Formula for the opacity used by the window.
 * @default 192
 *
 * @param Window Skin
 * @parent ---Window Settings---
 * @type file
 * @dir img/system/
 * @desc Window skin used.
 * @default Window
 * 
 */
/* ----------------------------------------------------------------------------
 * ListWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~ListWindow:
 * @param ---Types---
 * @default
 *
 * @param Show Types
 * @parent ---Types---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Info types in the Info list?
 * @default true
 *
 * @param Type Order
 * @parent ---Types---
 * @type string[]
 * @desc Order list for the Info list types.
 * Name these however you want. Text codes are allowed.
 * @default ["\\c[6]Main Infos","\\c[4]Side Infos","\\c[3]Character Infos","\\c[5]Tutorial Infos"]
 *
 * @param List Open Symbol
 * @parent ---Types---
 * @desc Text indicator to show if a type is opened.
 * Opened types will show all Infos within that Info type.
 * @default -
 *
 * @param List Closed Symbol
 * @parent ---Types---
 * @desc Text indicator to show if a type is closed.
 * Closed types will not show all Infos within that Info type.
 * @default +
 *
 * @param Type Text Format
 * @parent ---Types---
 * @desc Format used to display Info types. Text codes allowed.
 * %1 - Open/Closed   %2 - Type Name   %3 - Info Number
 * @default %1%2 (%3)
 *
 * @param Info Indent
 * @parent ---Types---
 * @number
 * @number 0
 * @desc How many pixels much to indent Infos by.
 * @default 0
 *
 * @param Show Empty
 * @parent ---Types---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Info types that are empty? If not, types
 * without any Infos will be hidden from the list.
 * @default false
 *
 * @param Read Info
 * @parent ---Types---
 * @desc Vocabulary used for the 'Read Info' option.
 * You can use text codes.
 * @default \\i[121]Read Info
 *
 * @param Cancel
 * @parent ---Types---
 * @desc Vocabulary used for the 'Cancel' option.
 * @default \\i[16]Cancel
 * 
 * @param ---Window Settings---
 * @default
 *
 * @param X
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc Formula for the window's X position.
 * @default 0
 *
 * @param Y
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc Formula for the window's Y position.
 * @default Graphics.boxHeight - height
 *
 * @param Width
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth * 2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth * 3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth * 4 / 5
 * @desc Formula for the window width.
 * @default Graphics.boxWidth / 3
 *
 * @param Height
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxHeight - this.fittingHeight(1)
 * @option Graphics.boxHeight - this.fittingHeight(2)
 * @option Graphics.boxHeight - this.fittingHeight(3)
 * @option Graphics.boxHeight - this.fittingHeight(4)
 * @option Graphics.boxHeight - this.fittingHeight(5)
 * @desc Formula for the window height.
 * @default Graphics.boxHeight - this.fittingHeight(4)
 *
 * @param Line Height
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc The height used for each line entry.
 * @default 36
 *
 * @param Font Face
 * @parent ---Window Settings---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc The font face used for your game.
 * @default GameFont
 *
 * @param Font Size
 * @parent ---Window Settings---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc Formula for the standard font size.
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc Formula for the window's padding.
 * @default 18
 *
 * @param Text Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc Formula for the padding used before displaying text.
 * @default 6
 *
 * @param Standard Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc Formula for the standard opacity used by the window.
 * @default 255
 *
 * @param Back Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc Formula for the opacity used by the window.
 * @default 192
 *
 * @param Type Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Choose what type of alignment to use for the Info types.
 * left     center     right
 * @default left
 *
 * @param Info Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Choose what type of alignment to use for the Infos themselves.
 * left     center     right
 * @default left
 *
 * @param Window Skin
 * @parent ---Window Settings---
 * @type file
 * @dir img/system/
 * @desc Window skin used.
 * @default Window
 * 
 */
/* ----------------------------------------------------------------------------
 * TitleWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~TitleWindow:
 * @param ---Window Settings---
 * @default
 *
 * @param No Info Title
 * @parent ---Window Settings---
 * @desc Display this when there's no Info selected.
 * Text codes allowed.
 * @default \\c[4]Info Journal
 *
 * @param X
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc Formula for the window's X position.
 * @default Graphics.boxWidth - width
 *
 * @param Y
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc Formula for the window's Y position.
 * @default 0
 *
 * @param Width
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth * 2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth * 3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth * 4 / 5
 * @desc Formula for the window width.
 * @default Graphics.boxWidth * 2 / 3
 *
 * @param Height
 * @parent ---Window Settings---
 * @type combo
 * @option this.fittingHeight(1)
 * @option this.fittingHeight(2)
 * @option this.fittingHeight(3)
 * @option this.fittingHeight(4)
 * @option this.fittingHeight(5)
 * @desc Formula for the window height.
 * @default this.fittingHeight(1)
 *
 * @param Line Height
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc The height used for each line entry.
 * @default 36
 *
 * @param Font Face
 * @parent ---Window Settings---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc The font face used for your game.
 * @default GameFont
 *
 * @param Font Size
 * @parent ---Window Settings---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc Formula for the standard font size.
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc Formula for the window's padding.
 * @default 18
 *
 * @param Text Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc Formula for the padding used before displaying text.
 * @default 6
 *
 * @param Text Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Choose what type of alignment to use for the window's text.
 * left     center     right
 * @default center
 *
 * @param Standard Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc Formula for the standard opacity used by the window.
 * @default 255
 *
 * @param Back Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc Formula for the opacity used by the window.
 * @default 192
 *
 * @param Window Skin
 * @parent ---Window Settings---
 * @type file
 * @dir img/system/
 * @desc Window skin used.
 * @default Window
 * 
 */
/* ----------------------------------------------------------------------------
 * DataWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~DataWindow:
 * @param ---Data Settings---
 * @default
 *
 * @param No Data Text
 * @parent ---Data Settings---
 * @type note
 * @desc Text to display when no Info data is available.
 * @default "Welcome to the \\c[4]Info Journal\\c[0].\n\nHere, you can review over the various\nInfos given to you by people from all\nover the world."
 *
 * @param Info Data Format
 * @parent ---Data Settings---
 * @type note
 * @desc %1 - Title, %2 - Difficulty, %3 - From, %4 - Location
 * %5 - Desc, %6 - Objectives, %7 - Rewards, %8 - Subtext
 * @default "\\{%1\\}\n\\c[4]Level:\\c[0] %2\n\\c[4]From:\\c[0] %3\n\\c[4]Location:\\c[0] %4\n\n\\c[4]Description:\\c[0]\n%5\n\n\\c[4]Objectives:\\c[0]\n%6\n\n\\c[4]Rewards:\\c[0]\n%7\n\n%8"
 *
 * @param Uncleared Objective
 * @parent ---Data Settings---
 * @desc Text format for uncleared Info objectives.
 * %1 - Objective Text
 * @default \i[160]%1
 *
 * @param Completed Objective
 * @parent ---Data Settings---
 * @desc Text format for completed Info objectives.
 * %1 - Objective Text
 * @default \i[165]%1
 *
 * @param Failed Objective
 * @parent ---Data Settings---
 * @desc Text format for failed Info objectives.
 * %1 - Objective Text
 * @default \i[162]%1
 *
 * @param Unclaimed Reward
 * @parent ---Data Settings---
 * @desc Text format for unclaimed Info rewards.
 * %1 - Reward Text
 * @default \i[160]%1
 *
 * @param Claimed Reward
 * @parent ---Data Settings---
 * @desc Text format for claimed Info rewards.
 * %1 - Reward Text
 * @default \i[163]%1
 *
 * @param Denied Reward
 * @parent ---Data Settings---
 * @desc Text format for denied Info rewards.
 * %1 - Reward Text
 * @default \i[161]%1
 *
 * @param Load Delay
 * @parent ---Data Settings---
 * @type number
 * @desc Loading time delay for data in frames.
 * This is to prevent overburdening the engine.
 * @default 30
 *
 * @param ---Window Settings---
 * @default
 *
 * @param X
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc Formula for the window's X position.
 * @default Graphics.boxWidth - width
 *
 * @param Y
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc Formula for the window's Y position.
 * @default Graphics.boxHeight - height
 *
 * @param Width
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth * 2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth * 3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth * 4 / 5
 * @desc Formula for the window width.
 * @default Graphics.boxWidth * 2 / 3
 *
 * @param Height
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxHeight - this.fittingHeight(1)
 * @option Graphics.boxHeight - this.fittingHeight(2)
 * @option Graphics.boxHeight - this.fittingHeight(3)
 * @option Graphics.boxHeight - this.fittingHeight(4)
 * @option Graphics.boxHeight - this.fittingHeight(5)
 * @desc Formula for the window height.
 * @default Graphics.boxHeight - this.fittingHeight(1)
 *
 * @param Line Height
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc The height used for each line entry.
 * @default 36
 *
 * @param Font Face
 * @parent ---Window Settings---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc The font face used for your game.
 * @default GameFont
 *
 * @param Font Size
 * @parent ---Window Settings---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc Formula for the standard font size.
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc Formula for the window's padding.
 * @default 18
 *
 * @param Text Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc Formula for the padding used before displaying text.
 * @default 6
 *
 * @param Standard Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc Formula for the standard opacity used by the window.
 * @default 255
 *
 * @param Back Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc Formula for the opacity used by the window.
 * @default 192
 *
 * @param Window Skin
 * @parent ---Window Settings---
 * @type file
 * @dir img/system/
 * @desc Window skin used.
 * @default Window
 *
 * @param Scroll Speed
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc The speed at which the window scrolls when pressing up/down.
 * @default 4
 * 
 */
/* ----------------------------------------------------------------------------
 * LunaticMode Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~LunaticMode:
 * @param ---Info Menu---
 * @default
 *
 * @param Before Create Windows
 * @parent ---Info Menu---
 * @type note
 * @desc This code will run before any of the Info menus
 * are created for the scene.
 * @default "// Variables\n//   background - background image used for the menu\n//   windowLayer - sprite layer that contains all windows\n//\n// background.bitmap = ImageManager.loadTitle1(\"Book\");\n// this.fitScreen(background);"
 *
 * @param After Create Windows
 * @parent ---Info Menu---
 * @type note
 * @desc This code will run after all of the Info menus
 * are created for the scene.
 * @default "// Variables\n//   background - background image used for the menu\n//   windowLayer - sprite layer that contains all windows"
 *
 * @param Close Info Menu
 * @parent ---Info Menu---
 * @type note
 * @desc This code will run when the Info menu is closed.
 * @default "// Variables\n//   background - background image used for the menu\n//   windowLayer - sprite layer that contains all windows"
 *
 * @param ---Info Status---
 * @default 
 * 
 * @param Info Add
 * @parent ---Info Status---
 * @type note
 * @desc This code will run any time a Info is successfully
 * added to the Info Journal.
 * @default "// Variables:\n//   InfoId - ID of the Info being added\n//\n// console.log('Info ' + InfoId + ' successfully added!')"
 *
 * @param Info Remove
 * @parent ---Info Status---
 * @type note
 * @desc This code will run any time a Info is successfully
 * removed the Info Journal.
 * @default "// Variables:\n//   InfoId - ID of the Info being removed\n//\n// console.log('Info ' + InfoId + ' successfully removed!')"
 *
 * @param Info Complete
 * @parent ---Info Status---
 * @type note
 * @desc This code will run any time a Info's status is
 * changed to completed.
 * @default "// Variables:\n//   InfoId - ID of the Info set to completed\n//\n// console.log('Info ' + InfoId + ' status changed to Completed!')"
 *
 * @param Info Fail
 * @parent ---Info Status---
 * @type note
 * @desc This code will run any time a Info's status is
 * changed to failed.
 * @default "// Variables:\n//   InfoId - ID of the Info set to failed\n//\n// console.log('Info ' + InfoId + ' status changed to Failed!')"
 *
 * @param Info Available
 * @parent ---Info Status---
 * @type note
 * @desc This code will run any time a Info's status is
 * changed to available.
 * @default "// Variables:\n//   InfoId - ID of the Info set to available\n//\n// console.log('Info ' + InfoId + ' status changed to Available!')"
 *
 * @param ---Description---
 * @default
 *
 * @param Change Description
 * @parent ---Description---
 * @type note
 * @desc This code will run any time a Info's description
 * has been changed to a particular index.
 * @default "// Variables:\n//   InfoId - ID of the Info whose description is changed\n//   index - Description index being changed to\n//\n// console.log('Info ' + InfoId + ' description index changed to ' + index)"
 *
 * @param ---Objectives---
 * @default
 *
 * @param Show Objective
 * @parent ---Objectives---
 * @type note
 * @desc This code will run any time a Info's objectives
 * becomes shown.
 * @default "// Variables:\n//   InfoId - ID of the Info whose objectives are altered\n//   objectiveId - ID of the objective being shown\n//\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to shown!')"
 *
 * @param Hide Objective
 * @parent ---Objectives---
 * @type note
 * @desc This code will run any time a Info's objectives
 * becomes hidden.
 * @default "// Variables:\n//   InfoId - ID of the Info whose objectives are altered\n//   objectiveId - ID of the objective being hidden\n//\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to hidden!')"
 *
 * @param Complete Objective
 * @parent ---Objectives---
 * @type note
 * @desc This code will run any time a Info's objectives
 * becomes completed.
 * @default "// Variables:\n//   InfoId - ID of the Info whose objectives are altered\n//   objectiveId - ID of the objective being completed\n//\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to completed!')"
 *
 * @param Fail Objective
 * @parent ---Objectives---
 * @type note
 * @desc This code will run any time a Info's objectives
 * becomes failed.
 * @default "// Variables:\n//   InfoId - ID of the Info whose objectives are altered\n//   objectiveId - ID of the objective having failed\n//\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to failed!')"
 *
 * @param Normalize Objective
 * @parent ---Objectives---
 * @type note
 * @desc This code will run any time a Info's objectives
 * becomes normalized.
 * @default "// Variables:\n//   InfoId - ID of the Info whose objectives are altered\n//   objectiveId - ID of the objective normalized\n//\n// console.log('Info ' + InfoId + ' objective ' + objectiveId + ' changed to normal!')"
 *
 * @param ---Rewards---
 * @default
 *
 * @param Show Reward
 * @parent ---Rewards---
 * @type note
 * @desc This code will run any time a Info's rewards
 * becomes shown.
 * @default "// Variables:\n//   InfoId - ID of the Info whose rewards are altered\n//   rewardId - ID of the reward being shown\n//\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' becomes shown!')"
 *
 * @param Hide Reward
 * @parent ---Rewards---
 * @type note
 * @desc This code will run any time a Info's rewards
 * becomes hidden.
 * @default "// Variables:\n//   InfoId - ID of the Info whose rewards are altered\n//   rewardId - ID of the reward being hidden\n//\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' becomes hidden!')"
 *
 * @param Claim Reward
 * @parent ---Rewards---
 * @type note
 * @desc This code will run any time a Info's rewards
 * is claimed.
 * @default "// Variables:\n//   InfoId - ID of the Info whose rewards are altered\n//   rewardId - ID of the reward becoming claimed\n//\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' is now claimed!')"
 *
 * @param Deny Reward
 * @parent ---Rewards---
 * @type note
 * @desc This code will run any time a Info's rewards
 * is denied.
 * @default "// Variables:\n//   InfoId - ID of the Info whose rewards are altered\n//   rewardId - ID of the reward becoming denied\n//\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' is now denied!')"
 *
 * @param Normalize Reward
 * @parent ---Rewards---
 * @type note
 * @desc This code will run any time a Info's rewards
 * is normalized.
 * @default "// Variables:\n//   InfoId - ID of the Info whose rewards are altered\n//   rewardId - ID of the reward normalized\n//\n// console.log('Info ' + InfoId + ' reward ' + rewardId + ' is normalized!')"
 *
 * @param ---Subtext---
 * @default
 *
 * @param Change Subtext
 * @parent ---Subtext---
 * @type note
 * @desc This code will run any time a Info's subtext
 * has been changed to a particular index.
 * @default "// Variables:\n//   InfoId - ID of the Info whose subtext is changed\n//   index - Subtext index being changed to\n//\n// console.log('Info ' + InfoId + ' subtext index changed to ' + index)"
 * 
 */
/* ----------------------------------------------------------------------------
 * Info Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~Info:
 *
 * @param Title
 * @desc Title of the Info.
 * Text codes allowed.
 * @default \i[87]Untitled Info
 *
 * @param Type
 * @parent Title
 * @type combo
 * @option Main Infos
 * @option Side Infos
 * @option Character Infos
 * @option Tutorial Infos
 * @desc What type of Info is this?
 * @default Main Infos
 *
 * @param Difficulty
 * @parent Title
 * @desc Difficulty level for this Info.
 * Text codes allowed.
 * @default Easy Peasy
 *
 * @param From
 * @parent Title
 * @desc Insert the name of the NPC who issued this Info.
 * Text codes allowed.
 * @default NPC Name
 *
 * @param Location
 * @parent Title
 * @desc Insert the location of the NPC who issued this Info.
 * Text codes allowed.
 * @default Location Name
 *
 * @param Description
 * @parent Title
 * @type note[]
 * @desc Type out the description used for this Info.
 * Text codes allowed.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] Info description.\"","\"This is the \\\\c[4]default\\\\c[0] Info description.\\n\\nYou can insert multiple description entries in case you\\never want to update the Info description midway while the\\nInfo is in progress.\""]
 *
 * @param Objectives List
 * @type note[]
 * @desc The objectives to be completed for this Info.
 * Text codes allowed.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param Visible Objectives
 * @parent Objectives List
 * @type number[]
 * @min 1
 * @desc The objectives that are visible from the start.
 * @default ["1"]
 *
 * @param Rewards List
 * @type note[]
 * @desc The reward list for this Info.
 * Text codes allowed.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 * 
 * @param Visible Rewards
 * @parent Rewards List
 * @type number[]
 * @min 1
 * @desc The rewards that are visible from the start.
 * @default ["1"]
 *
 * @param Subtext
 * @type note[]
 * @desc Subtext to be displayed with the Info.
 * @default ["\"\"","\"This is a subtext. It is used as\\nextra text that you may want to\\nplace on your Info journal that\\ndiffers from the description.\""]
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.3.5") {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_InfoJournal');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.InfoCmdName = String(Yanfly.Parameters['Info Command']);
Yanfly.Param.InfoCmdShow = eval(Yanfly.Parameters['Show Command']);
Yanfly.Param.InfoCmdEnable = eval(Yanfly.Parameters['Enable Command']);
Yanfly.Param.InfoCmdPlace = eval(Yanfly.Parameters['Auto Place Command']);

Yanfly.Param.InfoCategoryWindow = 
  JSON.parse(Yanfly.Parameters['Info Category Window']);
Yanfly.Param.InfoListWindow = 
  JSON.parse(Yanfly.Parameters['Info List Window']);
Yanfly.Param.InfoTitleWindow = 
  JSON.parse(Yanfly.Parameters['Info Title Window']);
Yanfly.Param.InfoDataWindow = 
  JSON.parse(Yanfly.Parameters['Info Data Window']);
Yanfly.Info.LunaticMode = 
  JSON.parse(Yanfly.Parameters['Lunatic Mode']);

//=============================================================================
// TouchInput
//=============================================================================

Yanfly.Info.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
  Yanfly.Info.TouchInput_onMouseMove.call(this, event);
  this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
  this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

//=============================================================================
// DataManager
//=============================================================================

var $dataInfos = [null];
Yanfly.Info.totalCount = 0;

DataManager.InfoDatabaseAdd = function(id, data) {
  if (!data) return $dataInfos.push(null);
  data = this.InfoDataFailsafe(id, data);
  var visibleObjectives = JSON.parse(data['Visible Objectives']);
  for (var i = 0; i < visibleObjectives.length; ++i) {
    visibleObjectives[i] = parseInt(visibleObjectives[i]);
  };
  var visibleRewards = JSON.parse(data['Visible Rewards']);
  for (var i = 0; i < visibleRewards.length; ++i) {
    visibleRewards[i] = parseInt(visibleRewards[i]);
  };
  var description = JSON.parse(data['Description']);
  description.unshift('');
  var objectives = JSON.parse(data['Objectives List']);
  objectives.unshift('');
  var rewards = JSON.parse(data['Rewards List']);
  rewards.unshift('');
  var subtext = JSON.parse(data['Subtext']);
  subtext.unshift('');
  var type = data['Type'];
  type = type.replace(/\\I\[(\d+)\]/gi, '').trim();
  type = type.replace(/\\C\[(\d+)\]/gi, '').trim();
  var Info = {
    name: data['Title'],
    id: id,
    type: type,
    difficulty: data['Difficulty'],
    from: data['From'],
    location: data['Location'],
    description: description,
    objectives: objectives,
    visibleObjectives: visibleObjectives,
    rewards: rewards,
    visibleRewards: visibleRewards,
    subtext: subtext,
    note: ''
  };
  $dataInfos[id] = Info;
  Yanfly.Info.totalCount += 1;
};

DataManager.InfoDataFailsafe = function(id, data) {
  if (!data['Title']) data['Title'] = "\\i[87]Unfinished Info";
  if (!data['Type']) data['Type'] = "Main Infos";
  if (!data['Difficulty']) data['Difficulty'] = "Easy Peasy";
  if (!data['From']) data['From'] = "NPC Name";
  if (!data['Location']) data['Location'] = "Location Name";
  if (!data['Description']) data['Description'] = "[\"\\\"\\\"\"]";
  if (data['Description'] === '[]') data['Description'] = "[\"\\\"\\\"\"]";
  if (!data['Objectives List']) data['Objectives List'] = "[\"\\\"\\\"\"]";
  if (data['Objectives List'] === '[]') data['Objectives List'] =
    "[\"\\\"\\\"\"]";
  if (!data['Visible Objectives']) data['Visible Objectives'] = "[\"1\"]";
  if (!data['Rewards List']) data['Rewards List'] = "[\"\\\"\\\"\"]";
  if (data['Rewards List'] === '[]') data['Rewards List'] = "[\"\\\"\\\"\"]";
  if (!data['Visible Rewards']) data['Visible Rewards'] = "[\"1\"]";
  if (!data['Subtext']) data['Subtext'] = "[\"\\\"\\\"\"]";
  if (data['Subtext'] === '[]') data['Subtext'] = "[\"\\\"\\\"\"]";
  return data;
};

DataManager.InfoDatabaseCreate = function() {
  $dataInfos = [null];
  for (var i = 1; i <= 100; ++i) {
    var InfoData = JSON.parse(Yanfly.Parameters['Info ' + i] || 'null');
    if (!InfoData) continue;
    this.InfoDatabaseAdd(i, InfoData);
  };
};

DataManager.InfoDatabaseCreate();

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.reservedInfoOpen = function(InfoId) {
  this._InfoOpen = InfoId;
};

Game_Temp.prototype.getInfoOpen = function() {
  return this._InfoOpen;
};

Game_Temp.prototype.clearInfoOpen = function() {
  this._InfoOpen = undefined;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Info.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Info.Game_System_initialize.call(this);
  this.initInfoSettings();
};

Game_System.prototype.initInfoSettings = function() {
  this._showInfo = this._showInfo || Yanfly.Param.InfoCmdShow;
  this._enableInfo = this._enableInfo || Yanfly.Param.InfoCmdEnable;
  this._InfosKnown = this._InfosKnown || [];
  this._InfosCompleted = this._InfosCompleted || [];
  this._InfosFailed = this._InfosFailed || [];
  this._InfosDescription = this._InfosDescription || {};
  this._InfosObjectives = this._InfosObjectives || {};
  this._InfosObjectivesCompleted = this._InfosObjectivesCompleted || {};
  this._InfosObjectivesFailed = this._InfosObjectivesFailed || {};
  this._InfosRewards = this._InfosRewards || {};
  this._InfosRewardsClaimed = this._InfosRewardsClaimed || {};
  this._InfosRewardsDenied = this._InfosRewardsDenied || {};
  this._InfosSubtext = this._InfosSubtext || {};
};

Game_System.prototype.isShowInfo = function() {
  this.initInfoSettings();
  return this._showInfo;
};

Game_System.prototype.setShowInfo = function(value) {
  this.initInfoSettings();
  this._showInfo = value;
};

Game_System.prototype.isEnableInfo = function() {
  this.initInfoSettings();
  return this._enableInfo;
};

Game_System.prototype.setEnableInfo = function(value) {
  this.initInfoSettings();
  this._enableInfo = value;
};

Game_System.prototype.getInfosAvailable = function() {
  this.initInfoSettings();
  var result = [];
  var length = this._InfosKnown.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = this._InfosKnown[i];
    if (this._InfosCompleted.contains(InfoId)) continue;
    if (this._InfosFailed.contains(InfoId)) continue;
    result.push(InfoId);
  }
  return result;
};

Game_System.prototype.getInfosCompleted = function() {
  this.initInfoSettings();
  var result = [];
  var length = this._InfosKnown.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = this._InfosKnown[i];
    if (this._InfosCompleted.contains(InfoId)) result.push(InfoId);
  }
  return result;
};

Game_System.prototype.getInfosFailed = function() {
  this.initInfoSettings();
  var result = [];
  var length = this._InfosKnown.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = this._InfosKnown[i];
    if (this._InfosFailed.contains(InfoId)) result.push(InfoId);
  }
  return result;
};

Game_System.prototype.getAllInfos = function() {
  this.initInfoSettings();
  return this._InfosKnown;
};

Game_System.prototype.getTypeInfos = function(category, type) {
  this.initInfoSettings();
  category = category || 'all';
  type = type || '';
  var result = [];
  if (category === 'available') {
    var Infos = this.getInfosAvailable();
  } else if (category === 'completed') {
    var Infos = this.getInfosCompleted();
  } else if (category === 'failed') {
    var Infos = this.getInfosFailed();
  } else {
    var Infos = this.getAllInfos();
  }
  var length = Infos.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = Infos[i];
    var InfoData = $dataInfos[InfoId];
    if (!InfoData) continue;
    if (InfoData.type === type) result.push(InfoId);
  }
  return result;
};

Game_System.prototype.getInfoDescriptionIndex = function(InfoId) {
  this.initInfoSettings();
  return this._InfosDescription[InfoId] || 0;
};

Game_System.prototype.getInfoObjectives = function(InfoId) {
  this.initInfoSettings();
  return this._InfosObjectives[InfoId] || ['1'];
};

Game_System.prototype.getInfoObjectiveStatus = function(InfoId, objId) {
  this.initInfoSettings();
  this._InfosObjectivesCompleted[InfoId] =
    this._InfosObjectivesCompleted[InfoId] || [];
  this._InfosObjectivesFailed[InfoId] =
    this._InfosObjectivesFailed[InfoId] || [];
  if (this._InfosObjectivesCompleted[InfoId].contains(objId)) {
    return 'Completed Objective';
  } else if (this._InfosObjectivesFailed[InfoId].contains(objId)) {
    return 'Failed Objective';
  } else {
    return 'Uncleared Objective';
  }
};

Game_System.prototype.getInfoRewards = function(InfoId) {
  this.initInfoSettings();
  return this._InfosRewards[InfoId] || ['1'];
};

Game_System.prototype.getInfoRewardStatus = function(InfoId, objId) {
  this.initInfoSettings();
  if (this._InfosRewardsClaimed[InfoId].contains(objId)) {
    return 'Claimed Reward';
  } else if (this._InfosRewardsDenied[InfoId].contains(objId)) {
    return 'Denied Reward';
  } else {
    return 'Unclaimed Reward';
  }
};

Game_System.prototype.getInfoSubtextIndex = function(InfoId) {
  this.initInfoSettings();
  return this._InfosSubtext[InfoId] || 0;
};

Game_System.prototype.InfoAdd = function(InfoId) {
  this.initInfoSettings();
  if (this._InfosKnown.contains(InfoId)) return;
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  this._InfosKnown.push(InfoId);
  this._InfosKnown.sort(function(a, b) {
    return a - b;
  });
  this._InfosDescription[InfoId] = 1;
  this._InfosObjectives[InfoId] = [];
  for (var i = 0; i < InfoData['visibleObjectives'].length; ++i) {
    var value = InfoData['visibleObjectives'][i];
    this._InfosObjectives[InfoId].push(value);
  }
  this._InfosObjectivesCompleted[InfoId] = [];
  this._InfosObjectivesFailed[InfoId] = [];
  this._InfosRewards[InfoId] = [];
  for (var i = 0; i < InfoData['visibleRewards'].length; ++i) {
    var value = InfoData['visibleRewards'][i];
    this._InfosRewards[InfoId].push(value);
  }
  this._InfosRewardsClaimed[InfoId] = [];
  this._InfosRewardsDenied[InfoId] = [];
  this._InfosSubtext[InfoId] = 1;
  this.InfoAddCustomEval(InfoId);
};

Yanfly.Info.InfoAdd = 
  JSON.parse(Yanfly.Info.LunaticMode['Info Add']);
Game_System.prototype.InfoAddCustomEval = function(InfoId) {
  eval(Yanfly.Info.InfoAdd);
};

Game_System.prototype.InfoAddRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = range[i];
    this.InfoAdd(InfoId);
  }
};

Game_System.prototype.InfoRemove = function(InfoId) {
  this.initInfoSettings();
  if (!this._InfosKnown.contains(InfoId)) return;
  var index = this._InfosKnown.indexOf(InfoId);
  this._InfosKnown.splice(index, 1);
  this.InfoRemoveCustomEval(InfoId);
};

Yanfly.Info.InfoRemove = 
  JSON.parse(Yanfly.Info.LunaticMode['Info Remove']);
Game_System.prototype.InfoRemoveCustomEval = function(InfoId) {
  eval(Yanfly.Info.InfoRemove);
};

Game_System.prototype.InfoRemoveRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = range[i];
    this.InfoRemove(InfoId);
  }
};

Game_System.prototype.InfoSetCompleted = function(InfoId) {
  this.initInfoSettings();
  var changed = false;
  if (!this._InfosKnown.contains(InfoId)) this.InfoAdd(InfoId);
  if (!this._InfosCompleted.contains(InfoId)) {
    changed = true;
    this._InfosCompleted.push(InfoId);
    this._InfosCompleted.sort(function(a, b) {
      return a - b;
    });
  }
  if (this._InfosFailed.contains(InfoId)) {
    var index = this._InfosFailed.indexOf(InfoId);
    this._InfosFailed.splice(index, 1);
    this._InfosFailed.sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.InfoSetCompletedEval(InfoId);
};

Yanfly.Info.InfoSetCompleted = 
  JSON.parse(Yanfly.Info.LunaticMode['Info Complete']);
Game_System.prototype.InfoSetCompletedEval = function(InfoId) {
  eval(Yanfly.Info.InfoSetCompleted);
};

Game_System.prototype.InfoSetCompletedRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = range[i];
    this.InfoSetCompleted(InfoId);
  }
};

Game_System.prototype.InfoSetFailed = function(InfoId) {
  this.initInfoSettings();
  var changed = false;
  if (!this._InfosKnown.contains(InfoId)) this.InfoAdd(InfoId);
  if (!this._InfosFailed.contains(InfoId)) {
    changed = true;
    this._InfosFailed.push(InfoId);
    this._InfosFailed.sort(function(a, b) {
      return a - b;
    });
  }
  if (this._InfosCompleted.contains(InfoId)) {
    var index = this._InfosCompleted.indexOf(InfoId);
    this._InfosCompleted.splice(index, 1);
    this._InfosCompleted.sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.InfoSetFailedEval(InfoId);
};

Yanfly.Info.InfoSetFailed = 
  JSON.parse(Yanfly.Info.LunaticMode['Info Fail']);
Game_System.prototype.InfoSetFailedEval = function(InfoId) {
  eval(Yanfly.Info.InfoSetFailed);
};

Game_System.prototype.InfoSetFailedRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = range[i];
    this.InfoSetFailed(InfoId);
  }
};

Game_System.prototype.InfoSetAvailable = function(InfoId) {
  this.initInfoSettings();
  var changed = false;
  if (!this._InfosKnown.contains(InfoId)) this.InfoAdd(InfoId);
  if (this._InfosCompleted.contains(InfoId)) {
    changed = true;
    var index = this._InfosCompleted.indexOf(InfoId);
    this._InfosCompleted.splice(index, 1);
    this._InfosCompleted.sort(function(a, b) {
      return a - b;
    });
  }
  if (this._InfosFailed.contains(InfoId)) {
    changed = true;
    var index = this._InfosFailed.indexOf(InfoId);
    this._InfosFailed.splice(index, 1);
    this._InfosFailed.sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.InfoSetAvailableEval(InfoId);
};

Yanfly.Info.InfoSetAvailable = 
  JSON.parse(Yanfly.Info.LunaticMode['Info Available']);
Game_System.prototype.InfoSetAvailableEval = function(InfoId) {
  eval(Yanfly.Info.InfoSetAvailable);
};

Game_System.prototype.InfoSetAvailableRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = range[i];
    this.InfoSetAvailable(InfoId);
  }
};

Game_System.prototype.InfoChangeDescriptionIndex = function(InfoId, index) {
  this.initInfoSettings();
  this._InfosDescription[InfoId] = index;
  this.InfoChangeDescIndexEval(InfoId, index);
};

Yanfly.Info.InfoChangeDescriptionIndex = 
  JSON.parse(Yanfly.Info.LunaticMode['Change Description']);
Game_System.prototype.InfoChangeDescIndexEval = function(InfoId, index) {
  eval(Yanfly.Info.InfoChangeDescriptionIndex);
};

Game_System.prototype.InfoObjectivesShow = function(InfoId, objectiveId) {
  this.initInfoSettings();
  this._InfosObjectives[InfoId] = this._InfosObjectives[InfoId] || [];
  if (this._InfosObjectives[InfoId].contains(objectiveId)) return;
  this._InfosObjectives[InfoId].push(objectiveId);
  this._InfosObjectives[InfoId].sort(function(a, b) {
    return a - b;
  });
  this.InfoObjectivesShowEval(InfoId, objectiveId);
};

Yanfly.Info.InfoObjectivesShow = 
  JSON.parse(Yanfly.Info.LunaticMode['Show Objective']);
Game_System.prototype.InfoObjectivesShowEval = function(InfoId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Info.InfoObjectivesShow);
};

Game_System.prototype.InfoObjectivesShowRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.InfoObjectivesShow(InfoId, objId);
  }
};

Game_System.prototype.InfoObjectivesShowAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.InfoObjectivesShow(InfoId, i);
  }
};

Game_System.prototype.InfoObjectivesHide = function(InfoId, objectiveId) {
  this.initInfoSettings();
  this._InfosObjectives[InfoId] = this._InfosObjectives[InfoId] || [];
  if (!this._InfosObjectives[InfoId].contains(objectiveId)) return;
  var index = this._InfosObjectives[InfoId].indexOf(objectiveId);
  this._InfosObjectives[InfoId].splice(index, 1);
  this._InfosObjectives[InfoId].sort(function(a, b) {
    return a - b;
  });
  this.InfoObjectivesHideEval(InfoId, objectiveId);
};

Yanfly.Info.InfoObjectivesHide = 
  JSON.parse(Yanfly.Info.LunaticMode['Hide Objective']);
Game_System.prototype.InfoObjectivesHideEval = function(InfoId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Info.InfoObjectivesHide);
};

Game_System.prototype.InfoObjectivesHideRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.InfoObjectivesHide(InfoId, objId);
  }
};

Game_System.prototype.InfoObjectivesHideAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.InfoObjectivesHide(InfoId, i);
  }
};

Game_System.prototype.InfoObjectivesNormal = function(InfoId, objectiveId) {
  this.initInfoSettings();
  var changed = false;
  this._InfosObjectivesCompleted[InfoId] = 
    this._InfosObjectivesCompleted[InfoId] || [];
  if (this._InfosObjectivesCompleted[InfoId].contains(objectiveId)) {
    changed = true;
    var index = this._InfosObjectivesCompleted[InfoId].indexOf(objectiveId);
    this._InfosObjectivesCompleted[InfoId].splice(index, 1);
    this._InfosObjectivesCompleted[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  if (this._InfosObjectivesFailed[InfoId].contains(objectiveId)) {
    changed = true;
    var index = this._InfosObjectivesFailed[InfoId].indexOf(objectiveId);
    this._InfosObjectivesFailed[InfoId].splice(index, 1);
    this._InfosObjectivesFailed[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  this.InfoObjectivesNormalEval(InfoId, objectiveId);
};

Yanfly.Info.InfoObjectivesNormal = 
  JSON.parse(Yanfly.Info.LunaticMode['Normalize Objective']);
Game_System.prototype.InfoObjectivesNormalEval = function(InfoId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Info.InfoObjectivesNormal);
};

Game_System.prototype.InfoObjectivesNormalRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.InfoObjectivesNormal(InfoId, objId);
  }
};

Game_System.prototype.InfoObjectivesNormalAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.InfoObjectivesNormal(InfoId, i);
  }
};

Game_System.prototype.InfoObjectivesComplete = function(InfoId, objectiveId) {
  this.initInfoSettings();
  var changed = false;
  this._InfosObjectivesCompleted[InfoId] = 
    this._InfosObjectivesCompleted[InfoId] || [];
  if (!this._InfosObjectivesCompleted[InfoId].contains(objectiveId)) {
    changed = true;
    this._InfosObjectivesCompleted[InfoId].push(objectiveId);
    this._InfosObjectivesCompleted[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  this._InfosObjectivesFailed[InfoId] = 
    this._InfosObjectivesFailed[InfoId] || [];
  if (this._InfosObjectivesFailed[InfoId].contains(objectiveId)) {
    var index = this._InfosObjectivesFailed[InfoId].indexOf(objectiveId);
    this._InfosObjectivesFailed[InfoId].splice(index, 1);
    this._InfosObjectivesFailed[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  this.InfoObjectivesCompleteEval(InfoId, objectiveId);
};

Yanfly.Info.InfoObjectivesComplete = 
  JSON.parse(Yanfly.Info.LunaticMode['Complete Objective']);
Game_System.prototype.InfoObjectivesCompleteEval = function(InfoId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Info.InfoObjectivesComplete);
};

Game_System.prototype.InfoObjectivesCompleteRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.InfoObjectivesComplete(InfoId, objId);
  }
};

Game_System.prototype.InfoObjectivesCompleteAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.InfoObjectivesComplete(InfoId, i);
  }
};

Game_System.prototype.InfoObjectivesFail = function(InfoId, objectiveId) {
  this.initInfoSettings();
  var changed = false;
  this._InfosObjectivesFailed[InfoId] = 
    this._InfosObjectivesFailed[InfoId] || [];
  if (!this._InfosObjectivesFailed[InfoId].contains(objectiveId)) {
    changed = true;
    this._InfosObjectivesFailed[InfoId].push(objectiveId);
    this._InfosObjectivesFailed[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  this._InfosObjectivesCompleted[InfoId] = 
    this._InfosObjectivesCompleted[InfoId] || [];
  if (this._InfosObjectivesCompleted[InfoId].contains(objectiveId)) {
    var index = this._InfosObjectivesCompleted[InfoId].indexOf(objectiveId);
    this._InfosObjectivesCompleted[InfoId].splice(index, 1);
    this._InfosObjectivesCompleted[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.InfoObjectivesFailEval(InfoId, objectiveId);
};

Yanfly.Info.InfoObjectivesFail = 
  JSON.parse(Yanfly.Info.LunaticMode['Fail Objective']);
Game_System.prototype.InfoObjectivesFailEval = function(InfoId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Info.InfoObjectivesFail);
};

Game_System.prototype.InfoObjectivesFailRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.InfoObjectivesFail(InfoId, objId);
  }
};

Game_System.prototype.InfoObjectivesFailAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.InfoObjectivesFail(InfoId, i);
  }
};

Game_System.prototype.InfoRewardsShow = function(InfoId, rewardId) {
  this.initInfoSettings();
  this._InfosRewards[InfoId] = this._InfosRewards[InfoId] || [];
  if (this._InfosRewards[InfoId].contains(rewardId)) return;
  this._InfosRewards[InfoId].push(rewardId);
  this._InfosRewards[InfoId].sort(function(a, b) {
    return a - b;
  });
  this.InfoRewardsShowEval(InfoId, rewardId);
};

Yanfly.Info.InfoRewardsShow = 
  JSON.parse(Yanfly.Info.LunaticMode['Show Reward']);
Game_System.prototype.InfoRewardsShowEval = function(InfoId, rewardId) {
  eval(Yanfly.Info.InfoRewardsShow);
};

Game_System.prototype.InfoRewardsShowRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.InfoRewardsShow(InfoId, rewardId);
  }
};

Game_System.prototype.InfoRewardsShowAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.InfoRewardsShow(InfoId, i);
  }
};

Game_System.prototype.InfoRewardsHide = function(InfoId, rewardId) {
  this.initInfoSettings();
  this._InfosRewards[InfoId] = this._InfosRewards[InfoId] || [];
  if (!this._InfosRewards[InfoId].contains(rewardId)) return;
  var index = this._InfosRewards[InfoId].indexOf(rewardId);
  this._InfosRewards[InfoId].splice(index, 1);
  this._InfosRewards[InfoId].sort(function(a, b) {
    return a - b;
  });
  this.InfoRewardsHideEval(InfoId, rewardId);
};

Yanfly.Info.InfoRewardsHide = 
  JSON.parse(Yanfly.Info.LunaticMode['Hide Reward']);
Game_System.prototype.InfoRewardsHideEval = function(InfoId, rewardId) {
  eval(Yanfly.Info.InfoRewardsHide);
};

Game_System.prototype.InfoRewardsHideRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.InfoRewardsHide(InfoId, rewardId);
  }
};

Game_System.prototype.InfoRewardsHideAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.InfoRewardsHide(InfoId, i);
  }
};

Game_System.prototype.InfoRewardsNormal = function(InfoId, rewardId) {
  this.initInfoSettings();
  var changed = false;
  this._InfosRewardsClaimed[InfoId] = 
    this._InfosRewardsClaimed[InfoId] || [];
  if (this._InfosRewardsClaimed[InfoId].contains(rewardId)) {
    changed = true;
    var index = this._InfosRewardsClaimed[InfoId].indexOf(rewardId);
    this._InfosRewardsClaimed[InfoId].splice(index, 1);
    this._InfosRewardsClaimed[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  this._InfosRewardsDenied[InfoId] = 
    this._InfosRewardsDenied[InfoId] || [];
  if (this._InfosRewardsDenied[InfoId].contains(rewardId)) {
    changed = true;
    var index = this._InfosRewardsDenied[InfoId].indexOf(rewardId);
    this._InfosRewardsDenied[InfoId].splice(index, 1);
    this._InfosRewardsDenied[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.InfoRewardsNormalEval(InfoId, rewardId);
};

Yanfly.Info.InfoRewardsNormal = 
  JSON.parse(Yanfly.Info.LunaticMode['Normalize Reward']);
Game_System.prototype.InfoRewardsNormalEval = function(InfoId, rewardId) {
  eval(Yanfly.Info.InfoRewardsNormal);
};

Game_System.prototype.InfoRewardsNormalRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.InfoRewardsNormal(InfoId, rewardId);
  }
};

Game_System.prototype.InfoRewardsNormalAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.InfoRewardsNormal(InfoId, i);
  }
};

Game_System.prototype.InfoRewardsClaim = function(InfoId, rewardId) {
  this.initInfoSettings();
  var changed = false;
  this._InfosRewardsClaimed[InfoId] = 
    this._InfosRewardsClaimed[InfoId] || [];
  if (!this._InfosRewardsClaimed[InfoId].contains(rewardId)) {
    changed = true;
    this._InfosRewardsClaimed[InfoId].push(rewardId);
    this._InfosRewardsClaimed[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  this._InfosRewardsDenied[InfoId] = 
    this._InfosRewardsDenied[InfoId] || [];
  if (this._InfosRewardsDenied[InfoId].contains(rewardId)) {
    var index = this._InfosRewardsDenied[InfoId].indexOf(rewardId);
    this._InfosRewardsDenied[InfoId].splice(index, 1);
    this._InfosRewardsDenied[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.InfoRewardsClaimEval(InfoId, rewardId);
};

Yanfly.Info.InfoRewardsClaim = 
  JSON.parse(Yanfly.Info.LunaticMode['Claim Reward']);
Game_System.prototype.InfoRewardsClaimEval = function(InfoId, rewardId) {
  eval(Yanfly.Info.InfoRewardsClaim);
};

Game_System.prototype.InfoRewardsClaimRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.InfoRewardsClaim(InfoId, rewardId);
  }
};

Game_System.prototype.InfoRewardsClaimAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.InfoRewardsClaim(InfoId, i);
  }
};

Game_System.prototype.InfoRewardsDeny = function(InfoId, rewardId) {
  this.initInfoSettings();
  var changed = false;
  this._InfosRewardsDenied[InfoId] = 
    this._InfosRewardsDenied[InfoId] || [];
  if (!this._InfosRewardsDenied[InfoId].contains(rewardId)) {
    changed = true;
    this._InfosRewardsDenied[InfoId].push(rewardId);
    this._InfosRewardsDenied[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  this._InfosRewardsClaimed[InfoId] = 
    this._InfosRewardsClaimed[InfoId] || [];
  if (this._InfosRewardsClaimed[InfoId].contains(rewardId)) {
    var index = this._InfosRewardsClaimed[InfoId].indexOf(rewardId);
    this._InfosRewardsClaimed[InfoId].splice(index, 1);
    this._InfosRewardsClaimed[InfoId].sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.InfoRewardsDenyEval(InfoId, rewardId);
};

Yanfly.Info.InfoRewardsDeny = 
  JSON.parse(Yanfly.Info.LunaticMode['Deny Reward']);
Game_System.prototype.InfoRewardsDenyEval = function(InfoId, rewardId) {
  eval(Yanfly.Info.InfoRewardsDeny);
};

Game_System.prototype.InfoRewardsDenyRange = function(InfoId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.InfoRewardsDeny(InfoId, rewardId);
  }
};

Game_System.prototype.InfoRewardsDenyAll = function(InfoId) {
  this.initInfoSettings();
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return;
  var length = InfoData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.InfoRewardsDeny(InfoId, i);
  }
};

Game_System.prototype.InfoChangeSubtextIndex = function(InfoId, index) {
  this.initInfoSettings();
  this._InfosSubtext[InfoId] = index;
  this.InfoChangeSubtextIndexEval(InfoId, index);
};

Yanfly.Info.InfoChangeSubtextIndexEval = 
  JSON.parse(Yanfly.Info.LunaticMode['Change Subtext']);
Game_System.prototype.InfoChangeSubtextIndexEval = function(InfoId, index) {
  eval(Yanfly.Info.InfoChangeSubtextIndexEval);
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Game_System Script Calls
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Game_System.prototype.totalInfosAvailable = function() {
  return this.getInfosAvailable().length;
};

Game_System.prototype.totalInfosCompleted = function() {
  return this.getInfosCompleted().length;
};

Game_System.prototype.totalInfosFailed = function() {
  return this.getInfosFailed().length;
};

Game_System.prototype.totalInfosKnown = function() {
  return this.getAllInfos().length;
};

Game_System.prototype.totalInfosInGame = function() {
  return Yanfly.Info.totalCount;
};

Game_System.prototype.totalInfoTypes = function(category, type) {
  return this.getTypeInfos(category, type).length;
};

Game_System.prototype.totalVisibleInfoObjectives = function(InfoId) {
  return this.getInfoObjectives(InfoId).length;
};

Game_System.prototype.totalInfoObjectives = function(InfoId) {
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return 0;
  return InfoData.objectives.length;
};

Game_System.prototype.totalVisibleInfoRewards = function(InfoId) {
  return this.getInfoRewards(InfoId).length;
};

Game_System.prototype.totalInfoRewards = function(InfoId) {
  var InfoData = $dataInfos[InfoId];
  if (!InfoData) return 0;
  return InfoData.rewards.length;
};

Game_System.prototype.isInfoObjectiveCompleted = function(InfoId, objId) {
  if (this._InfosObjectivesCompleted[InfoId]) {
    return this._InfosObjectivesCompleted[InfoId].contains(objId);
  } else {
    return false;
  }
};

Game_System.prototype.isInfoObjectiveFailed = function(InfoId, objId) {
  if (this._InfosObjectivesFailed[InfoId]) {
    return this._InfosObjectivesFailed[InfoId].contains(objId);
  } else {
    return false;
  }
};

Game_System.prototype.isInfoObjectiveUncleared = function(InfoId, objId) {
  if (this._InfosKnown.contains(InfoId)) {
    return !this.isInfoObjectiveCompleted(InfoId, objId) &&
      !this.isInfoObjectiveFailed(InfoId, objId)
  } else {
    return false;
  }
};

Game_System.prototype.isInfoRewardClaimed = function(InfoId, objId) {
  if (this._InfosRewardsClaimed[InfoId]) {
    return this._InfosRewardsClaimed[InfoId].contains(objId);
  } else {
    return false;
  }
};

Game_System.prototype.isInfoRewardDenied = function(InfoId, objId) {
  if (this._InfosRewardsDenied[InfoId]) {
    return this._InfosRewardsDenied[InfoId].contains(objId);
  } else {
    return false;
  }
};

Game_System.prototype.isInfoRewardUnclaimed = function(InfoId, objId) {
  if (this._InfosKnown.contains(InfoId)) {
    return !this.isInfoRewardClaimed(InfoId, objId) &&
      !this.isInfoRewardDenied(InfoId, objId)
  } else {
    return false;
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Info.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Info.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'OpenInfoJournal') {
    SceneManager.push(Scene_Info);
  } else if (command === 'Info') {
    this.processInfoPluginCommands(this.argsToString(args));
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

Game_Interpreter.prototype.parseNumericRange = function(str) {
  if (str.match(/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)) {
    var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
      parseInt(RegExp.$2));
  } else {
    var range = str.split(',');
    var length = range.length;
    for (var i = 0; i < length; ++i) {
      range[i] = parseInt(range[i]);
    }
  }
  return range;
};

Game_Interpreter.prototype.processInfoPluginCommands = function(line) {
  if (line.match(/EVAL[ ](.*)/i)) {
    eval(RegExp.$1);

  } else if (line.match(/JOURNAL OPEN TO[ ](\d+)/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoAdd(InfoId);
    $gameTemp.reservedInfoOpen(InfoId);
    SceneManager.push(Scene_Info);
  } else if (line.match(/JOURNAL OPEN/i)) {
    SceneManager.push(Scene_Info);

  } else if (line.match(/JOURNAL SHOW/i)) {
    $gameSystem.setShowInfo(true);
  } else if (line.match(/JOURNAL HIDE/i)) {
    $gameSystem.setShowInfo(false);
  } else if (line.match(/JOURNAL ENABLE/i)) {
    $gameSystem.setEnableInfo(true);
  } else if (line.match(/JOURNAL DISABLE/i)) {
    $gameSystem.setEnableInfo(false);

  } else if (line.match(/SET COMPLETED[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.InfoSetCompletedRange(range);
  } else if (line.match(/SET FAILED[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.InfoSetFailedRange(range);
  } else if (line.match(/SET AVAILABLE[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.InfoSetAvailableRange(range);

  } else if (line.match(/(\d+)[ ]CHANGE DESCRIPTION ENTRY TO[ ](\d+)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var value = parseInt(RegExp.$2);
    $gameSystem.InfoChangeDescriptionIndex(InfoId, value);

  } else if (line.match(/(\d+)[ ]SHOW OBJECTIVE[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoObjectivesShowRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]SHOW ALL OBJECTIVE/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoObjectivesShowAll(InfoId);
  } else if (line.match(/(\d+)[ ]HIDE OBJECTIVE[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoObjectivesHideRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]HIDE ALL OBJECTIVE/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoObjectivesHideAll(InfoId);
  } else if (line.match(/(\d+)[ ]NORMALIZE OBJECTIVE[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoObjectivesNormalRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]NORMALIZE ALL OBJECTIVE/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoObjectivesNormalAll(InfoId);
  } else if (line.match(/(\d+)[ ]COMPLETE OBJECTIVE[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoObjectivesCompleteRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]COMPLETE ALL OBJECTIVE/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoObjectivesCompleteAll(InfoId);
  } else if (line.match(/(\d+)[ ]FAIL OBJECTIVE[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoObjectivesFailRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]FAIL ALL OBJECTIVE/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoObjectivesFailAll(InfoId);

  } else if (line.match(/(\d+)[ ]SHOW REWARD[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoRewardsShowRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]SHOW ALL REWARD/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoRewardsShowAll(InfoId);
  } else if (line.match(/(\d+)[ ]HIDE REWARD[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoRewardsHideRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]HIDE ALL REWARD/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoRewardsHideAll(InfoId);
  } else if (line.match(/(\d+)[ ]NORMALIZE REWARD[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoRewardsNormalRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]NORMALIZE ALL REWARD/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoRewardsNormalAll(InfoId);
  } else if (line.match(/(\d+)[ ]CLAIM REWARD[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoRewardsClaimRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]CLAIM ALL REWARD/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoRewardsClaimAll(InfoId);
  } else if (line.match(/(\d+)[ ]DENY REWARD[ ](.*)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.InfoRewardsDenyRange(InfoId, range);
  } else if (line.match(/(\d+)[ ]DENY ALL REWARD/i)) {
    var InfoId = parseInt(RegExp.$1);
    $gameSystem.InfoRewardsDenyAll(InfoId);

  } else if (line.match(/(\d+)[ ]CHANGE SUBTEXT ENTRY TO[ ](\d+)/i)) {
    var InfoId = parseInt(RegExp.$1);
    var value = parseInt(RegExp.$2);
    $gameSystem.InfoChangeSubtextIndex(InfoId, value);

  } else if (line.match(/ADD[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.InfoAddRange(range);

  } else if (line.match(/REMOVE[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.InfoRemoveRange(range);

  }
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.Info.Window_MenuCommand_addOriginalCommands =
  Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  Yanfly.Info.Window_MenuCommand_addOriginalCommands.call(this);
  this.addInfoCommand();
};

Window_MenuCommand.prototype.addInfoCommand = function() {
  if (!Yanfly.Param.InfoCmdPlace) return;
  if (!$gameSystem.isShowInfo()) return;
  if (this.findSymbol('Info') > -1) return;
  var text = Yanfly.Param.InfoCmdName;
  var enabled = $gameSystem.isEnableInfo();
  this.addCommand(text, 'Info', enabled);
};

//=============================================================================
// Window_InfoData
//=============================================================================

function Window_InfoData() {
  this.initialize.apply(this, arguments);
};

Window_InfoData.prototype = Object.create(Window_Selectable.prototype);
Window_InfoData.prototype.constructor = Window_InfoData;

Window_InfoData.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = Math.round(eval(this.settings('X')));
  var y = Math.round(eval(this.settings('Y')));
  this._allTextHeight = 0;
  this._countdown = 0;
  this._arrowBlinkTimer = 0;
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.setInfoId(0);
  this.opacity = Math.round(eval(this.settings('Standard Opacity')));
};

Window_InfoData.prototype.settings = function(key) {
  return Yanfly.Param.InfoDataWindow[key];
};

Window_InfoData.prototype.windowWidth = function() {
  if (this._windowWidth === undefined) {
    this._windowWidth = Math.round(eval(this.settings('Width')));
  }
  return this._windowWidth;
};

Window_InfoData.prototype.windowHeight = function() {
  if (this._windowHeight === undefined) {
    this._windowHeight = Math.round(eval(this.settings('Height')));
  }
  return this._windowHeight;
};

Window_InfoData.prototype.lineHeight = function() {
  if (this._windowLineHeight === undefined) {
    this._windowLineHeight = parseInt(this.settings('Line Height'));
  }
  return this._windowLineHeight;
};

Window_InfoData.prototype.standardFontFace = function() {
  if (this._windowFontFace === undefined) {
    this._windowFontFace = this.settings('Font Face');
  }
  return this._windowFontFace;
};

Window_InfoData.prototype.standardFontSize = function() {
  if (this._windowFontSize === undefined) {
    this._windowFontSize = Math.round(eval(this.settings('Font Size')));
  }
  return this._windowFontSize;
};

Window_InfoData.prototype.standardPadding = function() {
  if (this._windowStandardPadding === undefined) {
    this._windowStandardPadding = 
      Math.round(eval(this.settings('Standard Padding')));
  }
  return this._windowStandardPadding;
};

Window_InfoData.prototype.textPadding = function() {
  if (this._windowTextPadding === undefined) {
    this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
  }
  return this._windowTextPadding;
};

Window_InfoData.prototype.standardBackOpacity = function() {
  if (this._windowBackOpacity === undefined) {
    this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
  }
  return this._windowBackOpacity;
};

Window_InfoData.prototype.loadWindowskin = function() {
  this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
};

Window_InfoData.prototype.delayLoadFrames = function() {
  if (this._delayLoad === undefined) {
    this._delayLoad = Math.round(eval(this.settings('Load Delay')));
  }
  return this._delayLoad;
};

Window_InfoData.prototype.setInfoId = function(id) {
  if (this._InfoId !== id) {
    this._InfoId = id;
    this._countdown = 30;
    this.refresh();
  }
};

Window_InfoData.prototype.refresh = function() {
  if (this._countdown > 0) return;
  this.contents.clear();
  this._lastOriginY = -200;
  this.origin.y = 0;
  this._allTextHeight = 0;
  if (this._InfoId > 0) {
    this.drawInfoData();
  } else {
    this.drawEmpty();
  }
};

Window_InfoData._InfoNoDataFmt = 
  JSON.parse(Yanfly.Param.InfoDataWindow['No Data Text'] || "");

Window_InfoData.prototype.drawEmpty = function() {
  var fmt = Window_InfoData._InfoNoDataFmt;
  var wordwrap = fmt.match(/<(?:WordWrap)>/i);
  var text = fmt.format();
  var textState = { index: 0 };
  textState.originalText = text;
  textState.text = this.convertEscapeCharacters(text);
  this.resetFontSettings();
  this._allTextHeight = this.calcTextHeight(textState, true);
  this._allTextHeight *= (wordwrap) ? 10 : 1;
  this.createContents();
  this.drawInfoTextEx(text, 0, 0);
};

Window_InfoData.prototype.drawInfoData = function() {
  Window_InfoData._InfoDataFmt = 
    JSON.parse(Yanfly.Param.InfoDataWindow['Info Data Format'] || "");
  var InfoData = $dataInfos[this._InfoId];
  if (!InfoData) return;
  var fmt = Window_InfoData._InfoDataFmt;
  var wordwrap = fmt.match(/<(?:WordWrap)>/i);
  var title = InfoData.name;
  title = title.replace(/\\I\[(\d+)\]/gi, '').trim();
  title = title.replace(/\\C\[(\d+)\]/gi, '').trim();
  var difficulty = InfoData.difficulty;
  var from = InfoData.from;
  var location = InfoData.location;
  var description = this.getInfoDescription();
  var objectives = this.getInfoObjectives(wordwrap);
  var rewards = this.getInfoRewards(wordwrap);
  var subtext = this.getInfoSubtext();
  var text = fmt.format(title, difficulty, from, location, description,
    objectives, rewards, subtext);
  var textState = { index: 0 };
  textState.originalText = text;
  textState.text = this.convertEscapeCharacters(text);
  this.resetFontSettings();
  this._allTextHeight = this.calcTextHeight(textState, true);
  this._allTextHeight *= (wordwrap) ? 10 : 1;
  this.createContents();
  this.drawInfoTextEx(text, 0, 0);
};

Window_InfoData.prototype.drawInfoTextEx = function(text, x, y) {
  if (text) {
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    this.resetFontSettings();
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    this._allTextHeight = textState.y - y + this.lineHeight();
    return textState.x - x;
  } else {
    return 0;
  }
};

Window_InfoData.prototype.getInfoDescription = function() {
  var InfoData = $dataInfos[this._InfoId];
  var index = $gameSystem.getInfoDescriptionIndex(this._InfoId);
  return JSON.parse(InfoData.description[index]);
};

Window_InfoData.prototype.getInfoObjectives = function(wordwrap) {
  var InfoData = $dataInfos[this._InfoId];
  var lineData = InfoData.objectives;
  var visibleObjectives = $gameSystem.getInfoObjectives(this._InfoId);
  var length = visibleObjectives.length;
  var text = '';
  for (var i = 0; i < length; ++i) {
    if (i > 0) text += wordwrap ? '<br>' : '\n';
    var objectiveId = visibleObjectives[i];
    var key = $gameSystem.getInfoObjectiveStatus(this._InfoId, objectiveId);
    var fmt = this.settings(key);
    text += fmt.format(JSON.parse(lineData[objectiveId]));
  }
  return text;
};

Window_InfoData.prototype.getInfoRewards = function(wordwrap) {
  var InfoData = $dataInfos[this._InfoId];
  var lineData = InfoData.rewards;
  var visibleRewards = $gameSystem.getInfoRewards(this._InfoId);
  var length = visibleRewards.length;
  var text = '';
  for (var i = 0; i < length; ++i) {
    if (i > 0) text += wordwrap ? '<br>' : '\n';
    var rewardId = visibleRewards[i];
    var key = $gameSystem.getInfoRewardStatus(this._InfoId, rewardId);
    var fmt = this.settings(key);
    text += fmt.format(JSON.parse(lineData[rewardId]));
  }
  return text;
};

Window_InfoData.prototype.getInfoSubtext = function() {
  var InfoData = $dataInfos[this._InfoId];
  var index = $gameSystem.getInfoSubtextIndex(this._InfoId);
  return JSON.parse(InfoData.subtext[index]);
};

Window_InfoData.prototype.select = function(index) {
};

Window_InfoData.prototype.contentsHeight = function() {
  var standard = this.height - this.standardPadding() * 2;
  return Math.max(standard, this._allTextHeight);
};

Window_InfoData.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  this.updateCountdown();
  if (this.isOpenAndActive()) this.updateKeyScrolling();
};

Window_InfoData.prototype.updateCountdown = function() {
  if (this._countdown > 0) {
    this._countdown -= 1;
    if (this._countdown <= 0) this.refresh();
  }
};

Window_InfoData.prototype.scrollSpeed = function() {
  if (this._scrollSpeed === undefined) {
    this._scrollSpeed = Number(this.settings('Scroll Speed'));
  }
  return this._scrollSpeed;
};

Window_InfoData.prototype.scrollOriginDown = function(speed) {
  var value = this.contentsHeight() - this.height + 
    this.standardPadding() * 2;
  this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_InfoData.prototype.scrollOriginUp = function(speed) {
  this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_InfoData.prototype.updateKeyScrolling = function() {
  if (Input.isPressed('up')) {
    this.scrollOriginUp(this.scrollSpeed());
  } else if (Input.isPressed('down')) {
    this.scrollOriginDown(this.scrollSpeed());
  } else if (Input.isPressed('pageup')) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  } else if (Input.isPressed('pagedown')) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
};

Window_InfoData.prototype.updateArrows = function() {
  if (this._lastOriginY === this.origin.y) return;
  this.showArrows();
};

Window_InfoData.prototype.showArrows = function() {
  this._lastOriginY = this.origin.y;
  this.upArrowVisible = this.origin.y !== 0;
  this.downArrowVisible = this.origin.y !== this.contentsHeight() -
    this.height + this.standardPadding() * 2;
};

Window_InfoData.prototype.hideArrows = function() {
  this.upArrowVisible = false;
  this.downArrowVisible = false;
};

Window_InfoData.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_InfoData.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
  if (TouchInput.wheelY <= -threshold) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  }
};

//=============================================================================
// Window_InfoTitle
//=============================================================================

function Window_InfoTitle() {
  this.initialize.apply(this, arguments);
};

Window_InfoTitle.prototype = Object.create(Window_Base.prototype);
Window_InfoTitle.prototype.constructor = Window_InfoTitle;

Window_InfoTitle.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = Math.round(eval(this.settings('X')));
  var y = Math.round(eval(this.settings('Y')));
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.setText(this.settings('No Info Title'));
  this.opacity = Math.round(eval(this.settings('Standard Opacity')));
};

Window_InfoTitle.prototype.settings = function(key) {
  return Yanfly.Param.InfoTitleWindow[key];
};

Window_InfoTitle.prototype.windowWidth = function() {
  if (this._windowWidth === undefined) {
    this._windowWidth = Math.round(eval(this.settings('Width')));
  }
  return this._windowWidth;
};

Window_InfoTitle.prototype.windowHeight = function() {
  if (this._windowHeight === undefined) {
    this._windowHeight = Math.round(eval(this.settings('Height')));
  }
  return this._windowHeight;
};

Window_InfoTitle.prototype.lineHeight = function() {
  if (this._windowLineHeight === undefined) {
    this._windowLineHeight = parseInt(this.settings('Line Height'));
  }
  return this._windowLineHeight;
};

Window_InfoTitle.prototype.standardFontFace = function() {
  if (this._windowFontFace === undefined) {
    this._windowFontFace = this.settings('Font Face');
  }
  return this._windowFontFace;
};

Window_InfoTitle.prototype.standardFontSize = function() {
  if (this._windowFontSize === undefined) {
    this._windowFontSize = Math.round(eval(this.settings('Font Size')));
  }
  return this._windowFontSize;
};

Window_InfoTitle.prototype.standardPadding = function() {
  if (this._windowStandardPadding === undefined) {
    this._windowStandardPadding = 
      Math.round(eval(this.settings('Standard Padding')));
  }
  return this._windowStandardPadding;
};

Window_InfoTitle.prototype.textPadding = function() {
  if (this._windowTextPadding === undefined) {
    this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
  }
  return this._windowTextPadding;
};

Window_InfoTitle.prototype.itemTextAlign = function() {
    return this.settings('Text Alignment')
};

Window_InfoTitle.prototype.standardBackOpacity = function() {
  if (this._windowBackOpacity === undefined) {
    this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
  }
  return this._windowBackOpacity;
};

Window_InfoTitle.prototype.loadWindowskin = function() {
  this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
};

Window_InfoTitle.prototype.setText = function(text) {
  if (this._text !== text) {
    this._text = text;
    this.refresh();
  }
};

Window_InfoTitle.prototype.refresh = function() {
  this.contents.clear();
  var align = this.settings('Text Alignment');
  var wx = 0;
  var ww = this.contents.width;
  if (align === 'left') {
    wx = this.textPadding();
  } else if (align === 'center') {
    wx += (ww - this.textWidthEx(this._text)) / 2;
  } else {
    wx += ww - this.textWidthEx(this._text) - this.textPadding();
  }
  this.drawTextEx(this._text, wx, 0);
};

Window_InfoTitle.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_InfoCategories
//=============================================================================

function Window_InfoCategories() {
  this.initialize.apply(this, arguments);
};

Window_InfoCategories.prototype = Object.create(Window_Command.prototype);
Window_InfoCategories.prototype.constructor = Window_InfoCategories;

Window_InfoCategories.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = Math.round(eval(this.settings('X')));
  var y = Math.round(eval(this.settings('Y')));
  Window_Command.prototype.initialize.call(this, x, y);
  this.opacity = Math.round(eval(this.settings('Standard Opacity')));
};

Window_InfoCategories.prototype.settings = function(key) {
  return Yanfly.Param.InfoCategoryWindow[key];
};

Window_InfoCategories.prototype.windowWidth = function() {
  if (this._windowWidth === undefined) {
    this._windowWidth = Math.round(eval(this.settings('Width')));
  }
  return this._windowWidth;
};

Window_InfoCategories.prototype.windowHeight = function() {
  if (this._windowHeight === undefined) {
    this._windowHeight = Math.round(eval(this.settings('Height')));
  }
  return this._windowHeight;
};

Window_InfoCategories.prototype.numVisibleRows = function() {
  if (this._windowRows === undefined) {
    this._windowRows = Math.round(eval(this.settings('Rows')));
  }
  return this._windowRows;
};

Window_InfoCategories.prototype.maxCols = function() {
  if (this._windowColumns === undefined) {
    this._windowColumns = Math.round(eval(this.settings('Columns')));
  }
  return this._windowColumns;
};

Window_InfoCategories.prototype.lineHeight = function() {
  if (this._windowLineHeight === undefined) {
    this._windowLineHeight = parseInt(this.settings('Line Height'));
  }
  return this._windowLineHeight;
};

Window_InfoCategories.prototype.standardFontFace = function() {
  if (this._windowFontFace === undefined) {
    this._windowFontFace = this.settings('Font Face');
  }
  return this._windowFontFace;
};

Window_InfoCategories.prototype.standardFontSize = function() {
  if (this._windowFontSize === undefined) {
    this._windowFontSize = Math.round(eval(this.settings('Font Size')));
  }
  return this._windowFontSize;
};

Window_InfoCategories.prototype.standardPadding = function() {
  if (this._windowStandardPadding === undefined) {
    this._windowStandardPadding = 
      Math.round(eval(this.settings('Standard Padding')));
  }
  return this._windowStandardPadding;
};

Window_InfoCategories.prototype.textPadding = function() {
  if (this._windowTextPadding === undefined) {
    this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
  }
  return this._windowTextPadding;
};

Window_InfoCategories.prototype.itemTextAlign = function() {
    return this.settings('Text Alignment')
};

Window_InfoCategories.prototype.standardBackOpacity = function() {
  if (this._windowBackOpacity === undefined) {
    this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
  }
  return this._windowBackOpacity;
};

Window_InfoCategories.prototype.loadWindowskin = function() {
  this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
};

Window_InfoCategories.prototype.makeCommandList = function() {
  var list = JSON.parse(this.settings('Category Order'));
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var listItem = list[i];
    switch (listItem) {
    case 'available':
      var fmt = this.settings('Available Text');
      var number = $gameSystem.totalInfosAvailable();
      break;
    case 'completed':
      var fmt = this.settings('Completed Text');
      var number = $gameSystem.totalInfosCompleted();
      break;
    case 'failed':
      var fmt = this.settings('Failed Text');
      var number = $gameSystem.totalInfosFailed();
      break;
    case 'all':
      var fmt = this.settings('All Text');
      var number = $gameSystem.totalInfosKnown();
      break;
    case 'cancel':
      var text = this.settings('Cancel Text');
      this.addCommand(text, 'cancel');
      continue;
      break;
    }
    number = Yanfly.Util.toGroup(number);
    var text = fmt.format(number);
    this.addCommand(text, 'category', true, listItem);
  }
};

Window_InfoCategories.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var text = this.commandName(index);
  var align = this.settings('Text Alignment');
  var wx = 0;
  var ww = rect.width;
  if (align === 'left') {
    wx = rect.x;
  } else if (align === 'center') {
    wx += (ww - this.textWidthEx(text)) / 2;
  } else {
    wx += ww - this.textWidthEx(text) - this.textPadding();
  }
  this.drawTextEx(text, wx, rect.y);
};

Window_InfoCategories.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

Window_InfoCategories.prototype.setListWindow = function(win) {
  this._listWindow = win;
};

Window_InfoCategories.prototype.update = function() {
  Window_Command.prototype.update.call(this);
  if (this._listWindow) this._listWindow.setCategoryType(this.currentExt());
};

Window_InfoCategories.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_InfoCategories.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) this.scrollDown();
  if (TouchInput.wheelY <= -threshold) this.scrollUp();
};

//=============================================================================
// Window_InfoList
//=============================================================================

function Window_InfoList() {
  this.initialize.apply(this, arguments);
};

Window_InfoList.prototype = Object.create(Window_Command.prototype);
Window_InfoList.prototype.constructor = Window_InfoList;

Window_InfoList.prototype.initialize = function(cw, dw, tw) {
  this._currentCategory =
    JSON.parse(Yanfly.Param.InfoCategoryWindow['Category Order'])[0];
  this._closedInfoTypes = [];
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = Math.round(eval(this.settings('X')));
  var y = Math.round(eval(this.settings('Y')));
  this._dataWindow = dw;
  this._titleWindow = tw;
  this._mode = 'Info';
  Window_Command.prototype.initialize.call(this, x, y);
  cw.setListWindow(this);
  this.opacity = Math.round(eval(this.settings('Standard Opacity')));
  this.deselect();
  this.deactivate();
};

Window_InfoList.prototype.settings = function(key) {
  return Yanfly.Param.InfoListWindow[key];
};

Window_InfoList.prototype.windowWidth = function() {
  if (this._windowWidth === undefined) {
    this._windowWidth = Math.round(eval(this.settings('Width')));
  }
  return this._windowWidth;
};

Window_InfoList.prototype.windowHeight = function() {
  if (this._windowHeight === undefined) {
    this._windowHeight = Math.round(eval(this.settings('Height')));
  }
  return this._windowHeight;
};

Window_InfoList.prototype.maxCols = function() {
  return 1;
};

Window_InfoList.prototype.lineHeight = function() {
  if (this._windowLineHeight === undefined) {
    this._windowLineHeight = parseInt(this.settings('Line Height'));
  }
  return this._windowLineHeight;
};

Window_InfoList.prototype.standardFontFace = function() {
  if (this._windowFontFace === undefined) {
    this._windowFontFace = this.settings('Font Face');
  }
  return this._windowFontFace;
};

Window_InfoList.prototype.standardFontSize = function() {
  if (this._windowFontSize === undefined) {
    this._windowFontSize = Math.round(eval(this.settings('Font Size')));
  }
  return this._windowFontSize;
};

Window_InfoList.prototype.standardPadding = function() {
  if (this._windowStandardPadding === undefined) {
    this._windowStandardPadding = 
      Math.round(eval(this.settings('Standard Padding')));
  }
  return this._windowStandardPadding;
};

Window_InfoList.prototype.textPadding = function() {
  if (this._windowTextPadding === undefined) {
    this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
  }
  return this._windowTextPadding;
};

Window_InfoList.prototype.standardBackOpacity = function() {
  if (this._windowBackOpacity === undefined) {
    this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
  }
  return this._windowBackOpacity;
};

Window_InfoList.prototype.loadWindowskin = function() {
  this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
};

Window_InfoList.prototype.itemTextAlign = function() {
    return this.settings('Info Alignment')
};

Window_InfoList.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var text = this.commandName(index);
  var symbol = this.commandSymbol(index);
  this.changePaintOpacity(this.isCommandEnabled(index));
  if (symbol === 'type') {
    var align = this.settings('Type Alignment');
  } else {
    var align = this.settings('Info Alignment');
    var indent = parseInt(this.settings('Info Indent'));
    rect.x += indent;
    rect.width -= indent;
  }
  var wx = 0;
  var ww = rect.width;
  if (align === 'left') {
    wx = rect.x;
  } else if (align === 'center') {
    wx += (ww - this.textWidthEx(text)) / 2;
  } else {
    wx += ww - this.textWidthEx(text) - this.textPadding();
  }
  this.drawTextEx(text, wx, rect.y);
};

Window_InfoList.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

Window_InfoList.prototype.setCategoryType = function(category) {
  if (this._currentCategory !== category) {
    this._currentCategory = category;
    this.refresh();
    this.resetScroll();
    this.deselect();
    this.update();
  }
};

Window_InfoList.prototype.showType = function() {
  if (this._settingsShowType === undefined) {
    this._settingsShowType = Math.round(eval(this.settings('Show Types')));
  }
  return this._settingsShowType;
};

Window_InfoList.prototype.showEmptyTypes = function() {
  if (this._showEmpty === undefined) {
    this._showEmpty = eval(this.settings('Show Empty'));
  }
  return this._showEmpty;
};

Window_InfoList.prototype.setMode = function(mode) {
  if (mode === 'Extra') {
    this._prevTopRow = this.topRow();
    this._prevIndex = this.index();
    this._forcedExt = this.currentExt();
    this.setTopRow(0);
  } else {
    this._forcedExt = undefined;
  }
  this._mode = mode;
  this.refresh();
  this.activate();
  if (mode === 'Extra') {
    this.select(0);
  } else {
    this.select(this._prevIndex);
    this.setTopRow(this._prevTopRow);
  }
};

Window_InfoList.prototype.currentExt = function() {
  return this._forcedExt || Window_Command.prototype.currentExt.call(this);
};

Window_InfoList.prototype.makeCommandList = function() {
  if (this._mode === 'Info') {
    this.makeInfoList();
  } else {
    this.makeExtraList();
  }
};

Window_InfoList.prototype.makeInfoList = function() {
  if (this.showType()) {
    var list = JSON.parse(this.settings('Type Order'));
    var length = list.length;
    for (var i = 0; i < length; ++i) {
      var listItem = list[i];
      var fmt = this.settings('Type Text Format');
      var type = listItem.replace(/\\I\[(\d+)\]/gi, '').trim();
      var type = listItem.replace(/\\C\[(\d+)\]/gi, '').trim();
      if (this._closedInfoTypes.contains(type)) {
        var closed = this.settings('List Closed Symbol');
      } else {
        var closed = this.settings('List Open Symbol');
      }
      var number = $gameSystem.getTypeInfos(this._currentCategory,
        type).length;
      if (!this.showEmptyTypes() && number <= 0) continue;
      number = Yanfly.Util.toGroup(number);
      var text = fmt.format(closed, listItem, number);
      this.addCommand(text, 'type', true, type);
      if (!this._closedInfoTypes.contains(type)) {
        this.addInfoCommands(this._currentCategory, type);
      }
    }
  } else {
    this.addInfoCommands(this._currentCategory)
  }
};

Window_InfoList.prototype.makeExtraList = function() {
  this.addReadInfoCommand();
  this.makeExtraListA();
  this.makeExtraListB();
  this.makeExtraListC();
  this.makeExtraListD();
  this.makeExtraListE();
  this.makeExtraListF();
  this.addCancelCommand();
};

Window_InfoList.prototype.addReadInfoCommand = function() {
  var text = this.settings('Read Info') || '\\i[121]Read Info';
  this.addCommand(text, 'readInfo');
};

Window_InfoList.prototype.addCancelCommand = function() {
  var text = this.settings('Cancel') || '\\i[16]Cancel';
  this.addCommand(text, 'cancel');
};

Window_InfoList.prototype.makeExtraListA = function() {
};

Window_InfoList.prototype.makeExtraListB = function() {
};

Window_InfoList.prototype.makeExtraListC = function() {
};

Window_InfoList.prototype.makeExtraListD = function() {
};

Window_InfoList.prototype.makeExtraListE = function() {
};

Window_InfoList.prototype.makeExtraListF = function() {
};

Window_InfoList.prototype.addInfoCommands = function(category, type) {
  category = category || this._currentCategory;
  type = type || '';
  var list = $gameSystem.getTypeInfos(category, type);
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var InfoId = list[i];
    var InfoData = $dataInfos[InfoId];
    if (!InfoData) continue;
    var text = InfoData.name;
    this.addCommand(text, 'Info', true, InfoId);
  }
};

Window_InfoList.prototype.update = function() {
  Window_Command.prototype.update.call(this);
  if (this._dataWindow) {
    if (this.currentSymbol() === 'Info' || this._mode === 'Extra') {
      this._dataWindow.setInfoId(this.currentExt());
    } else {
      this._dataWindow.setInfoId(0);
    }
  }
  if (this._titleWindow) {
    if (this.currentSymbol() === 'Info' || this._mode === 'Extra') {
      this._titleWindow.setText($dataInfos[this.currentExt()].name);
    } else {
      this._titleWindow.setText(this._titleWindow.settings('No Info Title'));
    }
  }
};

Window_InfoList.prototype.typeToggle = function(type) {
  if (this._closedInfoTypes.contains(type)) {
    var index = this._closedInfoTypes.indexOf(type);
    this._closedInfoTypes.splice(index, 1);
  } else {
    this._closedInfoTypes.push(type);
  }
  this.refresh();
};

Window_InfoList.prototype.getVisibleRows = function() {
  var value = this.height - (this.standardPadding() * 2);
  value = Math.floor(value / this.lineHeight());
  return value;
};

Window_InfoList.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_InfoList.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) this.scrollDown();
  if (TouchInput.wheelY <= -threshold) this.scrollUp();
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.Info.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  Yanfly.Info.Scene_Menu_createCommandWindow.call(this);
  this._commandWindow.setHandler('Info', this.commandInfo.bind(this));
};

Scene_Menu.prototype.commandInfo = function() {
  SceneManager.push(Scene_Info);
};

//=============================================================================
// Scene_Info
//=============================================================================

function Scene_Info() {
  this.initialize.apply(this, arguments);
};

Scene_Info.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Info.prototype.constructor = Scene_Info;

Scene_Info.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Info.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.runCustomCode(Yanfly.Info.createBefore);
  this.createDataWindow();
  this.createTitleWindow();
  this.createCategoryWindow();
  this.createListWindow();
  this.processInfoOpen();
  this.runCustomCode(Yanfly.Info.createAfter);
};

Yanfly.Info.createBefore = 
  JSON.parse(Yanfly.Info.LunaticMode['Before Create Windows']);
Yanfly.Info.createAfter = 
  JSON.parse(Yanfly.Info.LunaticMode['After Create Windows']);
Yanfly.Info.terminateMenu = 
  JSON.parse(Yanfly.Info.LunaticMode['Close Info Menu']);

Scene_Info.prototype.runCustomCode = function(code) {
  var background = this._backgroundSprite;
  var windowLayer = this._windowLayer;
  eval(code);
};

Scene_Info.prototype.createDataWindow = function() {
  this._dataWindow = new Window_InfoData();
  this._dataWindow.setHandler('cancel', this.onDataCancel.bind(this));
  this.addWindow(this._dataWindow);
};

Scene_Info.prototype.createTitleWindow = function() {
  this._titleWindow = new Window_InfoTitle();
  this.addWindow(this._titleWindow);
};

Scene_Info.prototype.createCategoryWindow = function() {
  this._categoryWindow = new Window_InfoCategories();
  this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
  this._categoryWindow.setHandler('category', this.onCategoryOk.bind(this));
  this.addWindow(this._categoryWindow);
};

Scene_Info.prototype.createListWindow = function() {
  this._listWindow = new Window_InfoList(this._categoryWindow, 
    this._dataWindow, this._titleWindow);
  this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
  this._listWindow.setHandler('type', this.onListTypeToggle.bind(this));
  this._listWindow.setHandler('Info', this.onListInfo.bind(this));
  this._listWindow.setHandler('readInfo', this.dataWindowActivate.bind(this));
  this.addWindow(this._listWindow);
};

Scene_Info.prototype.onCategoryCancel = function() {
  this.runCustomCode(Yanfly.Info.terminateMenu);
  this.popScene();
};

Scene_Info.prototype.onCategoryOk = function() {
  this._listWindow.activate();
  if (this._listWindow.index() < 0) this._listWindow.select(0);
};

Scene_Info.prototype.isInfoExtraCommand = function() {
  return false;
};

Scene_Info.prototype.onListCancel = function() {
  if (this._listWindow._mode === 'Extra') {
    this._listWindow.setMode('Info');
  } else {
    this._categoryWindow.activate();
  }
};

Scene_Info.prototype.onListTypeToggle = function() {
  this._listWindow.activate();
  this._listWindow.typeToggle(this._listWindow.currentExt());
};

Scene_Info.prototype.onListInfo = function() {
  if (this.isInfoExtraCommand()) {
    this._listWindow.setMode('Extra');
  } else {
    this.dataWindowActivate();
  }
};

Scene_Info.prototype.dataWindowActivate = function() {
  this._dataWindow.activate();
};

Scene_Info.prototype.onDataCancel = function() {
  if (this._dataWindow._mode === 'Extra') {
    this._listWindow.setMode('Info');
  } else {
    this._dataWindow.deactivate();
    this._listWindow.activate();
  }
};

Scene_Info.prototype.processInfoOpen = function() {
  var InfoId = $gameTemp.getInfoOpen();
  if (InfoId) {
    var categoryOrder = this.getInfoOpenCategories();
    var length = categoryOrder.length;
    for (var i = 0; i < length; ++i) {
      var category = categoryOrder[i];
      var index = this._categoryWindow.findExt(category);
      if (index >= 0) break;
    }
    this._categoryWindow.selectExt(index);
    this.onCategoryOk();
    this._categoryWindow.deactivate();
    this._listWindow.selectExt(InfoId);
    this.onListInfo();
    this._listWindow.deactivate();
    this._listWindow.setTopRow(this._listWindow.findExt(InfoId));
    var scrollTimes = Math.floor(this._listWindow.getVisibleRows() / 2);
    while (scrollTimes--) { 
      this._listWindow.scrollUp();
    }
    this._listWindow.ensureCursorVisible();
    this._listWindow.updateCursor();
  }
  $gameTemp.clearInfoOpen();
};

Scene_Info.prototype.getInfoOpenCategories = function() {
  return ['available', 'completed', 'failed', 'all'];
};

// Custom Code

Scene_Info.prototype.centerSprite = function(sprite) {
  sprite.x = Graphics.width / 2;
  sprite.y = Graphics.height / 2;
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
};

Scene_Info.prototype.fitScreen = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) {
    return setTimeout(this.fitScreen.bind(this, sprite), 5);
  }
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) sprite.scale.x = ratioX;
  if (ratioY > 1.0) sprite.scale.y = ratioY;
  this.centerSprite(sprite);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {

Yanfly.Util.toGroup = function(inVal) {
  return inVal;
};

}; // Yanfly.Util.toGroup

Yanfly.Util.getRange = function(n, m) {
  var result = [];
  for (var i = n; i <= m; ++i) result.push(i);
  return result;
};

//=============================================================================
// End of Main Functions
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_InfoJournal while your project files are lower than version ';
text += '1.5.0.\n\nPlease visit this thread for instructions on how to update ';
text += 'your project files to 1.5.0 or higher: \n\n';
text += 'https://forums.rpgmakerweb.com/index.php?threads/';
text += 'rpg-maker-mv-1-5-0-update.79677/';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0')
//=============================================================================
// End of File
//=============================================================================