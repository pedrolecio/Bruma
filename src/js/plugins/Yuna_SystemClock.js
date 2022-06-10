'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//=============================================================================
// Yuna_SystemClock.js
//=============================================================================

/*:
* @author Kino
* @plugindesc This plugin creates a system clock available on the map scene <YunaSysClock>
*
* @param Time Type
* @desc The type of time Military, or Standard
* @type boolean
* @on Military
* @off Standard
*
* @param Window X Position
* @desc The X position of the window
* @default 600
*
* @param Window Y Position
* @desc The Y position of the window
* @default 0 
* @help
* Version 1.01
//=============================================================================
//  Introduction
//=============================================================================
*
* This plugin creates a window in your game that shows the system time.
* Place this plugin below Yuna_Heart if you're using the base plugin.
//=============================================================================
//  Script Call & Plugin Commands
//=============================================================================
* Script Calls
* -------------------------------------
* YUNA.showClock();
* Shows the system clock.
* YUNA.hideClock();
* Hides the system clock from view.
* Plugin Command
* --------------------------------------
* YunaClock show
* Shows the system clock.
* YunaClock hide
* Hides the system clock from view.
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
var YUNA = YUNA || {};
(function ($) {
  var params = $plugins.filter(function (plugin) {
    return (/<YunaSysClock>/ig.test(plugin.description)
    );
  })[0].parameters;
  var YunaClockParams = {
    standard: /false/ig.test(params['Time Type']),
    x: parseInt(params['Window X Position']),
    y: parseInt(params['Window Y Position'])
  };
  function setup($) {

    //=============================================================================
    //  Scene_Map
    //=============================================================================
    Scene_Map.prototype.createYunaClockWindow = function () {
      var x = YunaClockParams.x,
          y = YunaClockParams.y;

      this._yunaClockWindow = new Yuna_ClockWindow(x, y, 125, 75);
      this.addWindow(this._yunaClockWindow);
    };

    var _SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
      _SceneMap_createAllWindows.call(this);
      this.createYunaClockWindow();
    };

    Scene_Map.prototype.showClock = function () {
      this._yunaClockWindow.open();
    };

    Scene_Map.prototype.hideClock = function () {
      this._yunaClockWindow.close();
    };
    //=============================================================================
    //  Yuna_ClockWindow
    //=============================================================================

    var Yuna_ClockWindow = function (_Window_Base) {
      _inherits(Yuna_ClockWindow, _Window_Base);

      function Yuna_ClockWindow(x, y, width, height) {
        _classCallCheck(this, Yuna_ClockWindow);

        return _possibleConstructorReturn(this, (Yuna_ClockWindow.__proto__ || Object.getPrototypeOf(Yuna_ClockWindow)).call(this, x, y, width, height));
      }

      _createClass(Yuna_ClockWindow, [{
        key: 'initialize',
        value: function initialize(x, y, width, height) {
          _get(Yuna_ClockWindow.prototype.__proto__ || Object.getPrototypeOf(Yuna_ClockWindow.prototype), 'initialize', this).call(this, x, y, width, height);
          this._time = new Date();
        }
      }, {
        key: 'update',
        value: function update() {
          _get(Yuna_ClockWindow.prototype.__proto__ || Object.getPrototypeOf(Yuna_ClockWindow.prototype), 'update', this).call(this);
          this.updateDate();
          this.refresh();
        }
      }, {
        key: 'updateDate',
        value: function updateDate() {
          this._time = new Date();
        }
      }, {
        key: 'refresh',
        value: function refresh() {
          if (this.contents) {
            this.contents.clear();
            this.drawTime();
          }
        }
      }, {
        key: 'drawTime',
        value: function drawTime() {
          this.drawText(this.dateString(), 0, 0, this.contentsWidth(), 'center');
        }
      }, {
        key: 'dateString',
        value: function dateString() {
          var min = this._time.getMinutes();
          var hrs = this._time.getHours();
          if (YunaClockParams.standard) {
            var ampm = hrs > 11 ? "PM" : "AM";
            return hrs % 12 + ':' + (min < 10 ? "0" + min : min) + ' ' + ampm;
          } else {
            return hrs + ':' + (min < 10 ? "0" + min : min);
          }
        }
      }]);

      return Yuna_ClockWindow;
    }(Window_Base);
    //=============================================================================
    //  Public API
    //=============================================================================


    Object.assign($, {
      showClock: function showClock() {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map) {
          scene.showClock();
        }
      },
      hideClock: function hideClock() {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map) {
          scene.hideClock();
        }
      }
    });
    //=============================================================================
    //  Game_Interpreter
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === 'YunaClock') {
        if (args[0] === 'show') {
          $.showClock();
        }

        if (args[0] === 'hide') {
          $.hideClock();
        }
      }
    };
  }

  setup($);
})(YUNA);