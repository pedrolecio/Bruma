"use strict";
//=============================================================================
// EIS Librarium.js
//=============================================================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*:
/*
* @author Kino
* @plugindesc A plugin that allow you to work with books in game.
*
* @param File Name
* @desc The name of the file that holds all of your book files.
* Should be in your data folder with a ".json" extension.
* @default Librarium
*
* @param Include Background Image
* @desc To Include background image, or not. The background image
* should be in your picture folder.
* @default F
*
* @param Background Image
* @desc The background image of the book scene
* (should placed be in your pictures folder)
* @default Translucent
*
* @param categories
* @desc Categories of books in your library.
* @text Categories
* @type text[]
*
* @param books
* @desc List of books for your library.
* @text Library Books
* @type struct<Book>[]
* @default []
*
* @help
* Version 1.2.5
* ChangeLog
* - New function that allows you to add books to the scene as game progresses.
* - Improved Rendering speed by reducing uneccessary calls.
* - Add categories
* - Fixed search issue.
* - Support multiple languages.
* - Small bug fixes.
* - Add support for languages without spaces (Japanese).
* - Fix book selection issues
* - Removed small window at the bottom of book scenes
* - New Book parameter; you don't need to write directly into
*   a JSON file or use the EISLibrarium Writer. Simply use this parameter.
*
//=============================================================================
// Introduction
//=============================================================================
* This plugin was designed so that developers can have books in their game. It's
* the spiritual successor to KRBook plugin.
*
* The books in this plugin are designed to be useful and easy
* to handle / create.
* Furthermore, this plugin supports text codes, improved word wrapping, and
* graphical backgrounds.
*
//=============================================================================
// Script Calls
//=============================================================================
*
* SceneManager.startBookScene("title"")
* This script call will open the book scene, so that players can view a book
* of your choice. You need to pass the title of your book in quotes.
* Example:
* SceneManager.startBookScene("lilia");
* Titles are not case sensitive.
*
* SceneManager.startBookListScene()
* Shows a list of all books currently available.
*
* SceneManager.startCategorizedScene(categories)
* Starts a scene with the respective categories
* Example: SceneManager.startCategorizedScene(['general', 'new]);
* The categorized book list scene would start with both general
* and new books in the scene.
*
* SceneManager.startBookListAvailableScene()
* Starts a scene with the books that are available.
* Shows a list of all books currently available currently in-game.
*
* Librarium.getBookContents("title");
* This script call will return the book contents, which you can store in a
* variable for example.
* Example:
* Librarium.getBookContents("lilia");
*
* Librarium.showInMessageWindow("title"")
* Shows the book contents in the message window used for showText commands.
* The text doesn't have word wrapping like the scene, so you'll need a plugin
* that supports word wrapping. (Yanfly)
* Example:
* Librarium.showInMessageWindow("lilia");
*
* Librarium.addBookAvailable("title");
* This script call will add the book to the available list of books.
* Example: Librarium.addBookAvailable("lilia")
* This would add the book "lilia" to the available list in the Available Scene.
*
//=============================================================================
//  Plugin Commands
//=============================================================================
*
* sceneBook
* Opens up a single book within the scene
* Example: sceneBook Lilia
* Opens up the book with the name Lilia.
*
* sceneBookList
* Starts a scene with all the books available in the game.
*
* sceneBookCategorized
* Opens up a scene with the books of a specific category available
* Example: sceneBookCategorized general new
* This example would open all the books in the general and new categories.
*
//=============================================================================
//  Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Website Link: http://endlessillusoft.com/
* Twitter Link: https://twitter.com/EISKino
* Patreon Link: https://www.patreon.com/EISKino
*
* Hope this plugin helps, and enjoy!
* --Kino
*/
/*~struct~Book:
*
* @param title
* @text Book Title
* @default Book Title
*
* @param category
* @text Category
* @default general
*
* @param pages
* @text Book Pages
* @type note[]
*
*/
/*~struct~Page:
* @param pageText
* @desc The page text.
* @type note
*
*/
var Librarium = {};
(function ($) {
    'use strict';
    function Setup($) {
        //=============================================================================
        //  Params
        //=============================================================================
        var params = PluginManager.parameters("EISLibrarium");
        var LibrariumParams = {
            fileName: String(params['File Name']),
            includeBackground: String(params['Include Background Image']),
            backgroundName: String(params['Background Image']),
            categories: amryl.safeParse(params['categories']),
            books: amryl.parseParams(JSON.parse(params['books']))
        };
        try {
            LibrariumParams.books = LibrariumParams.books['map'](convertToBook);
        }
        catch (err) {
            console.error(err);
        }
        //=============================================================================
        //	LibrariumInitializer
        //=============================================================================
        var LibrariumInitializer = /** @class */ (function () {
            function LibrariumInitializer() {
            }
            LibrariumInitializer.initialize = function () {
                this.prepareLibrarium();
            };
            LibrariumInitializer.prepareLibrarium = function () {
                if (LibrariumParams.books.length < 1)
                    Librarium.bookList = LibrariumFS.readLibraryFile();
                else
                    Librarium.bookList = LibrariumParams.books;
                Librarium.bookListAvail = Librarium.bookList.map(function (book) {
                    book['available'] = false;
                    return book;
                });
            };
            return LibrariumInitializer;
        }());
        //=============================================================================
        //	LibrariumFS
        //=============================================================================
        var LibrariumFS = KR.FS;
        LibrariumFS.readLibraryFile = function () {
            var fileData = null;
            var path = "/data/" + LibrariumParams.fileName + ".json";
            path = this.createPath(path);
            return this.readJson(LibrariumParams.fileName);
        };
        //=============================================================================
        //	Librarian
        //=============================================================================
        var Librarian = /** @class */ (function () {
            function Librarian() {
            }
            Librarian.setCurrrentBook = function (title) {
                this.pageNumber = 1;
                this.currentBook = this.getBook(title);
            };
            Librarian.getBook = function (title) {
                var titleRe = new RegExp(title, 'ig');
                var libraryBook = null;
                var bookList = Librarium.bookList.filter(function (book) {
                    return titleRe.test(book.title);
                });
                libraryBook =
                    this.getDirectMatch(title, bookList) === null
                        ? this.getCloseMatch(title, bookList)
                        : this.getDirectMatch(title, bookList);
                return libraryBook;
            };
            Librarian.getBookAvailable = function (title) {
                var titleRe = new RegExp(title, 'ig');
                var libraryBook = null;
                var bookList = Librarium.bookListAvail.filter(function (book) {
                    return titleRe.test(book.title);
                });
                libraryBook =
                    this.getDirectMatch(title, bookList) === null
                        ? this.getCloseMatch(title, bookList)
                        : this.getDirectMatch(title, bookList);
                return libraryBook;
            };
            Librarian.getDirectMatch = function (title, bookList) {
                var match = bookList
                    .filter(function (book) { return title.trim().length === book.title.trim().length; });
                if (match.length === 0)
                    return null;
                else
                    return match[0];
            };
            Librarian.getCloseMatch = function (title, bookList) {
                var match = bookList
                    .filter(function (book) { return title.trim().length < book.title.trim().length; });
                if (match.length === 0)
                    return null;
                else
                    return match[0];
            };
            Librarian.getCurrentBook = function () {
                return this.currentBook;
            };
            Librarian.getCurrentBookPageText = function () {
                return this.currentBook.pages[this.pageNumber - 1].pageText;
            };
            Librarian.getPageNumber = function () {
                return this.pageNumber;
            };
            Librarian.nextPage = function () {
                this.pageNumber++;
            };
            Librarian.prevPage = function () {
                this.pageNumber--;
            };
            Librarian.getBookContents = function (title) {
                var book = this.getBook(title);
                var bookContents = "";
                for (var i = 0; i < book.pages.length; i++) {
                    bookContents += book.pages[i].pageText;
                }
                return bookContents;
            };
            Librarian.addBookSet = function (index, array) {
                this.booksets[index] = array;
            };
            Librarian.addLineSet = function (index, array) {
                this.linesets[index] = array;
            };
            return Librarian;
        }());
        Librarian.currentBook = null;
        Librarian.pageNumber = 1;
        Librarian.booksets = [];
        Librarian.linesets = [];
        //=============================================================================
        //	Librarium
        //=============================================================================
        var Librarium = {
            bookList: [],
            bookListAvail: []
        };
        var IndexWatcher = amryl.createEventEmitter();
        //=============================================================================
        //  Scene_Title
        //=============================================================================
        var _SceneTitle_start = Scene_Title.prototype.start;
        Scene_Title.prototype.start = function () {
            _SceneTitle_start.call(this);
            Librarium.bookListAvail = Librarium.bookList.map(function (book) {
                book['available'] = false;
                return book;
            });
        };
        //=============================================================================
        //	Scene_Book
        //=============================================================================
        var Scene_Book = /** @class */ (function (_super) {
            __extends(Scene_Book, _super);
            function Scene_Book() {
                return _super.call(this) || this;
            }
            Scene_Book.prototype.create = function () {
                if (/T/ig.test(LibrariumParams.includeBackground))
                    this.createBackground();
                this.createWindowLayer();
                LayoutCreator.createDefaultLayout(this);
            };
            Scene_Book.prototype.createBackground = function () {
                this._bookBackSprite = new Sprite();
                this._bookBackSprite.bitmap =
                    ImageManager.loadPicture(LibrariumParams.backgroundName);
                this.addChild(this._bookBackSprite);
            };
            Scene_Book.prototype.update = function () {
                _super.prototype.update.call(this);
                this.processSceneExit();
                this.processControls();
            };
            Scene_Book.prototype.processControls = function () {
                var book = Librarian.getCurrentBook();
                if (book !== null && book !== undefined) {
                    var pageNumber = 0;
                    if (Input.isTriggered('right')) {
                        if (Librarian.getPageNumber() < book.pages.length) {
                            Librarian.nextPage();
                            this['_windowContent'].refresh();
                        }
                    }
                    if (Input.isTriggered('left')) {
                        if (Librarian.getPageNumber() > 1) {
                            Librarian.prevPage();
                            this['_windowContent'].refresh();
                        }
                    }
                }
            };
            Scene_Book.prototype.processSceneExit = function () {
                if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
                    this.popScene();
                }
            };
            return Scene_Book;
        }(Scene_Base));
        //=============================================================================
        //   Scene_BookList                                                           
        //=============================================================================
        var Scene_BookList = /** @class */ (function (_super) {
            __extends(Scene_BookList, _super);
            function Scene_BookList() {
                return _super.call(this) || this;
            }
            Scene_BookList.prototype.create = function () {
                var _this = this;
                if (/T/ig.test(LibrariumParams.includeBackground))
                    this.createBackground();
                this.createWindowLayer();
                LayoutCreator.createBookListLayout(this);
                IndexWatcher.on("newSelection", function () {
                    var index = _this._bookListWindow.index();
                    Librarian.setCurrrentBook(Librarium.bookList[index].title);
                    _this._titleWindow.updateTitle();
                    _this._windowContent.updateBook();
                    _this._windowContent.refresh();
                });
            };
            Scene_BookList.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            Scene_BookList.prototype.selectBook = function () {
                this._bookListWindow.deactivate();
                var index = this._bookListWindow.index();
                Librarian.setCurrrentBook(Librarium.bookList[index].title);
                this._titleWindow.updateTitle();
                this._windowContent.updateBook();
                this._windowContent.activate();
            };
            Scene_BookList.prototype.returnToSelection = function () {
                this._bookListWindow.activate();
            };
            Scene_BookList.prototype.processControls = function () {
                var book = Librarian.getCurrentBook();
                if (book !== null && book !== undefined) {
                    var pageNumber = 0;
                    if (Input.isTriggered('right') && this._windowContent.active) {
                        if (Librarian.getPageNumber() < book.pages.length) {
                            Librarian.nextPage();
                            this['_windowContent'].refresh();
                        }
                    }
                    if (Input.isTriggered('left') && this._windowContent.active) {
                        if (Librarian.getPageNumber() > 1) {
                            Librarian.prevPage();
                            this['_windowContent'].refresh();
                        }
                    }
                }
                if ((Input.isTriggered('cancel') || TouchInput.isCancelled())
                    && this._windowContent.active) {
                    this._windowContent.deactivate();
                    this._bookListWindow.activate();
                }
            };
            Scene_BookList.prototype.processSceneExit = function () {
                if ((Input.isTriggered('cancel')
                    || TouchInput.isCancelled()) && this._bookListWindow.active) {
                    this.popScene();
                }
            };
            return Scene_BookList;
        }(Scene_Book));
        //=============================================================================
        //  Scene_BookListData
        //=============================================================================
        var Scene_BookListData = /** @class */ (function (_super) {
            __extends(Scene_BookListData, _super);
            function Scene_BookListData(books) {
                var _this = _super.call(this) || this;
                _this._books = books;
                return _this;
            }
            Scene_BookListData.prototype.create = function () {
                var _this = this;
                if (/T/ig.test(LibrariumParams.includeBackground))
                    this.createBackground();
                this.createWindowLayer();
                LayoutCreator.createBookListLayout(this);
                this.processBooksAvailable();
                IndexWatcher.on("newSelection", function () {
                    var index = _this._bookListWindow.index();
                    Librarian.setCurrrentBook(Librarium.bookList[index].title);
                    _this._titleWindow.updateTitle();
                    _this._windowContent.updateBook();
                    _this._windowContent.refresh();
                });
            };
            Scene_BookListData.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            Scene_BookListData.prototype.selectBook = function () {
                this._bookListWindow.deactivate();
                var index = this._bookListWindow.index();
                Librarian.setCurrrentBook(Librarium.bookListAvail[index].title);
                this._titleWindow.updateTitle();
                this._windowContent.updateBook();
                this._windowContent.activate();
            };
            Scene_BookListData.prototype.returnToSelection = function () {
                this._bookListWindow.activate();
            };
            Scene_BookListData.prototype.processBooksAvailable = function () {
                this._bookListWindow.setBookList(this._books
                    .filter(function (book) { return book['available'] === true; }));
            };
            Scene_BookListData.prototype.processControls = function () {
                var book = Librarian.getCurrentBook();
                if (book !== null && book !== undefined) {
                    var pageNumber = 0;
                    if (Input.isTriggered('right') && this._windowContent.active) {
                        if (Librarian.getPageNumber() < book.pages.length) {
                            Librarian.nextPage();
                            this['_windowContent'].refresh();
                        }
                    }
                    if (Input.isTriggered('left') && this._windowContent.active) {
                        if (Librarian.getPageNumber() > 1) {
                            Librarian.prevPage();
                            this['_windowContent'].refresh();
                        }
                    }
                }
                if ((Input.isTriggered('cancel') || TouchInput.isCancelled())
                    && this._windowContent.active) {
                    this._windowContent.deactivate();
                    this._bookListWindow.activate();
                }
            };
            Scene_BookListData.prototype.processSceneExit = function () {
                if ((Input.isTriggered('cancel')
                    || TouchInput.isCancelled()) && this._bookListWindow.active) {
                    this.popScene();
                }
            };
            return Scene_BookListData;
        }(Scene_Book));
        //=============================================================================
        //  Scene_BookCategorized
        //=============================================================================
        var Scene_BookCategorized = /** @class */ (function (_super) {
            __extends(Scene_BookCategorized, _super);
            function Scene_BookCategorized(books) {
                var _this = _super.call(this) || this;
                _this._books = books;
                return _this;
            }
            Scene_BookCategorized.prototype.create = function () {
                var _this = this;
                if (/T/ig.test(LibrariumParams.includeBackground))
                    this.createBackground();
                this.createWindowLayer();
                LayoutCreator.createBookListLayout(this);
                this.processBookCategories();
                IndexWatcher.on("newSelection", function () {
                    var index = _this._bookListWindow.index();
                    Librarian.setCurrrentBook(Librarium.bookList[index].title);
                    _this._titleWindow.updateTitle();
                    _this._windowContent.updateBook();
                    _this._windowContent.refresh();
                });
            };
            Scene_BookCategorized.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            Scene_BookCategorized.prototype.selectBook = function () {
                this._bookListWindow.deactivate();
                var index = this._bookListWindow.index();
                Librarian.setCurrrentBook(Librarium.bookList[index].title);
                this._titleWindow.updateTitle();
                this._windowContent.updateBook();
                this._windowContent.activate();
            };
            Scene_BookCategorized.prototype.returnToSelection = function () {
                this._bookListWindow.activate();
            };
            Scene_BookCategorized.prototype.processControls = function () {
                var book = Librarian.getCurrentBook();
                if (book !== null && book !== undefined) {
                    var pageNumber = 0;
                    if (Input.isTriggered('right') && this._windowContent.active) {
                        if (Librarian.getPageNumber() < book.pages.length) {
                            Librarian.nextPage();
                            this['_windowContent'].refresh();
                        }
                    }
                    if (Input.isTriggered('left') && this._windowContent.active) {
                        if (Librarian.getPageNumber() > 1) {
                            Librarian.prevPage();
                            this['_windowContent'].refresh();
                        }
                    }
                }
                if ((Input.isTriggered('cancel') || TouchInput.isCancelled())
                    && this._windowContent.active) {
                    this._windowContent.deactivate();
                    this._bookListWindow.activate();
                }
            };
            Scene_BookCategorized.prototype.processSceneExit = function () {
                if ((Input.isTriggered('cancel')
                    || TouchInput.isCancelled()) && this._bookListWindow.active) {
                    this.popScene();
                }
            };
            Scene_BookCategorized.prototype.processBookCategories = function () {
                this._bookListWindow.setBookList(this._books);
            };
            return Scene_BookCategorized;
        }(Scene_Book));
        //=============================================================================
        //	LayoutCreator
        //=============================================================================
        var LayoutCreator = /** @class */ (function () {
            function LayoutCreator() {
            }
            LayoutCreator.createDefaultLayout = function (scene) {
                scene._titleWindow = new Window_Title(0, 0, Graphics.width, 75);
                scene._windowContent =
                    new Window_Content(0, 75, Graphics.width, Graphics.height - 75);
                scene._titleWindow.refresh();
                scene._windowContent.refresh();
                scene.addChild(scene._titleWindow);
                scene.addChild(scene._windowContent);
            };
            LayoutCreator.createBookListLayout = function (scene) {
                scene._bookListWindow = new Window_BookList(0, 0, 150, Graphics.height);
                scene._titleWindow = new Window_Title(150, 0, Graphics.width - 150, 75);
                scene._windowContent =
                    new Window_Content(150, 75, Graphics.width - 150, Graphics.height - 75);
                scene._windowContent.deactivate();
                scene._bookListWindow
                    .setHandler('ok', scene.selectBook.bind(scene));
                scene._bookListWindow.refresh();
                scene._titleWindow.refresh();
                scene._windowContent.refresh();
                scene.addChild(scene._titleWindow);
                scene.addChild(scene._windowContent);
                scene.addChild(scene._bookListWindow);
            };
            return LayoutCreator;
        }());
        //=============================================================================
        //	Window_Title
        //=============================================================================
        var Window_Title = /** @class */ (function (_super) {
            __extends(Window_Title, _super);
            function Window_Title(x, y, width, height) {
                return _super.call(this, x, y, width, height) || this;
            }
            Window_Title.prototype.initialize = function (x, y, width, height) {
                Window_Base.prototype.initialize.call(this, x, y, width, height);
                this.bookTitle = Librarian.currentBook.title;
            };
            Window_Title.prototype.update = function () {
                Window_Base.prototype.update.call(this);
            };
            Window_Title.prototype.refresh = function () {
                if (this.contents) {
                    this.contents.clear();
                    this.drawTitle();
                }
            };
            Window_Title.prototype.drawTitle = function () {
                this.contents.fontSize = 32;
                var text = this.bookTitle;
                var midPoint = ((this.contentsWidth() / 2) - (this.textWidth(text) / 2));
                this.drawText(text, midPoint, 0, this.width, "left");
                this.resetFontSettings();
            };
            Window_Title.prototype.updateTitle = function () {
                this.bookTitle = Librarian.currentBook.title;
                this.refresh();
            };
            return Window_Title;
        }(Window_Base));
        //=============================================================================
        //	Window_Booklist
        //=============================================================================
        var Window_BookList = /** @class */ (function (_super) {
            __extends(Window_BookList, _super);
            function Window_BookList(x, y, width, height) {
                return _super.call(this, x, y, width, height) || this;
            }
            Window_BookList.prototype.initialize = function (x, y, width, height) {
                this.bookList = Librarium.bookList;
                Window_Selectable.prototype.initialize.call(this, x, y, width, height);
                this.select(0);
                this.activate();
            };
            Window_BookList.prototype.maxItems = function () {
                return this.bookList.length;
            };
            Window_BookList.prototype.update = function () {
                Window_Selectable.prototype.update.call(this);
            };
            Window_BookList.prototype.select = function (index) {
                _super.prototype.select.call(this, index);
                IndexWatcher.emit("newSelection");
            };
            Window_BookList.prototype.drawItem = function (index) {
                var rect = this.itemRectForText(index);
                var bookTitle = this.bookList[index].title;
                this.contents.fontSize = 18;
                this.drawText(bookTitle, rect.x, rect.y, rect.width, "left");
                this.resetFontSettings();
            };
            Window_BookList.prototype.setBookList = function (list) {
                this.bookList = list;
                this.refresh();
            };
            return Window_BookList;
        }(Window_Selectable));
        //=============================================================================
        //	Window_Content
        //=============================================================================
        var Window_Content = /** @class */ (function (_super) {
            __extends(Window_Content, _super);
            function Window_Content(x, y, width, height) {
                return _super.call(this, x, y, width, height) || this;
            }
            Window_Content.prototype.initialize = function (x, y, width, height) {
                Window_Base.prototype.initialize.call(this, x, y, width, height);
                this.book = Librarian.currentBook;
                this.currentWord = [];
                this.wordShiftAmount = 0;
            };
            Window_Content.prototype.update = function () {
                Window_Base.prototype.update.call(this);
            };
            Window_Content.prototype.refresh = function () {
                if (this.contents) {
                    this.contents.clear();
                    this.drawBookCotents();
                    this.drawPageNumber();
                }
            };
            Window_Content.prototype.drawBookCotents = function () {
                if (Librarian.getCurrentBook().type !== undefined)
                    Window_Base.prototype.drawTextEx
                        .call(this, "" + Librarian.getCurrentBookPageText(), 0, 12);
                else if (Librarian.getCurrentBook().type === undefined)
                    this.drawTextEx("" + Librarian.getCurrentBookPageText(), 0, 12);
            };
            Window_Content.prototype.drawPageNumber = function () {
                this.contents.fontSize = 32;
                var text = Librarian.getPageNumber() + " / " + this.book.pages.length;
                this.drawText(text, (this.contentsWidth() - this.textWidth(text)), this.contentsHeight() - 40, 100, "left");
                this.resetFontSettings();
            };
            Window_Content.prototype.drawTextEx = function (text, x, y) {
                if (text) {
                    var textState = { index: 0, x: x, y: y, left: x };
                    textState['text'] = this.convertEscapeCharacters(text);
                    textState['height'] = this.calcTextHeight(textState, false);
                    this.resetFontSettings();
                    this.wordShiftAmount = textState.left;
                    this.currentWord.length = 0;
                    while (textState.index < textState['text'].length) {
                        this.processCharacter(textState);
                    }
                    return textState.x - x;
                }
                else {
                    return 0;
                }
            };
            // Fix formatting issue
            // processNormalCharacter(textState) {
            //   let num = textState.index++;
            //   let char = textState.text[num];
            //   let length = textState.text.length;
            //   let charWidth = this.textWidth(char);
            //   if(/\S/ig.test(char)) {
            //     this.updateWordArray(char, textState);
            //     let word = this.createWord(this.currentWord);
            //     let firstLetter = this.currentWord[0];
            //     let wordWidth = this.textWidth(word);
            //     if(wordWidth > this.contentsWidth()) {
            //       word = this
            //         .createWord(this.currentWord.splice(0,
            //           this.currentWord.length - 2));
            //       this.contents
            //         .drawText(`${word}-`, firstLetter.x, firstLetter.y,
            //         wordWidth * 2, firstLetter.align, "left");
            //       this.currentWord.length = 0; 
            //     }
            //     if(firstLetter.x + wordWidth > this.contentsWidth()){
            //       this
            //         .updateTextStateAnd
            // ShiftAmount(firstLetter, wordWidth, textState);
            //     }
            //   }
            //   if ((/\s/ig.test(char) || (length === (num + 1)))
            //     && this.currentWord.length > 0) {
            //     let word = this.createWord(this.currentWord);
            //     let firstLetter = this.currentWord[0];
            //     let wordWidth = this.textWidth(word);
            //     if(firstLetter.x + wordWidth > this.contentsWidth()){
            //       this
            //         .updateTextStateAndShiftAmount
            // (firstLetter, wordWidth, textState);
            //     }
            //     this.contents
            //       .drawText(word, firstLetter.x, firstLetter.y,
            //       wordWidth * 2, firstLetter.align, "left");
            //     this.currentWord.length = 0;
            //   }
            //   textState.x += charWidth;
            // }
            // updateWordArray(char, textState) {
            //   let x = this.currentWord.length === 0
            //     ? (this.wordShiftAmount + textState.x) : textState.x;
            //   let charWidth = this.textWidth(char);
            //   this.currentWord.push({
            //     char, x, y: textState.y,
            //     width: charWidth * 2, align: textState.height
            //   });
            // }
            // createWord(letterArray) {
            //   let word = letterArray.map(function(element){
            //     return element.char;
            //   });
            //   return word.join("");
            // }
            // updateTextStateAndShiftAmount(firstLetter, wordWidth, textState) {
            //   textState.x = textState.left;
            //   textState.y += textState.height;
            //   firstLetter.x = textState.x;
            //   firstLetter.y = textState.y;
            //   firstLetter.align = textState.height;
            //   this.wordShiftAmount = (firstLetter.x + wordWidth) - 20;
            // }
            Window_Content.prototype.updateBook = function () {
                this.book = Librarian.currentBook;
                this.refresh();
            };
            return Window_Content;
        }(Window_Base));
        //=============================================================================
        //  Utils
        //=============================================================================
        function convertToBook(bookObject) {
            bookObject.pages = bookObject.pages
                .map(function (page, index) {
                return ({ pageNumber: index + 1, pageText: JSON.parse(page) });
            });
            bookObject.type = 'new';
            bookObject.category = bookObject.category.toLowerCase();
            return bookObject;
        }
        function filterByCategory(categories) {
            return function (book) {
                if (categories
                    .some(function (category) {
                    return book.category.toLowerCase() === category.toLowerCase();
                }))
                    return true;
                else
                    return false;
            };
        }
        function setAdd(el, array) {
            if (!array.contains(el)) {
                array.push(el);
            }
        }
        function setRemove(el, array) {
            if (array.length > 0) {
                var index = array.indexOf(el);
                if (index > 0)
                    array.splice(index, 1);
            }
        }
        LibrariumInitializer.initialize();
        //=============================================================================
        //  DataManager
        //=============================================================================
        var _DataManager_makeSaveContents = DataManager.makeSaveContents;
        DataManager.makeSaveContents = function () {
            var contents = _DataManager_makeSaveContents.call(this);
            contents.eisLibBooks = Librarium.bookListAvail;
            return contents;
        };
        var _DataManaager_extractSaveContents = DataManager.extractSaveContents;
        DataManager.extractSaveContents = function (contents) {
            _DataManaager_extractSaveContents.call(this, contents);
            Librarium.bookListAvail = contents['eisLibBooks'];
        };
        //=============================================================================
        //	Public API
        //=============================================================================
        SceneManager['startBookScene'] = function (bookTitle) {
            Librarian.setCurrrentBook(bookTitle);
            if (Librarian.getCurrentBook() !== null)
                this.push(Scene_Book);
            else
                console.error("Can't find book: " + bookTitle);
        };
        SceneManager['startCategorizedScene'] = function (categories) {
            var bookFilter = filterByCategory(categories);
            var filteredBooks = Librarium.bookList.filter(bookFilter);
            Librarian.setCurrrentBook(filteredBooks[0].title);
            if (Librarian.getCurrentBook() !== null) {
                this.push(Scene_BookCategorized.bind(null, filteredBooks));
            }
            else {
                console
                    .error("Can't start Scene_BookCategorized; \n        no book in Librarium Slot 1.");
            }
        };
        SceneManager['startBookListScene'] = function () {
            Librarian.setCurrrentBook(Librarium.bookList[0].title);
            if (Librarian.getCurrentBook() !== null)
                this.push(Scene_BookList);
            else
                console
                    .error("Can't start Scene_BookList; \n          no book in Librarium Slot 1. Check your JSON file for errors.");
        };
        SceneManager['startBookListAvailableScene'] = function () {
            if (Librarium.bookListAvail
                .filter(function (book) { return book['available'] === true; }).length < 1)
                return;
            Librarian.setCurrrentBook(Librarium.bookListAvail[0].title);
            if (Librarian.getCurrentBook() !== null)
                this.push(Scene_BookListData.bind(null, Librarium.bookListAvail));
            else
                console
                    .error("Can't start Scene_BookList; \n          no book in Librarium Slot 1. Check your JSON file for errors.");
        };
        $.getBook = function (string) {
            return Librarian.getBook(string);
        };
        $.getBookContents = function (string) {
            return Librarian.getBookContents(string);
        };
        $.showBookInMessageWindow = function (string) {
            var contents = Librarian.getBookContents(string);
            $gameMessage.add(contents);
        };
        $.addBookAvailable = function (string) {
            var book = Librarian.getBookAvailable(string);
            book['available'] = true;
        };
        var _GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand =
            function (command, args) {
                _GameInterpreter_pluginCommand.call(this, command, args);
                if (command === 'sceneBook') {
                    SceneManager['startBookScene'](args[0]);
                }
                else if (command === 'sceneBookList') {
                    SceneManager.push(Scene_BookList);
                }
                else if (command === 'sceneBookCategorized') {
                    var trimmedArgs = args.map(function (x) { return x.toLowerCase().trim(); });
                    SceneManager['startCategorizedScene'](trimmedArgs);
                }
                else if (command === 'showBook') {
                    $.showBookInMessageWindow(args[0]);
                }
            };
        window['Scene_Book'] = Scene_Book;
        window['Scene_BookList'] = Scene_BookList;
        window['Scene_BookCategorized'] = Scene_BookCategorized;
        window['Scene_BookListData'] = Scene_BookListData;
    }
    Setup($);
})(Librarium);
