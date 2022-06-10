//=============================================================================
// TAA_BookMenu.js
// Author: taaspider
//=============================================================================

var TAA = TAA || {};
TAA.bm = {};
TAA.bm.Version = "1.1.0";
TAA.bm.PluginName = "TAA_BookMenu";
TAA.bm.alias = {};

/*:
 *
 * @plugindesc [1.1.0] Create a Book Menu
 * @author T. A. A. (taaspider)
 * 
 * @help
 * =============================================================================
 * Introduction
 * =============================================================================
 * 
 * WARNING: This plugin requires RPG Maker MV 1.5.0 or above! Please make sure 
 * your RPG Maker MV software is up to date before using this plugin.
 * 
 * -----------------------------------------------------------------------------
 * 
 * When we create a game, we usually create a whole new world rich in lore and 
 * details, and want to make it all available to the players, so that they can
 * understand every single detail we develop. However, just dumping it all in 
 * lengthy dialogues usually bore and scare most of the players, who will simply
 * give up on your world.
 * 
 * A common alternative used by many AAA games is to minimize dialogue and
 * exposition, and provide additional details through in-game books.
 * 
 * This plugin aims to provide just that for your game: a book menu where the
 * player can read up additional lore when he feels up to it. You can place books
 * throughout your game, providing a bit more of context for hungry players as
 * they progress, and keeping exposition to a minimum.
 * 
 * =============================================================================
 * Instructions - Scene Differences
 * =============================================================================
 * 
 * This plugin provides two different types of scenes. 
 * 
 * The first one is a detached book window, that shows only one book at a time 
 * (title and book contents). It is a simpler version meant to be used when the
 * player finds a new book while exploring your world. You can set it up so that
 * the book will then be made available in the menu so that the player can read
 * it anytime he wants, or not.
 * 
 * The second scene is kind of a "player library". It is meant to be accessed from
 * the main menu and list all books known to the player (you can set it up to show
 * all books EVER, or only those the player has found while exploring).
 * 
 * 
 * =============================================================================
 * Instructions - Setting Up the Scenes
 * =============================================================================
 * 
 * The plugin parameters that configures the windows can be left as it is by
 * default and they should work fine. But, should you wish to customize them,
 * here's a few things you should know.
 * 
 * -----------------------------------------------------------------------------
 * Detached Title Window
 * -----------------------------------------------------------------------------
 * 
 * This parameter configures the title bar from the detached window scene. All
 * options are meant to control a specific aspect of the window.
 * 
 * Hide Title Bar
 *  - Use this to hide the Title Window and show only the Text window.
 * 
 * Default:
 *  false
 * 
 * 
 * Default:
 * 
 * X: Graphics.boxWdith / 12
 * Y: Graphics.boxHeight / 10
 * Width: Graphics.boxWidth * 4/5
 * Height: this.fittingHeight(1)
 * Line Height: 36
 * Font Size: 20
 * Font Face: GameFont
 * Text Alignment: center
 * Standard Padding: 8
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * -----------------------------------------------------------------------------
 * Detached Text Window
 * -----------------------------------------------------------------------------
 * 
 * This one configures the detached text window scene, where the book contents
 * are displayed. Most of the options here are used to control the window aspect.
 * 
 * There's one, however, that can be used to customize the text display:
 * 
 * Book Text Format
 *  - This defines how the book text is shown to the players. You can use text
 * codes to customize the window as you wish, and use this placeholders to
 * set up book data:
 *    - %1 will reference the book title (should you wish to hide the title bar)
 *    - %2 will reference the book category
 *    - %3 will reference the book text
 * I highly recommend using Yanfly's Message Core plugin, or any other that provides
 * wordwrapping functions. Be sure to place the plugin's wordwrap tag here, 
 * so that you don't have to worry setting up your books' text lines yourself.
 * This plugin does not implement wordwrapping as to not be redundant to many
 * other popular and commonly used plugins, as well as try to remain compatible
 * to all of them.
 * 
 * Default: 
 *  <Wordwrap>%3
 * 
 * 
 * Y
 *  - There's a catch to this one: it is relative to the title window position.
 * So, 0 means it will be placed directly below the title window. If you wish to
 * hide the title window remember to set the "Hide Title Bar" property to "true".
 * 
 * 
 * Default:
 * X: Graphics.boxWdith / 12
 * Y: 0
 * Width: Graphics.boxWidth * 4/5
 * Height: Graphics.boxHeight * 2/3
 * Line Height: 36
 * Font Size: 20
 * Font Face: GameFont
 * Standard Padding: 8
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * -----------------------------------------------------------------------------
 * Menu List Window
 * -----------------------------------------------------------------------------
 * 
 * This will set up how the book list window is displayed in the book menu.
 * 
 * Show Categories
 *  - This will determine if books will be listed below their categories in the
 * list window. If set to false, categories will be hidden and the menu will list
 * only books.
 * 
 * Default:
 *  true
 * 
 * Closed / Opened Category Symbol
 *  - This two parameters defines what symbols we will be using to show the player
 * that a category is compressed or expanded. Think of categories like folders:
 * when you open a folder in the windows explorer menu, the folder will appear 
 * opened. Otherwise it will be closed.
 * 
 * Default:
 *  Closed Category Symbol: +
 *  Opened Category Symbol: -
 * 
 * Category Text Format
 *  - This defines how the categories are shown to the players in the list menu. 
 * You can use text codes to customize it as you wish, and use this placeholders to
 * set up the category entry:
 *    - %1 will reference the opened/closed symbols
 *    - %2 will reference the category name
 *    - %3 will reference the number of books available under that category
 * 
 * Default: 
 *  %1%2 (%3)
 * 
 * Book Indent
 *  - This is how much to indent book names if the categories are shown, helping
 * players distinguish books from categories and which books belong to which
 * category.
 * 
 * Default:
 *  16
 * 
 * Hide Unread Books
 *  - This determines if we should hide books the player has not found by himself
 * in the book menu or not. If set to true, only books read while exploring the
 * world will be listed. If false, all available books are shown.
 * 
 * Default:
 *  true
 * 
 * 
 * Default:
 * X: 0
 * Y: 0
 * Width: Graphics.boxWidth * 1/3
 * Height: Graphics.boxHeight
 * Line Height: 36
 * Font Size: 20
 * Font Face: GameFont
 * Standard Padding: 8
 * Text Padding: 6
 * Category Alignment: left
 * Book Alignment: left
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * -----------------------------------------------------------------------------
 * Menu Title Window
 * -----------------------------------------------------------------------------
 * 
 * This is very similar to the Detached Title Window parameters, but it defines
 * how the title bar will be displayed inside the book menu.
 * 
 * Empty Title Text
 *  - When the player is navigating the list of books, he can leave the cursor
 * on a category item, which have no text. This parameters allows you to setup a 
 * default text to be displayed when there is no book selected.
 * 
 * Default:
 *  Library
 * 
 * 
 * Default:
 * 
 * X: Graphics.boxWdith / 3
 * Y: 0
 * Width: Graphics.boxWidth * 2/3
 * Height: this.fittingHeight(1)
 * Line Height: 36
 * Font Size: 24
 * Font Face: GameFont
 * Text Alignment: center
 * Standard Padding: 8
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * -----------------------------------------------------------------------------
 * Menu Text Window
 * -----------------------------------------------------------------------------
 * 
 * This is very similar to the Detached Text Window parameters, but it defines
 * how the text window will be displayed inside the book menu.
 * 
 * Book Text Format
 *  - This defines how the book text is shown to the players. You can use text
 * codes to customize the window as you wish, and use this placeholders to
 * set up book data:
 *    - %1 will reference the book title (should you wish to hide the title bar)
 *    - %2 will reference the book category
 *    - %3 will reference the book text
 * I highly recommend using Yanfly's Message Core plugin, or any other that provides
 * wordwrapping functions. Be sure to place the plugin's wordwrap tag here, 
 * so that you don't have to worry setting up your books' text lines yourself.
 * This plugin does not implement wordwrapping as to not be redundant to many
 * other popular and commonly used plugins, as well as try to remain compatible
 * to all of them.
 * 
 * Default: 
 *  <Wordwrap>%3
 * 
 * 
 * Empty Book Text
 *  - When the player is navigating the list of books, he can leave the cursor
 * on a category item, which have no text. This parameters allows you to setup a 
 * default text to be displayed when there is no book selected.
 * 
 * Default:
 *  <blank>
 * 
 * 
 * Default:
 * X: Graphics.boxWdith / 3
 * Y: 0
 * Width: Graphics.boxWidth * 2/3
 * Height: Graphics.boxHeight - this._titleWindow.height
 * Line Height: 36
 * Font Size: 20
 * Font Face: GameFont
 * Standard Padding: 8
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * =============================================================================
 * Background Images
 * =============================================================================
 * 
 * The plugin gives a lot of options for you to setup background images on both
 * scenes. Configurations are kept separate for each one, so you can set 
 * different backgrounds for each scene if you wish.
 * 
 * All images must be in png format and located in the img/pictures folder.
 * The parameters to config each type of background image is shared by all
 * possible options.
 * 
 * A warning though, the plugin won't manipulate, stretch or shrink images.
 * It will only place the images as they are. It's up to you to provide
 * images on the right size.
 * 
 * Apart from choosing the images, you must also inform the plugin how you
 * want it to present them. Options are a little different between scenes
 * because the Menu Scene has an additional window (the list window), but the
 * logic is the same. Here's a few things you should know:
 *  - If you set it up as "None", the plugin will paint a black background,
 * with no image;
 *  - If you set "Default Map Print", it will keep the base class default,
 * which is using a print screen from the map the player is located;
 *  - If you set "Full Background Image", the image will be place as a
 * background for the whole screen, regardless of the size of your windows;
 *  - There's a bunch of options saying "Multiple Images", and then a combo
 * highlighted between parenthesis, like "Title + Text", "Title / Text + List",
 * for example. The dash sign (/) means the windows will share a single image,
 * while the plus sign (+) means it will use a different image;
 *  - The option "Single Image" will set the same image across all windows
 * in the scene. If the scene takes the whole screen, it will work exactly
 * as the "Full Background Image". If not, it will be placed as best as possible
 * to cover all windows on the scene, and nothing more;
 *  - There are also options to allow you to combine different configurations,
 * so you can customize the background to your liking!
 * 
 * =============================================================================
 * Instructions - DataSources
 * =============================================================================
 * 
 * This plugin was built to work with two main types of datasources: the Plugin
 * Manager and external JSON files.
 * 
 * DataSource Type
 *  - Use this parameters to define which datasource will be used. If you choose
 * 'Plugin Manager', you need to enter your books in the 'Plugin Manager Books'
 * parameter. If you choose the 'JSON File' option, you need to refine 
 * configurations in the 'JSON Config' parameter. Either way, you should use
 * only one. So by choosing one you can safely ignore the other parameters.
 * 
 * -----------------------------------------------------------------------------
 * JSON Config
 * -----------------------------------------------------------------------------
 * 
 * Type
 *  - This plugin provides two options when using a JSON file to load your book
 * data: 'Dedicated File' and 'Localization File'.
 *   * Dedicated File: You specify a dedicated file with the expected structure,
 * and the plugin will read your book texts as they are configured in the file.
 *   * Localization File: If you're using a localization plugin that reads text
 * from different files according to the language selected by the player (like 
 * Iavra's Localization Plugin, for example), you need to specify the structure
 * inside the files and how is you placeholders configured. Then, you need to 
 * point to ONE of the files. This plugin will use the selected file as a guide
 * to load the placeholders as needed.
 * 
 * File
 *  - This should point to a JSON file containing all your books. If you 'Type'
 * has been set to 'Localization File' (meaning you're using a Localization 
 * Plugin and different files for different languages), this parameter should
 * point to a just one of the language files.
 * The JSON file must have a structure similar to this, whichever Type has been
 * chosen:
 * 
 * {
 *  "library": {
 *      "categories": [
 *          "Category 1",
 *          "Category 2",
 *          ...
 *          "Category N"
 *      ],
 *      "books": {
 *          "title1": {
 *              "title": "Book Title",
 *              "text": "Book's content.",
 *              "category": 0,
 *              "id": 0
 *          },
 *          "title2": {
 *              ...
 *          },
 *          ...,
 *          "titleN": {
 *              ...
 *          }
 *      }
 *  }
 * }
 * 
 * You can customize the object's tags as you wish using the next parameters.
 * 
 * IMPORTANT: 
 *   - The "category" tag must be a number, referencing the category index
 * in the "categories" array.
 *   - The "id" tag is used to control the ordering of books in the list window.
 * It must be a number, but it can also be omitted and the plugin will define the
 * order according to the order it reads the books from the file (usually the order
 * they're placed).
 *   - Each book must have an unique key tag. This tag will be used by most of
 * the plugin available commands.
 * 
 * 
 * Localization Escape Code
 *  - This defines how the plugin must create the localization placeholders. {key}
 * will be replaced by the reference to each text, so that the Localization Plugin
 * of choice can search for the text in the correct language. This parameter can
 * be safely ignored if you're not using a localization plugin.
 * 
 * Default:
 *  #{{key}}
 * 
 * 
 * Category List
 *  - This defines the object inside the JSON file that contains the array of book
 * categories. Be advised that the order the categories are placed in the array
 * defines the order they will be loaded in the list menu.
 * 
 * Default:
 *   library.categories
 * 
 * 
 * Root Context Path
 *  - This defines the root context inside the JSON File to look for the books.
 * 
 * Default:
 *   library.books
 * 
 * 
 * Title Object
 *  - Use this parameter to customize the title tag of you JSON file. The title
 * tag will be used to reference each book title.
 * 
 * Default:
 *   title
 * 
 * 
 * Text Object
 *  - Use this parameter to customize the text tag of your JSON file. The Text tag
 * will be used to reference each book text.
 * 
 * Default:
 *   text
 * 
 * 
 * Category Object
 *  - Use this parameter to customize the category tag of your JSON file. The 
 * category tag will be used to reference each book category.
 * 
 * Default:
 *   category
 * 
 * 
 * Id Object
 *  - Use this parameter to customize the Id tag of your JSON file. The id tag will
 * be used to reference each book id.
 * 
 * Default:
 *   id
 * 
 * 
 * Undefined Category
 *  - This defines a default text to be displayed instead of the category name if
 * the category could not be correctly loaded.
 * 
 * Default:
 *   Unknown
 * 
 * 
 * -----------------------------------------------------------------------------
 * Plugin Manager Books
 * -----------------------------------------------------------------------------
 * 
 * Category Order
 *  - This defines the order at which the categories will be listed in the list 
 * menu.
 * 
 * Books
 *  - Enter the book data directly through the Plugin Manager. Similarly to the
 * JSON File approach, you must specify a Title, Text, Category and Id for each 
 * book. If you leave the Id the same for all books, the plugin will load them
 * in the order they're placed in the plugin manager.
 * 
 * IMPORTANT:
 *   - Each book must have an unique name. Book names will be used as keys by
 * almost all plugin available commands.
 *   - Each book category must match a category listed in the 'Category Order'
 * parameter.
 * 
 * 
 * ============================================================================
 * Instructions - Main Menu
 * ============================================================================
 * 
 * The following parameters are meant to configure the main menu entry:
 * 
 * Auto Place Command
 *  - If enabled, this parameters creates a main menu entry for the Book menu
 * automatically.
 * For those using Yanfly's Main Menu Manager (or other plugins to control main
 * menu entries as well) this parameter should be disabled.
 * As for Yanfly's Main Menu Manager, you can setup the Book command using
 * the following format:
 * 
 *      Menu Name: TAA.bm.Parameters.Menu.Name
 *      Menu Symbol: books
 *      Menu Show: $gameSystem.isShowBookMenu()
 *      Menu Enabled: $gameSystem.isBookMenuEnabled()
 *      Menu Ext:
 *      Menu Main Bind: this.commandBook.bind(this)
 *      Menu Actor Bind:
 * 
 * Menu Name
 *  - This sets up the menu name in the main menu window.
 * 
 * Show Menu
 *  - This defines if the book menu is shown by default at the main menu.
 * 
 * Default:
 *   true
 * 
 * Enable Menu
 *  - This defines if the book menu is enabled by default at the main menu.
 * 
 * Default:
 *   true
 * 
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 * 
 * There are a few script calls you can use with this plugin to test a few 
 * conditions or return a few statistics.
 * 
 * $gameSystem.isShowBookMenu()
 *  - Test if the book menu should be shown at the main menu.
 * 
 * $gameSystem.isBookMenuEnabled()
 *  - Test if the book menu should be enabled at the main menu.
 * 
 * $gameSystem.isBookCategoriesVisible()
 *  - Test if the books categories are visible in the list window.
 * 
 * $gameSystem.isUnreadBooksHidden()
 *  - Check if books not found by the player are shown at the list menu.
 * 
 * $gameSystem.getTotalBooks()
 *  - Return the total number of books in the game.
 * 
 * $gameSystem.getTotalBooksRead()
 *  - Return the number of books the player has found.
 * 
 * $gameSystem.getTotalBooksFromCategory(category)
 *  - Replace "category" with the category name, regardless of the datasource
 * type selected. This will return the total number of books under this category.
 * Remove blank spaces in the category name, if any.
 * Example: $gameSystem.getTotalBooksFromCategory("History");
 * 
 * $gameSystem.getTotalBooksReadFromCategory(category)
 *  - Replace "category" with the category name, regardless of the datasource
 * type selected. This will return the total number of books from the specified
 * category that has already been read by the player. Remove blank spaces in 
 * the category name, if any.
 * Example: $gameSystem.getTotalBooksReadFromCategory("History");
 * 
 * $gameSystem.isBookRead(bookKey)
 *  - "bookKey" should be replaced by the book tag, if you're using a JSON file
 * as your datasource, or the book title (minus blank spaces) if you're using 
 * Plugin Manager. This will return true if the player has already read the book, 
 * or false if he didn't.
 * Examples:
 *  $gameSystem.isBookRead("bookJsonTag");
 *  $gameSystem.isBookRead("PluginManagerTitle");
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 * OpenBookMenu
 *  - Triggers the book menu to be displayed.
 * 
 * ReadBook key
 *  - Replace key with the book tag, if using a JSON file as datasource, or the 
 * book title if using Plugin Manager. If the key contains blank spaces between 
 * words, you need to remove them in the plugin command call.
 * This will mark the book as read (if it isn't already) and display the detached
 * book window with the book contents.
 * Examples:
 *  ReadBook bookJsonTag
 *  ReadBook PluginManagerTitle (instead of "Plugin Manager Title")
 * 
 * LibraryData Menu Hide
 * LibraryData Menu Show
 *  - Use this commands to hide / show the book menu from the main menu list.
 * 
 * LibraryData Menu Enable
 * LibraryData Menu Disable
 *  - Use this commands to enable / disable the book menu at the main menu list.
 * 
 * LibraryData Learn Book key
 * LibraryData Forget Book key
 *  - Use this commands to make the player learn / forget books without opening the
 * detached book window. Replace 'key' with the book tag, if using a JSON File as 
 * datasource, or the book title if using the Plugin Manager. If the key contains
 * blank spaces between words, you need to remove them in the plugin command call.
 * 
 * LibraryData Learn Books key1 key2 key3 ... keyN
 * LibraryData Forget Books key1 key2 key3 ... keyN
 *  - Similar to the previous command, but this can be used to make the player learn / 
 * forget many books at once.
 * 
 * LibraryData Learn Category categoryName
 * LibraryData Forget Category categoryName
 *  - Use this commands to make the player learn / forget all books from a specific
 * category. Replace 'categoryName' with the category name (if it contains blank 
 * spaces, you need to remove them in the plugin command call)
 * 
 * LibraryData ShowCategories on
 * LibraryData ShowCategories off
 *  - Use this to show / hide categories in the list window menu.
 * 
 * LibraryData UnreadBooks hide
 * LibraryData UnreadBooks show
 *  - Use this to hide / show books not read by the player in the book list window.
 * 
 * LibraryData TitleBar hide
 * LibraryData TitleBar show
 *  - Use this to hide / show the title bar on the detached book 
 * window.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - First version out!
 * Version 1.0.1:
 * - Fixed mouse wheel scrolling by including a customization to
 *   TouchInput._onMouseMove.
 * Version 1.1.0:
 * - Reorganized all aliases inside an object, to make them easier to track down
 * - Included the possibility to customize scene backgrounds with images.
 * The Detached Scene and Menu Scene have different configurations, so that
 * they can have different backgrounds if the dev wishes.
 *
 * ============================================================================
 * End of Help
 * ============================================================================
 * 
 * @param ---DataSource Config---
 * @default
 * 
 * @param SourceType
 * @parent ---DataSource Config---
 * @text DataSource Type
 * @type combo
 * @option JSON File
 * @option Plugin Manager
 * @default JSON File
 * @desc Select the source type from where book data will be loaded into the game.
 * 
 * @param JSON Config
 * @parent ---DataSource Config---
 * @type struct<JsonConfig>
 * @desc Configure properties when using a JSON file as a datasource.
 * @default {"Type":"Dedicated File","File":"books.json","Localization Escape Code":"#{{key}}","Category List":"library.categories","Root Context Path":"library.books","Title Object":"title","Text Object":"text","Category Object":"category","ID Object":"id","Undefined Category":"Unknown"}
 * 
 * @param Plugin Manager Books
 * @parent ---DataSource Config---
 * @type struct<BookSetup>
 * @desc Configure books through Plugin Manager if this datasource type is selected.
 * @default {"Category Order":"[]","Books":"[]"}
 * 
 * @param ---Main Menu---
 * @default
 * 
 * @param Auto Place Command
 * @parent ---Main Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Should this plugin decide the menu placement position?
 * @default true
 * 
 * @param Menu Name
 * @parent ---Main Menu---
 * @type text
 * @default Books
 * @desc What is our menu name in the main menu window?
 * 
 * @param Show Menu
 * @parent ---Main Menu---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Should we show book menu by default?
 * 
 * @param Enable Menu
 * @parent ---Main Menu---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Should we enable book menu by default?
 * 
 * @param ---Window Config---
 * @default
 * 
 * @param ---Detached Book Scene---
 * @parent ---Window Config---
 * @default
 * 
 * @param Detached Title Window Config
 * @parent ---Detached Book Scene---
 * @type struct<DetachedTitleWindow>
 * @desc Configure properties for the Title Window for detached Book Scene.
 * @default {"X":"Graphics.boxWidth / 12","Y":"Graphics.boxHeight / 10","Width":"Graphics.boxWidth * 4/5","Height":"this.fittingHeight(1)","Line Height":"36","Font Size":"20","Font Face":"GameFont","Text Alignment":"center","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window","Hide Title Bar":"false"}
 * 
 * @param Detached Text Window Config
 * @parent ---Detached Book Scene---
 * @type struct<DetachedTextWindow>
 * @desc Configure properties for the Text Window for detached Book Scene.
 * @default {"X":"Graphics.boxWidth/12","Y":"0","Width":"Graphics.boxWidth * 4/5","Height":"Graphics.boxHeight * 4/6","Line Height":"36","Font Size":"20","Font Face":"GameFont","Book Text Format":"%3","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 * 
 * @param Detached Background Options
 * @parent ---Detached Book Scene---
 * @type select
 * @option None
 * @value 0
 * @option Default Map Print
 * @value 1
 * @option Full Background Image
 * @value 2
 * @option Multiple Images (Title + Text)
 * @value 4
 * @option Single Image (Title / Text)
 * @value 8
 * @option Full Background + Multiple Images (Title + Text)
 * @value 6
 * @option Full Background + Single Image (Title / Text)
 * @value 10
 * @option Default Map Print + Multiple Images (Title + Text)
 * @value 5
 * @option Default Map Print + Single Image (Title / Text)
 * @value 9
 * @default 1
 * @desc Defines how the scene background should be presented.
 * 
 * @param Detached Background Config
 * @parent ---Detached Book Scene---
 * @type struct<DetachedBgConfig>
 * @desc Configure images according to Background Image Options.
 * @default {"Full Background Image":"","Single Image":"","Multiple Images - Title":"","Multiple Images - Text":""}
 * 
 * @param ---Book Menu Scene---
 * @parent ---Window Config---
 * @default
 * 
 * @param Menu List Window Config
 * @parent ---Book Menu Scene---
 * @type struct<MenuListWindow>
 * @desc Configure properties for the Menu List Window on the Book Menu.
 * @default {"X":"0","Y":"0","Width":"Graphics.boxWidth * 1/3","Height":"Graphics.boxHeight","Font Size":"20","Font Face":"GameFont","Line Height":"36","Show Categories":"true","Category Alignment":"left","Closed Category Symbol":"+","Opened Category Symbol":"-","Category Text Format":"%1 %2 (%3)","Book Alignment":"left","Book Indent":"16","Hide Unread Books":"true","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 * 
 * @param Menu Title Window Config
 * @parent ---Book Menu Scene---
 * @type struct<MenuTitleWindow>
 * @desc Configure properties for the Menu Title Window on the Book Menu.
 * @default {"X":"Graphics.boxWidth / 3","Y":"0","Width":"Graphics.boxWidth * 2/3","Height":"this.fittingHeight(1)","Line Height":"36","Font Size":"20","Font Face":"GameFont","Empty Title Text":"Library","Text Alignment":"center","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 * 
 * @param Menu Text Window Config
 * @parent ---Book Menu Scene---
 * @type struct<MenuTextWindow>
 * @desc Configure properties for the Menu Text Window on the Book Menu.
 * @default {"X":"Graphics.boxWidth / 3","Y":"0","Width":"Graphics.boxWidth * 2/3","Height":"Graphics.boxHeight - this._titleWindow.height","Line Height":"36","Font Size":"20","Font Face":"GameFont","Book Text Format":"%3","Empty Book Text":"","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 * 
 * @param Menu Background Options
 * @parent ---Book Menu Scene---
 * @type select
 * @option None
 * @value 0
 * @option Default Map Print
 * @value 1
 * @option Full Background Image
 * @value 2
 * @option Multiple Images (Title / Text + List)
 * @value 4
 * @option Multiple Images (Text / List + Title)
 * @value 8
 * @option Multiple Images (Title / List + Text)
 * @value 16
 * @option Multiple Images (Title + Text + List)
 * @value 32
 * @option Single Image (Title / Text / List)
 * @value 64
 * @option Full Background + Multiple Images (Title / Text + List)
 * @value 6
 * @option Full Background + Multiple Images (Text / List + Title)
 * @value 10
 * @option Full Background + Multiple Images (Title / List + Text)
 * @value 18
 * @option Full Background + Single Image (Title / Text / List)
 * @value 34
 * @option Default Map Print + Multiple Images (Title / Text + List)
 * @value 5
 * @option Default Map Print + Multiple Images (Text / List + Title)
 * @value 9
 * @option Default Map Print + Multiple Images (Title / List + Text)
 * @value 17
 * @option Default Map Print + Single Image (Title / Text / List)
 * @value 65
 * @default 1
 * @desc Defines how the scene background should be presented.
 * 
 * @param Menu Background Config
 * @parent ---Book Menu Scene---
 * @type struct<MenuBgConfig>
 * @desc Configure images according to Background Image Options.
 * @default {"Full Background Image":"","Single Image":"","Multiple Images - Title":"","Multiple Images - Text":"","Multiple Images - List":""}
 * 
 */

//=============================================================================
// Detached Book Scene - Title Structure
//=============================================================================
/*~struct~DetachedTitleWindow:
 * 
 * @param X
 * @type text
 * @default Graphics.boxWidth / 12
 * @desc Where do we place our Detached Book Scene? This is an eval. (default: Graphics.boxWidth / 12)
 * 
 * @param Y
 * @type text
 * @default Graphics.boxHeight / 10
 * @desc Where do we place our Detached Book Scene? This is an eval. (default: Graphics.boxHeight / 10)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth * 5/6
 * @option Graphics.boxWidth * 4/5
 * @option Graphics.boxWidth * 3/4
 * @option Graphics.boxWidth * 2/3
 * @option Graphics.boxWidth * 1/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 4/5
 * @desc What is the width of our title window when not in the Book Menu? This is an eval.
 *  
 * @param Height
 * @type combo
 * @option this.fittingHeight(1)
 * @option Graphics.boxHeight * 1/8
 * @option Graphics.boxHeight * 1/7
 * @option Graphics.boxHeight * 1/6
 * @default this.fittingHeight(1)
 * @desc What is the height of our title window when not in the Book Menu? This is an eval.
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the title window when not in the menu?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the title window when not in the menu?
 * 
 * @param Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc What is our title text alignment?
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 * @param Hide Title Bar
 * @parent ---Detached Book Scene---
 * @type boolean
 * @on Hide
 * @off Show
 * @default false
 * @desc Should we show the title war in the detached scene by default?
 * 
 */

//=============================================================================
// Detached Book Scene - Text Structure
//=============================================================================
 /*~struct~DetachedTextWindow:
 * @param X
 * @type text
 * @default Graphics.boxWidth/12
 * @desc Where do we place our Detached Book Scene? (default: Graphics.boxWidth/12)
 * 
 * @param Y
 * @type text
 * @default 0
 * @desc Where do we place our text window, relative to the title window? (default: 0)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth * 5/6
 * @option Graphics.boxWidth * 4/5
 * @option Graphics.boxWidth * 3/4
 * @option Graphics.boxWidth * 2/3
 * @option Graphics.boxWidth * 1/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 4/5
 * @desc What is the width of our text window when not in the Book Menu? This is an eval.
 *  
 * @param Height
 * @type combo
 * @option Graphics.boxHeight - this._titleWindow.height
 * @option Graphics.boxHeight * 4/6
 * @option Graphics.boxHeight * 5/7
 * @option Graphics.boxHeight * 6/8
 * @default Graphics.boxHeight * 4/6
 * @desc What is the height of our text window when not in the Book Menu? This is an eval.
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the text window when not in the menu?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the text window when not in the menu?
 * 
 * @param Book Text Format
 * @type text
 * @default <Wordwrap>%3
 * @desc Format to display book texts. Supported escape codes:
 * %1 - Title  %2 - Category  %3 - Book Text
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 */

//=============================================================================
// Book Menu - List Structure
//=============================================================================
 /*~struct~MenuListWindow:
 * @param X
 * @type text
 * @default 0
 * @desc Where do we place our Menu List Window? (default: 0)
 * 
 * @param Y
 * @type text
 * @default 0
 * @desc Where do we place our Menu List Window? (default: 0)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth * 1/6
 * @option Graphics.boxWidth * 1/4
 * @option Graphics.boxWidth * 1/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 1/3
 * @desc What is the width of our Menu List Window? This is an eval. (default: Graphics.boxWidth * 1/3)
 *  
 * @param Height
 * @type combo
 * @option Graphics.boxHeight
 * @option Graphics.boxHeight * 1/2
 * @option Graphics.boxHeight * 1/3
 * @option Graphics.boxHeight * 1/4
 * @option Graphics.boxHeight - this._titleWindow.height
 * @default Graphics.boxHeight
 * @desc What is the height of our Menu List Window? This is an eval. (default: Graphics.boxHeight)
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the Menu List Window?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the Menu List Window?
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Show Categories
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Should book categories be displayed in the Book Menu? (default: Enable)
 * 
 * @param Category Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default left
 * @desc How shoudl we align category names in the Menu List Window? (default: left)
 * 
 * @param Closed Category Symbol
 * @type text
 * @default +
 * @desc How should we indicate a category is closed? Closed categories won't show books within that category.
 * 
 * @param Opened Category Symbol
 * @type text
 * @default -
 * @desc How should we indicate a category is open? Open categories will list books within that category.
 * 
 * @param Category Text Format
 * @type text
 * @default %1 %2 (%3)
 * @desc Format to display quest types. Text codes supported:
 * %1 - Open/Closed  %2 - Category Name  %3 - Number of books within
 * 
 * @param Book Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default left
 * @desc How shoudl we align book names in the Menu List Window? (default: left)
 * 
 * @param Book Indent
 * @type number
 * @default 16
 * @desc How much indentation should we place on book names in the Menu List Window? (default: 16)
 * 
 * @param Hide Unread Books
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default false
 * @desc Should we hide books that have not been read at least once? (default: Disabled)
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 */

//=============================================================================
// Book Menu - Title Structure
//=============================================================================
 /*~struct~MenuTitleWindow:
 * 
 * @param X
 * @type text
 * @default Graphics.boxWidth / 3
 * @desc Where do we place our Title Window in the Book Menu? This is an eval. (default: Graphics.boxWidth / 3)
 * 
 * @param Y
 * @type text
 * @default 0
 * @desc Where do we place our Title Window in the Book Menu? This is an eval. (default: 0)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth * 5/6
 * @option Graphics.boxWidth * 3/4
 * @option Graphics.boxWidth * 2/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 2/3
 * @desc What is the width of our title window in the Book Menu? This is an eval. (default: Graphics.boxWidth * 2/3)
 *  
 * @param Height
 * @type combo
 * @option this.fittingHeight(1)
 * @option Graphics.boxHeight * 1/8
 * @option Graphics.boxHeight * 1/7
 * @option Graphics.boxHeight * 1/6
 * @default this.fittingHeight(1)
 * @desc What is the height of our title window in the Book Menu? This is an eval. (default: this.fittingHeight(1))
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the title window in the Book Menu?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the title window in the Book Menu?
 * 
 * @param Empty Title Text
 * @type text
 * @default Library
 * @desc What should we place in the title window when there is no book selected? (default: Library)
 * 
 * @param Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc What is our title text alignment?
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 */

//=============================================================================
// Book Menu - Text Structure
//=============================================================================
 /*~struct~MenuTextWindow:
 * @param X
 * @type text
 * @default Graphics.boxWidth / 3
 * @desc Where do we place our text window in the Book menu? This is an eval. (default: Graphics.boxWidth / 3)
 * 
 * @param Y
 * @type text
 * @default 0
 * @desc Where do we place our text window, relative to the title window? This is an eval. (default: 0)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth * 5/6
 * @option Graphics.boxWidth * 4/5
 * @option Graphics.boxWidth * 3/4
 * @option Graphics.boxWidth * 2/3
 * @option Graphics.boxWidth * 1/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 2/3
 * @desc What is the width of our text window in the Book Menu? This is an eval. (default: Graphics.boxWidth * 2/3)
 *  
 * @param Height
 * @type combo
 * @option Graphics.boxHeight - this._titleWindow.height
 * @option Graphics.boxHeight * 4/6
 * @option Graphics.boxHeight * 5/7
 * @option Graphics.boxHeight * 6/8
 * @default Graphics.boxHeight - this._titleWindow.height
 * @desc What is the height of our text window in the Book Menu? This is an eval. (default: Graphics.boxHeight - this._titleWindow.height)
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the text window in the menu?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the text window in the menu?
 * 
 * @param Book Text Format
 * @type text
 * @default <Wordwrap>%3
 * @desc Format to display book texts. Supported escape codes:
 * %1 - Title  %2 - Category  %3 - Book Text
 * 
 * @param Empty Book Text
 * @type text
 * @default
 * @desc What should we place in the text window when there is no book selected? (default: <blank>)
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 */

//=============================================================================
// JSON File Configuration
//=============================================================================
 /*~struct~JsonConfig:
 * @param Type
 * @type combo
 * @option Localization File
 * @option Dedicated File
 * @default Localization File
 * @desc What kind of JSON file are we dealing with?
 * 
 * @param File
 * @type text
 * @default en.json
 * @desc The path to the JSON file (if using Iavra Localization Core, path to one of the files)
 * 
 * @param Localization Escape Code
 * @type text
 * @default #{{key}}
 * @desc Code used to retrieve localized string by the plugin of choice. "{key}" is a placeholder for the text key.
 * 
 * @param Category List
 * @type text
 * @default library.categories
 * @desc What is the root context to our book category array? This determines category order. (default: library.categories)
 * 
 * @param Root Context Path
 * @type text
 * @default library.books
 * @desc What is the root context path to our book data? (default: library.books)
 * 
 * @param Title Object
 * @type text
 * @default title
 * @desc What is the name of the object within our context containing the book title?
 * 
 * @param Text Object
 * @type text
 * @default text
 * @desc What is the name of the object within our context containing the book text?
 * 
 * @param Category Object
 * @type text
 * @default category
 * @desc What is the name of the object within our context containing the book category index?
 * 
 * @param ID Object
 * @type text
 * @default id
 * @desc What is the name of the object within our context containing the book ID number?
 * 
 * @param Undefined Category
 * @type text
 * @default Unknown
 * @desc What category to use if the book category undefined?
 * 
 */

//=============================================================================
// Detached Background Image Structure
//=============================================================================
/*~struct~DetachedBgConfig:
 * @param Full Background Image
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select an image for a full screen background on detached windows.
 * 
 * @param Single Image
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display through the whole detached window.
 * 
 * @param Multiple Images - Title
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display only at the detached title bar.
 * 
 * @param Multiple Images - Text
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display only at the detached text window.
 * 
 */

//=============================================================================
// Menu Background Image Structure
//=============================================================================
/*~struct~MenuBgConfig:
 * @param Full Background Image
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select an image for a full screen background on menu windows.
 * 
 * @param Single Image
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display through the whole menu window.
 * 
 * @param Multiple Images - Title
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display only at the menu title bar.
 * 
 * @param Multiple Images - Text
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display only at the menu text window.
 * 
 * @param Multiple Images - List
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display only at the menu text window.
 * 
 * @param Single Image - Title / Text
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display only at the detached text window.
 * 
 * @param Single Image - Title / List
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display only at the detached text window.
 * 
 * @param Single Image - Text / List
 * @type file
 * @dir img/pictures/
 * @default
 * @desc Select and image to display only at the detached text window.
 * 
 */

//=============================================================================
// Book Structure
//=============================================================================
 /*~struct~BookStructure:
 * @param Title
 * @type text
 * @default
 * @desc The book title.
 * 
 * @param Text
 * @type note
 * @default
 * @desc The book text.
 * 
 * @param Category
 * @type text
 * @default
 * @desc The book category.
 * 
 * @param Id
 * @type number
 * @default 0
 * @desc This can be used to alter the order of books in the menu list. Leave default to use entry order.
 */

//=============================================================================
// Book Setup
//=============================================================================
 /*~struct~BookSetup:
 * @param Category Order
 * @type text[]
 * @default []
 * @desc This is the category order we should use at the menu list.
 * 
 * @param Books
 * @type struct<BookStructure>[]
 * @default []
 * @desc List of books to make available at your game.
 */

//=============================================================================
// Parameters Setup
//=============================================================================

TAA.bm.Parameters = TAA.bm.Parameters || {};
var Parameters = PluginManager.parameters(TAA.bm.PluginName);

TAA.bm.Parameters.SourceType = Parameters['SourceType'] || 'JSON File';

TAA.bm.Parameters.DetachedTitleWindow = JSON.parse(Parameters['Detached Title Window Config']);
TAA.bm.Parameters.DetachedTextWindow = JSON.parse(Parameters['Detached Text Window Config']);
TAA.bm.Parameters.MenuListWindow = JSON.parse(Parameters['Menu List Window Config']);
TAA.bm.Parameters.MenuTitleWindow = JSON.parse(Parameters['Menu Title Window Config']);
TAA.bm.Parameters.MenuTextWindow = JSON.parse(Parameters['Menu Text Window Config']);
TAA.bm.Parameters.JsonConfig = JSON.parse(Parameters['JSON Config']);
TAA.bm.Parameters.LocalBooks = JSON.parse(Parameters['Plugin Manager Books']);

TAA.bm.Parameters.Menu = {};
TAA.bm.Parameters.Menu.MenuEntry = eval(Parameters['Auto Place Command']) || true;
TAA.bm.Parameters.Menu.ShowMenu = eval(Parameters['Show Menu']) || true;
TAA.bm.Parameters.Menu.EnableMenu = eval(Parameters['Enable Menu']) || true;
TAA.bm.Parameters.Menu.Name = Parameters['Menu Name'];

TAA.bm.Parameters.DetachedBgImages = JSON.parse(Parameters['Detached Background Config']);
TAA.bm.Parameters.MenuBgImages = JSON.parse(Parameters['Menu Background Config']);

TAA.bm.Parameters.DetachedBgImages.Option = eval(Parameters['Detached Background Options']);
TAA.bm.Parameters.MenuBgImages.Option = eval(Parameters['Menu Background Options']);


//=============================================================================
// DataManager
//=============================================================================

TAA.bm.alias.DataManager = TAA.bm.alias.DataManager || {};
TAA.bm.alias.DataManager.createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function(){
    TAA.bm.alias.DataManager.createGameObjects.call(this);
    $dataBooks = new LibraryData();
};

TAA.bm.alias.DataManager.makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function(){
    var contents = TAA.bm.alias.DataManager.makeSaveContents.call(this);
    contents.dataBooks = $dataBooks;
    return contents;
};

TAA.bm.alias.DataManager.extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
    TAA.bm.alias.DataManager.extractSaveContents.call(this, contents);
    $dataBooks = contents.dataBooks;
};

//=============================================================================
// LibraryData
//=============================================================================

var $dataBooks = {};

function LibraryData() {
    this.initialize.apply(this, arguments);
};

LibraryData.prototype.initialize = function(){
    this._source = TAA.bm.Parameters.SourceType;
    this._categoryList = [];
    this._books = {};
    this._bookKeyByCategory = {};
    this._categoryByBookKey = {};
    this._booksRead = this._booksRead || {};
    this._currentBook = undefined;
    if(this._source === 'JSON File')
        this.loadBooksFromFile();
    else
        this.loadBooksFromParameters();
};

LibraryData.prototype.loadBooksFromFile = function() {
    this._bookFile = TAA.bm.Parameters.JsonConfig.File;
    this._bookRootContext = TAA.bm.Parameters.JsonConfig['Root Context Path'];
    this._bookTitleObject = TAA.bm.Parameters.JsonConfig['Title Object'];
    this._bookTextObject = TAA.bm.Parameters.JsonConfig['Text Object'];
    this._bookCategoryObject = TAA.bm.Parameters.JsonConfig['Category Object'];
    this._bookIdObject = TAA.bm.Parameters.JsonConfig['ID Object'];

    this.loadJSON(function(response){
        $dataBooks._books = $dataBooks.seekObject($dataBooks._bookRootContext, response);
        $dataBooks._categoryList = $dataBooks.loadCategoryList($dataBooks.seekObject(TAA.bm.Parameters.JsonConfig['Category List'], response));
        for(var i=0; i < $dataBooks._categoryList.length; i++){
            $dataBooks._booksRead[$dataBooks._categoryList[i]] = $dataBooks._booksRead[$dataBooks._categoryList[i]] || [];
        }

        for(var k in $dataBooks._books){
            var cat = $dataBooks.getBookCategory(k);
            var id = $dataBooks.getBookId(k);

            // creates category subObject
            if(!$dataBooks._bookKeyByCategory[cat]){
                $dataBooks._bookKeyByCategory[cat] = [];
            }

            // Fill in books under categories ordered by Ids, if they exist
            if(id !== undefined && $dataBooks._bookKeyByCategory[cat][id] === undefined){
                if(!$dataBooks._bookKeyByCategory[cat].contains(k))
                    $dataBooks._bookKeyByCategory[cat][id] = k;
            }
            else{
                if(!$dataBooks._bookKeyByCategory[cat].contains(k))
                    $dataBooks._bookKeyByCategory[cat].push(k);
            }

            if(!$dataBooks._categoryByBookKey[k])
                $dataBooks._categoryByBookKey[k] = cat;
        };
    });
};

LibraryData.prototype.loadJSON = function(callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', this._bookFile, true);
    xobj.onload = function() { callback(JSON.parse(xobj.responseText)); };
    xobj.onerror = function() { throw new Error("There was an error loading the file '" + this._bookFile + "."); };
    xobj.send();
};

LibraryData.prototype.seekObject = function(path, data){
    var keys = path.split(/\./);
    var targetData = null;
    keys.forEach(function(k){
        targetData = (targetData === null) ? data[k] : targetData[k];
    });
    return targetData;
};

LibraryData.prototype.loadCategoryList = function(array){
    var returnArray = [];
    if(this._source === 'JSON File'){
        if(TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
            var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
            for(var k=0; k < array.length; k++){
                var keyCode = TAA.bm.Parameters.JsonConfig['Category List'] + "." + k;
                var category = escapeCode.replace(/{key}/, keyCode); 
                returnArray.push(category);
            }
        }
        else{
            returnArray = array;
        }
    }
    else{
        returnArray = TAA.bm.Parameters.LocalBooks['Category Order'].slice();
    }

    return returnArray;
};

LibraryData.prototype.loadBooksFromParameters = function(){
    this._bookFile = undefined;
    this._bookRootContext = undefined;
    this._bookTitleObject = "Title";
    this._bookTextObject = "Text";
    this._bookCategoryObject = "Category";
    this._bookIdObject = "Id";

    this._categoryList = this.loadCategoryList();
    var books = JSON.parse(TAA.bm.Parameters.LocalBooks.Books) || {};
    for(var i=0; i < books.length; i++){
        var b = JSON.parse(books[i]);
        b.Text = JSON.parse(b.Text);
        b.Id = JSON.parse(b.Id);
        var key = b.Title.replace(/[\s\t]+/g, '');
        var category = b.Category;
        var id = b.Id;
        if(this._books[key] !== undefined){
            console.error("Book '" + key + "' seems to be duplicated. We'll be keeping the first record and ditching the double for now, but please make sure Titles are unique.");
        }
        else{
            this._books[key] = b;

            // creates category subObject
            if(!this._bookKeyByCategory[category]){
                this._bookKeyByCategory[category] = [];
                if(!this._booksRead[category])
                    this._booksRead[category] = [];
            }

            // Fill in books under categories ordered by Ids, if they exist
            if(id !== undefined && this._bookKeyByCategory[category][id] === undefined){
                if(!this._bookKeyByCategory[category].contains(key))
                    this._bookKeyByCategory[category][id] = key;
            }
            else{
                if(!this._bookKeyByCategory[category].contains(key))
                    this._bookKeyByCategory[category].push(key);
            }

            if(!this._categoryByBookKey[key])
                this._categoryByBookKey[key] = category;
        }        
    }
};

LibraryData.prototype.readBook = function(bookKey){
    this._currentBook = bookKey;
    var category = this._categoryByBookKey[bookKey];
    if(category === undefined) {
        this._currentBook = undefined;
        return;
    }
    if(!this._booksRead[category].contains(bookKey)){
        this._booksRead[category].push(bookKey);
    }
};

LibraryData.prototype.isBookReady = function(){
    if(this._currentBook === undefined) return false;
    else return true;
}

LibraryData.prototype.getBookTitle = function(book){
    return this.getAttrValue(book, this._bookTitleObject);
};

LibraryData.prototype.getBookText = function(book){
    return this.getAttrValue(book, this._bookTextObject);
};

LibraryData.prototype.getBookCategory = function(book){
    var category = "";
    if(book === undefined) return;
    if(this._books[book][this._bookCategoryObject] !== undefined){
        category = this.getCatAttrValue(book);
    }
    else{
        category = TAA.bm.Parameters.JsonConfig['Undefined Category'];
    }
    return category;
};

LibraryData.prototype.getBookCategoryByIndex = function(index){
    var category = this._categoryList[index] || "undefined";
    return category;
};

LibraryData.prototype.getBookId = function(book){
    if(book === undefined) return;
    var result = $dataBooks._books[book][this._bookIdObject];
    return result;
};

LibraryData.prototype.getCatAttrValue = function(book){
    var result;
    var index = this._books[book][this._bookCategoryObject];
    if(index === undefined) 
        return TAA.bm.Parameters.JsonConfig['Undefined Category'];
    
    if(this._source === 'JSON File'){
        if(TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
            var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
            var keyCode = TAA.bm.Parameters.JsonConfig['Category List'] + "." + index;
            result = escapeCode.replace(/{key}/, keyCode);
        }
        else{
            result = this._categoryList[index];
        }
    }
    else{
        result = index;
    }
    return result;
};

LibraryData.prototype.getCatAttrValueByName = function(categoryName){
    var result = "";
    if(this._source === 'JSON File'){
        if(TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
            var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
            var index = 0;
            var i = 0;
            while(i < this._categoryList.length){
                if(this._categoryList[i] === categoryName){
                    index = i;
                    i += this._categoryList.length;
                }
                i++;
            }
            var keyCode = TAA.bm.Parameters.JsonConfig['Category List'] + "." + index;
            result = escapeCode.replace(/{key}/, keyCode);
        }
        else{
            result = categoryName;
        }
    }
    else{
        result = categoryName;
    }
    return result;
};

LibraryData.prototype.getAttrValue = function(book, value){
    var result;
    if(this._source === 'JSON File' && TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
        var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
        var keyCode = this._bookRootContext + "." + book + "." + value;
        result = escapeCode.replace(/{key}/, keyCode);
    }
    else{
        result = this._books[book][value];
    }
    return result;
};

//=============================================================================
// Game_System
//=============================================================================

TAA.bm.alias.GameSystem = TAA.bm.alias.GameSystem || {};
TAA.bm.alias.GameSystem.initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    TAA.bm.alias.GameSystem.initialize.call(this);
    this.initializeBookLibrary();
};

Game_System.prototype.initializeBookLibrary = function(){
    this._showBookMenu = this._showBookMenu || JSON.parse(TAA.bm.Parameters.Menu.ShowMenu);
    this._enableBookMenu = this._enableBookMenu || JSON.parse(TAA.bm.Parameters.Menu.EnableMenu);
    this._showBookCategories = this._showBookCategories || JSON.parse(TAA.bm.Parameters.MenuListWindow['Show Categories']);
    this._hideUnreadBooks = this._hideUnreadBooks || JSON.parse(TAA.bm.Parameters.MenuListWindow['Hide Unread Books']);
    this._hideTitleBar = eval(TAA.bm.Parameters.DetachedTitleWindow['Hide Title Bar']) || false;
};

Game_System.prototype.isShowBookMenu = function(){
    return this._showBookMenu;
};

Game_System.prototype.setShowBookMenu = function(value){
    this._showBookMenu = value;
};

Game_System.prototype.isBookMenuEnabled = function(){
    return this._enableBookMenu;
};

Game_System.prototype.setEnableBookMenu = function(value){
    this._enableBookMenu = value;
};

Game_System.prototype.isBookCategoriesVisible = function(){
    return this._showBookCategories;
};

Game_System.prototype.setBookCategoriesVisibility = function(value){
    this._showBookCategories = value;
};

Game_System.prototype.isUnreadBooksHidden = function(){
    return this._hideUnreadBooks;
};

Game_System.prototype.setUnreadBooksVisibility = function(value){
    this._hideUnreadBooks = value;
};

Game_System.prototype.isTitleVisible = function(){
    return !this._hideTitleBar;
};

Game_System.prototype.setTitleBarVisibility = function(visible){
    this._hideTitleBar = !visible;
};

Game_System.prototype.readBook = function(bookKey){
    $dataBooks.readBook(bookKey);
    if($dataBooks.isBookReady()){
        SceneManager.push(Scene_Book);
    }
};

Game_System.prototype.getTotalBooks = function(){
    return Object.keys($dataBooks._books).length;
};

Game_System.prototype.getTotalBooksRead = function(){
    var bookCount = 0;
    for(var cat in $dataBooks._booksRead){
        bookCount += $dataBooks._booksRead[cat].length;
    }
    return bookCount;
};

Game_System.prototype.getTotalBooksFromCategory = function(category){
    var cat = $dataBooks.getCatAttrValueByName(category);
    var books = $dataBooks._bookKeyByCategory[cat];
    if(books !== undefined)
        return books.length;
    else
        return 0;
};

Game_System.prototype.getTotalBooksReadFromCategory = function(category){
    var cat = $dataBooks.getCatAttrValueByName(category);
    if($dataBooks._booksRead[cat] === undefined) return 0;
    var books = $dataBooks._booksRead[cat];
    if(books !== undefined)
        return books.length;
    else
        return 0;
};

Game_System.prototype.getBookCategory = function(key){
    return $dataBooks.getBookCategory(key);
};

Game_System.prototype.getBookId = function(key){
    return $dataBooks.getBookId(key);
}

Game_System.prototype.isBookRead = function(key){
    var cat = $dataBooks._categoryByBookKey[key];
    if($dataBooks._booksRead[cat] === undefined) return false;
    if($dataBooks._booksRead[cat].contains(key))
        return true;
    else
        return false;
};

Game_System.prototype.forgetBook = function(key){
    var cat = $dataBooks._categoryByBookKey[key];
    if($dataBooks._booksRead[cat] === undefined) return;
    var index = $dataBooks._booksRead[cat].indexOf(key);
    if(index > -1){
        $dataBooks._booksRead[cat].splice(index, 1);
    }
};

Game_System.prototype.forgetBooksByCategory = function(category){
    var cat = $dataBooks.getCatAttrValueByName(category);
    cat = cat.replace(/[\s\t]+/g, '');
    var i = 0;
    var found = false;
    var keys = Object.keys($dataBooks._booksRead);
    while(i < keys.length && !found){
        var key = keys[i];
        var strippedKey = key.replace(/[\s\t]+/g, '');
        if(cat === strippedKey){
            $dataBooks._booksRead[key] = [];
            found = true;
        }
        i++;
    }
};

Game_System.prototype.learnBook = function(key){
    var cat = $dataBooks._categoryByBookKey[key];
    if($dataBooks._booksRead[cat] === undefined) return;
    if(!$dataBooks._booksRead[cat].contains(key)){
        $dataBooks._booksRead[cat].push(key);
    }
};

Game_System.prototype.learnBooksByCategory = function(category){
    var cat = $dataBooks.getCatAttrValueByName(category);
    cat = cat.replace(/[\s\t]+/g, '');
    var i = 0;
    var found = false;
    var keys = Object.keys($dataBooks._booksRead);
    while(i < keys.length && !found){
        var key = keys[i];
        var strippedKey = key.replace(/[\s\t]+/g, '');
        if(cat === strippedKey){
            $dataBooks._booksRead[key] = $dataBooks._bookKeyByCategory[key].slice();
            found = true;
        }
        i++;
    }
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

TAA.bm.alias.Window_MenuCommand = TAA.bm.alias.Window_MenuCommand || {};
TAA.bm.alias.Window_MenuCommand.addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function(){
    TAA.bm.alias.Window_MenuCommand.addOriginalCommands.call(this);
    if(TAA.bm.Parameters.Menu.MenuEntry && $gameSystem.isShowBookMenu()){
        if(this.findSymbol('books') <= -1){
            var command = TAA.bm.Parameters.Menu.Name;
            var enabled = $gameSystem.isBookMenuEnabled();
            this.addCommand(command, 'books', enabled);
        }
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

TAA.bm.alias.Game_Interpreter = TAA.bm.alias.Game_Interpreter || {};
TAA.bm.alias.Game_Interpreter.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    TAA.bm.alias.Game_Interpreter.pluginCommand.call(this, command, args);
    if(command.toLowerCase() === 'openbookmenu'){
        SceneManager.push(Scene_BookMenu);
    }
    else if(command.toLowerCase() === 'readbook'){
        if(args[0] !== undefined)
            $gameSystem.readBook(args[0]);
    }
    else if(command.toLowerCase() === 'librarydata'){
        this.processBookPluginCommands(args);
    }
};

Game_Interpreter.prototype.processBookPluginCommands = function(args){
    if(args[0].toLowerCase() === 'menu'){
        if(args[1].toLowerCase() === 'hide'){
            $gameSystem.setShowBookMenu(false);
        }
        else if(args[1].toLowerCase() === 'show'){
            $gameSystem.setShowBookMenu(true);
        }
        else if(args[1].toLowerCase() === 'enable'){
            $gameSystem.setEnableBookMenu(true);
        }
        else if(args[1].toLowerCase() === 'disable'){
            $gameSystem.setEnableBookMenu(false);
        }
    }
    else if(args[0].toLowerCase() === 'forget'){
        if(args[1].toLowerCase() === 'book'){
            if(args[2] !== undefined){
                $gameSystem.forgetBook(args[2]);
            }
        }
        else if(args[1].toLowerCase() === 'books'){
            for(var i = 2; i < args.length; i++){
                if(args[i] !== undefined)
                    $gameSystem.forgetBook(args[i]);
            }
        }
        else if(args[1].toLowerCase() === 'category'){
            if(args[2] !== undefined){
                $gameSystem.forgetBooksByCategory(args[2]);
            }
        }
    }
    if(args[0].toLowerCase() === 'learn'){
        if(args[1].toLowerCase() === 'book'){
            if(args[2] !== undefined)
                $gameSystem.learnBook(args[2]);
        }
        else if(args[1].toLowerCase() === 'books'){
            for(var i = 2; i < args.length; i++){
                if(args[i] !== undefined)
                    $gameSystem.learnBook(args[i]);
            }
        }
        else if(args[1].toLowerCase() === 'category'){
            if(args[2] !== undefined){
                $gameSystem.learnBooksByCategory(args[2]);
            }
        }
    }
    else if(args[0].toLowerCase() === 'showcategories'){
        if(args[1].toLowerCase() === 'on'){
            $gameSystem.setBookCategoriesVisibility(true);
        }
        else if(args[1].toLowerCase() === 'off'){
            $gameSystem.setBookCategoriesVisibility(false);
        }
    }
    else if(args[0].toLowerCase() === 'unreadbooks'){
        if(args[1].toLowerCase() === 'hide'){
            $gameSystem.setUnreadBooksVisibility(true);
        }
        else if(args[1].toLowerCase() === 'show'){
            $gameSystem.setUnreadBooksVisibility(false);
        }
    }
    else if(args[0].toLowerCase() === 'titlebar'){
        if(args[1].toLowerCase() === 'hide'){
            $gameSystem.setTitleBarVisibility(false);
        }
        else if(args[1].toLowerCase() === 'show'){
            $gameSystem.setTitleBarVisibility(true);
        }
    }
};

//=============================================================================
// Window_BookList
//=============================================================================

function Window_BookList() {
    this.initialize.apply(this, arguments);
}

Window_BookList.prototype = Object.create(Window_Command.prototype);
Window_BookList.prototype.constructor = Window_BookList;

Window_BookList.prototype.initialize = function(ttlw, txtw) {
    this._titleWindow = ttlw;
    this._textWindow = txtw;
    this._closedBookCategories = [];
    this._closedCategorySymbol = TAA.bm.Parameters.MenuListWindow['Closed Category Symbol'];
    this._openCategorySymbol = TAA.bm.Parameters.MenuListWindow['Opened Category Symbol'];
    this._categoryTextFormat = TAA.bm.Parameters.MenuListWindow['Category Text Format'] || "%1 %2 (%3)";

    var x = eval(TAA.bm.Parameters.MenuListWindow.X) || 0;
    var y = eval(TAA.bm.Parameters.MenuListWindow.Y) || 0;

    Window_Command.prototype.initialize.call(this, x, y);
    
    this.selectLast();
};

Window_BookList._lastCommandSymbol = null;

Window_BookList.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_BookList.prototype.windowWidth = function(){
    if(this._windowWidth === undefined){
        this._windowWidth = Math.round(eval(TAA.bm.Parameters.MenuListWindow.Width)) || Graphics.boxWidth * 1/3;
    }
    return this._windowWidth;
};

Window_BookList.prototype.windowHeight = function(){
    if(this._windowHeight === undefined){
        this._windowHeight = Math.round(eval(TAA.bm.Parameters.MenuListWindow.Height)) || Graphics.boxHeight;
    }
    return this._windowHeight;
};

Window_BookList.prototype.lineHeight = function() {
    if (this._windowLineHeight === undefined)
        this._windowLineHeight = parseInt(TAA.bm.Parameters.MenuListWindow['Line Height']) || 36;
    return this._windowLineHeight;
};

Window_BookList.prototype.standardFontFace = function() {
    if (this._windowFontFace === undefined)
        this._windowFontFace = TAA.bm.Parameters.MenuListWindow['Font Face'];
    return this._windowFontFace;
};
  
Window_BookList.prototype.standardFontSize = function() {
    if (this._windowFontSize === undefined) {
        this._windowFontSize = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Font Size'])) || 20;
    }
    return this._windowFontSize;
};
  
Window_BookList.prototype.standardPadding = function() {
    if (this._windowStandardPadding === undefined)
        this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Standard Padding']));
    return this._windowStandardPadding;
};
  
Window_BookList.prototype.textPadding = function() {
    if (this._windowTextPadding === undefined)
        this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Text Padding']));
    return this._windowTextPadding;
};
  
Window_BookList.prototype.standardBackOpacity = function() {
    if (this._windowBackOpacity === undefined)
        this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Back Opacity']));
    return this._windowBackOpacity;
};

Window_BookList.prototype.numVisibleRows = function() {
    return this.maxItems();
};

Window_BookList.prototype.drawItem = function(index){
    var rect = this.itemRectForText(index);
    var text = this.commandName(index);
    var symbol = this.commandSymbol(index);
    if(symbol === 'category'){
        var align = TAA.bm.Parameters.MenuListWindow["Category Alignment"] || 'left';
    }
    else{
        var align = TAA.bm.Parameters.MenuListWindow["Book Alignment"] || 'left';
        var indent = Math.round(eval(TAA.bm.Parameters.MenuListWindow["Book Indent"])) || 16;
        rect.x += indent;
        rect.width -= indent;
    }
    var wx = this.getAlignedX(text, rect, align);
    this.drawTextEx(text, wx, rect.y);
};

Window_BookList.prototype.getAlignedX = function(text, rect, align){
    var wx = 0;
    var ww = rect.width;
    if(align === 'left'){
        wx = rect.x;
    }
    else if(align === 'center'){
        wx += (ww - this.drawTextEx(text)) / 2;
    }
    else{
        wx += ww - this.drawTextEx(text) - this.textPadding();
    }
    return wx;
};

Window_BookList.prototype.currentExt = function(){
    return this._forcedExt || Window_Command.prototype.currentExt.call(this);
};

Window_BookList.prototype.makeCommandList = function() {
    this.addBookList();
};

Window_BookList.prototype.addBookList = function(){
    var listCategory;
    for(var cat in $dataBooks._bookKeyByCategory){
        var category = this.convertEscapeCharacters(cat);
        if($gameSystem.isBookCategoriesVisible())
            listCategory = true; // ensures category is listed
        else
            listCategory = false; // prevents the category from being listed

        for(var k=0; k < $dataBooks._bookKeyByCategory[cat].length; k++){
            // if the specified id in undefined, skip to the next element
            if($dataBooks._bookKeyByCategory[cat][k] === undefined) 
                continue;

            if(($dataBooks._booksRead[cat] && $dataBooks._booksRead[cat].contains($dataBooks._bookKeyByCategory[cat][k])) || !$gameSystem.isUnreadBooksHidden()){
                if(listCategory){
                    if(this._closedBookCategories.contains(category)){
                        var closed = this._closedCategorySymbol + " ";
                    }
                    else{
                        var closed = this._openCategorySymbol + " ";
                    }

                    if(!$gameSystem.isUnreadBooksHidden()){
                        var bookCount = $dataBooks._bookKeyByCategory[cat].length;
                    }
                    else{
                        var bookCount = $dataBooks._booksRead[cat].length;
                    }

                    var text = this.prepareCategoryText(category, closed, bookCount);

                    this.addCommand(text, 'category', true, category);
                    listCategory = false;
                }

                if(!this._closedBookCategories.contains(category)){
                    var title = this.convertEscapeCharacters($dataBooks.getBookTitle($dataBooks._bookKeyByCategory[cat][k]));
                    if($dataBooks._bookKeyByCategory[cat][k] !== undefined)
                        this.addCommand(title, 'book', true, $dataBooks._bookKeyByCategory[cat][k]);
                }
            }
        }
    }
};

Window_BookList.prototype.prepareCategoryText = function(category, closed, count){
    var text = this._categoryTextFormat.replace(/%1/g, closed);
    text = text.replace(/%2/g, category);
    text = text.replace(/%3/g, count);
    return text;
};

Window_BookList.prototype.selectLast = function() {
    this.selectSymbol(Window_BookList._lastCommandSymbol);
};

Window_BookList.prototype.update = function(){
    Window_Command.prototype.update.call(this);
    if(this._textWindow){
        if(this.currentSymbol() === 'book'){
            this._textWindow.setBook(this.currentExt(), true);
        }
        else{
            this._textWindow.setBook(undefined, true);
        }
    }
    if(this._titleWindow){
        if(this.currentSymbol() === 'book'){
            this._titleWindow.setBook(this.currentExt());
        }
        else{
            this._titleWindow.setBook(undefined);
        }
    }
};

Window_BookList.prototype.categoryToggle = function(category){
    if(this._closedBookCategories.contains(category)){
        var index = this._closedBookCategories.indexOf(category);
        this._closedBookCategories.splice(index, 1);
    }
    else{
        this._closedBookCategories.push(category);
    }
    this.refresh();
};

Window_BookList.prototype.getVisibleRows = function() {
    var value = this.height - (this.standardPadding() * 2);
    value = Math.floor(value / this.lineHeight());
    return value;
};

Window_BookList.prototype.isInsideFrame = function() {
    var x = this.canvasToLocalX(TouchInput._mouseOverX);
    var y = this.canvasToLocalY(TouchInput._mouseOverY);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_BookList.prototype.processWheel = function() {
    if (!this.isInsideFrame()) return;
        var threshold = 20;
    if (TouchInput.wheelY >= threshold) this.scrollDown();
    if (TouchInput.wheelY <= -threshold) this.scrollUp();
};
  
Window_BookList.prototype.loadWindowSkin = function() {
    var windowSkin = TAA.bm.Parameters.MenuListWindow['Window Skin'] || 'Window';
    this.windowSkin = ImageManager.loadSystem(windowSkin);
};

//=============================================================================
// Window_BookTitle
//=============================================================================

function Window_BookTitle() {
    this._isBookScene = arguments[3];
    this._bookKey = undefined;
    this.initialize.apply(this, arguments);
};

Window_BookTitle.prototype = Object.create(Window_Base.prototype);
Window_BookTitle.prototype.constructor = Window_BookTitle;

Window_BookTitle.prototype.initialize = function(x, y, width) {
    if(this._isBookScene)
        var height = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.Height)) || this.fittingHeight(1);
    else
        var height = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow.Height)) || this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.setStandardOpacity();
    this.refresh();
};

Window_BookTitle.prototype.setBook = function(bookKey) {
    if(this._bookKey !== bookKey){
        this._bookKey = bookKey;
        this.refresh();
    }
};
  
Window_BookTitle.prototype.setStandardOpacity = function() {
    if(this._isBookScene)
        var opacity = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Standard Opacity'])) || 255;
    else
        var opacity = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Standard Opacity'])) || 255;
    this.opacity = opacity;
};

Window_BookTitle.prototype.refresh = function() {
    this.contents.clear();
    if(this._isBookScene)
        var align = TAA.bm.Parameters.DetachedTitleWindow['Text Alignment'];
    else
        var align = TAA.bm.Parameters.MenuTitleWindow['Text Alignment'];
    
    if(this._bookKey){
        this.drawBookTitle(align);
    }
    else{
        this.drawEmptyTitle(align);
    }
};

Window_BookTitle.prototype.drawBookTitle = function(align){
    var wx = this.getAlignedX($dataBooks.getBookTitle(this._bookKey), align);
    this.drawTextEx($dataBooks.getBookTitle(this._bookKey), wx, 0);
};

Window_BookTitle.prototype.drawEmptyTitle = function(align){
    var wx = this.getAlignedX(TAA.bm.Parameters.MenuTitleWindow['Empty Title Text'], align);
    this.drawTextEx(TAA.bm.Parameters.MenuTitleWindow['Empty Title Text'], wx, 0);
};

Window_BookTitle.prototype.getAlignedX = function(text, align){
    var wx = 0;
    var ww = this.contents.width;
    if(align === 'left'){
        wx = this.textPadding();
    }
    else if(align === 'center'){
        wx += (ww - this.drawTextEx(text, 0, this.contents.height)) / 2;
    }
    else{
        wx += ww - this.drawTextEx(text) - this.textPadding();
    }
    return wx;
};

Window_BookTitle.prototype.lineHeight = function() {
    if (this._windowLineHeight === undefined) {
        if(this._isBookScene)
            this._windowLineHeight = parseInt(TAA.bm.Parameters.DetachedTitleWindow['Line Height']) || 36;
        else
            this._windowLineHeight = parseInt(TAA.bm.Parameters.MenuTitleWindow['Line Height']) || 36;
    }
    
    return this._windowLineHeight;
};

Window_BookTitle.prototype.standardFontFace = function() {
    if (this._windowFontFace === undefined) {
        if(this._isBookScene)
            this._windowFontFace = TAA.bm.Parameters.DetachedTitleWindow['Font Face'];
        else
            this._windowFontFace = TAA.bm.Parameters.MenuTitleWindow['Font Face'];
    }
    return this._windowFontFace;
};
  
Window_BookTitle.prototype.standardFontSize = function() {
    if (this._windowFontSize === undefined) {
        if(this._isBookScene)
            this._windowFontSize = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Font Size'])) || 20;
        else
            this._windowFontSize = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Font Size'])) || 20;
    }
    return this._windowFontSize;
};
  
Window_BookTitle.prototype.standardPadding = function() {
    if (this._windowStandardPadding === undefined) {
        if(this._isBookScene)
            this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Standard Padding']));
        else
            this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Standard Padding']));
    }
    return this._windowStandardPadding;
};
  
Window_BookTitle.prototype.textPadding = function() {
    if (this._windowTextPadding === undefined) {
        if(this._isBookScene)
            this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Text Padding']));
        else
            this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Text Padding']));
    }
    return this._windowTextPadding;
};
  
Window_BookTitle.prototype.standardBackOpacity = function() {
    if (this._windowBackOpacity === undefined) {
        if(this._isBookScene)
            this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Back Opacity']));
        else
            this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Back Opacity']));
    }
    return this._windowBackOpacity;
};
  
Window_BookTitle.prototype.loadWindowSkin = function() {
    if(this._isBookScene)
        var windowSkin = TAA.bm.Parameters.DetachedTitleWindow['Window Skin'] || 'Window';
    else
        var windowSkin = TAA.bm.Parameters.MenuTitleWindow['Window Skin'] || 'Window';
    this.windowSkin = ImageManager.loadSystem(windowSkin);
};


//=============================================================================
// Window_BookText
//=============================================================================

function Window_BookText() {
    this._isBookScene = arguments[4];
    this._bookKey = undefined;
    this.initialize.apply(this, arguments);
};

Window_BookText.prototype = Object.create(Window_Selectable.prototype);
Window_BookText.prototype.constructor = Window_BookText;

Window_BookText.prototype.initialize = function(x, y, width, height) {
    this._freezeFrames = 0;
    this._allTextHeight = 0;
    if(this._isBookScene)
        this._bookTextFormat = TAA.bm.Parameters.DetachedTextWindow['Book Text Format'] || "<Wordwrap>%3";
    else
        this._bookTextFormat = TAA.bm.Parameters.MenuTextWindow['Book Text Format'] || "<Wordwrap>%3";
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_BookText.prototype.windowWidth = function(){
    return this._windowWidth;
};

Window_BookText.prototype.windowHeight = function() {
    return this._windowHeight;
};

Window_BookText.prototype.standardFontFace = function() {
    if (this._windowFontFace === undefined) {
        if(this._isBookScene)
            this._windowFontFace = TAA.bm.Parameters.DetachedTextWindow['Font Face'];
        else
            this._windowFontFace = TAA.bm.Parameters.MenuTextWindow['Font Face'];
    }
    return this._windowFontFace;
};
  
Window_BookText.prototype.standardFontSize = function() {
    if (this._windowFontSize === undefined) {
        if(this._isBookScene)
            this._windowFontSize = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Font Size']));
        else
            this._windowFontSize = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Font Size']));
    }
    return this._windowFontSize;
};

Window_BookText.prototype.delayLoadFrames = function() {
    this._delayLoad = 30;
    return this._delayLoad;
};

Window_BookText.prototype.setBook = function(book, delay){
    if(this._bookKey !== book){
        this._bookKey = book;
        if(delay)
            this._freezeFrames = 30;
        this.refresh();
    }
};
  
Window_BookText.prototype.setStandardOpacity = function() {
    if(this._isBookScene)
        var opacity = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Standard Opacity'])) || 255;
    else
        var opacity = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Standard Opacity'])) || 255;
    this.opacity = opacity;
};

Window_BookText.prototype.refresh = function() {
    if(this._freezeFrames > 0)
        return;
    this.contents.clear();
    this._lastOriginY = -200;
    this.origin.y = 0;
    this._allTextHeight = 0;
    if(this._bookKey && this._bookKey !== ""){
        var book = this.prepareBookText(this._bookKey);
        this.setupTextState(book);
        this.drawBookTextEx(book, 0, 0);
    }
    else{
        this.drawEmptyBook();
    }
};

Window_BookText.prototype.prepareBookText = function(bookKey){
    var text = this._bookTextFormat.replace(/%1/g, $dataBooks.getBookTitle(bookKey));
    text = text.replace(/%2/g, $dataBooks.getBookCategory(bookKey));
    text = text.replace(/%3/g, $dataBooks.getBookText(bookKey));
    return text;
};

Window_BookText.prototype.drawEmptyBook = function(){
    var text = TAA.bm.Parameters.MenuTextWindow['Empty Book Text'] || "";
    var textState = this.setupTextState(text);
    this.drawBookTextEx(textState.originalText, 0, 0);
};

Window_BookText.prototype.drawBookTextEx = function(text, x, y){
    if(text){
        var textState = { 
            index: 0,
            x: x,
            y: y,
            left: x };
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

Window_BookText.prototype.setupTextState = function(text){
    var textState = { index: 0 };
    textState.originalText = text;
    textState.text = this.convertEscapeCharacters(text);
    this.resetFontSettings();
    this._allTextHeight = this.calcTextHeight(textState, true)*10;
    this.createContents();
    return textState;
};

Window_BookText.prototype.replaceCharAt = function(text, replacement, index){
    return text.substr(0, index) + replacement + text.substr(index+1);
};

Window_BookText.prototype.select = function(index) {
};

Window_BookText.prototype.contentsHeight = function(){
    var standard = this.height - 2 * this.standardPadding();
    return Math.max(standard, this._allTextHeight);
}

Window_BookText.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    if(this._freezeFrames > 0){
        this._freezeFrames -= 1;
        if(this._freezeFrames <= 0)
            this.refresh();
    }
    if (this.isOpenAndActive()) this.updateKeyScrolling();
};

Window_BookText.prototype.lineHeight = function() {
    if (this._windowLineHeight === undefined) {
        if(this._isBookScene)
            this._windowLineHeight = parseInt(TAA.bm.Parameters.DetachedTextWindow['Line Height']) || 36;
        else
            this._windowLineHeight = parseInt(TAA.bm.Parameters.MenuTextWindow['Line Height']) || 36;
    }
    
    return this._windowLineHeight;
};
  
Window_BookText.prototype.standardPadding = function() {
    if (this._windowStandardPadding === undefined) {
        if(this._isBookScene)
            this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Standard Padding']));
        else
            this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Standard Padding']));
    }
    return this._windowStandardPadding;
};
  
Window_BookText.prototype.textPadding = function() {
    if (this._windowTextPadding === undefined) {
        if(this._isBookScene)
            this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Text Padding']));
        else
            this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Text Padding']));
    }
    return this._windowTextPadding;
};
  
Window_BookText.prototype.standardBackOpacity = function() {
    if (this._windowBackOpacity === undefined) {
        if(this._isBookScene)
            this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Back Opacity']));
        else
            this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Back Opacity']));
    }
    return this._windowBackOpacity;
};
  
Window_BookText.prototype.loadWindowSkin = function() {
    if(this._isBookScene)
        var windowSkin = TAA.bm.Parameters.DetachedTextWindow['Window Skin'] || 'Window';
    else
        var windowSkin = TAA.bm.Parameters.MenuTextWindow['Window Skin'] || 'Window';
    this.windowSkin = ImageManager.loadSystem(windowSkin);
};

Window_BookText.prototype.scrollSpeed = function() {
    this._scrollSpeed = 4;
    return 4;
};

Window_BookText.prototype.scrollOriginDown = function(speed) {
    var value = this.contentsHeight() - this.height + 2 * this.standardPadding();
    this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_BookText.prototype.scrollOriginUp = function(speed) {
     this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_BookText.prototype.updateKeyScrolling = function() {
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

Window_BookText.prototype.updateArrows = function() {
    if (this._lastOriginY === this.origin.y) return;
    this.showArrows();
};

Window_BookText.prototype.showArrows = function() {
    this._lastOriginY = this.origin.y;
    this.upArrowVisible = this.origin.y !== 0;
    this.downArrowVisible = this.origin.y !== this.contentsHeight() -
    this.height + 2 * this.standardPadding();;
};

Window_BookText.prototype.hideArrows = function() {
    this.upArrowVisible = false;
    this.downArrowVisible = false;
};

Window_BookText.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_BookText.prototype.processWheel = function() {
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
// Scene_Book
//=============================================================================

function Scene_Book() {
    this.initialize.apply(this, arguments);
}

Scene_Book.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Book.prototype.constructor = Scene_Book;

Scene_Book.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Book.prototype.create = function() {
    this.createTitleWindow();
    this.createTextWindow();
    Scene_MenuBase.prototype.create.call(this);
    this.addWindows();
};

Scene_Book.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};

Scene_Book.prototype.addWindows = function(){
    if($gameSystem.isTitleVisible())
        this.addWindow(this._titleWindow);
    this.addWindow(this._textWindow);
    this._textWindow.activate();
};

Scene_Book.prototype.createTitleWindow = function(){
    var x = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.X));
    var y = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.Y));
    var width = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.Width)) || Graphics.boxWidth;
    this._titleWindow = new Window_BookTitle(x, y, width, true);
    this._titleWindow.setBook($dataBooks._currentBook);
};

Scene_Book.prototype.createTextWindow = function(){
    var x = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow.X));
    var y = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.Y) + this._titleWindow.height);
    var width = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow.Width)) || Graphics.boxWidth;
    var height = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow.Height)) || Graphics.boxHeight;
    this._textWindow = new Window_BookText(x, y, width, height, true);
    this._textWindow.setHandler('cancel', this.onTextCancel.bind(this));
    this._textWindow.setBook($dataBooks._currentBook, false);
};

Scene_Book.prototype.onTextCancel = function(){
    this._titleWindow._bookKey = undefined;
    this._textWindow._bookKey = undefined;
    this._textWindow.deactivate();
    SoundManager.playCancel();
    this.popScene();
};

// Background image functions
Scene_Book.prototype.createBackground = function(){
    var op = TAA.bm.Parameters.DetachedBgImages.Option;
    if(op === undefined) op = 1;
    if(op & 1){
        Scene_MenuBase.prototype.createBackground.call(this);
    }
    if(op & 2){
        this.createFullBackground();
    }
    if(op & 4){
        this.createMultiBgImages();
    }
    if(op & 8){
        this.createSingleBgImage();
    }
};

Scene_Book.prototype.createFullBackground = function(){
    var imgFile = TAA.bm.Parameters.DetachedBgImages["Full Background Image"];
    if(imgFile !== undefined && imgFile !== ""){
        this._backgroundImage = new TilingSprite();
        this._backgroundImage.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._backgroundImage.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._backgroundImage);
    }
};

Scene_Book.prototype.createMultiBgImages = function(){
    var ttlImgFile = TAA.bm.Parameters.DetachedBgImages["Multiple Images - Title"];
    var txtImgFile = TAA.bm.Parameters.DetachedBgImages["Multiple Images - Text"];
    if(ttlImgFile !== undefined && ttlImgFile !== ""){
        this.createTitleBackground(ttlImgFile);
    }
    if(txtImgFile !== undefined && txtImgFile !== ""){
        this.createTextBackground(txtImgFile);
    }
};

Scene_Book.prototype.createSingleBgImage = function(){
    var imgFile = TAA.bm.Parameters.DetachedBgImages["Single Image"];
    if(imgFile !== undefined && imgFile !== ""){
        var x = this._titleWindow.x;
        var y = this._titleWindow.y;
        var width = this._titleWindow.width;
        var height = this._titleWindow.height + this._textWindow.height;

        this._windowBackground = new TilingSprite();
        this._windowBackground.move(x, y, width, height);
        this._windowBackground.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._windowBackground);
    }
};

Scene_Book.prototype.createTitleBackground = function(imgFile){
    var window = this._titleWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._titleBackground = new TilingSprite();
    this._titleBackground.move(x, y, width, height);
    this._titleBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._titleBackground);
};

Scene_Book.prototype.createTextBackground = function(imgFile){
    var window = this._textWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._textBackground = new TilingSprite();
    this._textBackground.move(x, y, width, height);
    this._textBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._textBackground);
};

//=============================================================================
// Scene_BookMenu
//=============================================================================

function Scene_BookMenu() {
    this.initialize.apply(this, arguments);
}

Scene_BookMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_BookMenu.prototype.constructor = Scene_BookMenu;

Scene_BookMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_BookMenu.prototype.create = function() {
    this.createTitleWindow();
    this.createTextWindow();
    this.createListWindow();
    Scene_MenuBase.prototype.create.call(this);
    this.addWindows();
};

Scene_BookMenu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};

Scene_BookMenu.prototype.addWindows = function(){
    this.addWindow(this._titleWindow);
    this.addWindow(this._textWindow);
    this.addWindow(this._listWindow);
};

Scene_BookMenu.prototype.createTitleWindow = function(){
    var x = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow.X)) || Math.round(Graphics.boxWidth/3);
    var y = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow.Y)) || 0;
    var width = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow.Width)) || Math.round(Graphics.boxWidth * 4/6);
    this._titleWindow = new Window_BookTitle(x, y, width, false);
};

Scene_BookMenu.prototype.createTextWindow = function(){
    var x = Math.round(eval(TAA.bm.Parameters.MenuTextWindow.X)) || Math.round(Graphics.boxWidth / 3);
    var y = Math.round(eval(TAA.bm.Parameters.MenuTextWindow.Y)) ||this._titleWindow.height;
    var width = Math.round(eval(TAA.bm.Parameters.MenuTextWindow.Width)) || Math.round(Graphics.boxWidth * 2/3);
    var height = Math.round(eval(TAA.bm.Parameters.MenuTextWindow.Height)) || Graphics.boxHeight - this._titleWindow.height;
    this._textWindow = new Window_BookText(x, y, width, height, false);
    this._textWindow.setHandler('cancel', this.onTextCancel.bind(this));
};

Scene_BookMenu.prototype.createListWindow = function(){
    this._listWindow = new Window_BookList(this._titleWindow, this._textWindow);
    this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
    this._listWindow.setHandler('category', this.onListCategoryToggle.bind(this));
    this._listWindow.setHandler('book', this.onListBook.bind(this));
    this._listWindow.setHandler('readBook', this.textWindowActivate.bind(this));
};

Scene_BookMenu.prototype.onListCancel = function(){
    this._titleWindow._bookKey = undefined;
    this._textWindow._bookKey = undefined;
    this.popScene();
};

Scene_BookMenu.prototype.onListCategoryToggle = function(){
    this._listWindow.activate();
    this._listWindow.categoryToggle(this._listWindow.currentExt());
};

Scene_BookMenu.prototype.onListBook = function(){
    this.textWindowActivate();
};

Scene_BookMenu.prototype.textWindowActivate = function(){
    this._textWindow.activate();
};

Scene_BookMenu.prototype.onTextCancel = function(){
    this._textWindow.deactivate();
    this._listWindow.activate();
};


// Background image functions
Scene_BookMenu.prototype.createBackground = function(){
    var op = TAA.bm.Parameters.MenuBgImages.Option;
    if(op === undefined) op = 1;
    if(op & 1){
        Scene_MenuBase.prototype.createBackground.call(this);
    }
    if(op & 2){
        this.createFullBackground();
    }
    if(op & 4){
        this.createBgImagesSinglePlusList();
    }
    if(op & 8){
        this.createBgImagesSinglePlusTitle();
    }
    if(op & 16){
        this.createBgImagesSinglePlusText();
    }
    if(op & 32){
        this.createMultiBgImages();
    }
    if(op & 64){
        this.createSingleBgImage();
    }
};

Scene_BookMenu.prototype.createFullBackground = function(){
    var imgFile = TAA.bm.Parameters.MenuBgImages["Full Background Image"];
    if(imgFile !== undefined && imgFile !== ""){
        this._backgroundImage = new TilingSprite();
        this._backgroundImage.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._backgroundImage.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._backgroundImage);
    }
};

Scene_BookMenu.prototype.createBgImagesSinglePlusList = function(){
    var imgFile = TAA.bm.Parameters.MenuBgImages["Single Image - Title / Text"];
    var listImg = TAA.bm.Parameters.MenuBgImages["Multiple Images - List"];
    if(imgFile !== undefined && imgFile !== ""){
        var x = this._titleWindow.x;
        var y = this._titleWindow.y;
        var width = Math.min(this._titleWindow.width, this._textWindow.width);
        var height = this._titleWindow.height + this._textWindow.height;

        this._titleTextBackground = new TilingSprite();
        this._titleTextBackground.move(x, y, width, height);
        this._titleTextBackground.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._titleTextBackground);
    }
    if(listImg !== undefined && listImg !== ""){
        this.createListBackground(listImg);
    }
};

Scene_BookMenu.prototype.createBgImagesSinglePlusTitle = function(){
    var imgFile = TAA.bm.Parameters.MenuBgImages["Single Image - Text / List"];
    var titleImg = TAA.bm.Parameters.MenuBgImages["Multiple Images - Title"];
    if(imgFile !== undefined && imgFile !== ""){
        var x = this._listWindow.x;
        var y = this._listWindow.y;
        var width = this._listWindow.width + this._textWindow.width;
        var height = Math.max(this._listWindow.height, this._textWindow.height);

        this._textListBackground = new TilingSprite();
        this._textListBackground.move(x, y, width, height);
        this._textListBackground.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._textListBackground);
    }
    if(titleImg !== undefined && titleImg !== ""){
        this.createTitleBackground(titleImg);
    }
};

Scene_BookMenu.prototype.createBgImagesSinglePlusText = function(){
    var imgFile = TAA.bm.Parameters.MenuBgImages["Single Image - Title / List"];
    var textImg = TAA.bm.Parameters.MenuBgImages["Multiple Images - Text"];
    if(imgFile !== undefined && imgFile !== ""){
        var x = Math.min(this._titleWindow.x, this._listWindow.x);
        var y = Math.min(this._titleWindow.y, this._listWindow.y);
        if(this._titleWindow.width === this._listWindow.width)
            var width = this._titleWindow.width;
        else
            var width = Math.min(this._titleWindow.width + this._listWindow.width, Graphics.boxWidth);
        var height = Math.min(this._titleWindow.height + this._listWindow.height, Graphics.boxHeight);

        this._titleListBackground = new TilingSprite();
        this._titleListBackground.move(x, y, width, height);
        this._titleListBackground.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._titleListBackground);
    }
    if(textImg !== undefined && textImg !== ""){
        this.createTextBackground(textImg);
    }
};

Scene_BookMenu.prototype.createMultiBgImages = function(){
    var ttlImgFile = TAA.bm.Parameters.MenuBgImages["Multiple Images - Title"];
    var txtImgFile = TAA.bm.Parameters.MenuBgImages["Multiple Images - Text"];
    var lstImgFile = TAA.bm.Parameters.MenuBgImages["Multiple Images - List"];
    if(ttlImgFile !== undefined && ttlImgFile !== ""){
        this.createTitleBackground(ttlImgFile);
    }
    if(txtImgFile !== undefined && txtImgFile !== ""){
        this.createTextBackground(txtImgFile);
    }
    if(lstImgFile !== undefined && lstImgFile !== ""){
        this.createListBackground(lstImgFile);
    }
};

Scene_BookMenu.prototype.createSingleBgImage = function(){
    var imgFile = TAA.bm.Parameters.MenuBgImages["Single Image"];
    if(imgFile !== undefined && imgFile !== ""){
        var x = Math.min(this._titleWindow.x, this._listWindow.x);
        var y = Math.min(this._titleWindow.y, this._listWindow.y);
        var width = this._listWindow.width + this._textWindow.width;
        if(this._titleWindow.y < this._listWindow.y){
            var height = this._titleWindow.height + this._textWindow.height;    
        }
        else{
            var height = this._listWindow.height;
        }

        this._windowBackground = new TilingSprite();
        this._windowBackground.move(x, y, width, height);
        this._windowBackground.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._windowBackground);
    }
};

Scene_BookMenu.prototype.createTitleBackground = function(imgFile){
    var window = this._titleWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._titleBackground = new TilingSprite();
    this._titleBackground.move(x, y, width, height);
    this._titleBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._titleBackground);
};

Scene_BookMenu.prototype.createTextBackground = function(imgFile){
    var window = this._textWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._textBackground = new TilingSprite();
    this._textBackground.move(x, y, width, height);
    this._textBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._textBackground);
};

Scene_BookMenu.prototype.createListBackground = function(imgFile){
    var window = this._listWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._listBackground = new TilingSprite();
    this._listBackground.move(x, y, width, height);
    this._listBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._listBackground);
};

//=============================================================================
// Scene_Menu
//=============================================================================

TAA.bm.alias.SceneMenu = TAA.bm.alias.SceneMenu || {};
TAA.bm.alias.SceneMenu.createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function(){
    TAA.bm.alias.SceneMenu.createCommandWindow.call(this);
    this._commandWindow.setHandler('books', this.commandBook.bind(this));
};

Scene_Menu.prototype.commandBook = function(){
    SceneManager.push(Scene_BookMenu);
};


//=============================================================================
// Utils
//=============================================================================

TAA.bm.alias.TouchInput = TAA.bm.alias.TouchInput || {};
TAA.bm.alias.TouchInput.onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event){
    TAA.bm.alias.TouchInput.onMouseMove.call(this, event);
    this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
    this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};