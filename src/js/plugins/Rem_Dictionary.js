//=============================================================================
// Rem_Dictionary.js
//=============================================================================


/*:
/*
* @author Kino
* @plugindesc A plugin that allows you to have a dictionary in your game
*
*
* @help
* Version 1.01
* ChangeLog:
*  * Supports Text Codes
*  * Word Wrapping
*  * Icon support
*  
//=============================================================================
// Introduction
//=============================================================================
* This is a plugin that works with the base Rem_Heart plugin. This plugin taps
* into the dictionary folder created by the plugin, giving the dev a dictionary
* with all the words in their dictionary folder.
*
* To effectively use this plugin, you will have to have Rem_Heart.js above this
* plugin in the file Plugin hierarchy. Afterwards, you can use it as necessary.
*
//=============================================================================
//	Script Calls
//=============================================================================
* You can start the scene by calling SceneManager.gotoDictionaryScene();
* Pressing cancel or right clicking closes the scene.
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



(function() {

  'use strict';
  var params = PluginManager.parameters('Rem_Dictionary');
  function Setup() {

//=============================================================================
// Scene_RemDictionary
//=============================================================================

    class Scene_RemDictionary extends Scene_MenuBase {
      constructor() {
        super();
      }

      create() {
        Scene_MenuBase.prototype.create.call(this);
        this.createAllWindows();
      }

      createAllWindows() {
        this.createWindowWordList();
        this.createWindowWordTitle();
        this.createWindowWord();
      }

      createWindowWordList() {
        this._wordListWindow = new Window_WordList(0, 0,250, Graphics.height);
        this.addChild(this._wordListWindow);
      }

      createWindowWordTitle() {
        this._wordTitleWindow = new Window_WordTitle(250, 0, Graphics.width - 250, 75);
        this.addChild(this._wordTitleWindow);
      }

      createWindowWord() {
        this._wordWindow = new Window_Word(250, 75,Graphics.width - 250, Graphics.height - 75);
        this.addChild(this._wordWindow);
      }

      update() {
        Scene_MenuBase.prototype.update.call(this);
        this._wordWindow.setIndex(this._wordListWindow.index());
        this.getCurrentWordForTitle();
        if(Input.isTriggered('cancel') || TouchInput.isCancelled())
          this.popScene();
      }

      getCurrentWordForTitle() {
        this._wordTitleWindow._word = this._wordListWindow.getCurrentWord();
      }
    }

//=============================================================================
// Window_WordList
//=============================================================================

    class Window_WordList extends Window_Selectable {
      constructor(x, y, width, height) {
        super(x, y, width, height);
      }

      initialize(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._dictionary = RemIn.getCompendium().dictionary;
        this._list = [];
        this.insertDictionaryDefinitions();
        this.select(0);
        this.activate();
      }

      insertDictionaryDefinitions() {
        for(let word in this._dictionary) {
          this._list.push({name: this._dictionary[word].originalFileName, definition: this._dictionary[word].text});
        }
      }

      maxItems() {
        let dictionaryLength = Object.keys(RemIn.getCompendium().dictionary).length;
        return dictionaryLength;
      }

      update() {
        Window_Selectable.prototype.update.call(this);
        this.refresh();
      }

      drawItem(index) {
        let rect = this.itemRectForText(index);
        let item = this._list[index];
        this.drawText(item.name.capitalize(), rect.x, rect.y, rect.width);
      }

      getCurrentWord() {
        return this._list[this.index()].name;
      }
    }

//=============================================================================
// Window_WordTitle                                                             
//=============================================================================

    class Window_WordTitle extends Window_Base {
      constructor(x, y, width, height) {
        super(x, y, width, height);
      }

      initialize(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._word = "";
      }

      update() {
        Window_Base.prototype.update.call(this);
        this.refresh();
      }

      refresh() {
        if(this.contents) {
          this.contents.clear();
          this.drawTitle();
        }
      }

      drawTitle(index) {
        let word = this._word;
        let midPoint = ((this.contentsWidth()) / 2) - ((this.textWidth(word)) / 2);
        this.drawText(word.capitalize(), midPoint, 0, 300);
      }
    }
//=============================================================================
// Window_Word
//=============================================================================

    class Window_Word extends Window_Base {
      constructor(x, y, width, height) {
        super(x, y, width, height);
      }

      initialize(x, y, width, height) {
        this._dictionary = RemIn.getCompendium().dictionary;
        this._list = [];
        this.currentWord = [];
        this._workingIndex = 0;
        this.insertDictionaryDefinitions();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
      }

      insertDictionaryDefinitions() {
        for(let word in this._dictionary) {
          this._list.push({name: this._dictionary[word].originalFileName, definition: this._dictionary[word].text});
        }
      }

      setIndex(value) {
        if(value > -1)
          this._workingIndex = value;
      }

      update() {
        Window_Base.prototype.update.call(this);
        this.refresh();
      }

      refresh() {
        if(this.contents) {
          this.contents.clear();
          this.drawItem();
        }
      }

      drawItem() {
        let index = this._workingIndex;
        if(index > -1 && index !== undefined) {
          this.drawDefinition(index);
        }
      }

      drawDefinition(index) {
        let definition = this._list[index].definition;
        this.drawTextEx(definition, 0, 0);
      }

      drawTextEx(text, x, y) {
        if (text) {
          let textState = { index: 0, x: x, y: y, left: x };
          textState.text = this.convertEscapeCharacters(text);
          textState.height = this.calcTextHeight(textState, false);
          this.resetFontSettings();
          this.wordShiftAmount = textState.left;
          this.currentWord.length = 0;
          while (textState.index < textState.text.length) {
            this.processCharacter(textState);
          }
          return textState.x - x;
        } else {
          return 0;
        }
      }

      processNormalCharacter(textState) {
        let num = textState.index++;
        let char = textState.text[num];
        let length = textState.text.length;
        let charWidth = this.textWidth(char);

        if(/\w/ig.test(char)) {
          this.updateWordArray(char, textState);
        }

        if( (/\s/ig.test(char) || /[\W]/ig.test(char) || (length === (num + 1))) && this.currentWord.length > 0) {
          let word = this.createWord(this.currentWord);
          let firstLetter = this.currentWord[0];
          let wordWidth = this.textWidth(word);

          if(firstLetter.x + wordWidth > this.contentsWidth()){
            this.updateTextStateAndShiftAmount(firstLetter, wordWidth, textState);
          }

          word = (!/[\W]/ig.test(char) && (length === (num + 1))) ? word : word+char;
          this.contents.drawText(word, firstLetter.x, firstLetter.y,  wordWidth * 2, firstLetter.align);
          this.currentWord.length = 0;
        }

        textState.x += charWidth;
      }

      updateWordArray(char, textState) {
        let x = this.currentWord.length === 0 ? (this.wordShiftAmount + textState.x) : textState.x;
        let charWidth = this.textWidth(char);
        this.currentWord.push({char, x, y: textState.y, width: charWidth * 2, align: textState.height});
      }

      createWord(letterArray) {
        let word = letterArray.map(function(element){
          return element.char;
        });
        return word.join("");
      }

      updateTextStateAndShiftAmount(firstLetter, wordWidth, textState) {
        textState.x = textState.left;
        textState.y += textState.height;
        firstLetter.x = textState.x;
        firstLetter.y = textState.y;
        firstLetter.align = textState.height;
        this.wordShiftAmount = firstLetter.x + wordWidth;
      }
    }
//=============================================================================
// String
//=============================================================================
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
//=============================================================================
// SceneManager
//=============================================================================
    SceneManager.gotoDictionaryScene = function() {
      SceneManager.push(Scene_RemDictionary);
    };
  }

  Setup();
})();
