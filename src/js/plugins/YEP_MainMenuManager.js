//=============================================================================
// Yanfly Engine Plugins - Main Menu Core
// YEP_MainMenuManager.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MainMenuManager = true;

var Yanfly = Yanfly || {};
Yanfly.MMM = Yanfly.MMM || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 Esse plugin permite você a manejar os vários aspectos
 * do seu menu principal.
 * @author Yanfly Engine Plugins
 *
 * @param ---Command---
 * @default
 *
 * @param Command Alignment
 * @desc Esse é o alinhamento de texto para a Janela de Comando.
 * left     center     right
 * @default left
 *
 * @param Command Position
 * @desc Determina a posição da janela de comando.
 * left     right
 * @default left
 *
 * @param Command Columns
 * @desc Quantidade de colunas a serem mostradas pela janela de comando.
 * Default: 1
 * @default 1
 *
 * @param Command Rows
 * @desc O número de linhas visíveis na janela de comando.
 * @default Math.min(10, Math.ceil(this.maxItems() / this.maxCols()))
 *
 * @param Command Width
 * @desc Essa é a largura em pixels da janela de comando.
 * Default: 240
 * @default 240
 *
 * @param Hide Actor Window
 * @desc Do you wish to hide the main actor window?
 * NO - false     YES - true
 * @default false
 *
 * @param Hide Gold Window
 * @desc Do you wish to hide the gold window?
 * NO - false     YES - true
 * @default false
 *
 * @param Blurry Background
 * @desc Do you wish to have a blurry background?
 * NO - false     YES - true     Default: true
 * @default true
 *
 * @param ---Menu 1---
 * @default
 *
 * @param Menu 1 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 1 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 1 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 1 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 1 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 1 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 1 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 2---
 * @default
 *
 * @param Menu 2 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 2 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 2 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 2 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 2 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 2 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 2 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 3---
 * @default
 *
 * @param Menu 3 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 3 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 3 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 3 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 3 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 3 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 3 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 4---
 * @default
 *
 * @param Menu 4 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 4 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 4 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 4 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 4 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 4 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 4 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 5---
 * @default
 *
 * @param Menu 5 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 5 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 5 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 5 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 5 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 5 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 5 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 6---
 * @default
 *
 * @param Menu 6 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 6 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 6 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 6 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 6 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 6 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 6 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 7---
 * @default
 *
 * @param Menu 7 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 7 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 7 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 7 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 7 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 7 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 7 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 8---
 * @default
 *
 * @param Menu 8 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 8 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 8 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 8 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 8 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 8 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 8 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 9---
 * @default
 *
 * @param Menu 9 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 9 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 9 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 9 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 9 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 9 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 9 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 10---
 * @default
 *
 * @param Menu 10 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default TextManager.item
 *
 * @param Menu 10 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default item
 *
 * @param Menu 10 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default this.needsCommand('item')
 *
 * @param Menu 10 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default this.areMainCommandsEnabled()
 *
 * @param Menu 10 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 10 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandItem.bind(this)
 *
 * @param Menu 10 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 11---
 * @default
 *
 * @param Menu 11 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 11 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 11 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 11 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 11 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 11 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 11 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 12---
 * @default
 *
 * @param Menu 12 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 12 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 12 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 12 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 12 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 12 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 12 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 13---
 * @default
 *
 * @param Menu 13 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 13 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 13 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 13 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 13 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 13 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 13 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 14---
 * @default
 *
 * @param Menu 14 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 14 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 14 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 14 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 14 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 14 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 14 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 15---
 * @default
 *
 * @param Menu 15 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default TextManager.skill
 *
 * @param Menu 15 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default skill
 *
 * @param Menu 15 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default this.needsCommand('skill')
 *
 * @param Menu 15 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default this.areMainCommandsEnabled()
 *
 * @param Menu 15 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 15 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandPersonal.bind(this)
 *
 * @param Menu 15 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default SceneManager.push(Scene_Skill)
 *
 * @param ---Menu 16---
 * @default
 *
 * @param Menu 16 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 16 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 16 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 16 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 16 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 16 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 16 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 17---
 * @default
 *
 * @param Menu 17 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 17 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 17 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 17 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 17 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 17 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 17 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 18---
 * @default
 *
 * @param Menu 18 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 18 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 18 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 18 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 18 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 18 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 18 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 19---
 * @default
 *
 * @param Menu 19 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 19 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 19 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 19 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 19 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 19 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 19 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 20---
 * @default
 *
 * @param Menu 20 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default TextManager.equip
 *
 * @param Menu 20 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default equip
 *
 * @param Menu 20 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default this.needsCommand('equip')
 *
 * @param Menu 20 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default this.areMainCommandsEnabled()
 *
 * @param Menu 20 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 20 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandPersonal.bind(this)
 *
 * @param Menu 20 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default SceneManager.push(Scene_Equip)
 *
 * @param ---Menu 21---
 * @default
 *
 * @param Menu 21 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 21 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 21 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 21 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 21 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 21 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 21 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 22---
 * @default
 *
 * @param Menu 22 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 22 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 22 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 22 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 22 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 22 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 22 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 23---
 * @default
 *
 * @param Menu 23 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 23 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 23 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 23 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 23 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 23 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 23 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 24---
 * @default
 *
 * @param Menu 24 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 24 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 24 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 24 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 24 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 24 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 24 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 25---
 * @default
 *
 * @param Menu 25 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default Yanfly.Param.CCCCmdName
 *
 * @param Menu 25 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default class
 *
 * @param Menu 25 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default Imported.YEP_ClassChangeCore && $gameSystem.isShowClass()
 *
 * @param Menu 25 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default $gameSystem.isEnableClass() && this.areMainCommandsEnabled()
 *
 * @param Menu 25 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 25 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandPersonal.bind(this)
 *
 * @param Menu 25 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default SceneManager.push(Scene_Class)
 *
 * @param ---Menu 26---
 * @default
 *
 * @param Menu 26 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 26 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 26 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 26 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 26 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 26 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 26 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 27---
 * @default
 *
 * @param Menu 27 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 27 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 27 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 27 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 27 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 27 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 27 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 28---
 * @default
 *
 * @param Menu 28 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 28 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 28 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 28 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 28 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 28 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 28 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 29---
 * @default
 *
 * @param Menu 29 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 29 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 29 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 29 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 29 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 29 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 29 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 30---
 * @default
 *
 * @param Menu 30 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 30 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 30 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 30 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 30 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 30 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 30 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 31---
 * @default
 *
 * @param Menu 31 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 31 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 31 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 31 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 31 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 31 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 31 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 32---
 * @default
 *
 * @param Menu 32 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 32 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 32 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 32 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 32 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 32 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 32 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 33---
 * @default
 *
 * @param Menu 33 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 33 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 33 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 33 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 33 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 33 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 33 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 34---
 * @default
 *
 * @param Menu 34 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 34 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 34 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 34 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 34 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 34 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 34 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 35---
 * @default
 *
 * @param Menu 35 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 35 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 35 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 35 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 35 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 35 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 35 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 36---
 * @default
 *
 * @param Menu 36 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 36 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 36 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 36 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 36 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 36 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 36 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 37---
 * @default
 *
 * @param Menu 37 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 37 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 37 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 37 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 37 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 37 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 37 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 38---
 * @default
 *
 * @param Menu 38 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 38 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 38 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 38 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 38 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 38 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 38 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 39---
 * @default
 *
 * @param Menu 39 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 39 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 39 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 39 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 39 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 39 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 39 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 40---
 * @default
 *
 * @param Menu 40 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 40 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 40 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 40 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 40 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 40 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 40 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 41---
 * @default
 *
 * @param Menu 41 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 41 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 41 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 41 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 41 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 41 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 41 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 42---
 * @default
 *
 * @param Menu 42 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 42 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 42 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 42 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 42 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 42 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 42 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 43---
 * @default
 *
 * @param Menu 43 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 43 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 43 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 43 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 43 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 43 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 43 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 44---
 * @default
 *
 * @param Menu 44 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 44 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 44 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 44 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 44 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 44 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 44 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 45---
 * @default
 *
 * @param Menu 45 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 45 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 45 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 45 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 45 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 45 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 45 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 46---
 * @default
 *
 * @param Menu 46 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 46 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 46 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 46 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 46 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 46 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 46 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 47---
 * @default
 *
 * @param Menu 47 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 47 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 47 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 47 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 47 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 47 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 47 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 48---
 * @default
 *
 * @param Menu 48 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 48 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 48 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 48 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 48 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 48 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 48 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 49---
 * @default
 *
 * @param Menu 49 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 49 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 49 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 49 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 49 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 49 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 49 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 50---
 * @default
 *
 * @param Menu 50 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default TextManager.status
 *
 * @param Menu 50 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default status
 *
 * @param Menu 50 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default this.needsCommand('status')
 *
 * @param Menu 50 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default this.areMainCommandsEnabled()
 *
 * @param Menu 50 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 50 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandPersonal.bind(this)
 *
 * @param Menu 50 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default SceneManager.push(Scene_Status)
 *
 * @param ---Menu 51---
 * @default
 *
 * @param Menu 51 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 51 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 51 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 51 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 51 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 51 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 51 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 52---
 * @default
 *
 * @param Menu 52 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 52 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 52 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 52 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 52 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 52 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 52 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 53---
 * @default
 *
 * @param Menu 53 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 53 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 53 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 53 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 53 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 53 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 53 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 54---
 * @default
 *
 * @param Menu 54 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 54 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 54 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 54 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 54 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 54 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 54 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 55---
 * @default
 *
 * @param Menu 55 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default TextManager.formation
 *
 * @param Menu 55 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default formation
 *
 * @param Menu 55 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default this.needsCommand('formation')
 *
 * @param Menu 55 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default this.isFormationEnabled()
 *
 * @param Menu 55 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 55 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandFormation.bind(this)
 *
 * @param Menu 55 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 56---
 * @default
 *
 * @param Menu 56 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 56 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 56 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 56 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 56 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 56 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 56 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 57---
 * @default
 *
 * @param Menu 57 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 57 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 57 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 57 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 57 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 57 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 57 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 58---
 * @default
 *
 * @param Menu 58 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 58 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 58 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 58 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 58 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 58 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 58 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 59---
 * @default
 *
 * @param Menu 59 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 59 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 59 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 59 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 59 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 59 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 59 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 60---
 * @default
 *
 * @param Menu 60 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 60 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 60 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 60 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 60 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 60 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 60 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 61---
 * @default
 *
 * @param Menu 61 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 61 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 61 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 61 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 61 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 61 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 61 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 62---
 * @default
 *
 * @param Menu 62 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 62 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 62 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 62 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 62 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 62 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 62 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 63---
 * @default
 *
 * @param Menu 63 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 63 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 63 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 63 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 63 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 63 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 63 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 64---
 * @default
 *
 * @param Menu 64 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 64 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 64 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 64 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 64 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 64 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 64 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 65---
 * @default
 *
 * @param Menu 65 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 65 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 65 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 65 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 65 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 65 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 65 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 66---
 * @default
 *
 * @param Menu 66 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 66 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 66 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 66 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 66 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 66 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 66 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 67---
 * @default
 *
 * @param Menu 67 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 67 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 67 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 67 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 67 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 67 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 67 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 68---
 * @default
 *
 * @param Menu 68 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 68 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 68 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 68 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 68 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 68 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 68 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 69---
 * @default
 *
 * @param Menu 69 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 69 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 69 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 69 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 69 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 69 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 69 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 70---
 * @default
 *
 * @param Menu 70 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 70 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 70 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 70 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 70 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 70 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 70 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 71---
 * @default
 *
 * @param Menu 71 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 71 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 71 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 71 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 71 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 71 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 71 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 72---
 * @default
 *
 * @param Menu 72 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 72 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 72 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 72 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 72 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 72 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 72 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 73---
 * @default
 *
 * @param Menu 73 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 73 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 73 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 73 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 73 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 73 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 73 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 74---
 * @default
 *
 * @param Menu 74 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 74 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 74 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 74 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 74 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 74 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 74 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 75---
 * @default
 *
 * @param Menu 75 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 75 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 75 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 75 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 75 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 75 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 75 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 76---
 * @default
 *
 * @param Menu 76 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 76 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 76 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 76 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 76 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 76 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 76 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 77---
 * @default
 *
 * @param Menu 77 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 77 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 77 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 77 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 77 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 77 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 77 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 78---
 * @default
 *
 * @param Menu 78 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 78 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 78 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 78 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 78 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 78 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 78 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 79---
 * @default
 *
 * @param Menu 79 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 79 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 79 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 79 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 79 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 79 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 79 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 80---
 * @default
 *
 * @param Menu 80 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 80 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 80 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 80 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 80 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 80 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 80 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 81---
 * @default
 *
 * @param Menu 81 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default 'Common Event 1'
 *
 * @param Menu 81 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default common event
 *
 * @param Menu 81 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default false
 *
 * @param Menu 81 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default true
 *
 * @param Menu 81 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default 1
 *
 * @param Menu 81 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.callCommonEvent.bind(this)
 *
 * @param Menu 81 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 82---
 * @default
 *
 * @param Menu 82 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default 'Common Event 2'
 *
 * @param Menu 82 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default common event
 *
 * @param Menu 82 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default false
 *
 * @param Menu 82 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default true
 *
 * @param Menu 82 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default 2
 *
 * @param Menu 82 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.callCommonEvent.bind(this)
 *
 * @param Menu 82 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 83---
 * @default
 *
 * @param Menu 83 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default 'Common Event 3'
 *
 * @param Menu 83 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default common event
 *
 * @param Menu 83 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default false
 *
 * @param Menu 83 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default true
 *
 * @param Menu 83 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default 3
 *
 * @param Menu 83 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.callCommonEvent.bind(this)
 *
 * @param Menu 83 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 84---
 * @default
 *
 * @param Menu 84 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 84 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 84 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 84 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 84 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 84 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 84 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 85---
 * @default
 *
 * @param Menu 85 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 85 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 85 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 85 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 85 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 85 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 85 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 86---
 * @default
 *
 * @param Menu 86 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 86 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 86 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 86 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 86 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 86 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 86 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 87---
 * @default
 *
 * @param Menu 87 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 87 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 87 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 87 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 87 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 87 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 87 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 88---
 * @default
 *
 * @param Menu 88 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 88 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 88 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 88 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 88 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 88 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 88 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 89---
 * @default
 *
 * @param Menu 89 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 89 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 89 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 89 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 89 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 89 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 89 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 90---
 * @default
 *
 * @param Menu 90 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default TextManager.options
 *
 * @param Menu 90 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default options
 *
 * @param Menu 90 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default this.needsCommand('options')
 *
 * @param Menu 90 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default this.isOptionsEnabled()
 *
 * @param Menu 90 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 90 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandOptions.bind(this)
 *
 * @param Menu 90 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 91---
 * @default
 *
 * @param Menu 91 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 91 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 91 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 91 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 91 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 91 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 91 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 92---
 * @default
 *
 * @param Menu 92 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 92 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 92 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 92 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 92 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 92 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 92 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 93---
 * @default
 *
 * @param Menu 93 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 93 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 93 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 93 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 93 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 93 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 93 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 94---
 * @default
 *
 * @param Menu 94 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 94 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 94 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 94 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 94 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 94 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 94 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 95---
 * @default
 *
 * @param Menu 95 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default TextManager.save
 *
 * @param Menu 95 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default save
 *
 * @param Menu 95 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default this.needsCommand('save')
 *
 * @param Menu 95 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default this.isSaveEnabled()
 *
 * @param Menu 95 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 95 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandSave.bind(this)
 *
 * @param Menu 95 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 96---
 * @default
 *
 * @param Menu 96 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 96 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 96 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 96 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 96 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 96 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 96 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 97---
 * @default
 *
 * @param Menu 97 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 97 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 97 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 97 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 97 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 97 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 97 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 98---
 * @default
 *
 * @param Menu 98 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default
 *
 * @param Menu 98 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default
 *
 * @param Menu 98 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default
 *
 * @param Menu 98 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default
 *
 * @param Menu 98 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 98 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default
 *
 * @param Menu 98 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 99---
 * @default
 *
 * @param Menu 99 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default 'Debug'
 *
 * @param Menu 99 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default debug
 *
 * @param Menu 99 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default $gameTemp.isPlaytest()
 *
 * @param Menu 99 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default true
 *
 * @param Menu 99 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 99 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandDebug.bind(this)
 *
 * @param Menu 99 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @param ---Menu 100---
 * @default
 *
 * @param Menu 100 Name
 * @desc Esse é o nome para o comando do menu. Isso é um eval. Para fazê-lo em
 * string, use 'aspas' em volta do nome.
 * @default TextManager.gameEnd
 *
 * @param Menu 100 Symbol
 * @desc Esse é o símbolo para o comando do menu. Isso precisa ser único pra
 * cada comando de menu.
 * @default gameEnd
 *
 * @param Menu 100 Show
 * @desc Essa é a condição eval para esse comando de menu aparecer.
 * @default true
 *
 * @param Menu 100 Enabled
 * @desc Esse comando de menu está habilitado? Isso é um eval.
 * @default this.isGameEndEnabled()
 *
 * @param Menu 100 Ext
 * @desc Essa é a extensão do comando do menu. Isso é um eval.
 * @default
 *
 * @param Menu 100 Main Bind
 * @desc Essa é a função ativada por esse comando de menu.
 * Isso é um eval.
 * @default this.commandGameEnd.bind(this)
 *
 * @param Menu 100 Actor Bind
 * @desc Se o comando de menu conduzir a selecionar um personagem, essa é a
 * função ativada depois de selecionar um personagem.
 * @default
 *
 * @help
 * ============================================================================
 * Introdução
 * ============================================================================
 *
 * Para aqueles que queiram alterar os vários aspectos dos comandos do menu
 * principal sem precisar tocar no código fonte, podem usar esse plugin pra
 * fazer isso. Embora esse plugin principalmente transporta o processo de
 * criação de menu para os parâmetros do Plugin Manager, ele permite um
 * jeito mais limpo de manusear o processo de manejar o comando de menu.
 *
 * ============================================================================
 * Como Usar Esse Plugin
 * ============================================================================
 *
 * Cada seção nos parâmetros é dividida em várias partes. Cada uma dessas
 * partes desempenham um papel em como funciona o comando de menu. Aqui é
 * o que cada parte faz:
 *
 * Name
 * - Isso é como o comando irá aparecer visualmente no menu principal. Isso
 * é um eval, ou seja, é dirigido por código. Se você quiser que o comando
 * apareça como ele é, use 'aspas' em volta dele.
 *
 * Symbol
 * - Esse é o identificador para o comando. Cada comando deve ter um símbolo
 * único, para não causar conflitos com cada comando. Porém, símbolos
 * compartilhados são perfeitamente aceitáveis desde que você não se importe
 * que eles realizem a mesma função quando selecionados.
 *
 * Show
 * -  Isso é uma condição eval para se o comando aparece no menu principal
 * ou não. Se você quiser que isso sempre apareça, simplesmente use 'true'
 * sem aspas.
 *
 * Enabled
 * -  Isso é uma condição eval para se o comando está habilitado ou não. A
 * diferença entre mostrar um comando e habilitar um comando é que um comando
 * pode mostar, mas ele não pode ser selecionado porque ele não está habilitado.
 * Se você quiser que esse comando sempre esteja habilitado, use 'true' sem
 * aspas.
 *
 * Ext
 * - Significa extensão. Isso serve como um símbolo secundário para o comando
 * e ele pode ser usado pra praticamente tudo. Ele não tem nenhum impacto
 * direto no comando a não ser que o objetivo do comando é relacionado ao
 * valor da extensão. A maioria dos comandos não precisam fazer uso do valor
 * Ext.
 *
 * Main Bind
 * - Isso é uma função eval que é para ser executada quando esse comando é
 * selecionado diretamente do menu principal. A função que é pra ser sujeita
 * a esse comando precisa ser acessível do Scene_Menu de uma forma ou outra.
 * Para comandos que são feitos para selecionar um personagem primeiro, use
 * 'this.commandItem.bind(this)' sem aspas.
 *
 * Actor Bind
 * - Isso é uma função eval que é para ser executada quando um personagem é
 * selecionado depois de escolher esse comando, normalmente para empurrar
 * uma cena. Essa função não é necessária para nenhum comandos de menu que
 * não requerem selecionar um personagem.
 *
 * ============================================================================
 * Exemplos
 * ============================================================================
 *
 * Aqui estão alguns exemplos para ajudar você a adicionar/alterar/mudar a
 * forma com que comandos aparecem para seu menu principal.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *       Name: TextManager.item
 *     Symbol: item
 *       Show: this.needsCommand('item')
 *    Enabled: this.areMainCommandsEnabled()
 *        Ext:
 *  Main Bind: this.commandItem.bind(this)
 * Actor Bind:
 *
 * O comando de item é feito usando o exemplo acima. 'TextManager.item' é como
 * o nome do comando irá aparecer. Ele chama a informação do nome da entrada
 * do Text Manager no banco de dados por 'Item' e usa qualquer coisa que
 * você por no banco de dados aqui. O símbolo 'item' é usado para fazer o
 * indentificador único do comando de item. Para o comando mostrar, ele vai
 * executar uma função 'needsCommand' para checar se ele vai aparecer. Essa
 * função 'needsCommand' é relacionada ao seu banco de dados em se você quer
 * ou não que o item apareça lá. Para esse comando ser habilitado, ele vai
 * checar se os comandos principais estão habilitados ou não, no qual é
 * relacionado em que se há ou não personagens na party atual. E finalmente,
 * a linha de código 'this.commandItem.bind(this)' é o comando que vai executar
 * depois que a entrada de item for selecionada.

 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *       Name: TextManager.skill
 *     Symbol: skill
 *       Show: this.needsCommand('skill')
 *    Enabled: this.areMainCommandsEnabled()
 *        Ext:
 *  Main Bind: this.commandPersonal.bind(this)
 * Actor Bind: SceneManager.push(Scene_Skill)
 *
 * O comando de habilidade é feito usando o exemplo acima. 'TextManger.skill'
 * é como o nome do comando irá aparecer. Ele chama a informação do nome da
 * entrada do Text Manager no banco de dados por 'Skill' e usa qualquer coisa
 * que você por no banco de dados aqui. O símbolo 'skill' é usado para fazer o
 * indentificador único do comando de habilidade. Para o comando mostrar, ele
 * vai executar uma função 'needsCommand' para checar se ele vai aparecer. Essa
 * função 'needsCommand' é relacionada ao seu banco de dados em se você quer
 * ou não que a habilidade apareça lá. Para esse comando ser habilitado, ele
 * vai checar se os comandos principais estão habilitados ou não, no qual é
 * relacionado em que se há ou não personagens na party atual. Dessa vez, o
 * comando main bind é pra mandar o jogador para o processo de selecionamento
 * de personagem usando 'this.commandPersonal.bind(this)' em vez disso. Depois
 * que o jogador selecionar um personagem, 'SceneManager.push(Scene_Skill)' é
 * então executado para mandar o jogador para Scene_Skill para manejar as
 * habilidades do personagem.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *       Name: 'Common Event 1'
 *     Symbol: common event
 *       Show: false
 *    Enabled: true
 *        Ext: 1
 *  Main Bind: this.callCommonEvent.bind(this)
 * Actor Bind:
 *
 * Esse é um comando personalizado que é incluso por padrão com o plugin.
 * O nome desse comando é 'Common Event 1', mas ele pode ser mudado para o
 * que você quiser simplesmente mudando o que está dentro das 'aspas' nas
 * configurações dos parâmetros. O símbolo é o indentificador para todos os
 * eventos comuns. Porém, por padrão, esse item de evento comum não é mostrado
 * no menu principal. Se você quiser que ele apareça, estabeleça a opção Show
 * para 'true' sem aspas e ele irá aparecer. Já que a opção habilitada é
 * 'true', o comando pode ser sempre selecionado pelo jogador. O Ext tem
 * um desempenho nesse comando. O Ext determina qual evento comum é pra ser
 * executado. Nesse exemplo, o valor do Ext é 1, o que significa que o evento
 * comum 1 será executado quando esse comando for selecionado. Se o valor do
 * Ext for 25, vai ser evento comum 25 que será executado quando esse comando
 * for selecionado. O motivo é porque o Main Bind dessa opção de comando é
 * 'this.callCommonEvent.bind(this)', que é uma função inclusa nesse plugin
 * para permitir que eventos comuns sejamm executados.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - The gold window will now match the command window's width.
 *
 * Version 1.01:
 * - Added 'Hide Actor Window', 'Hide Gold Window', 'Blurry Background'
 * parameters for the plugin settings.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MainMenuManager');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MMMCmdAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.MMMCmdPosition = String(Yanfly.Parameters['Command Position']);
Yanfly.Param.MMMCmdCols = String(Yanfly.Parameters['Command Columns']);
Yanfly.Param.MMMCmdRows = String(Yanfly.Parameters['Command Rows']);
Yanfly.Param.MMMCmdWidth = String(Yanfly.Parameters['Command Width']);
Yanfly.Param.MMMHideActorWin = String(Yanfly.Parameters['Hide Actor Window']);
Yanfly.Param.MMMHideGoldWin = String(Yanfly.Parameters['Hide Gold Window']);
Yanfly.Param.MMMBlurryBG = String(Yanfly.Parameters['Blurry Background']);
Yanfly.MMM.Name = {};
Yanfly.MMM.Symbol = {};
Yanfly.MMM.Show = {};
Yanfly.MMM.Enabled = {};
Yanfly.MMM.Ext = {};
Yanfly.MMM.MainBind = {};
Yanfly.MMM.ActorBind = {};
for (Yanfly.i = 1; Yanfly.i <= 100; ++Yanfly.i) {
  Yanfly.line = "String(Yanfly.Parameters['Menu " + Yanfly.i + " Name'])";
  Yanfly.MMM.Name[Yanfly.i] = eval(Yanfly.line);
  Yanfly.line = "String(Yanfly.Parameters['Menu " + Yanfly.i + " Symbol'])";
  Yanfly.MMM.Symbol[Yanfly.i] = eval(Yanfly.line);
  Yanfly.line = "String(Yanfly.Parameters['Menu " + Yanfly.i + " Show'])";
  Yanfly.MMM.Show[Yanfly.i] = eval(Yanfly.line);
  Yanfly.line = "String(Yanfly.Parameters['Menu " + Yanfly.i + " Enabled'])";
  Yanfly.MMM.Enabled[Yanfly.i] = eval(Yanfly.line);
  Yanfly.line = "String(Yanfly.Parameters['Menu " + Yanfly.i + " Ext'])";
  Yanfly.MMM.Ext[Yanfly.i] = eval(Yanfly.line);
  Yanfly.line = "String(Yanfly.Parameters['Menu " + Yanfly.i + " Main Bind'])";
  Yanfly.MMM.MainBind[Yanfly.i] = eval(Yanfly.line);
  Yanfly.line = "String(Yanfly.Parameters['Menu " + Yanfly.i + " Actor Bind'])";
  Yanfly.MMM.ActorBind[Yanfly.i] = eval(Yanfly.line);
};

//=============================================================================
// SceneManager
//=============================================================================

Yanfly.MMM.SceneManager_snapForBackground = SceneManager.snapForBackground;
SceneManager.snapForBackground = function() {
    if (eval(Yanfly.Param.MMMBlurryBG)) {
      Yanfly.MMM.SceneManager_snapForBackground.call(this);
    } else {
      this._backgroundBitmap = this.snap();
    }
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Window_MenuCommand.prototype.makeCommandList = function() {
    for (var i = 1; i <= 100; ++i) {
      this.createCommand(i);
    }
};

Window_MenuCommand.prototype.addMainCommands = function() {
};

Window_MenuCommand.prototype.addFormationCommand = function() {
};

Window_MenuCommand.prototype.addOriginalCommands = function() {
};

Window_MenuCommand.prototype.addOptionsCommand = function() {
};

Window_MenuCommand.prototype.addSaveCommand = function() {
};

Window_MenuCommand.prototype.addGameEndCommand = function() {
};

Window_MenuCommand.prototype.createCommand = function(i) {
    var show = Yanfly.MMM.Show[i];
    if (show === '') return;
    if (!eval(show)) return;
    var name = Yanfly.MMM.Name[i];
    if (name === '') return;
    name = eval(name);
    var symbol = Yanfly.MMM.Symbol[i];
    if (symbol === '') return;
    var enabled = eval(Yanfly.MMM.Enabled[i]);
    if (enabled === '') enabled = true;
    var ext = eval(Yanfly.MMM.Ext[i]);
    this.addCommand(name, symbol, enabled, ext);
    this.addSymbolBridge(symbol);
};

Window_MenuCommand.prototype.addSymbolBridge = function(symbol) {
    if (symbol === 'item') this.addMainCommands();
    if (symbol === 'formation') this.addFormationCommand();
    if (symbol === 'formation') this.addOriginalCommands();
    if (symbol === 'options') this.addOptionsCommand();
    if (symbol === 'save') this.addSaveCommand();
    if (symbol === 'gameEnd') this.addGameEndCommand();
};

Window_MenuCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.MMMCmdAlign;
};

Window_MenuCommand.prototype.windowWidth = function() {
    return eval(Yanfly.Param.MMMCmdWidth);
};

Window_MenuCommand.prototype.maxCols = function() {
    return eval(Yanfly.Param.MMMCmdCols);
};

Window_MenuCommand.prototype.numVisibleRows = function() {
    return eval(Yanfly.Param.MMMCmdRows);
};

//=============================================================================
// Window_MenuStatus
//=============================================================================

Yanfly.MMM.Window_MenuStatus_initialize =
    Window_MenuStatus.prototype.initialize;
Window_MenuStatus.prototype.initialize = function(wx, wy) {
    this._initX = wx;
    Yanfly.MMM.Window_MenuStatus_initialize.call(this, wx, wy);
};

Window_MenuStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth - this._initX;
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.MMM.Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    Yanfly.MMM.Scene_Menu_create.call(this);
    this.repositionWindows();
};

Scene_Menu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_MenuCommand(0, 0);
    this.createCommandWindowBinds();
    this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Yanfly.MMM.Scene_Menu_createGoldWindow =
    Scene_Menu.prototype.createGoldWindow;
Scene_Menu.prototype.createGoldWindow = function() {
    Yanfly.MMM.Scene_Menu_createGoldWindow.call(this);
    if (eval(Yanfly.Param.MMMHideGoldWin)) this._goldWindow.hide();
};

Yanfly.MMM.Scene_Menu_createStatusWindow =
    Scene_Menu.prototype.createStatusWindow;
Scene_Menu.prototype.createStatusWindow = function() {
    Yanfly.MMM.Scene_Menu_createStatusWindow.call(this);
    if (eval(Yanfly.Param.MMMHideActorWin)) this._statusWindow.hide();
};

Scene_Menu.prototype.createCommandWindowBinds = function() {
  this._actorBinds = {};
  for (var i = 1; i <= 100; ++i) {
    var symbol = Yanfly.MMM.Symbol[i];
    if (symbol === '') continue;
    var bind = Yanfly.MMM.MainBind[i];
    if (bind === '') continue;
    eval("this._commandWindow.setHandler('" + symbol + "', " + bind + ")");
    var actorBind = Yanfly.MMM.ActorBind[i];
    if (actorBind === '') continue;
    this._actorBinds[symbol] = actorBind;
  }
};

Scene_Menu.prototype.resizeGoldWindow = function() {
    this._goldWindow.width = this._commandWindow.width;
    this._goldWindow.createContents();
    this._goldWindow.refresh();
};

Scene_Menu.prototype.repositionWindows = function() {
    this.resizeGoldWindow();
    if (Yanfly.Param.MMMCmdPosition === 'right') {
      this._commandWindow.x = Graphics.boxWidth - this._commandWindow.width;
      this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
      this._statusWindow.x = 0;
    } else if (Yanfly.Param.MMMCmdPosition === 'left') {
      this._commandWindow.x = 0;
      this._goldWindow.x = 0;
      this._statusWindow.x = this._commandWindow.width;
    }
};

Yanfly.MMM.Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
Scene_Menu.prototype.commandPersonal = function() {
    Yanfly.MMM.Scene_Menu_commandPersonal.call(this);
    this._statusWindow.show();
};

Scene_Menu.prototype.onPersonalOk = function() {
    var symbol = this._commandWindow.currentSymbol();
    var actorBind = this._actorBinds[symbol];
    if (!actorBind) return;
    eval(actorBind);
};

Yanfly.MMM.Scene_Menu_onPersonalCancel = Scene_Menu.prototype.onPersonalCancel;
Scene_Menu.prototype.onPersonalCancel = function() {
    Yanfly.MMM.Scene_Menu_onPersonalCancel.call(this);
    if (eval(Yanfly.Param.MMMHideActorWin)) this._statusWindow.hide();
};

Scene_Menu.prototype.callCommonEvent = function() {
    var ext = this._commandWindow.currentExt();
    $gameTemp.reserveCommonEvent(parseInt(ext));
    this.popScene();
};

Scene_Menu.prototype.commandDebug = function() {
    SceneManager.push(Scene_Debug);
};

//=============================================================================
// End of File
//=============================================================================
