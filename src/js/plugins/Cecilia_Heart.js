'use strict';

//=============================================================================
//  Cecilia_Heart.js
//=============================================================================


/*:
*
* @author Kino
* @plugindesc Basic module for Cecilia
*
* @param Cecilia Image
* @desc The image used in Cecilia's Box
* @default SF_Actor3
*
* @param Cecilia Image Index
* @desc The index of the image you'd like to use.
* @default 7
*
* @param Cecilia Text Color
* @desc The text color code you'd like Cecilia to speak in.
* @default 27
*
* @param Show Cecilia Window
* @desc Show the Cecilia window on screen? T/F
* @default T
*
* @help
* Version: 1.05
//============================================================================
//	Cecilia System
//=============================================================================
*
* This is the basic module of Cecilia, and it will be improved over time.
* It's a system I designed to help players, and also developers with creating
* the game they want. With a couple of cool features.
* She is an Automated System that talks to the player.
*
*
//=============================================================================
//	API Interface
//=============================================================================
*
* Cecilia has a list of functions/methods that you can use via her namespace.
* The below are the list of functions that you can use with the new classes
* within the system.
*
//=============================================================================
//	Cecilia Speak
//=============================================================================
*
* Cecilia.speak(string)
* Creates a message window with the specified string inside in pink.
*
* Cecilia.speakIntrusive(string)
* Creates a message window, but the player can't move while the window is open.
*
*
//=============================================================================
//	Cecilia Modules
//=============================================================================
*
* Cecilia.addModule(name, module)
* Aliases a module, or another plugin's scripts APIs so you can use them with
* a convenient name.
*
* Cecilia.module(name)
* Calls the aliased module, so that you can access the exports inside of it.
*
* Cecilia.modules()
* Lists all the modules that you've added to Cecilia inside of the dev console
* along with their functions / methods.
*
//=============================================================================
//	Cecilia Timers
//=============================================================================
*
* Cecilia can create Timers, that you have some control over.
* These timers are in seconds, and they can activate some function or method
* after some amount of time. This is great, because you can delay some effect
* until your timer runs out. Plus, you can have as many as you want.
*
* There also two types of timers. Both work similarly, except one uses in game
* frames, and the other one uses the current date for calculating the timer time.
*
* Cecilia.createTimer(seconds, callback)
* - Creates a timer that will activate your callback function after a certain
* amount of seconds.
*
* Once you create a timer, you have access to a couple of functions, which I
* will show using this example.
*
* var timer = Cecilia.createTimer(20, function(){ console.log("Hello World")});
* We have now created a timer that will output hello world to the console once
* we start it.
*
*
* timer.startGTimer()
* This will start our newly created timer and start counting down the time using
* the games frames.
*
* timer.startTimer()
* This will count down the timer's time using real time / seconds instead.
*
* But, you can do a bit more, you can set the timers even after you created
* them.
*
* timer.setTimer(seconds)
* This will set the timer to the amount of seconds you specify.
*
* timer.setGTimer(seconds);
* This will set the gTimer to the amount you specify in seconds.
*
*
//=============================================================================
//	Cecilia.Filters
//=============================================================================
*
* Container  for PIXI filters under a common name space
* Filter Documentation: https://pixijs.github.io/docs/PIXI.filters.html
* Filter Types
* ------------------------------------------------------------------------------
* RGB - Splits the Colors into RGB.
* Dot - Creates a black and white dot effect over the window contents.
* CrossHatch - Creates a cross hatch effect on the window.
* Sepia - Adds a sepia effect to the window.
* Gray - Adds gray to the window.
* Pixel - Pixelates the window.
* Invert - Inverts the window.
* Blur - Blurs the contents of the window.
* Twist - Twists the window contents.
* Displacement - Displaces sections of the window.
* ColorStep - Steps through the color in the window.
*
*
//=============================================================================
//	Cecilia Windows
//=============================================================================
* Cecilia windows are different from regualr windows you must be used to.
* Cecilia windows are touch input based windows; you can only access them with
* touch inputs.
*
* They are also draggable and have new methods that go along with them.
* These windows are also defined by a column and row layout that allows for
* greater flexibility and positioning when creating a window.
*
* Furthermore, Cecilia windows can be added to any scene in the game.
* As long as you can run some code to get it setup, you can put one
* on any kind of scene that is a child of Scene_Base.
*
* I will demonstrate the core functionality in the example below:
*
* Creating a window
* ------------------------------------------------------------------------------
* var clWindow = Cecilia.createCLIWindow(x, y , width, height);
* clWindow.createRow( 300 ) [Width]
* This creates a new window row, expanding the window to fit that size.
*
* clWindow.createColumn(1, 100, 100) [Row index, width, height]
* This creates a new window column, expanding the window to be 300 by 100
* and the column itself only takes up 100 / 300 of the windows width.
*
* clWindow.addFilters(new Cecilia.Filters.Dot()) [PIXI.Filters]
* This adds a new filter to the created window, changing it's appearance.
*
* clWindow.bindAction(1, 1, "Cecilia.speakIntrusive('Hello to all of you')")
* This methods binds an action to the column, that the user can click on.
* Once clicked in this case, Cecilia will say Hello.
*
* clWindow.clearColumn(1, 1) [rowIndex, columnIndex]
* Clears a single column within the first row.
*
* clWindow.clearColumns(1) [rowIndex]
* This method clears all the columns within a row.
* In this case, it would be clearing all the columns in row 1.
*
* clWindow.clearRow(1) [rowIndex]
* Clears an entire row for a window. In this case, clearing all of row 1.
*
*
*
//=============================================================================
//  Contact Information
=======
//=============================================================================
//	Cecilia Data Structures
//=============================================================================
* -- Experimental
* The system has a list of data structures that a dev can use.
* These include things like linked lists and tree structures that you can
* create for your own personal use when setting up some sort of new module /
* plugin using the Cecilia System as the base.
*
* Linked List Notes
* ------------------------------------------------------------------------------
* Linked Lists are different from arrays, the key difference is that you can
* access the elements of a linked list by searching through the entire list.
* This is the key difference between an array, and a linked list.
*
* The other difference is that a linked list keeps track of each
* node in the list. What does that mean? You can follow the links
* to see what comes next in the list.
*
*
* Each of these create methods can take any amount of data. This means
* you're free to add as many links to the list as you want.
*
* Cecilia.DataStructs.createLL()
* This creates a single linked list.
* Example: Cecilia.DataStructs.createLL(1, 2, 3, "Test Data");
* Each one of the passed parameters becomes a link along the list.
* This is true for the other methods too.
*
* Cecilia.DataStructs.createCLL()
* This creates a circular linked list structure; this structure is special,
* because you can create rotations using this structure without checking for
* things such as null values, or going through a for loop.
*
* Cecilia.DataStructs.createDLL()
* This creates a doubled linked list; this kind of list you can either go from
* the front or the back, which means it can be faster than an array for searching
* for data that you might want to keep in memory.
*
*
//=============================================================================
//	Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Twitter Link: https://twitter.com/EISKino
* Website: http://endlessillusoft.com/
* Patreon Link: https://www.patreon.com/EISKino
* 
* Hope this plugin helps, and enjoy!
* --Kino
*/

//=============================================================================
// Namespace Initliazation
//=============================================================================
var CLIImports = CLIImports || {};
CLIImports.Cecilia = true;
var Cecilia = Cecilia || {};

(function ($) {

  //=============================================================================
  // PluginManager
  //=============================================================================
  var parameters = PluginManager.parameters("Cecilia_Heart");
  var faceImage = String(parameters['Cecilia Image']);
  var faceImageIndex = Number(parameters['Cecilia Image Index']);
  var ceciliaTextColor = Number(parameters['Cecilia Text Color']);
  var showCeciliaWindow = String(parameters['Show Cecilia Window']);

  function Setup() {
    'use strict';

    //=============================================================================
    // CeciliaManager
    //=============================================================================

    function CeciliaManager() {}

    CeciliaManager.commandList = [];
    CeciliaManager.moduleList = [];
    CeciliaManager.windowCache = [];
    CeciliaManager._id = 1;

    CeciliaManager.addModule = function (name, module) {
      this.moduleList[name.toLowerCase()] = module;
      console.log("New Module", this.moduleList[name.toLowerCase()]);
    };

    CeciliaManager.module = function (name) {
      return this.moduleList[String(name).toLowerCase()];
    };

    CeciliaManager.modules = function () {
      // console.log(this.moduleList);
    };

    CeciliaManager.generateId = function () {
      return this._id++;
    };

    CeciliaManager.addWindowToCache = function (cliWindow) {
      if (typeof cliWindow._cacheId === 'undefined') cliWindow._cacheId = this.generateId();
      cliWindow._currentScene = SceneManager._scene.constructor;
      if (!this.existsInCache(cliWindow.name)) this.windowCache.push(cliWindow);
      // console.log("Cecilia Window Cache:", this.windowCache);
    };

    CeciliaManager.existsInCache = function (name) {
      for (var i = 0; i < this.windowCache.length; i++) {
        if (this.windowCache[i].name === name) return true;
      }
      return false;
    };

    CeciliaManager.getWindowFromCache = function (name) {
      for (var i = 0; i < this.windowCache.length; i++) {
        if (this.windowCache[i].name === name) return this.windowCache[i];
      }
    };

    CeciliaManager.updateWindowDataInCache = function (cliWindow, x, y, width, height, setup) {
      for (var i = 0; i < this.windowCache.length; i++) {
        if (this.windowCache[i].name === cliWindow.name) {
          this.windowCache[i].x = x;
          this.windowCache[i].y = y;
          this.windowCache[i].width = width;
          this.windowCache[i].height = height;
          this.windowCache[i].setup = "(" + setup + ")";
        }
      }
    };

    CeciliaManager.setWindowsForScene = function () {
      var currentScene = this.getCurrentScene().constructor;
      for (var i = 0; i < this.windowCache.length; i++) {
        if (this.windowCache[i]._currentScene === currentScene) this.windowCache[i].setWindowOnScene(this.windowCache[i].name);
      }
    };

    CeciliaManager.getWindowCache = function () {
      return this.windowCache;
    };

    CeciliaManager.getCurrentScene = function () {
      return SceneManager.getCurrentSceneCLI();
    };

    CeciliaManager.getCeciliaData = function () {
      return CeciliaFS.readJson("CeciliaData");
    };

    CeciliaManager.saveCeciliaData = function () {
      CeciliaData = {
        modules: this.moduleList,
        gameWindows: this.windowCache,
        currentIdCount: this._id
      };
      // console.log("Saving Data", CeciliaData);
      CeciliaFS.writeJson("CeciliaData", CeciliaData);
    };

    //=============================================================================
    //	CeciliaFS
    //=============================================================================

    var CeciliaFS = KR.FS;

    // CeciliaFS.system = require("fs");
    CeciliaFS.fileList = [];

    //=============================================================================
    //	CeciliaAI
    //=============================================================================

    function CeciliaAI() {
      this.initialize.apply(this, arguments);
    }

    CeciliaAI.initialize = function () {
      this._timer = null;
      this._faceImage = faceImage;
      this._faceImageIndex = faceImageIndex;
      this.setup();
    };

    CeciliaAI.setup = function () {
      console.log("Cecilia System Started");
      this.update();
    };

    CeciliaAI.update = function () {
      this.talkLogic();
      this.requestUpdate();
    };

    CeciliaAI.requestUpdate = function () {
      requestAnimationFrame(this.update.bind(this));
    };

    CeciliaAI.speak = function (string) {
      $ceciliaMessage.setFaceImage(this._faceImage, this._faceImageIndex);
      $ceciliaMessage.add("\\C[" + ceciliaTextColor + "]" + string);
    };

    CeciliaAI.speakIntrusive = function (string) {
      $ceciliaMessage.setFaceImage(this._faceImage, this._faceImageIndex);
      $ceciliaMessage.add("\\C[" + ceciliaTextColor + "]" + string);
      $ceciliaMessage.setSoftIntrusive(true);
    };

    CeciliaAI.customSpeak = function (string, backgroundType, positionType) {
      $ceciliaMessage.setFaceImage(this._faceImage, this._faceImageIndex);
      $ceciliaMessage.setBackground(backgroundType);
      $ceciliaMessage.setPositionType(positionType);
      $ceciliaMessage.add("\\C[" + ceciliaTextColor + "]" + string);
    };

    CeciliaAI.talkLogic = function () {};
    //=============================================================================
    //	CeciliaTimer
    //=============================================================================

    function CeciliaTimer(time, func) {
      this.initialize(time, func);
    }

    CeciliaTimer.prototype.constructor = CeciliaTimer;

    CeciliaTimer.prototype.initialize = function (time, callback) {
      this._startTime = 0;
      this._elapsedTime = 0;
      this._timer = 0;
      this._gameTimer = 0;
      this._frameTime = false;
      this._callback = callback;
      this.setGTimer(time);
      this.setTimer(time);
    };

    CeciliaTimer.prototype.setTimer = function (value) {
      this._timer = value;
    };

    CeciliaTimer.prototype.setGTimer = function (value) {
      this._gameTimer = value * 60;
    };

    CeciliaTimer.prototype.startTimer = function () {
      this._startTime = Date.now() / 1000;
      this.update();
    };

    CeciliaTimer.prototype.startGTimer = function () {
      this._frameTime = true;
      this.update();
    };

    CeciliaTimer.prototype.requestUpdate = function () {
      if (this._timer !== 0) requestAnimationFrame(this.update.bind(this));
    };

    CeciliaTimer.prototype.updateTimer = function () {
      this._elapsedTime = Date.now() / 1000;
    };

    CeciliaTimer.prototype.updateGTimer = function () {
      this._gameTimer--;
    };

    CeciliaTimer.prototype.update = function () {
      if (this._timer !== 0 || this._gameTimer !== 0) {
        if (!this._frameTime) this.updateTimer();else this.updateGTimer();
        if (this.timeUp() || this.gTimeUp()) this.onExpire();
      }
      this.requestUpdate();
    };

    CeciliaTimer.prototype.timeUp = function () {
      if (this._elapsedTime - this._startTime > this._timer) return true;else return false;
    };

    CeciliaTimer.prototype.gTimeUp = function () {
      if (this._gameTimer === 0) return true;else return false;
    };

    CeciliaTimer.prototype.reset = function () {
      this._startTime = 0;
      this._elapsedTime = 0;
      this._timer = 0;
      this._gameTimer = 0;
      this._frameTime = false;
    };

    CeciliaTimer.prototype.onExpire = function (callback) {
      this.reset();
      this._callback();
    };

    //=============================================================================
    //	CeciliaCommonEvent
    //=============================================================================

    function CeciliaCommonEvent() {}

    CeciliaCommonEvent.cmnEventList = [];

    CeciliaCommonEvent.callCmnEvent = function (value) {
      $gameTemp.reserveCommonEvent(value);
    };

    CeciliaCommonEvent.storeCmnEvent = function (name, value) {
      this.cmnEventList[String(name).toLowerCase()] = value;
    };

    CeciliaCommonEvent.cmnEvent = function (name) {
      $gameTemp._commonEventId = this.cmnEventList[String(name).toLowerCase()];
    };

    //=============================================================================
    //	CeciliaMessage
    //=============================================================================

    function CeciliaMessage() {
      this.initialize.apply(this, arguments);
    }

    CeciliaMessage.prototype = Object.create(Game_Message.prototype);
    CeciliaMessage.prototype.constructor = CeciliaMessage;

    CeciliaMessage.prototype.initialize = function () {
      Game_Message.prototype.initialize.call(this);
      this.softIntrusive = false;
      this.hardIntrusive = false;
    };

    CeciliaMessage.prototype.setHardIntrusive = function (boolean) {
      this.hardIntrusive = boolean;
    };

    CeciliaMessage.prototype.setSoftIntrusive = function (boolean) {
      this.softIntrusive = boolean;
    };

    CeciliaMessage.prototype.isHardIntrusive = function () {
      return this.hardIntrusive === true ? this.hardIntrusive : false;
    };

    CeciliaMessage.prototype.isSoftIntrusive = function () {
      return this.softIntrusive === true ? this.softIntrusive : false;
    };

    var $ceciliaMessage = new CeciliaMessage();

    //=============================================================================
    //	Cecilia_WindowProcess                                                            
    //=============================================================================
    function Cecilia_WindowProcessor() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_WindowProcessor.initialize = function () {
      this._windowList = [];
      this._touchedWindows = [];
      this._topWindow = null;
      this._mouseX = 0;
      this._mouseY = 0;
      this._touchTime = 0;
      this._dragTimer = 0;
      document.addEventListener('mousemove', this.getTouchCoordinates.bind(this));
      this.startUpdate();
    };

    Cecilia_WindowProcessor.getTouchCoordinates = function (event) {
      this._mouseX = Graphics.pageToCanvasX(event.pageX) - 15;
      this._mouseY = Graphics.pageToCanvasY(event.pageY) - 15;
    };

    Cecilia_WindowProcessor.startUpdate = function () {
      this.update();
    };

    Cecilia_WindowProcessor.update = function () {
      this.getCurrentCLIWindows();
      if (this._windowList.length > 0) this.processCLIWindowsTouched();
      this.processActiveWindowTouches();
      this.requestUpdate();
    };

    Cecilia_WindowProcessor.getCurrentCLIWindows = function () {
      var scene = SceneManager.getCurrentSceneCLI();
      if (scene !== null) this._windowList = scene._ceciliaWindowList;
    };

    Cecilia_WindowProcessor.processCLIWindowsTouched = function () {
      this._touchedWindows = this.filterMousedOverWindowsInList(this._windowList);
      this.filterWindowsByZIndex(this._touchedWindows);
      this.activateWindowProcessing();
    };

    Cecilia_WindowProcessor.processActiveWindowTouches = function () {
      if (this.isActiveWindowAvailable() && this._topWindow.isActive()) {
        if (this._touchTime !== TouchInput.date) {
          this._topWindow.setTouchPoint(TouchInput.x, TouchInput.y);
          this._touchTime = TouchInput.date;
        }
      }
    };

    Cecilia_WindowProcessor.isActiveWindowAvailable = function () {
      return this._topWindow !== null && this._topWindow !== undefined;
    };

    Cecilia_WindowProcessor.filterMousedOverWindowsInList = function (list) {
      var filteredWindows = list.filter(function (cliWindow) {
        if (cliWindow.isMousedOver() && cliWindow.isOpen()) {
          return true;
        } else return false;
      });
      return filteredWindows;
    };

    Cecilia_WindowProcessor.filterWindowsByZIndex = function (list) {
      var topWindow = null;
      if (list.length > 1) {
        topWindow = list[0];
        for (var i = 0; i < list.length - 1; i++) {
          if (list[i]._zIndex < list[i + 1]._zIndex) topWindow = list[i + 1];
        }
      } else topWindow = list[0];
      this._topWindow = topWindow;
    };

    Cecilia_WindowProcessor.activateWindowProcessing = function () {
      if (this._topWindow instanceof Cecilia_WindowBase) {
        this.setWindowsInactive();
        if (!this._topWindow.isDragging()) this._dragTimer--;else this._dragTimer = 90;
        if (this._dragTimer <= 0) this._topWindow.setActive(true);
      } else if (this._topWindow === null || this._topWindow === undefined) {
        this.setWindowsInactive();
      }
    };

    Cecilia_WindowProcessor.setWindowsInactive = function () {
      this._windowList.forEach(function (cliWindow) {
        cliWindow.setActive(false);
      });
    };

    Cecilia_WindowProcessor.requestUpdate = function () {
      requestAnimationFrame(this.update.bind(this));
    };

    //=============================================================================
    //	Cecilia_WindowBase
    //=============================================================================
    function Cecilia_WindowBase() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_WindowBase.prototype = Object.create(Window_Base.prototype);
    Cecilia_WindowBase.prototype.constructor = Cecilia_WindowBase;

    Cecilia_WindowBase.prototype.initialize = function (x, y, width, height) {
      this._windowTone = $dataSystem.windowTone;
      this._contentsTone = [0, 0, 0];
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      this._rows = [];
      this._topRowWidth = 0;
      this._totalColumnHeights = 0;
      this._touchedPoint = {};
      this._touchedColumn = null;
      this._oldMousedOverColumn = null;
      this._mousedOverColumn = null;
      this._columnTouched = false;
      this._boundariesUpdated = false;
      this._activeWindow = false;
      this._locked = false;
      this._zIndex = 0;
      this._oldTouch = null;
      this.setup();
      this.checkDimensionBoundaries();
    };

    Cecilia_WindowBase.prototype.setup = function () {
      //For setting up your own rows and columns
    };

    Cecilia_WindowBase.prototype.setActive = function (boolean) {
      this._activeWindow = boolean;
    };

    Cecilia_WindowBase.prototype.setZIndex = function (value) {
      this._zIndex = value;
    };

    Cecilia_WindowBase.prototype.update = function () {
      Window_Base.prototype.update.call(this);
      if (!this.isDragging()) {
        if (this.isActive()) {
          this.processTouch();
          this.processMouseOver();
        }
        this.setCursor();
      }
      this.windowProcessing();
      this.refresh();
    };

    Cecilia_WindowBase.prototype.isDragging = function () {
      if (this.isTouchedInsideFrame() && TouchInput.isLongPressed() && TouchInput.isMoved()) return true;else return false;
    };

    Cecilia_WindowBase.prototype.isActive = function () {
      return this._activeWindow;
    };

    Cecilia_WindowBase.prototype.processTouch = function () {
      if (this.isTouchedInsideFrame()) {
        this.processColumnTouch();
      }
    };

    Cecilia_WindowBase.prototype.processColumnTouch = function () {
      this._touchedColumn = null;
      for (var i = 0; i < this.getNumRows(); i++) {
        for (var x = 1; x < this.getColumnLength(i) + 1; x++) {
          this.touchedColumn(this._rows[i].columns[this.getColumnLength(i) - x]);
        }
      }
    };

    Cecilia_WindowBase.prototype.touchedColumn = function (column) {
      var distanceX = this.canvasToLocalX(this._touchedPoint.x);
      var distanceY = this.canvasToLocalY(this._touchedPoint.y);
      if (this.isTouchedInsideColumnFrame(distanceX, distanceY, column.width, column.height, column.x, column.y)) {
        this._touchedColumn = column;
        this._columnTouched = true;
      } else this._columnTouched = false;
    };

    Cecilia_WindowBase.prototype.processMouseOver = function () {
      var distanceX = this.canvasToLocalX(Cecilia_WindowProcessor._mouseX);
      var distanceY = this.canvasToLocalY(Cecilia_WindowProcessor._mouseY);
      var column = null;
      for (var i = 0; i < this.getNumRows(); i++) {
        for (var x = 1; x < this.getColumnLength(i) + 1; x++) {
          column = this._rows[i].columns[this.getColumnLength(i) - x];
          if (this.isMousedOverInsideColumnFrame(distanceX, distanceY, column.width, column.height, column.x, column.y)) this._mousedOverColumn = column;
        }
      }
    };

    Cecilia_WindowBase.prototype.setCursor = function () {
      if (this._touchedColumn !== null && !this.isColumnLocked(this._touchedColumn) && this.isActive()) this.selectTouchedColumn();else if (this._touchedColumn === null && this._mousedOverColumn !== null && !this.isColumnLocked(this._mousedOverColumn) && this.isActive()) this.selectMousedOverColumn();else this.setCursorRect(0, 0, 0, 0);
    };

    Cecilia_WindowBase.prototype.selectTouchedColumn = function () {
      this.setCursorRect(this._touchedColumn.x, this._touchedColumn.y, this._touchedColumn.width, this._touchedColumn.height);
      if (this.isTouchedInsideFrame() && TouchInput.isTriggered()) {
        this.executeAction();
        SoundManager.playOk();
      }
      this._touchedColumn = null;
      TouchInput.clear();
    };

    Cecilia_WindowBase.prototype.selectMousedOverColumn = function () {
      this.setCursorRect(this._mousedOverColumn.x, this._mousedOverColumn.y, this._mousedOverColumn.width, this._mousedOverColumn.height);
      if (this._oldMousedOverColumn !== this._mousedOverColumn) {
        SoundManager.playCursor();
        this._oldMousedOverColumn = this._mousedOverColumn;
      }
    };

    Cecilia_WindowBase.prototype.updateTone = function () {
      var windowTone = this._windowTone;
      var contentsTone = this._contentsTone;
      this.setTone(windowTone[0], windowTone[1], windowTone[2]);
      if (this.contents) this.contents.adjustTone(contentsTone[0], contentsTone[1], contentsTone[2]);
    };

    Cecilia_WindowBase.prototype.refresh = function () {
      if (this.contents) {
        this.contents.clear();
        this.resetFontSettings();
      }
    };

    Cecilia_WindowBase.prototype.createContents = function () {
      this.contents = null;
      this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
      this.resetFontSettings();
    };

    Cecilia_WindowBase.prototype.windowProcessing = function () {
      this.checkDimensionBoundaries();
      this.updateWindowDimensions();
      if (this.isDragging()) {
        this.dragWindow();
      } else {
        this._oldTouch = null;
      }
    };

    Cecilia_WindowBase.prototype.checkDimensionBoundaries = function () {
      if (this.width !== this.getTopRowWidth()) {
        this.width = this.getTopRowWidth();
        this._width = this.getTopRowWidth();
        this._boundariesUpdated = true;
      }
      if (this.height !== this.getAllColumnHeightsPerRow()) {
        this.height = this.getAllColumnHeightsPerRow();
        this._height = this.getAllColumnHeightsPerRow();
        this._boundariesUpdated = true;
      }
    };

    Cecilia_WindowBase.prototype.updateWindowDimensions = function () {
      if (this._boundariesUpdated === true) {
        this.move(this.x, this.y, this.width, this.height);
        this.createContents();
        this._boundariesUpdated = false;
      }
    };

    Cecilia_WindowBase.prototype.dragWindow = function () {
      this.setCursorRect(0, 0, 0, 0);
      if (!this.isLocked()) {
        if (this._oldTouch === null) this._oldTouch = { x: TouchInput.x, y: TouchInput.y };
        if (this._oldTouch !== null) {
          var x = TouchInput.x - this._oldTouch.x;
          var y = TouchInput.y - this._oldTouch.y;
          // console.log(x, y);
          this.moveS(this.x + x, this.y + y);
          this._oldTouch = { x: TouchInput.x, y: TouchInput.y };
        }
      }
    };

    Cecilia_WindowBase.prototype.moveS = function (x, y) {
      this.x = x;
      this.y = y;
      this._refreshAllParts();
    };

    Cecilia_WindowBase.prototype.isTouchedInsideFrame = function () {
      var x = this.canvasToLocalX(TouchInput.x);
      var y = this.canvasToLocalY(TouchInput.y);
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    Cecilia_WindowBase.prototype.isTouchedInsideColumnFrame = function (x, y, width, height, colX, colY) {
      return x >= colX && y >= colY && x < width + colX && y < height + colY;
    };

    Cecilia_WindowBase.prototype.isMousedOver = function () {
      var x = this.canvasToLocalX(Cecilia_WindowProcessor._mouseX);
      var y = this.canvasToLocalY(Cecilia_WindowProcessor._mouseY);
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    Cecilia_WindowBase.prototype.isMousedOverInsideColumnFrame = function (x, y, width, height, colX, colY) {
      return x >= colX && y >= colY && x < width + colX && y < height + colY;
    };

    Cecilia_WindowBase.prototype.setTouchPoint = function (x, y) {
      this._touchedPoint = { x: x - 15, y: y - 15 };
    };

    Cecilia_WindowBase.prototype.setWindowOnScene = function (name) {
      this.name = typeof name === 'undefined' ? 'null' : name;
      var scene = SceneManager.getCurrentSceneCLI();
      if (scene instanceof Scene_Base) {
        scene.addCLIWindow(this.name, this);
      }
    };

    Cecilia_WindowBase.prototype.isOverlapping = function (gameWindow) {
      var clWindowPoint = { l1: { x: this.x, y: this.y }, r1: { x: this.x + this.width, y: this.y + this.height } };
      var gameWindowPoint = {
        l2: { x: gameWindow.x, y: gameWindow.y },
        r2: { x: gameWindow.x + gameWindow.width, y: gameWindow.y + gameWindow.height }
      };

      if (gameWindow instanceof Window_Base) {
        if (clWindowPoint.l1.x > gameWindowPoint.r2.x || gameWindowPoint.l2.x > clWindowPoint.r1.x) return false;
        if (clWindowPoint.l1.y > gameWindowPoint.r2.y || gameWindowPoint.l2.y > clWindowPoint.r1.y) return false;

        return true;
      }
    };

    Cecilia_WindowBase.prototype.lockWindow = function () {
      this._locked = true;
    };

    Cecilia_WindowBase.prototype.unlockWindow = function () {
      this._locked = false;
    };

    Cecilia_WindowBase.prototype.isLocked = function () {
      return this._locked;
    };

    Cecilia_WindowBase.prototype.bindAction = function (rowIndex, columnIndex, action) {
      this.getColumn(rowIndex, columnIndex).action = action;
    };

    Cecilia_WindowBase.prototype.executeAction = function () {
      if (this._touchedColumn && this._touchedColumn.action) {
        if (typeof this._touchedColumn.action === 'function') {
          this._touchedColumn.action();
        } else if (typeof this._touchedColumn.action === 'string') {
          eval(this._touchedColumn.action);
        }
      }
    };

    Cecilia_WindowBase.prototype.isDoubleClicked = function () {
      if (this.isTouchedInsideFrame()) this.setActive(true);
    };

    Cecilia_WindowBase.prototype.isNotClicked = function () {
      if (!this.isTouchedInsideFrame()) {
        this.setActive(false);
      }
    };

    Cecilia_WindowBase.prototype.drawLine = function (x, y, width, height) {
      this.contents.fillRect(x, y, width, height, "#FFFFFF");
    };

    Cecilia_WindowBase.prototype.createRow = function (width) {
      var row = { width: width, columns: [] };
      this._rows.push(row);
    };

    Cecilia_WindowBase.prototype.createColumn = function (index, width, height) {
      var column = { width: width, height: height, x: 0, y: 0, locked: false };
      this._rows[index - 1].columns.push(column);
      var point = this.processColumnPositions(index - 1);
      this._rows[index - 1].columns[this._rows[index - 1].columns.length - 1].x = point.x;
      this._rows[index - 1].columns[this._rows[index - 1].columns.length - 1].y = point.y;
    };

    Cecilia_WindowBase.prototype.lockColumn = function (rowIndex, columnIndex) {
      var column = this.getColumn(rowIndex, columnIndex);
      column.locked = true;
    };

    Cecilia_WindowBase.prototype.isColumnLocked = function (column) {
      return column.locked;
    };

    Cecilia_WindowBase.prototype.setRowWidth = function (index, width) {
      this._row[index - 1].width = width;
    };

    Cecilia_WindowBase.prototype.setColumnHeight = function (rowIndex, columnIndex, height) {
      this.getColumn(rowIndex, columnIndex).height = height;
    };

    Cecilia_WindowBase.prototype.getTopRowWidth = function () {
      return this.getNumRows() <= 0 ? 0 : this._rows[0].width + this.standardPadding() * 2;
    };

    Cecilia_WindowBase.prototype.processAllColumnHeightsPerRow = function () {
      this._totalColumnHeights = 0;
      for (var i = 0; i < this.getNumRows(); i++) {
        if (this._rows[i].columns.length > 0) this._totalColumnHeights += this._rows[i].columns[0].height;
      }
    };

    Cecilia_WindowBase.prototype.processColumnPositions = function (index) {
      var x = 0;
      var y = 0;
      var currentRow = this._rows[index];
      var columnLength = this.getColumnLength(index);
      if (this.getNumRows() === 1 && columnLength > 1) {
        x = currentRow.columns[columnLength - 2].x + currentRow.columns[columnLength - 2].width;
        y = 0;
      } else if (this.getNumRows() > 1 && columnLength === 1) {
        x = 0;
        y = this._rows[index - 1].columns[0].height + this._rows[index - 1].columns[0].y;
      } else if (this.getNumRows() > 1 && columnLength > 1 && index === 0) {
        x = currentRow.columns[columnLength - 2].x + currentRow.columns[columnLength - 2].width;
        y = 0;
      } else if (this.getNumRows() > 1 && columnLength > 1) {
        x = currentRow.columns[columnLength - 2].x + currentRow.columns[columnLength - 2].width;
        y = this._rows[index - 1].columns[0].height + this._rows[index - 1].columns[0].y;
      }
      return { x: x, y: y };
    };

    Cecilia_WindowBase.prototype.getNumRows = function () {
      return this._rows.length;
    };

    Cecilia_WindowBase.prototype.getColumnLength = function (index) {
      return this._rows[index].columns.length;
    };

    Cecilia_WindowBase.prototype.getColumn = function (rowIndex, columnIndex) {
      return this._rows[rowIndex - 1].columns[columnIndex - 1];
    };

    Cecilia_WindowBase.prototype.getAllColumnHeightsPerRow = function () {
      this.processAllColumnHeightsPerRow();
      return typeof this._totalColumnHeights === 'undefined' ? 0 : this._totalColumnHeights + this.standardPadding() * 2;
    };

    Cecilia_WindowBase.prototype.clearRows = function () {
      this._rows.length = 0;
      this._touchedColumn = null;
    };

    Cecilia_WindowBase.prototype.clearRow = function (index) {
      this._rows.splice(index - 1, 1);
    };

    Cecilia_WindowBase.prototype.clearColumn = function (rowIndex, columnIndex) {
      this._rows[rowIndex - 1].columns.splice(columnIndex - 1, 1);
    };

    Cecilia_WindowBase.prototype.clearColumns = function (rowIndex) {
      this._rows[rowIndex - 1].columns.length = 0;
    };

    Cecilia_WindowBase.prototype.extractDataForCache = function () {
      var data = {
        name: this.name,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        setup: "(" + this.setup + ")"
      };
      return data;
    };

    Cecilia_WindowBase.prototype.applyData = function (x, y, width, height, fnc) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.setup = eval(fnc);
    };

    Cecilia_WindowBase.prototype.addFilters = function () {
      var args = Array.prototype.slice.call(arguments);
      if (this.filters !== undefined && this.filters !== null) this.filters = this.filters.concat(args);else this.filters = args;
      console.log(this.filters);
    };

    Cecilia_WindowBase.prototype.getFilter = function (index) {
      return this.filters[index - 1];
    };

    Cecilia_WindowBase.prototype.setWindowContentsTone = function (r, g, b) {
      this._contentsTone = [r, g, b];
    };

    Cecilia_WindowBase.prototype.setWindowTone = function (r, g, b) {
      this._windowTone = [r, g, b];
      this.setTone(r, g, b);
    };

    Cecilia_WindowBase.prototype.resetTones = function () {
      this._windowTone = $gameSystem.windowTone();
      this._contentsTone = [0, 0, 0];
    };

    //=============================================================================
    //	Cecilia_WindowSelectable                                                            
    //=============================================================================
    function Cecilia_WindowSelectable() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_WindowSelectable.prototype = Object.create(Cecilia_WindowBase.prototype);
    Cecilia_WindowSelectable.prototype.constructor = Cecilia_WindowSelectable;

    Cecilia_WindowSelectable.prototype.initialize = function (x, y, width, height) {
      Cecilia_WindowBase.prototype.initialize.call(this, x, y, width, height);
      this._index = 0;
      this._topIndex = 0;
      this._list = [];
      this._item = null;
      this._maxItems = 0;
      this._maxItemsPerPage = 0;
      this.setVariables();
    };

    Cecilia_WindowSelectable.prototype.index = function () {
      return this._index;
    };

    Cecilia_WindowSelectable.prototype.setVariables = function () {};

    Cecilia_WindowSelectable.prototype.setList = function (list) {
      this._list = list;
    };

    Cecilia_WindowSelectable.prototype.setMaxItems = function (numItems) {
      this._maxItems = numItems;
    };

    Cecilia_WindowSelectable.prototype.setMaxItemsPerPage = function (numItems) {
      this._maxItemsPerPage = numItems;
    };

    Cecilia_WindowSelectable.prototype.getList = function () {
      return this._list;
    };

    Cecilia_WindowSelectable.prototype.getMaxItems = function () {
      return this._maxItems;
    };

    Cecilia_WindowSelectable.prototype.getMaxItemsPerPage = function () {
      return this._maxItemsPerPage;
    };

    Cecilia_WindowSelectable.prototype.update = function () {
      Cecilia_WindowBase.prototype.update.call(this);
      this.processWheel();
      this.drawAllItems();
    };

    Cecilia_WindowSelectable.prototype.processWheel = function () {
      if (this.isOpenAndActive()) {
        var threshold = 20;
        if (TouchInput.wheelY >= threshold) {
          this.scrollDown();
        }
        if (TouchInput.wheelY <= -threshold) {
          this.scrollUp();
        }
      }
    };

    Cecilia_WindowSelectable.prototype.isOpenAndActive = function () {
      return this.isOpen() && this.isActive();
    };

    Cecilia_WindowSelectable.prototype.scrollUp = function () {
      if (this.getTopRowIndex() > 0) this.setTopRowIndex(this.getTopRowIndex() - 1);
    };

    Cecilia_WindowSelectable.prototype.scrollDown = function () {
      if (this.getTopRowIndex() < this.getMaxItems()) this.setTopRowIndex(this.getTopRowIndex() + 1);
    };

    Cecilia_WindowSelectable.prototype.resetScroll = function () {
      this.setTopRowIndex(0);
    };

    Cecilia_WindowSelectable.prototype.setTopRowIndex = function (value) {
      this._topIndex = value;
    };

    Cecilia_WindowSelectable.prototype.getTopRowIndex = function () {
      return this._topIndex;
    };

    Cecilia_WindowSelectable.prototype.drawAllItems = function () {
      var index = this.getTopRowIndex();
      var rowIndex = 0;
      var column = null;
      var drawn = 0;
      while (drawn < this.getMaxItemsPerPage()) {
        for (var i = 0; i < this.getColumnLength(rowIndex); i++) {
          column = this.getColumn(rowIndex + 1, i + 1);
          this.drawItem(index, column);
          index++;
          drawn++;
        }
        rowIndex++;
      }
    };

    Cecilia_WindowSelectable.prototype.drawItem = function (index, column) {};

    Cecilia_WindowSelectable.prototype.processColumnTouch = function () {
      this._touchedColumn = null;
      for (var i = 0; i < this.getNumRows(); i++) {
        for (var x = 1; x < this.getColumnLength(i) + 1; x++) {
          this.touchedColumn(this._rows[i].columns[this.getColumnLength(i) - x]);
          if (this._columnTouched === true) {
            this.selectItem(this.getTopRowIndex() + i);
          }
        }
      }
    };

    Cecilia_WindowSelectable.prototype.selectItem = function (index) {
      this._item = this._list[index];
    };

    //=============================================================================
    // Cecilia_Window
    //=============================================================================

    function Cecilia_Window() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_Window.prototype = Object.create(Cecilia_WindowBase.prototype);
    Cecilia_Window.prototype.constructor = Cecilia_Window;

    Cecilia_Window.prototype.initialize = function (x, y, width, height) {
      Cecilia_WindowBase.prototype.initialize.call(this, x, y, width, height);
      this._commandList = [];
      this._moduleList = [];
      this.open();
    };

    Cecilia_Window.prototype.setup = function () {
      this.createRow(this.width);
      this.createColumn(1, this.width, 150);
      this.createRow(this.width);
      this.createColumn(2, this.width / 2 - 5, 40);
      this.createColumn(2, this.width / 2 - 5, 40);
      this.bindAction(1, 1, "Cecilia.speak('Hello, my name is Cecilia.\\nThis is the\\\\C[3] Cecilia System')");
      this.bindAction(2, 1, "Cecilia.speak('You touched the Options.')");
      this.bindAction(2, 2, "Cecilia.speak('You touched the Modules.')");
    };

    Cecilia_Window.prototype.update = function () {
      Cecilia_WindowBase.prototype.update.call(this);
      this.drawCeciliaImage();
      this.drawLine(0, 150, this.contentsWidth(), 2);
      this.drawCommandButtons();
    };

    Cecilia_Window.prototype.makeCommands = function () {};

    Cecilia_Window.prototype.drawCommandButtons = function () {
      this.contents.fontSize = 16;
      var column = null;
      column = this.getColumn(2, 1);
      this.drawText("Options", column.x + 10, column.y, column.width);
      column = this.getColumn(2, 2);
      this.drawText("Modules", column.x, column.y, column.width);
      this.resetFontSettings();
    };

    Cecilia_Window.prototype.drawCeciliaImage = function () {
      var column = this.getColumn(1, 1);
      this.drawFace("SF_Actor3", 7, column.x, column.y);
    };

    //=============================================================================
    // Cecilia_TalkWindow
    //=============================================================================
    function Cecilia_TalkWindow() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_TalkWindow.prototype = Object.create(Window_Message.prototype);
    Cecilia_TalkWindow.prototype.constructor = Cecilia_TalkWindow;

    Cecilia_TalkWindow.prototype.initialize = function (x, y, width, height) {
      Window_Message.prototype.initialize.call(this);
      this.close();
    };

    Cecilia_TalkWindow.prototype.canStart = function () {
      return $ceciliaMessage.hasText() && !$ceciliaMessage.scrollMode();
    };

    Cecilia_TalkWindow.prototype.startMessage = function () {
      this._textState = {};
      this._textState.index = 0;
      this._textState.text = this.convertEscapeCharacters($ceciliaMessage.allText());
      this.newPage(this._textState);
      this.updatePlacement();
      this.updateBackground();
      this.open();
    };

    Cecilia_TalkWindow.prototype.updatePlacement = function () {
      this._positionType = $ceciliaMessage.positionType();
      this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
      this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
    };

    Cecilia_TalkWindow.prototype.updateBackground = function () {
      this._background = $ceciliaMessage.background();
      this.setBackgroundType(this._background);
    };

    Cecilia_TalkWindow.prototype.doesContinue = function () {
      return $ceciliaMessage.hasText() && !$ceciliaMessage.scrollMode() && !this.areSettingsChanged();
    };

    Cecilia_TalkWindow.prototype.loadMessageFace = function () {
      this._faceBitmap = ImageManager.loadFace($ceciliaMessage.faceName());
    };

    Cecilia_TalkWindow.prototype.drawMessageFace = function () {
      this.drawFace($ceciliaMessage.faceName(), $ceciliaMessage.faceIndex(), 0, 0);
    };

    Cecilia_TalkWindow.prototype.newLineX = function () {
      return $ceciliaMessage.faceName() === '' ? 0 : 168;
    };

    Cecilia_TalkWindow.prototype.startInput = function () {
      if ($ceciliaMessage.isChoice()) {
        this._choiceWindow.start();
        return true;
      } else if ($ceciliaMessage.isNumberInput()) {
        this._numberWindow.start();
        return true;
      } else if ($ceciliaMessage.isItemChoice()) {
        this._itemWindow.start();
        return true;
      } else {
        return false;
      }
    };

    Cecilia_TalkWindow.prototype.updateInput = function () {
      if (this.isAnySubWindowActive()) {
        return true;
      }
      if (this.pause) {
        if (this.isTriggered()) {
          Input.update();
          this.pause = false;
          if (!this._textState) {
            this.terminateMessage();
          }
        }
        return true;
      }
      return false;
    };

    Cecilia_TalkWindow.prototype.areSettingsChanged = function () {
      return this._background !== $ceciliaMessage.background() || this._positionType !== $ceciliaMessage.positionType();
    };

    Cecilia_TalkWindow.prototype.onEndOfText = function () {
      if (!this.startInput()) {
        if (!this._pauseSkip) {
          this.startPause();
        } else {
          this.terminateMessage();
        }
      }
      this._textState = null;
    };

    Cecilia_TalkWindow.prototype.terminateMessage = function () {
      Window_Message.prototype.terminateMessage.call(this);
      if ($ceciliaMessage.isSoftIntrusive()) $ceciliaMessage.setSoftIntrusive(false);
      $ceciliaMessage.clear();
    };

    //=============================================================================
    //	CeciliaFilters
    //=============================================================================
    var CeciliaFilters = {
      Blur: PIXI.BlurFilter,
      Pixel: PIXI.PixelateFilter,
      RGB: PIXI.RGBSplitFilter,
      Displacement: PIXI.DisplacementFilter,
      ColorStep: PIXI.ColorStepFilter,
      Twist: PIXI.TwistFilter,
      Gray: PIXI.GrayFilter,
      Invert: PIXI.InvertFilter,
      CrossHatch: PIXI.CrossHatchFilter,
      Dot: PIXI.DotScreenFilter,
      Sepia: PIXI.SepiaFilter
    };

    //=============================================================================
    //	Game_Player
    //=============================================================================
    var GamePlayer_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function () {
      if ($ceciliaMessage.isSoftIntrusive() || $ceciliaMessage.isHardIntrusive()) {
        return false;
      } else {
        return GamePlayer_canMove.call(this);
      }
    };

    //=============================================================================
    //	Scene_Base
    //=============================================================================
    var SceneBase_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function () {
      this._ceciliaWindowList = [];
      Cecilia_WindowProcessor.initialize();
      SceneBase_initialize.call(this);
    };

    Scene_Base.prototype.isCLIWindowTouched = function () {
      for (var i = 0; i < this._ceciliaWindowList.length; i++) {
        if (this._ceciliaWindowList[i].isTouchedInsideFrame() && this._ceciliaWindowList[i].isOpen()) {
          return true;
        }
      }
      return false;
    };

    Scene_Base.prototype.addCLIWindow = function (name, cliWindow) {
      cliWindow.name = name.toLowerCase();
      var data = cliWindow.extractDataForCache();
      if (CeciliaManager.existsInCache(cliWindow.name)) {
        data = this.getFromCacheIfExists(cliWindow.name);
        cliWindow.applyData(data.x, data.y, data.width, data.height, data.setup);
      }
      if (this.getWindowFromCLIList(cliWindow.name) === null) this._ceciliaWindowList.push(cliWindow);
      this.addChild(cliWindow);
      CeciliaManager.addWindowToCache(data);
    };

    Scene_Base.prototype.getFromCacheIfExists = function (name) {
      return CeciliaManager.getWindowFromCache(name);
    };

    Scene_Base.prototype.getWindowFromCLIList = function (name) {
      name = name.toLowerCase();
      var list = this._ceciliaWindowList;
      for (var i = 0; i < list.length; i++) {
        if (list[i].name === name) {
          return list[i];
        }
      }
      return null;
    };

    var CLISceneBase_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
      CLISceneBase_terminate.call(this);
      this.updateCacheCLI();
    };

    Scene_Base.prototype.updateCacheCLI = function () {
      var cliWindow = null;
      for (var i = 0; i < this._ceciliaWindowList.length; i++) {
        cliWindow = this._ceciliaWindowList[i];
        CeciliaManager.updateWindowDataInCache(cliWindow, cliWindow.x, cliWindow.y, cliWindow.width, cliWindow.height, cliWindow.setup);
      }
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================

    var Ceci_SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
      Ceci_SceneMap_createAllWindows.call(this);
      this.createCeciliaWindows();
    };

    Scene_Map.prototype.createCeciliaWindows = function () {
      this._ceciliaWindow = new Cecilia_Window(Graphics.width - 175, 0, 175, 225);
      if (!/F/ig.test(showCeciliaWindow)) this.addCLIWindow("CeciliaAI", this._ceciliaWindow);
      this._ceciliaTalkWindow = new Cecilia_TalkWindow();
      this.addChild(this._ceciliaTalkWindow);
      window.ceciliaWindow = this._ceciliaWindow;
    };

    var CLISceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
      CLISceneMap_update.call(this);
      this.processCLIWindows();
    };

    Scene_Map.prototype.processCLIWindows = function () {
      if (this._ceciliaWindow.isOverlapping(this._ceciliaTalkWindow) && !this._ceciliaTalkWindow.isClosed()) this._ceciliaWindow.close();else if (this._ceciliaTalkWindow.isClosed()) this._ceciliaWindow.open();else this._ceciliaWindow.open();
    };

    Scene_Map.prototype.updateDestination = function () {
      if (this.isCLIWindowTouched()) {} else {
        if (this.isMapTouchOk()) {
          this.processMapTouch();
        } else {
          $gameTemp.clearDestination();
          this._touchCount = 0;
        }
      }
    };

    //=============================================================================
    //	SceneManager
    //=============================================================================
    SceneManager.getCurrentSceneCLI = function () {
      return this._scene;
    };

    //=============================================================================
    //	DataManager
    //=============================================================================

    var CLIDataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
      var contents = {};
      contents = CLIDataManager_makeSaveContents.call(this);
      contents.CLIModuleList = CeciliaManager.moduleList;
      contents.CLICommandList = CeciliaManager.commandList;
      contents.CLIWindowCache = CeciliaManager.windowCache;
      return contents;
    };

    var CLIDataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
      CLIDataManager_extractSaveContents.call(this, contents);
      CeciliaManager.commandList = contents.CLICommandList;
      CeciliaManager.moduleList = contents.CLIModuleList;
      CeciliaManager.windowCache = contents.CLIWindowCache;
    };

    //=============================================================================
    //	System Start Up
    //=============================================================================
    CeciliaAI.initialize();
    //=============================================================================
    // Dev Exports
    //=============================================================================
    $.speak = function (string) {
      CeciliaAI.speak(string);
    };

    $.speakIntrusive = function (string) {
      CeciliaAI.speakIntrusive(string);
    };

    $.setIntrusive = function (boolean) {
      $ceciliaMessage.setHardIntrusive(boolean);
    };

    $.addModule = function (name, module) {
      CeciliaManager.addModule(name, module);
    };

    $.module = function (name) {
      return CeciliaManager.module(name);
    };

    $.modules = function () {
      CeciliaManager.modules();
    };

    $.getWindowCache = function () {
      return CeciliaManager.getWindowCache();
    };

    $.createTimer = function (time, callback) {
      return new CeciliaTimer(time, callback);
    };

    $.storeCmnEvent = function (name, value) {
      CeciliaCommonEvent.storeCmnEvent(name, value);
    };

    $.cmnEvent = function (name) {
      CeciliaCommonEvent.cmnEvent(name);
    };

    $.callCmnEvent = function (value) {
      CeciliaCommonEvent.callCmnEvent(value);
    };

    $.createCLIWindow = function (x, y, width, height) {
      return new Cecilia_WindowBase(x, y, width, height);
    };

    $.Filters = CeciliaFilters;
    $.Sylvia = CeciliaFS;

    window.Cecilia_WindowBase = Cecilia_WindowBase;
    window.Cecilia_WindowSelectable = Cecilia_WindowSelectable;
  }

  Setup();
})(Cecilia);