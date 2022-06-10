//=============================================================================
// Rem_Heart.js
//=============================================================================


/*:
* @author Kino
* @plugindesc The base module for the Rem System.
*
*
* @help
*
* Version 1.02
//=============================================================================
// Introduction
//=============================================================================
* This plugin was created so that devs can use text files to create more
* interactive text in their game. it can be clunky making a lot of conditional
* branches in RMMV just to create two different kinds of text from a single npc.
* This plugin is designed to reduce the amount of work that you have to do.
*
*
//=============================================================================
// Handling Files
//=============================================================================
* One thing you have to know about files is related to the text codes you'll
* see below. Each of the special text codes \TXS and \TXR require you put these
* in your files to get the desire effect.
*
* These seperate your files into sections for each text code.
* For Text Sequences (\TXS), you want to add a '\s' to the end of the line where
*  you want to start the seperation. For Text Randomize (\TXR), you add a '\r'.
*
* Example:
*
* Hello, my name is Faust.\s
* Faust is angry now.
*
* In this case 'Hello, my name is Faust.' is seperated from 'Faust is angry
*  now.' If you wanted to seperate 'Faust is angry now.' from more text below
*  it, you do: 'Faust is angry now.\s'
*
* If you wanted to randomize the lines, you'd replace '\s' with '\r'. Or, you
* can use both in the same file to get two different types of effects for
* randomization and sequences.
*
//=============================================================================
// Text Codes
//=============================================================================
* The main power of this plugin is the text codes, which allow you to use text
* files from your Rem folder. Using these codes you can do a lot of fun things.
*
* One thing to note that when using a text code, the first three letters need
* to match the first three letters of one of the folders in your Rem folder.
* For example, you want to get the lore file from dictionary?
*
* \TX[Dic-Lore]
*  This returns all the text in the lore text file.
*  Each text code follows the same format as \TX[sectionCode-FileName].
*  Now, let me go over each text code.
*
* \TX[]
* This text code processes text and returns it directly to the game.
*
* \TXS[]
* This text code process the text, but it will put the text in a sequence.
* This sequence lasts while you're talking to an NPC, meaning, the NPC will
* say the text piece by piece.
*
* \TXR[]
* This takes all the text from the file then, returns part of the file to the
* game. Using this on NPCs, they will say different things every time you talk
* to them.
*
*
//=============================================================================
// Script Calls
//=============================================================================
*
* RemIn.readTextFile(filePath, fileName);
* Example: RemIn.readTextFile('Rem/commons' 'Chatting');
* This script calls reads a text file and returns the result as a string.
* You can store this in a variable if you like.
*
* RemIn.getCompendiumText(sectionName, key);
* Example: RemIn.getCompendiumText('dictionary', 'The World');
* This script calls reads text directly from the compendium. The compendium
* is a datastructure that holds all the text in Rem's file path.
*
* This is how it's structured:
* TextCompendium[sectionName][key];
* The section names are the directory names, and the keys are the file names.
* So, in your dictionary folder (sectionName), you find a file Lore (key).
* TextCompendium[dictionary][lore].
*
*
//=============================================================================
//  Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Twitter Link: https://twitter.com/EISKino
* Website: http://endlessillusoft.com/
*
* Hope this plugin helps, and enjoy!
* --Kino
*/


var parameters = PluginManager.parameters('Rem_Heart');


(function() {
  'use strict';
//=============================================================================
// RemInitializer
//=============================================================================
  class RemInitializer {

    static startSystem() {
      this.setupFileSystem();
      this.setupDataStructure();
    }

    static setupFileSystem() {
      RemIO.makeDirectory('Rem');
      let directoryNames = ['dictionary', 'maps', 'commons'];
      directoryNames.forEach(function(element) {
        RemIO.makeDirectory('Rem/'+ element);
      });
    }

    static setupDataStructure() {
      let directoryFileNames = [];
      directoryFileNames = RemIO.readDirectory('Rem');
      this.processDirectoriesAndFiles(directoryFileNames);
      console.log('Rem System Initialized');
    }

    static processDirectoriesAndFiles(directoryContentNames) {
      let directoryNames = [];
      let fileNames = [];
      let files = [];
      directoryNames = this.filterDirectoryNames(directoryContentNames);
      RemIO.directoryNames = directoryNames;
      directoryNames.forEach(function(directory){
        fileNames = RemIO.readDirectory(`Rem/${directory}`);
        files = TextFileReader.readAllTextFiles(`Rem/${directory}`, fileNames);
        files.forEach(function(file){
          TextAccessor.addToCompendium(directory, file.key, file.text);
        });
      });
    }

    static filterDirectoryNames(directoryNames) {
      return directoryNames.filter(function(element){
        if(!/txt/ig.test(element))
          return true;
        else
          return false;
      });
    }
  }

//=============================================================================
// RemRequester
//=============================================================================

  class RemRequester {
    static processTextSequencer(key, textState) {
      let textInfo = this.processKeyToTextInfo(key);
      let text = null;
      if(TextSequencer.textKey !== key)
        TextSequencer.createTextSequence(key, textInfo.text);
      text = TextSequencer.getNextText();
      this.replaceText(textInfo.keyString, textState, text);
    }

    static processTextRandomizer(key, textState) {
      let textInfo = this.processKeyToTextInfo(key);
      let text = TextRandomizer.randomizeText(textInfo.text);
      this.replaceText(textInfo.keyString, textState, text);
    }

    static processText(key, textState) {
      let textInfo = this.processKeyToTextInfo(key);
      this.replaceText(textInfo.keyString, textState, textInfo.text);
    }

    static replaceText(keyString, textState, text) {
      let re = new RegExp(keyString, 'ig');
      textState.text = textState.text.replace(re, text);
      textState.text = textState.text.replace(/\\s|\\r/ig,"");
    }

    static processKeyToTextInfo(key) {
      let keyInfo = KeyParser.parseKey(key);
      let text = TextAccessor.getTextData(keyInfo.sectionCode, keyInfo.fileName);
      return {text, keyString: keyInfo.fullString};
    }
  }

//=============================================================================
// TextQueue
//=============================================================================
  class TextQueue extends Array {
    dequeueText() {
      let item = null;
      this.reverse();
      item = this.pop();
      this.reverse();
      return item;
    }

    enqueueText(data) {
      this.push(data);
    }

    clear() {
      this.length = 0;
    }
  }

//=============================================================================
// TextRandomizer
//=============================================================================

  class TextRandomizer {
    static randomizeText(text) {
      let textArray = text.split(/\\r/ig);
      let randomInt = Utility.randomInt(0, textArray.length);
      text = textArray[randomInt].replace(/^\r?\n|^\r/, "");
      return text;
    }
  }

//=============================================================================
// TextSequencer
//=============================================================================

  class TextSequencer {
    static createTextSequence(key, text) {
      this.textSequence.length = 0;
      this.textKey = key;
      let textArray = text.split(/\\s/ig);
      textArray.forEach(function(text){
        text = text.replace(/^\r?\n|^\r/, "");
        TextSequencer.textSequence.enqueueText(text);
      });
    }

    static getNextText() {
      let text = this.textSequence.dequeueText();
      if(this.textSequence.length === 0)
        this.textKey = null;
      return text;
    }
  }

  TextSequencer.textSequence = new TextQueue();
  TextSequencer.textKey = null;

//=============================================================================
// KeyParser
//=============================================================================

  class KeyParser{
    static parseKey(keyString) {
      let parsedKey = /(\w+)-(\w+)(\d+)*/ig.exec(keyString);
      let keySet = null;
      if(parsedKey !== null) {
        keySet = {
          fullString: parsedKey[0],
          sectionCode:parsedKey[1].toLowerCase(),
          fileName:parsedKey[2].toLowerCase(),
        };
      }
      return keySet;
    }

  }

//=============================================================================
// TextAccessor
//=============================================================================
  class TextAccessor {

    static addToCompendium(compendiumSection, key, textString) {
      TextCompendium[compendiumSection][key.toLowerCase()] = {text: textString, originalFileName: key};
    }

    static getTextData(compendiumSection, key) {
      let sectionNameMatches = RemIO.directoryNames.filter(function(name){
        if(new RegExp(compendiumSection, 'i').test(name))
          return true;
        else
          return false;
      });
      let textData = TextCompendium[sectionNameMatches[0]][key].text;
      return textData;
    }
  }

//=============================================================================
// TextFileReader
//=============================================================================
  class TextFileReader {
    static readTextFile(filePath, fileName) {
      return RemIO.readCustomFile(filePath, fileName + ".txt", "utf8");
    }

    static readAllTextFiles(filePath, array) {
      let textData = [];
      let textInfo = {};
      let fileName = '';
      for(var i = 0; i < array.length; i++) {
        fileName = array[i];
        textInfo = {
          key: fileName.substring(0, fileName.length - 4),
          text: RemIO.readCustomFile(filePath, fileName,"utf8"),
          section: null,
        };
        textData.push(textInfo);
      }
      return textData;
    }
  }
//=============================================================================
// RemIO
//=============================================================================

  class RemIO {
    static createCustomFile(filePath, fileName, data) {
      filePath = this.createPath('/' + filePath.toLowerCase() + '/');
      if(!this.system.existsSync(filePath)) {
        this.system.mkdirSync(filePath);
      }
      this.system.writeFileSync(filePath + fileName.toLowerCase(), data);
      console.log('Wrote File: ' + fileName);
    }

    static readCustomFile(filePath, fileName, encoding) {
      filePath = this.createPath('/'+ filePath +'/');
      encoding = (typeof encoding === 'undefined') ? null : encoding;
      return this.system.readFileSync(filePath + fileName.toLowerCase(), encoding);
    }

    static readDirectory(filePath) {
      filePath = this.createPath(`/${filePath.toLowerCase()}/`);
      return this.system.readdirSync(filePath);
    }

    static createPath(string) {
      let path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, string);
      if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
      }
      path = decodeURIComponent(path);
      return path;
    }

    static fileExists(filePath, fileName) {
      var path = this.createPath('/'+ filePath + '/');
      var pathToFile = path + fileName.toLowerCase();
      try {
        return this.system.lstatSync(pathToFile).isFile();
      }
      catch(err) {
        return false;
      }
    }

    static makeDirectory(filePath) {
      filePath = this.createPath('/'+ filePath +'/');
      if(!this.system.existsSync(filePath)) {
        this.system.mkdirSync(filePath);
      }
    }
  }

  RemIO.system = require('fs');
  RemIO.fileList = [];
  RemIO.directoryNames = [];

//=============================================================================
// TextCompendium
//=============================================================================

  var TextCompendium = {
    dictionary: {},
    commons: {},
    map: {},
  };

//=============================================================================
// Window_Base
//=============================================================================
  var WindowBase_obtainEscapeParam = Window_Base.prototype.obtainEscapeParam;
  Window_Base.prototype.obtainEscapeParam = function(textState) {
    var arr2 = /^\[(\w+-\w+)\]/.exec(textState.text.slice(textState.index));
    if(arr2) {
      var string = String(arr2[1]);
      var regex = new RegExp('\\[' + string + '\]', 'ig');
      textState.text = textState.text.replace(regex, string);
      return string;
    } else {
      return WindowBase_obtainEscapeParam.call(this, textState);
    }
  };

  var WindowBase_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
  Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch(code) {
    case 'TXS':
      RemRequester.processTextSequencer(this.obtainEscapeParam(textState), textState);
      break;
    case 'TXR':
      RemRequester.processTextRandomizer(this.obtainEscapeParam(textState), textState);
      break;
    case 'TX':
      RemRequester.processText(this.obtainEscapeParam(textState), textState);
      break;
    default:
      WindowBase_processEscapeCharacter.call(this, code, textState);
      break;
    }
  };

//=============================================================================
// System Initialization
//=============================================================================

  RemInitializer.startSystem();

//=============================================================================
// Utility
//=============================================================================
  class Utility{
    static randomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
//=============================================================================
// Public API
//=============================================================================
  window.RemIn = {
    readTextFile: function(filePath, fileName) {
      return TextFileReader.readTextFile(filePath, fileName);
    },

    getCompendiumText(sectionName, key) {
      return TextCompendium[sectionName.toLowerCase()][key.toLowerCase()];
    },
    getCompendium() {
      return TextCompendium;
    }
  };
})();
