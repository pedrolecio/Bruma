"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//=============================================================================
// EISFileSystem.js
//=============================================================================


/*:
* @author Kino
* @plugindesc A plugin with basic features to read and write to files.
*
* @help
*
* Encoding types: 'utf8', 'ascii', 'base64', 'binary', 'hex', 'ucs2', 'utf16l'
*
* Functions
* writeFile(filePath, fileName, data);
* - Writes a file type of your choice a directory of your choice.
* Example: KR.Sylvia.readFile("Text", "ceciliasystem.txt", "My new string");
* - This creates a new folder text if it doesn't exist, and sets the value
* in the file to "My new string";
*
* ReadFile(filePath, fileName, encoding)
* - Reads a file type of your choice from a directory of your choice with
* the specified encoding.
* Example: KR.Sylvia.readFile("Text", "ceciliasystem.txt", 'utf8');
* - This reads the file from the text folder, and uses the utf8 encoding to convert it
* to a string.
*
* appendJson(fileName, data)
* - Adds another element to the json file's list of elements.
* Example: KR.Sylvia.writeJson("FileNames", [{id:1, name: 'text2.json', path: 'url'}]);
*
* writeJson(fileName, data)
* - Writes an object into json format, if you want to write json files to the
* data folder.
* Example: KR.Sylvia.writeJson("FileNames", [{id:1, name: 'text2.json', path: 'url'}]);
*
* readJson(fileName)
* - Reads the specified file in json format, and returns the object to the
* developer / user in an object format, or as an array of elements.
* Example: KR.Sylvia.readJson("FileNames");
*
*
*
*/

//=============================================================================
// Namespace Intialization
//=============================================================================

var KR = KR || {};
KR.Plugins = KR.Plugins || {};

(function ($) {

  var parameters = PluginManager.parameters("EISFileSystem");
  //=============================================================================
  //  Higher Order Functions
  //=============================================================================  
  var isPlayTest = function isPlayTest() {
    return Utils.isOptionValid("test");
  };
  var compressFile = function compressFile(fileContents) {
    return isPlayTest() ? fileContents : LZString.compressToBase64(fileContents);
  };

  var decompressFile = function decompressFile(fileContents) {
    if (isPlayTest()) return fileContents;else {
      var data = LZString.decompressFromBase64(fileContents);
      if (data.length === 0) return fileContents;else return data;
    }
  };

  $.Plugins.FileSystem = function () {
    //=============================================================================
    // FileManager
    //=============================================================================
    var FileManager = function () {
      function FileManager() {
        _classCallCheck(this, FileManager);
      }

      _createClass(FileManager, null, [{
        key: "writeJson",
        value: function writeJson(fileName, data) {
          var json = JsonEx.stringify(data);
          data = JsonEx.parse(json);
          json = JSON.stringify(data, null, "\t");
          var path = this.createPath('/data/');
          this.system.writeFileSync(path + fileName.toLowerCase() + '.json', compressFile(json));
          console.log("Wrote file: " + fileName);
        }
      }, {
        key: "appendJson",
        value: function appendJson(fileName, data) {
          var fileData = this.readJson(fileName.toLowerCase());
          fileData.push(data);
          console.log('Modified File Data:', fileData);
          this.writeJson(fileName, fileData);
        }
      }, {
        key: "readJson",
        value: function readJson(fileName) {
          var path = this.createPath('/data/');
          var data = this.system.readFileSync(path + fileName.toLowerCase() + '.json');
          return JsonEx.parse(decompressFile(data));
        }
      }, {
        key: "fileExists",
        value: function fileExists(filePath, fileName) {
          var path = this.createPath("/" + filePath + "/");
          var pathToFile = path + fileName.toLowerCase();
          try {
            return this.system.lstatSync(pathToFile).isFile();
          } catch (err) {
            return false;
          }
        }
      }, {
        key: "createCustomFile",
        value: function createCustomFile(filePath, fileName, data) {
          filePath = this.createPath("/" + filePath.toLowerCase() + "/");
          if (!this.system.existsSync(filePath)) {
            this.system.mkdirSync(filePath);
          }
          this.system.writeFileSync(filePath + fileName.toLowerCase(), compressFile(data));
          console.log("Wrote File: " + fileName);
        }
      }, {
        key: "readCustomFile",
        value: function readCustomFile(filePath, fileName, encoding) {
          filePath = this.createPath("/" + filePath + "/");
          encoding = typeof encoding === 'undefined' ? null : encoding;
          var data = this.system.readFileSync(filePath + fileName.toLowerCase(), encoding);
          return decompressFile(data);
        }
      }, {
        key: "createPath",
        value: function createPath(string) {
          string = Utils.isNwjs() && Utils.isOptionValid("test") ? string : "/www/" + string;
          var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, string);
          if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
          }
          path = decodeURIComponent(path);
          return path;
        }
      }, {
        key: "makeDirectory",
        value: function makeDirectory(filePath) {
          filePath = this.createPath('/' + filePath + '/');
          if (!this.system.existsSync(filePath)) {
            this.system.mkdirSync(filePath);
          }
        }
      }, {
        key: "readDirectory",
        value: function readDirectory(filePath) {
          filePath = this.createPath("/" + filePath.toLowerCase() + "/");
          return this.system.readdirSync(filePath);
        }
      }]);

      return FileManager;
    }();

    FileManager.system = require('fs');
    FileManager.fileList = [];

    //=============================================================================
    // Exports
    //=============================================================================
    $.FS = {};
    Object.assign($.FS, {
      writeJson: function writeJson(fileName, data) {
        FileManager.writeJson(fileName, data);
      },
      readJson: function readJson(fileName) {
        return FileManager.readJson(fileName);
      },
      appendJson: function appendJson(fileName, data) {
        FileManager.appendJson(fileName, data);
      },
      createCustomFile: function createCustomFile(filePath, fileName, data) {
        FileManager.createCustomFile(filePath, fileName, data);
      },
      readCustomFile: function readCustomFile(filePath, fileName, encoding) {
        return FileManager.readCustomFile(filePath, fileName, encoding);
      },
      fileExists: function fileExists(filePath, fileName) {
        return FileManager.fileExists(filePath, fileName);
      },
      createPath: function createPath(string) {
        return FileManager.createPath(string);
      },
      makeDirectory: function makeDirectory(filePath) {
        FileManager.makeDirectory(filePath);
      },
      readDirectory: function readDirectory(filePath) {
        return FileManager.readDirectory(filePath);
      }
    });
  };

  $.Plugins.WebFileSystem = function () {
    var toLowerCaseJSON = function toLowerCaseJSON(string) {
      return string.toLowerCase() + ".json";
    };

    var FileManagerWeb = function () {
      function FileManagerWeb() {
        _classCallCheck(this, FileManagerWeb);
      }

      _createClass(FileManagerWeb, null, [{
        key: "appendJson",
        value: function appendJson(fileName, data) {
          var fileData = this.readJson(fileName.toLowerCase());
          fileData.push(data);
          console.log('Modified File Data:', fileData);
          this.writeJson(fileName, fileData);
        }
      }, {
        key: "writeJson",
        value: function writeJson(fileName, data) {
          var json = JsonEx.stringify(data);
          data = JsonEx.parse(json);
          json = JSON.stringify(data, null, 2);
          localStorage.setItem(toLowerCaseJSON(fileName), compressFile(json));
        }
      }, {
        key: "readJson",
        value: function readJson(fileName) {
          var data = localStorage.getItem(toLowerCaseJSON(fileName));
          if (data == null) {
            this.loadFromFile('data', toLowerCaseJSON(fileName), function (data) {
              localStorage.setItem(toLowerCaseJSON(fileName), data);
              data = localStorage.getItem(toLowerCaseJSON(fileName));
            });
            return null;
          }
          return JsonEx.parse(decompressFile(data));
        }
      }, {
        key: "fileExists",
        value: function fileExists(filePath, fileName) {
          var path = this.createPath("/" + filePath + "/");
          var pathToFile = path + fileName.toLowerCase();
          try {
            var data = localStorage.getItem(pathToFile);
            if (data !== null) {
              return true;
            } else {
              throw Error;
            }
          } catch (err) {
            return false;
          }
        }
      }, {
        key: "createCustomFile",
        value: function createCustomFile(filePath, fileName, data) {
          filePath = this.createPath("/" + filePath.toLowerCase() + "/");
          if (isPlayTest()) console.log("Wrote File: " + fileName);
          localStorage.setItem(filePath + fileName.toLowerCase(), compressFile(data));
        }
      }, {
        key: "readCustomFile",
        value: function readCustomFile(filePath, fileName, encoding) {
          var createdPath = this.createPath("/" + filePath + "/");
          encoding = typeof encoding === 'undefined' ? null : encoding;
          var data = localStorage.getItem(createdPath + fileName.toLowerCase());
          if (data == null) {
            this.loadFromFile(filePath, fileName.toLowerCase(), function (contents) {
              localStorage.setItem(fileName, contents);
              data = localStorage.getItem(filePath + fileName.toLowerCase());
            });
          }
          return decompressFile(data);
        }
      }, {
        key: "createPath",
        value: function createPath(string) {
          string = Utils.isNwjs() && Utils.isOptionValid("test") ? string : "/www/" + string;
          var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, string);
          if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
          }
          path = decodeURIComponent(path);
          return path;
        }
      }, {
        key: "makeDirectory",
        value: function makeDirectory(filePath) {
          var splitPath = filePath.split("/");
          var basePath = splitPath.slice(0, splitPath.length - 1).join("/").toLowerCase();
          if (localStorage.getItem(basePath + "/") !== null) {
            var dir = JSON.parse(localStorage.getItem(basePath + "/"));
            var pathname = splitPath[splitPath.length - 1].toLowerCase();
            if (!dir.some(function (element) {
              return element === pathname;
            })) {
              dir.push(pathname);
            }
            localStorage.setItem(basePath + "/", JSON.stringify(dir));
          } else if (localStorage.getItem(filePath.toLowerCase() + "/") === null) {
            localStorage.setItem(filePath.toLowerCase() + "/", JSON.stringify([]));
          }
        }
      }, {
        key: "readDirectory",
        value: function readDirectory(filePath) {
          return JSON.parse(localStorage.getItem(filePath.toLowerCase()));
        }
      }, {
        key: "loadFromFile",
        value: function loadFromFile(path, src, f) {
          var xhr = new XMLHttpRequest();
          var url = path + "/" + src;
          xhr.open('GET', url);
          xhr.overrideMimeType('text/plain');
          xhr.onload = function () {
            if (xhr.status < 400) {
              f(xhr.responseText);
            }
          };
          xhr.onerror = function () {
            console.error("File Not loaded");
          };
          xhr.send();
        }
      }]);

      return FileManagerWeb;
    }();
    //=============================================================================
    //  Web Exports
    //=============================================================================


    $.FS = {};
    Object.assign($.FS, {
      writeJson: function writeJson(fileName, data) {
        FileManagerWeb.writeJson(fileName, data);
      },
      readJson: function readJson(fileName) {
        return FileManagerWeb.readJson(fileName);
      },
      appendJson: function appendJson(fileName, data) {
        FileManagerWeb.appendJson(fileName, data);
      },
      createCustomFile: function createCustomFile(filePath, fileName, data) {
        FileManagerWeb.createCustomFile(filePath, fileName, data);
      },
      readCustomFile: function readCustomFile(filePath, fileName, encoding) {
        return FileManagerWeb.readCustomFile(filePath, fileName, encoding);
      },
      fileExists: function fileExists(filePath, fileName) {
        return FileManagerWeb.fileExists(filePath, fileName);
      },
      createPath: function createPath(string) {
        return FileManagerWeb.createPath(string);
      },
      makeDirectory: function makeDirectory(filePath) {
        FileManagerWeb.makeDirectory(filePath);
      },
      readDirectory: function readDirectory(filePath) {
        return FileManagerWeb.readDirectory(filePath);
      }
    });
  };
  if (Utils.isNwjs()) $.Plugins.FileSystem();else $.Plugins.WebFileSystem();
})(KR);