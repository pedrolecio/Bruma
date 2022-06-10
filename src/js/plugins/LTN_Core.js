// =============================================================================
// LTN_Core.js
// =============================================================================
/**
 * @file LTN Core is a utility plugin for RPG Maker MV.
 * @author LTN Games
 * @version 1.3.0 - Saucy Snail
 */
/*:
 * @plugindesc v 1.3.0 - LTN Core Utility Plugin. Place above all LTN plugins.
 * <LTN_Core>
 *
 * @author LTN Games (https://ltngames.net)
 *
 * @param  Resolution Options
 *
 * @param screenWidth
 * @text Screen Width
 * @parent Resolution Options
 * @type number
 * @desc Adjusts the resolution (width) of the screen.
 * Default: 816
 * @default 816
 *
 * @param screenHeight
 * @text Screen Height
 * @parent Resolution Options
 * @type number
 * @desc Adjusts the resolution (height) of the screen.
 * Default: 624
 * @default 624
 *
 * @param fitToBrowserWindow
 * @text Fit Browser Window
 * @parent Resolution Options
 * @type boolean
 * @desc Will adjust the game resolution to fit the web browser inner window width  *and height.
 * @default false
 *
 * @param disableResolution
 * @text Disable Resolution
 * @parent Resolution Options
 * @type boolean
 * @desc Disables the Core from resizing and changing resolution. Useful if you have another plugin which changes resolution
 * @default false
 *
 * @param tileSize
 * @text Tile Size
 * @parent Resolution Options
 * @type number
 * @desc The size of the tiles you want to use in game.
 * Default: 48
 * @default 48
 *
 * @param startFullScreen
 * @text Start Full Screen
 * @parent Resolution Options
 * @type boolean
 * @desc Start the game in full screen mode.
 * @default false
 *
 * @param rescaleBackgrounds
 * @text Rescale Backgrounds
 * @parent Resolution Options
 * @type struct<Backgrounds>
 * @desc This will scale backgrounds to the new resolution.
 * @default {"title":"false","gameover":"false","battle":"false"}
 *
 * @param repositionBattlers
 * @text Re-position Battlers
 * @parent Resolution Options
 * @type boolean
 * @desc This will re-position the battlers to new resolution.
 * @default false
 *
 * @param forceRenderer
 * @text Force Renderer
 * @parent Resolution Options
 * @type struct<Renderer>
 * @desc Force the renderer type for pixi's renderer.
 * @default {"force":"false","type":"webgl"}
 *
 * @param  Debug Options
 *
 * @param autoOpenConsole
 * @text Open Console
 * @parent Debug Options
 * @type boolean
 * @desc Open Console on bootup.
 * @default false
 *
 * @param autoSkipTitle
 * @text Skip Title
 * @parent Debug Options
 * @type boolean
 * @desc Skips the title scene on boot.
 * @default false
 *
 * @param autoShowFps
 * @text Show FPS
 * @parent Debug Options
 * @type boolean
 * @desc Opens FPS meter on boot.
 * @default false
 *
 * @param  Screenshot Options
 *
 * @param screenshotKeycode
 * @text Screenshot Key
 * @parent  Screenshot Options
 * @desc What key would you like to use to take a screenshot
 * @type number
 * Default: 44
 * @default 44
 *
 * @param screenshotPath
 * @text Screenshot Path
 * @parent  Screenshot Options
 * @desc Where would you like to save your screenshots. Please ensure folder exists.
 * @type file
 * @dir /
 *
 * @param screenshotQuality
 * @text Screenshot Quality
 * @parent  Screenshot Options
 * @type number
 * @desc What would you like the quality of the image to be.
 * Default: 90  - Max value is 100
 * @default 90
 *
 * @param  Bug Fixes
 *
 * @param vehicleBgmFix
 * @text Vehicle BGM Fix
 * @parent  Bug Fixes
 * @type boolean
 * @desc Fix vehicle bgm not changing when exiting on different map
 * than when you got on vehicle.
 * @default true
 *
 * @help
 ================================================================================
 ▼ TERMS OF USE
 ================================================================================
 Credit must be given to: LTN Games
 Exclusive to https://ltngames.net, please don't share anywhere else unless
 given strict permission by the author of the plugin.

 The plugin may be used in commercial and non-commercial products.
 Credit must be given!

 Please report all bugs to https://ltngames.net/Support

 ================================================================================
 ▼ INFORMATION
 ================================================================================
 LTN Games core plugin is required for all other LTN plugins to work.
This core plugin contains common and useful functions for easier plugin development.

 It also extends the functionality of RPG Maker MV by providing bug fixes and
 debug options.
*/
/*~struct~Renderer:
 * @param force
 * @text Force Renderer Type
 * @default false
 * @type boolean
 * @desc Enable to force the renderer type
 *
 * @param type
 * @text Renderer Type
 * @default 'webgl'
 * @type select
 * @option WebGL
 * @value webgl
 * @option Canvas
 * @value canvas
 * @desc The type of renderer you want to force
*/
/*~struct~Backgrounds:
 * @param title
 * @text Title Background
 * @default false
 * @type boolean
 * @desc Rescale title scene background
 *
 * @param gameover
 * @text Gameover Background
 * @default false
 * @type boolean
 * @desc Rescale gameover scene background
 *
 * @param battle
 * @text Battle Backgrounds
 * @default false
 * @type boolean
 * @desc Rescale battle scene background
*/
'use strict';

/**
 * LTNCore is the namespace of this module, it holds all the common functions
 * plugin parameters and aliases of all plugins developed with LTNCore.
 * @namespace LTNCore
 */

var LTNCore = {};

/**
 * LTN is simple and shorter version of LTNCore for easier access.
 * @namespace LTN
 * @memberof LTNCore
 * @member {Object}
 */
var LTN = LTNCore;

/**
 * LTN.Core, will hold all core params and aliases(if needed)
 * @namespace Core
 * @member {Object}
 * @memberof LTNCore
 */
LTN.Core = LTN.Core || {};

(function ($) {
  /**
   * LTN.Core, will hold all core params and aliases(if needed)
   * @namespace Core
   * @member {Object}
   * @memberof LTNCore
   */
  LTN.Alias = LTN.Alias || {};

  /**
   * VERSION is an object representing the current version of this core plugin.
   * @member {String}
   * @memberof LTNCore
   */
  LTN.VERSION = '1.3.0';

  /** -----------------------------------------------------------------------
   * Start Of Core Parameters >>
   *
   ------------------------------------------------------------------------ */
  var Parameters = window.$plugins.filter(function (p) {
    return p.description.contains('<LTN_Core>');
  })[0].parameters;
  var _Params = {};
  Object.keys(Parameters).forEach(function (key) {
    var parameter = Parameters[key];
    if (!isNaN(parameter)) {
      _Params[key] = parseInt(parameter, 10);
    } else if (parameter === 'true') {
      _Params[key] = true;
    } else if (parameter === 'false') {
      _Params[key] = false;
    } else {
      _Params[key] = parameter;
    }
  });
  LTN.Core.Params = _Params;

  /**
   * Print the namespace module version to console.
   */
  var coreArgs = ['\n %c %c %c LTNCore.js ' + LTN.VERSION + ' %c ' + ' \n\n', 'background: #092496; padding:5px 0;', 'background: #092496; padding:5px 0;', 'color: #3cb4a6; background: #0b0b14; padding:5px 0;', 'background: #092496; padding:5px 0;'];
  var mvArgs = ['\n %c %c %c MV ' + Utils.RPGMAKER_VERSION + ' %c ' + ' \n\n', 'background: #092496; padding:5px 0;', 'background: #092496; padding:5px 0;', 'color: #3cb4a6; background: #0b0b14; padding:5px 0;', 'background: #092496; padding:5px 0;'];
  window.console.log.apply(console, coreArgs);
  window.console.log.apply(console, mvArgs);
  /** -----------------------------------------------------------------
   * Utilities >>
   * contains a number of useful functions for easier plugin development
   *
   *
    ----------------------------------------------------------------- */
  var Utilities = function Utilities() {
    return {
      /**
       * Checks the type to see if it's an object
       *
       * @param {any} type - The object or type you want to check as an object.
       * @returns {Boolean} Return true if the type is an object.
       *
       * @memberOf Utilities
       */
      isObject(type) {
        return type && Object.prototype.toString.call(type) === '[object Object]';
      },

      /**
       * Checks the type to see if it's a function
       *
       * @param {any} type - The object or type you want to check as a function.
       * @returns {Boolean} Return true if the type is a function.
       *
       * @memberOf Utilities
       */
      isFunction(type) {
        return type && Object.prototype.toString.call(type) === '[object Function]';
      },

      /**
       * Checks the type to see if it's an array
       *
       * @param {any} type - The object or type you want to check as an array.
       * @returns {Boolean} Return true if the type is an array.
       *
       * @memberOf Utilities
       */
      isArray(type) {
        return type && Object.prototype.toString.call(type) === '[object Array]';
      },

      /**
      * Checks the type to see if it's a boolean value. Checks a string and if it matches true, yes, false, no, enable, disable.
      *
      * @param {any} type - The object or type you want to check as an bool.
      * @returns {Boolean} Return true if the type is a boolean.
      *
      * @memberOf Utilities
      */
      isBool(type) {
        var result = null;
        var boolValues = ['true', 'false', 'yes', 'no', 'enabled', 'disabled'];
        boolValues.forEach(function (value) {
          if (type.toLowerCase() === value) {
            result = true;
          }
        });
        return result || false;
      },

      /**
       * Checks if an object is defined by comparing to 'undefined' and checking existence in the window object
       *
       * @param {any} obj - The object to check
       * @returns {Boolean} Return true if the object is defined
       *
       * @memberOf Utilities
       */
      isDefined(obj) {
        return typeof obj !== 'undefined' || [obj] in window;
      },

      /**
       * Checks if an object is empty and has no properties
       * @param {any} obj - The object to check for properties
       * @returns {Boolean} Return false if the object has a property
       *
       * @memberOf Utilities
       */
      isEmpty(obj) {
        if (this.isObject(obj)) {
          return Object.keys(obj).length > 0;
        }
        if (this.isArray(obj)) {
          return obj.length > 0;
        }
      },

      /**
       * Converts strings to objects. Strings must have format 'foo: bar, bar: foo'
       *
       * @param {any} type - The type to convert to an object
       * @returns {Object} Return an object, if string it outer whitespace
       *
       * @memberOf Utilities
       */
      toObj(type) {
        if (window.JsonEx.isJson(type)) {
          return window.JsonEx.structParse(type);
        }
        var obj = {};
        if (typeof type === 'string') {
          var cleanStr = type.replace(/([\\][n])/g, ',').replace(/(")/g, '');
          var properties = cleanStr.trim().split(',');
          properties.filter(function (property) {
            return property !== '';
          }).forEach(function (property) {
            var tup = property.split(':');
            var name = tup[0].trim();
            var value = tup[1].trim();
            obj[name] = !isNaN(value) ? parseInt(value, 10) : value.trim();
          });
          return obj;
        }
      },

      /**
       * Converts an object or string into an array
       *
       * @param {any} type - The object or string to convert to an array.
       * @returns {Array} Returns an array of the object or string assigned
       *
       * @memberOf Utilities
       */
      toArray(type) {
        var newArr = [];
        if (typeof type === 'object') {
          return Array.prototype.slice.call(type);
        }
        if (type.includes('"')) {
          return JSON.parse(type);
        }
        if (typeof type === 'string') {
          var cleanStr = type.trim();
          var strArr = cleanStr.includes(',') ? cleanStr.split(',') : cleanStr.split(' ');
          for (var i = 0; i < strArr.length; i++) {
            var index = !isNaN(strArr[i]) ? parseInt(strArr[i], 10) : strArr[i].trim('"');
            newArr.push(index);
          }
          return newArr;
        }
      },

      /**
       * Converts a string to a boolean. String must contain one of the following...
       * true, yes, enable, false, no, disable
       *
       * @param {String} string - The string you want to convert to a boolean
       * @returns {Array} Returns a true if string matches criteria.
       *
       * @memberOf Utilities
       */
      toBool(string) {
        if (typeof string === 'boolean') {
          return string;
        }
        switch (string.toLowerCase()) {
          case 'true':
            return true;
          case 'false':
            return false;
          case 'yes':
            return true;
          case 'no':
            return false;
          case 'enable':
            return true;
          case 'disable':
            return false;
          default:
            throw new Error('LTN Core: Cannot parse string to boolean');
        }
      },

      /**
       * Converts an object to a string.
       *
       * @param {Object} obj - The object to convert to a string
       * @returns {String} Returns a string in this format 'property::value'
       *
       * @memberOf Utilities
       */
      toString(obj) {
        var str = '';
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
          }
        }
        return str;
      },

      /**
       * An eval with try error method, it will try to eval and throw error if not successful.
       *
       * @param {Object} text - The string/expression to evaluate
       * @returns {Result} The result of the evaluated string/expression.
       *
       * @memberOf Utilities
       */
      tryEval(text) {
        try {
          return eval(text); // eslint-disable-line no-eval
        } catch (e) {
          throw new Error('There was a problem evaluating your code', e);
        }
      },

      /**
       * Converts hex values to rgb values
       *
       * @param {Number} hex - the hex value you want to convert
       * @returns {String} A string representing the rgb value after conversion.
       *
       * @memberOf Utilities
       */
      hexToRgb(hex) {
        var integer = parseInt(hex, 16);
        var r = integer >> 16 & 255;
        var g = integer >> 8 & 255;
        var b = integer & 255;

        return r + ',' + g + ',' + b;
      },

      /**
       * Parses an object with JSON.parse and stringify essentially shallow cloning an object
       *
       * @param {object} obj - The object to be cloned.
       * @returns {object} cloned version of the object.
       *
       * @memberOf Utilities
       */
      parsedClone(obj) {
        return JSON.parse(JSON.stringify(obj));
      },

      /**
       * Clones an object with Object.assign() nad parsedClone
       *
       *
       * @param {object} obj - The object to be cloned.
       * @returns {object} cloned version of the object.
       *
       * @memberOf Utilities
       */
      clone(source) {
        if (!source) {
          return {};
        }
        return Object.assign({}, this.parsedClone(source));
      },

      /**
       * Converts hours & minutes into HH:MM am or pm format.
       *
       * @param  {Number} hour   - the hour variable.
       * @param  {Number} minute - the minute variable
       * @param  {Object} object - [optional] An object containing the hours & minutes
       * @returns {String} returns a string representing time in hh:mm am/pm format
       *
       * @memberOf Utilities
       */
      toTimeFormat(hour, minute, object) {
        if (!object && (hour === 0 || minute === 0)) {
          console.warn('LTN Core: Missing parameters for [toTimeFormat()]');
        }
        var h = object ? Math.floor(object.hour) : Math.floor(hour);
        var m = object ? Math.floor(object.minute) : Math.floor(minute);
        return (h > 12 ? h - 12 : h) + ':' + (m < 10 ? '0' + m : m) + ' ' + (h > 11 && h < 24 ? 'PM' : 'AM');
      },

      /**
       * Converts hours & minutes into army time format.
       *
       * @param  {Number} hour   - the hour variable.
       * @param  {Number} minute - the minute variable
       * @param  {Object} object - [optional] An object containing the hours & minutes
       * @returns {String} returns a string representing time in army format.
       *
       * @memberOf Utilities
       */
      toArmyTime(hour, minute, object) {
        if (!object && (hour === 0 || minute === 0)) {
          console.warn(`LTN Core: Missing parameters for ${this.toArmyTime.name}`);
        }
        var h = object ? Math.floor(object.hour) : Math.floor(hour);
        var m = object ? Math.floor(object.minute) : Math.floor(minute);
        return (h < 10 ? `0${h}` : h) + ':' + (m < 10 ? `0${m}` : m);
      },

      /**
       * Uses regex to filter text, good for use with extracting notetags
       *
       * @param {String} text - The text you would like to filter
       * @param {RegEx} regex - The regex pattern to use for filtering
       * @param {Function} action - The callback function to evaluate
       */
      filterText(text, regex, action) {
        var result = [];
        var match = void 0;
        var re = regex;
        while (match = re.exec(text)) {
          // eslint-disable-line
          if (action(match)) {
            result.push(match);
          }
        }
        return result;
      },

      /**
       * Finds and extracts a notetag from a string of text and returns it's values/params
       *
       * @param {*} text - The text to be evaluated
       * @param {*} tag - The tag to search for in the text
       * @returns {Array} - An array of parameters, or the value within the tag <tag: value, value>
       */
      getTag(text, tag) {
        if (!text || !tag) {
          return;
        }
        var result = [];
        var re = /<([^<>:]+)(:?)([^>]*)>/g;
        var matches = this.filterText(text, re, function (match) {
          return match[1].toLowerCase() === tag.toLowerCase();
        });
        matches.forEach(function (group) {
          result.push(group[3]);
        });
        return result;
      },

      /**
       * Finds and extracts a notetag from a multiline string of text and returns it's value
       *
       *
       * @param {*} text - The text to evaluate
       * @param {*} tag - The tag to search for in the text
       * @returns {String} - A string of the 2nd capture group between the tags <tag> stuff </tag>
       */
      getMultiLineTag(text, tag) {
        var result = [];
        var re = /<([^<>]+)>([\s\S]*?)<(\/[^<>]+)>/g;
        var matches = this.filterText(text, re, function (match) {
          return match[1].toLowerCase() === tag.toLowerCase();
        });
        matches.forEach(function (group) {
          result.push(group[2]);
        });
        return result;
      },

      /**
       * Extracts the value from a meta object.
       * eg: actor.meta, items.meta, armor.meta
       *
       * @param  {object} obj - The object meta you want to search through
       * @param {String}  tag - The meta tag you want to search for.
       * @returns {String} a string representing the value(s) of the notetag
       *
       * @memberOf Utilities
       */
      getMetaData(obj, tag) {
        if (obj === 'undefined' || obj === null) {
          return 'undefined';
        }
        var meta = obj.meta;
        var match = Object.keys(meta).filter(function (key) {
          return key.toLowerCase() === tag.toLowerCase();
        });
        return typeof meta[match] === 'string' ? meta[match].trim() : meta[match];
      },

      /**
       * Scan all events on map and extract their comments
       *
       * @param  {Object} event - The object containing the event(s)
       * @return {Array} Returns an array of string of all comments added together, categorized by eventId.
       *
       * @example 28 = [param1, param2, param3]
       *
       * @memberOf Utilities
       */
      loadEventComments() {
        var allEvents = $dataMap.events;
        var meta = {};

        allEvents.filter(function (event) {
          return event;
        }).forEach(function (event) {
          var pages = event.pages;
          var eventId = event.id;
          var pageComments = [];
          pages.forEach(function (page, index) {
            var pageId = pages.indexOf(pages[index]);
            if (pageId >= -1) {
              var comments = '';
              page.list.forEach(function (command) {
                if (command.code === 108 || command.code === 408) {
                  comments += command.parameters[0];
                }
              });
              if (comments) {
                pageComments.push(comments);
              }
            }
          });
          if (pageComments.length > 0) {
            meta[eventId] = pageComments;
          }
        });
        return meta;
      },

      /**
       * Converts the tile position to stage position
       *
       * @param  {number} x - the x tile position to convert.
       * @param  {number} y - the y tile position to convert.
       * @returns {object} return width and height after conversion.
       *
       * @memberOf Utilities
       */
      tileCoords(x, y) {
        if (!x || !y || typeof x !== 'number' || typeof y !== 'number') {
          throw new Error('LTN Core tileCoords(): Incorrect values, ensure x & y values are correct.');
        }
        var result = {};
        result.width = x * $gameMap.tileWidth();
        result.height = y * $gameMap.tileHeight();
        return result;
      },

      /**
       * Takes a screenshot by getting the canvas/renderers data.
       *
       * @param {any} quality
       * @returns
       *
       * @memberOf Utilities
       */
      takeScreenshot() {
        var quality = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.1;

        var renderer = Graphics._renderer;
        var stage = renderer._lastObjectRendered;
        renderer.render(stage);
        var data = renderer.view.toDataURL('image/png', quality);
        return data;
      }
    };
  };

  /** -----------------------------------------------------------------
   * PluginRegistrar >>
   *
   * Register a plugin
   * Obtain a plugins data
   *
   ------------------------------------------------------------------- */
  var PluginRegistrar = function PluginRegistrar() {
    var _plugins = {};

    /**
     * Will check if a plugin is registered with LTNCore plugins.
     *
     * @param {String} plugin - The name of the plugin.
     * @returns Return true if plugin is registered in LTN.Plugins.
     *
     * @memberOf PluginRegistrar
     */
    var isPluginRegistered = function isPluginRegistered(plugin) {
      return typeof _plugins[plugin] !== 'undefined';
    };

    return {

      /**
       * Registers the plugin with LTN.Plugins object and checks the required plugins required for the plugin to work.
       *
       * @param  {string} name - A string of name of the plugin being registered.
       * @param  {string} version - A string of the version of plugin being registered.
       * @param  {string} author - A string for the name of the author of the plugin.
       * @param  {array}  required - An array of required plugins for the plugin being registered
       * @returns {none}
       *
       * @memberOf PluginRegistrar
       */
      registerPlugin(name, version, author, required) {
        if (!name) {
          throw new Error('No name for registration of plugin! Please ensure you entered a name');
        }
        if (isPluginRegistered(name)) {
          throw new Error('Plugin already registered with PluginManager. Please use a unique name');
        }

        _plugins[name] = {};

        _plugins[name].Alias = {};
        _plugins[name].Version = version;
        _plugins[name].Author = author;
        _plugins[name].Required = required;
        _plugins[name].SaveData = {};
        // Check required plugins if needed.
        if (required) {
          _plugins[name].Required.forEach(function (plugin) {
            if (!PluginManager.isPlugin(plugin) && !isPluginRegistered(plugin)) {
              throw new Error('You need to have the required plugin ' + plugin + ' for ' + name + ' to work correctly.');
            }
          });
        }
      },

      /**
       * Retrieves plugins namespace module for access to aliases, and exported objects/functions.
       *
       * @param {Object} name - The plugin to require, if you only need one..
       * @param {Boolean} all - Require all plugins?
       * @returns {Boolean} Return the plugins namespace/module
       *
       * @memberOf PluginRegistrar
       */
      requirePlugin(all, name) {
        if (all) {
          return _plugins;
        }
        return _plugins[name];
      },

      /**
       * Retrieves a registered plugins aliased methods.
       *
       * @param {String} pluginName
       * @param {Boolean} all
       * @param {String} aliasName
       * @returns {Boolean} Return the plugins aliased methods.
       *
       * @memberOf PluginRegistrar
       */
      requireAlias(pluginName, all, aliasName) {
        if (!isPluginRegistered(pluginName)) {
          throw new Error('Unable to find a registered plugin by the name: ' + pluginName);
        }
        if (all) {
          return _plugins[pluginName].Alias;
        } else if (aliasName) {
          return _plugins[pluginName].Alias[aliasName];
        }
      }
    };
  };

  /** -----------------------------------------------------------------
   * SignalDispatcher >>
   *
   * Dispatch and watch events/signals for core functionality
   * - Access core signals
   * - Create custom signals for use in plugins
   *
   ------------------------------------------------------------------- */
  var SignalDispatcher = function SignalDispatcher() {
    var _signals = [];

    return {

      /* Deprecated, the use of 'om' instead of 'add' is more common in API's */
      add(name, handler, context) {
        var signal = { name, handler, context };
        _signals.push(signal);
      },

      on(name, handler, context) {
        var signal = { name, handler, context };
        _signals.push(signal);
      },

      remove(name, callback) {
        var index = _signals[name];
        _signals.splice(0, index);
      },

      emit(name) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        _signals.filter(function (event) {
          return event.name === name;
        }).forEach(function (signal) {
          var _signal$handler;

          return (_signal$handler = signal.handler).call.apply(_signal$handler, [signal.context].concat(args));
        });
      }

    };
  };

  /** -----------------------------------------------------------------
   * FileIO >>
   *
   * Common file system and Ajax functions.
   * - xhr and node fs
   *
    ----------------------------------------------------------------- */
  var FileIO = function FileIO() {
    var fs = Utils.isNwjs() ? require('fs') : null;

    return {

      cleanPath(path) {
        return path.replace(/(\/)[(/)]/g, '/');
      },
      /**
       * Attempt to write file to directory
       *
       * @param {String} filepath - Path to an existing or new file you want to write to
       * @param {String} data - The type of data you would like to write
       * @param {Function} onComplete - The action/function to run when successfully written to file
       * @param {Function} onFail - The action/function to run when file write has failed
       */
      tryWriteFile(filepath, data, dataType, onComplete, onFail) {
        var _this = this;

        try {
          fs.writeFile(filepath, data, dataType, function (error) {
            if (error !== 'undefined' && error !== null) {
              onComplete.call(_this);
            }
          });
        } catch (error) {
          if (error !== 'undefined' && error !== null) {
            onFail.call(this, error);
          }
        }
      },

      /**
       * Determines if the current computer has internet access by checking for connection to a random host.
       */
      isHostReachable() {
        var host = window.location.hostname;
        var xhr = new window.XMLHttpRequest();
        xhr.open('HEAD', `//${host}/?rand=${Math.floor((1 + Math.random()) * 0x10000)}, false`);
        try {
          xhr.send();
          return xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304);
        } catch (error) {
          return false;
        }
      },

      ajaxLoadFile(path) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'application/json';
        var onload = arguments[2];
        var onerror = arguments[3];
        var context = arguments[4];

        var xhr = new window.XMLHttpRequest();
        xhr.open('GET', path);
        xhr.overrideMimeType(type);
        xhr.onload = function () {
          if (xhr.status < 400) {
            onload.call(context, xhr.responseText);
          }
        };
        xhr.onerror = function (err) {
          return onerror.call(context, err);
        };
        xhr.send();
      },

      localLoadFile(path, type, encoding, onload, context) {
        var fullPath = `${this.projectPath()}${path}`;
        if (fs.existsSync(fullPath)) {
          var contents = fs.readFileSync(fullPath, encoding);
          onload.call(context, contents);
        } else {
          console.warn('Cannot read file at', `${this.projectPath()}${path}`);
        }
      },

      /**
       * Loads a JSON file via node or ajax, chooses based on platform.
       *
       * @param {any} path - The path to the JSON file
       * @returns {Sting} string - Returns contents of a parsed JSON file
       *
       * @memberOf Utilities
       */
      loadJSON(path, onload, onerror, context) {
        if (Utils.isNwjs()) {
          this.localLoadFile(`${path}.json`, 'application/json', 'utf-8', function (response) {
            onload.call(context, JSON.parse(response));
          }, function (err) {
            onerror.call(context, err);
          }, context);
        } else {
          this.ajaxLoadFile(`${path}.json`, null, function (response) {
            onload.call(context, JSON.parse(response));
          }, function (err) {
            onerror.call(context, err);
          }, context);
        }
      },

      /**
       * Gets the location of the current game.exe or project's path.
       *
       * @returns {String} Returns the project path as a string
       *
       * @memberOf Utilities
       */
      projectPath() {
        var path = window.location.pathname.replace(/\/[^/]*$/, '/');
        if (path.match(/^\/([A-Z]:)/)) {
          path = path.slice(1);
        }
        return decodeURIComponent(path);
      },

      /**
       * Download a file from url and save to destination
       *
       * @param {any} url - The url to the file to download
       * @param {any} destination - The destination to save the downloaded file.
       * @param {any} callback - The callback on file close
       *
       * @memberOf Utilities
       */
      downloadFile(url) {
        var destination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.projectPath();
        var onLoad = arguments[2];

        var _this2 = this;

        var onError = arguments[3];
        var onProgress = arguments[4];

        var http = require('http');
        var file = fs.createWriteStream(destination);
        http.get(url, function (response) {
          response.on('data', function (chunk) {
            onProgress.call(_this2, chunk);
          });
          response.pipe(file);
          file.on('finish', function (data) {
            file.close(onLoad);
          });
          file.on('error', function (data) {
            file.close(onError);
          });
        });
      },

      /**
       * Save's a screenshot/image to the local computer
       *
       *
       * @memberOf Utilities
       */
      saveImage(base64Data, path, name) {
        if (!Utils.isNwjs()) {
          return;
        }
        var filepath = `${this.projectPath()}${path}`;
        var filename = `${filepath}${name}.png`;
        var data = base64Data.replace(/^data:image\/png;base64,/, '');

        this.tryWriteFile(filename, data, 'base64', function () {}, function (err) {
          throw new Error(`Error saving screenshot to ${filename}:${err}`);
        });
      },

      /**
       * Checks if a file exists via node-webkit.
       *
       * @param {String} path -  Path to file.
       * @param {String} extensions - The extensions of file you want to check.
       * @returns {Boolean} return true if the file exists.
       *
       * @memberOf Utilities
       */
      localFileExists(path) {
        var extensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        return extensions.forEach(function (extension) {
          return fs.existsSync(path + extension);
        });
      },

      /**
       * Checks if a file exists via XMLHttpRequest().
       *
       * @param {String} folder - The folder you want to check for file
       * @param {String} filename - the filename you want to check
       * @param {Array} extensions -  the extension(s) of file you want to check
       * @returns {Boolean} return true if the file exists.
       *
       * @memberOf Utilities
       */
      urlFileExists(url) {
        var extensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var xhr = new window.XMLHttpRequest();
        extensions.forEach(function (extension) {
          xhr.open('HEAD', `${url}${extension}`, false);
          xhr.send();
        });
        return xhr.status <= '404';
      }
    };
  };

  /**
   * Exports
   */
  $.Utilities = Utilities();
  $.PluginRegistrar = PluginRegistrar();
  $.FileIO = FileIO();
  $.CoreSignals = SignalDispatcher();
  $.SignalDispatcher = SignalDispatcher;
})(LTNCore)

/** -=-=-=-=-=-=-=-=-=-=-=-==--=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=---=-=-==--=-==-
 * RPG Maker MV Functionality And Improvements
 *
 * -=-=-=-=-=-=-=-=-=-=-=-==--=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=---=-=-==--=-==- */

;(function (JsonEx) {
  JsonEx.isJson = function (text) {
    try {
      var r = JSON.parse(text);
      if (r && typeof r === 'object') {
        return r;
      }
    } catch (error) {}
    return false;
  };

  JsonEx.structParse = function (text) {
    var isBool = LTN.Utilities.isBool;
    var toBool = LTN.Utilities.toBool;
    if (typeof text === 'string') {
      // Change JSON.parse to 'this.parse' because RPG Maker MV JsonEx has a parse method of it's own.
      text = JSON.parse(text);
    }
    for (var key in text) {
      // Convert string property if it is a number
      if (!isNaN(text[key])) {
        text[key] = parseInt(text[key]);
        // Convert string property if it is a boolean
      } else if (isBool(text[key])) {
        text[key] = toBool(text[key]);
      } else if (typeof text[key] === 'object') {
        this.structParse(text[key]);
      }
    }
    return text;
  };
})(window.JsonEx);(function (BM) {
  /**
    * Converts to whole numbers for better performance and rendering of bitmaps
    *
    * @memberOf Bitmap
    */
  var Bitmap_blt = BM.blt;
  BM.blt = function (source, sx, sy, sw, sh, dx, dy, dw, dh) {
    sx = Math.floor(sx);
    sy = Math.floor(sy);
    sw = Math.floor(sw);
    sh = Math.floor(sh);
    dx = Math.floor(dx);
    dy = Math.floor(dy);
    dw = Math.floor(dw);
    dh = Math.floor(dh);
    Bitmap_blt.apply(this, arguments); //eslint-disable-line
  };

  /**
    * Converts to whole numbers for better performance and rendering of bitmaps
    *
    *
    * @memberOf Bitmap
    */
  var Bitmap_bltImage = BM.bltImage;
  BM.bltImage = function (source, sx, sy, sw, sh, dx, dy, dw, dh) {
    sx = Math.floor(sx);
    sy = Math.floor(sy);
    sw = Math.floor(sw);
    sh = Math.floor(sh);
    dx = Math.floor(dx);
    dy = Math.floor(dy);
    dw = Math.floor(dw);
    dh = Math.floor(dh);
    Bitmap_bltImage.apply(this, arguments); // eslint-disable-line
  };

  /**
    * Converts to whole numbers for better performance and rendering of bitmaps
    *
    *
    * @memberOf Bitmap
    */
  var Bitmap_fillRect = BM.fillRect;
  BM.fillRect = function (x, y, width, height, color) {
    x = Math.floor(x);
    y = Math.floor(y);
    width = Math.floor(width);
    height = Math.floor(height);
    Bitmap_fillRect.call(this, x, y, width, height, color);
  };

  /**
    * Converts to whole numbers for better performance and rendering of bitmaps
    *
    *
    * @memberOf Bitmap
    */
  var Bitmap_gradientFillRect = BM.gradientFillRect;
  BM.gradientFillRect = function (x, y, width, height, color1, color2, vertical) {
    x = Math.floor(x);
    y = Math.floor(y);
    width = Math.floor(width);
    height = Math.floor(height);
    Bitmap_gradientFillRect.call(this, x, y, width, height, color1, color2, vertical);
  };

  /**
    * Converts to whole numbers for better performance and rendering of bitmaps
    *
    *
    * @memberOf Bitmap
    */
  var Bitmap_drawText = BM.drawText;
  BM.drawText = function (text, x, y, maxWidth, lineHeight, align) {
    x = Math.floor(x);
    y = Math.floor(y);
    maxWidth = Math.floor(maxWidth);
    Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
  };
})(Bitmap.prototype);

/** -----------------------------------------------------------------------
   * Window >>
   *
   *
   ------------------------------------------------------------------------ */
(function ($) {
  /**
  * More whole number conversion for better performance and rendering of windows.
  *
  * @memberOf Window
  */
  var Window_refreshAllParts = $.refreshAllParts;
  $.refreshAllParts = function () {
    this._width = Math.floor(this._width);
    this._height = Math.floor(this._height);
    Window_refreshAllParts.call(this);
  };
})(Window.prototype);

/** -----------------------------------------------------------------------
 * DataManager >>
 *
 *
 *
 ------------------------------------------------------------------------ */
(function (DM, Alias) {
  // A global for all event comments parameters for current map
  var eventComments = {};

  Alias.DataManager_onLoad = DM.onLoad;

  DM.onLoad = function (object) {
    Alias.DataManager_onLoad.call(this, object);
    if (object === $dataMap) {
      eventComments = LTN.Utilities.loadEventComments();
      LTN.CoreSignals.emit('comments-loaded', eventComments, $dataMap);
      LTN.CoreSignals.emit('map-loaded', $dataMap);
    }
  };

  /**
   * New Method: Returns the eventComments object
   */
  DM.getAllComments = function () {
    return eventComments;
  };

  Alias.DataManager_setupNewGame = DM.setupNewGame;
  DM.setupNewGame = function () {
    Alias.DataManager_setupNewGame.call(this);
    LTN.CoreSignals.emit('new-game');
  };

  /**
   * Aliased method for addling in save data for LTN Plugins.
   *
   */
  Alias.DataManager_makeSaveContents = DM.makeSaveContents;

  DM.makeSaveContents = function () {
    var contents = Alias.DataManager_makeSaveContents.call(this);
    LTN.CoreSignals.emit('game-save', contents);
    var plugins = LTN.PluginRegistrar.requirePlugin(true);
    Object.keys(plugins).forEach(function (plugin) {
      var saveData = plugins[plugin].SaveData;
      if (Object.keys(saveData).length > 0) {
        contents[plugin] = saveData;
      }
    });
    return contents;
  };

  /**
   * Aliased method for extracting save data for LTN Plugins.
   */
  Alias.DataManager_extractSaveContents = DM.extractSaveContents;

  DM.extractSaveContents = function (contents) {
    Alias.DataManager_extractSaveContents.call(this, contents);
    LTN.CoreSignals.emit('game-load', contents);
  };

  /**
   * Assign save data to original data reference in plugin object.
   *
   * @param {Object} contents - The save data object from MV's save data file.
   */
  var assignSaveData = function assignSaveData(contents) {
    var allPlugins = LTN.PluginRegistrar.requirePlugin(true);
    var pluginKeys = Object.keys(allPlugins);
    var dataToSave = pluginKeys.filter(function (plugin) {
      return typeof contents[plugin] !== 'undefined';
    });

    try {
      dataToSave.forEach(function (plugin) {
        var saveData = contents[plugin];
        var pluginData = allPlugins[plugin];
        Object.keys(saveData).forEach(function (data) {
          Object.keys(saveData[data]).forEach(function (prop) {
            pluginData[data][prop] = saveData[data][prop];
          });
        });
      });
      LTN.CoreSignals.emit('game-load-success');
    } catch (error) {
      LTN.CoreSignals.emit('game-load-error', error);
    }
  };
  LTN.CoreSignals.add('game-load', function (contents) {
    assignSaveData(contents);
  });
})(DataManager, LTN.Alias);

/** -----------------------------------------------------------------------
 * PluginManager >>
 *
 * Retrieve plugin params by description tag <Tag>
 * Check if plugin exists by description tag <Tag>
 *
 ------------------------------------------------------------------------ */
(function (PM) {
  /**
   * Will get the plugin ID in the plugin description instead of the plugin filename.
   * @author Lavra
   * @param {String} plugin - The name of the plugin.
   */
  PM.getPluginParameters = function (plugin) {
    return window.$plugins.filter(function (p) {
      return p.description.contains('<' + plugin + '>');
    })[0].parameters;
  };

  PM.convertParameters = function (parameters) {
    var params = {};
    Object.keys(parameters).forEach(function (key) {
      var parameter = parameters[key];
      if (!isNaN(parameter)) {
        params[key] = parseInt(parameter);
      } else if (LTN.Utilities.isBool(parameter)) {
        params[key] = LTN.Utilities.toBool(parameter);
      } else if (window.JsonEx.isJson(parameter)) {
        params[key] = window.JsonEx.structParse(parameter);
      } else {
        params[key] = parameter;
      }
    });
    return params;
  };

  /**
   * Will check if a plugin is in the manager and contains the name in description.
   * @param {String} plugin - The id of the plugin.
   */
  PM.isPlugin = function (plugin) {
    var pluginRegistered = window.$plugins.filter(function (p) {
      return p.description.contains('<' + plugin + '>');
    });
    if (pluginRegistered.length <= -1) {
      return false;
    }
    return true;
  };
})(PluginManager);

/** -----------------------------------------------------------------------
 * SceneManager >>
 *
 * Resolution options
 * Open debug console or fps meter options
 * Add scene check methods for comparing scenes and checking existence
 *
 ------------------------------------------------------------------------ */
(function (SM, Params) {
  var rendererChoice = LTN.Utilities.toObj(Params.forceRenderer);
  SceneManager._screenWidth = Number(Params.screenWidth);
  SceneManager._screenHeight = Number(Params.screenHeight);
  SceneManager._boxWidth = Number(Params.screenWidth);
  SceneManager._boxHeight = Number(Params.screenHeight);

  var alias_SceneManager_run = SM.run;
  SM.run = function (sceneClass) {
    alias_SceneManager_run.call(this, sceneClass);
    SM.resizeToResolution();
    SM.openDebugTools();
    if (Params.startFullScreen) {
      Graphics._requestFullScreen();
    }
  };

  SM.resizeToResolution = function () {
    if (!Params.disableResolution) {
      var resizeWidth = Graphics.boxWidth - window.innerWidth;
      var resizeHeight = Graphics.boxHeight - window.innerHeight;
      window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
      window.resizeBy(resizeWidth, resizeHeight);
    }
    if (Params.fitToBrowser && !Utils.isNwjs()) {
      Graphics.boxWidth = window.innerWidth;
      Graphics.boxHeight = window.innerHeight;
      Graphics.width = window.innerWidth;
      Graphics.height = window.innerHeight;
    }
  };

  SM.openDebugTools = function () {
    if (Params.openConsole && Utils.isNwjs() && Utils.isOptionValid('test')) {
      var _debugWindow = require('nw.gui').Window.get().showDevTools();
      _debugWindow.moveTo(0.1, 0.5);
      window.focus();
    }
    if (Params.fpsStart) {
      Graphics.showFps();
    }
  };

  if (rendererChoice.force === 'true') {
    SM.initGraphics = function () {
      var type = rendererChoice.type;
      Graphics.initialize(this._screenWidth, this._screenHeight, type);
      Graphics.boxWidth = this._boxWidth;
      Graphics.boxHeight = this._boxHeight;
      Graphics.setLoadingImage('img/system/Loading.png');
      if (Utils.isOptionValid('showfps')) {
        Graphics.showFps();
      }
      if (type === 'webgl') {
        this.checkWebGL();
      }
    };
  }

  /*
   * Checks if the current scene is matches the one input in the arguments.
   */
  SM.isScene = function (sceneClass, success, fail) {
    return SceneManager._scene.constructor === sceneClass;
  };

  /*
   * Checks if the current scene is an instance of the scene in the argument.
   */
  SM.isSceneOf = function (sceneClass) {
    return SceneManager._scene instanceof sceneClass;
  };
})(SceneManager, LTN.Core.Params);

/** -----------------------------------------------------------------------
 * Input >>
 *
 * Screenshot key implementation.
 *
 ------------------------------------------------------------------------ */
(function ($, Params) {
  var Input_onKeyUp = Input._onKeyUp;

  $._onKeyUp = function (event) {
    Input_onKeyUp.call(this, event);
    if (event.keyCode === Params.screenshotKeycode && Utils.isNwjs()) {
      var date = new Date();
      var image = LTN.Utilities.takeScreenshot(Params.screenshotType, Params.screenshotQuality);
      var name = `${date.getMonth()}_${date.getDate()}_${date.getFullYear()}`;
      LTN.FileIO.saveImage(image, Params.screenshotPath, `Screenshot_${name}`);
    }
  };
})(Input, LTN.Core.Params)

/** -----------------------------------------------------------------------
 * Sprite_Actor  >>
 *
 * Reposition battlers for larger resolution options
 *
 ------------------------------------------------------------------------ */
;(function ($, Params) {
  /* Re-position actors */
  if (Params.repositionBattlers) {
    var Sprite_Actor_setActorHome = $.setActorHome;
    $.setActorHome = function (index) {
      Sprite_Actor_setActorHome.call(this, index);
      this._homeX += Graphics.boxWidth - 816;
      this._homeY += Graphics.boxHeight - 624;
    };
  }
})(Sprite_Actor.prototype, LTN.Core.Params);

/** -----------------------------------------------------------------------
 * Scene_Base  >>
 *
 * Rescaled title & gameover images for larger resolution options
 *
 ------------------------------------------------------------------------ */
(function ($, Params) {
  var scaleBacks = LTN.Utilities.toObj(Params.rescaleBackgrounds);

  var Scene_Base_start = $.start;
  $.start = function () {
    Scene_Base_start.call(this);
    this.rescaleBackgrounds();
  };

  $.rescaleImageBackground = function (sprite, scene) {
    if (scaleBacks[scene] === false) {
      return;
    }
    if (sprite.bitmap.width <= 0 || sprite.bitmap.height <= 0) {
      return;
    }
    var newX = Graphics.boxWidth / sprite.bitmap.width;
    var newY = Graphics.boxHeight / sprite.bitmap.height;
    if (newX > 1) {
      sprite.scale.x = newX;
    }
    if (newY > 1) {
      sprite.scale.y = newY;
    }
    this.centerSprite(sprite);
  };

  $.rescaleBackgrounds = function () {
    switch (SceneManager._scene.constructor) {
      case Scene_Title:
        this.rescaleImageBackground(this._backSprite1, 'title');
        this.rescaleImageBackground(this._backSprite2, 'title');
        break;
      case Scene_Gameover:
        this.rescaleImageBackground(this._backSprite, 'gameover');
        break;
      default:
    }
  };

  $.centerSprite = function (sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  };
})(Scene_Base.prototype, LTN.Core.Params);

/** -----------------------------------------------------------------------
 * Spriteset_Battle  >>
 *
 * Rescaled battlebacks for larger resolution options
 *
 * ----------------------------------------------------------------------- */
(function ($, Params) {
  var scaleBacks = LTN.Utilities.toObj(Params.scaleBacks);

  var Spriteset_Battle_locateBattleBack = $.locateBattleback;
  $.locateBattleback = function () {
    var sprite1 = this._back1Sprite;
    var sprite2 = this._back2Sprite;
    if (sprite1.bitmap.width <= 0) {
      return;
    }
    if (sprite2.bitmap.width <= 0) {
      return;
    }
    if (this.isRescaled) {
      return;
    }
    // isRescaled is for battles when changing of battlebacks occurs.
    this.isRescaled = true;
    Spriteset_Battle_locateBattleBack.call(this);
    this.rescaleImageBackground(sprite1, 'battle');
    this.rescaleImageBackground(sprite2, 'battle');
  };

  $.rescaleImageBackground = function (sprite, scene) {
    if (scaleBacks[scene] === 'false') {
      return;
    }
    if (sprite.bitmap.width <= 0 || sprite.bitmap.height <= 0) {
      return;
    }
    var newX = Graphics.boxWidth / sprite.bitmap.width;
    var newY = Graphics.boxHeight / sprite.bitmap.height;
    if (newX > 1) {
      sprite.scale.x = newX;
      sprite.anchor.x = 0.5;
      sprite.x = Graphics.boxWidth / 2;
    }
    if (newY > 1) {
      sprite.scale.y = newY;
      sprite.origin.y = 0;
      sprite.y = 0;
    }
  };
})(Spriteset_Battle.prototype, LTN.Core.Params);

/** -----------------------------------------------------------------------
 * Game_Map  >>
 * This closure function allows for changing tile size
 *
 ------------------------------------------------------------------------ */
Game_Map.prototype.tileWidth = function () {
  return LTN.Core.Params.tileSize;
};

Game_Map.prototype.tileHeight = function () {
  return LTN.Core.Params.tileSize;
};

/** -----------------------------------------------------------------------
 * Scene_Map  >>
 * Add CoreSignal for when the game map is loaded. Signals, events created and map ready
 *
 ------------------------------------------------------------------------ */
var alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function () {
  alias_Scene_Map_onMapLoaded.call(this);
  LTN.CoreSignals.emit('gamemap-loaded', this);
};

/** -----------------------------------------------------------------------
 * Scene_Boot  >>
 *
 * options of skipping the title on bootup when play-testing a project.
 *
 *------------------------------------------------------------------------ */
var alias_Scene_Boot_start = Scene_Boot.prototype.start;

Scene_Boot.prototype.start = function () {
  if (LTN.Core.Params.skipTitle) {
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
      DataManager.setupBattleTest();
      SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
      DataManager.setupEventTest();
      SceneManager.goto(Scene_Map);
    } else {
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
    }
    this.updateDocumentTitle();
    alias_Scene_Boot_start.call(this);
  } else {
    alias_Scene_Boot_start.call(this);
  }
}

/** -----------------------------------------------------------------------
 * Game_Vehicle >>
 * This closure function fixes an issue with RMMV's bgm not changing when getting off any vehicle on
 * a different map than where you got on the vehicle. It is an extension and overwrite of the default
 *
 ------------------------------------------------------------------------ */
;(function (Params) {
  if (Params.vehicleBgmFix !== false) {
    var VehicleBGMFix = {};

    // Save BGM when not in vehicle.
    var GameMap_autoplay = Game_Map.prototype.autoplay;
    Game_Map.prototype.autoplay = function () {
      if (!$gamePlayer.isInVehicle()) {
        GameMap_autoplay.call(this);
        VehicleBGMFix = AudioManager.saveBgm();
      }
    };

    // Ensure BGM is not the old BGM before exiting vehicle.
    var GameVehicle_getOff = Game_Vehicle.prototype.getOff;
    Game_Vehicle.prototype.getOff = function () {
      GameVehicle_getOff.call(this);
      if (VehicleBGMFix !== $dataMap.Bgm) {
        AudioManager.playBgm($dataMap.bgm);
      }
    };
  }

  Game_Map.prototype.maxAltitude = function () {
    return Params.tileSize;
  };
})(LTN.Core.Params);

/* Register LTN Core Plugin */
LTN.PluginRegistrar.registerPlugin('Core', '1.3.0', 'LTN Games');