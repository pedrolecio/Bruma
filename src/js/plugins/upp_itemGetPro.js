/*:
 * @plugindesc Version: 1.00 | Get items with style!
 * @author William Ramsey (TheUnproPro)
 *
 * @param Sound
 * @desc Which sound is played when the warning message shows up?
 * @default Item1
 *
 * @param Volume
 * @desc Volume of the sound played
 * @default 70
 *
 * @param Pitch
 * @desc Pitch of the sound played
 * @default 100
 *
 * @param Currency Name
 * @desc What's the name of the currency in your game?
 * @default Gold
 *
 * @param Gold Message
 * @desc What message shows up when you gain gold?
 * @default You got $x gold!
 *
 * @param Gold Icon
 * @desc Icon id of the gold icon.
 * @default 314
 *
 * @param Back Color 1
 * @desc Color of the top background.
 * @default 0, 0, 0, 0.5
 *
 * @param Back Color 2
 * @desc Color of the bottom background.
 * @default 150, 150, 150, 0.5
 *
 * @param Line Color
 * @desc Color of the line.
 * @default 255, 150, 150, 0.5
 *
 * @param Timer
 * @desc How long does it stay up on the screen?
 * @default 240
 *
 * @help
 * This plugin is very easy to use! All you need to do is use
 * a plugin command. Here are a list of the things you can do.
 *
 * upp_getItem id amount - where id is the item ID number, and
 *                         amount is how many of that item you get.
 * 
 * upp_getWeapon id amount - where id is the weapon ID number, and
 *                           amount is how many of that weapon
 *                           you get.
 *
 * upp_getArmor id amount - Like before. ID is the Armor Id,
 *                          and amount is how many.
 *
 * upp_getAccessory id amount - This is the same thing as
 *                              getArmor, but it changes the
 *                              text to Accessory Get.
 *                              It's still linked to Armor ID.
 *
 * upp_getGold amount - Gives you a specified amount of gold.
 *
 * Free for commercial and non-commercial use.
 *
*/

(function() {
	var params = PluginManager.parameters("upp_itemGetPro");
	
	var bgColor = "rgba("+params['Back Color 1']+")";
	var bgColor2 = "rgba("+params['Back Color 2']+")";
	var lineColor = "rgba("+params['Line Color']+")";
	var currency=params['Currency Name'];
	
	var itemTimer = Number(params['Timer']);
	var goldMsg = params['Gold Message'];
	
	var se = {
		name: params['Sound'],
		volume: Number(params['Volume']),
		pitch: Number(params['Pitch']),
		pan: 0
	}
	
	var newItem;
	var item = null;
	var amount = 0;
	var counter=0;
	var twv2=0;
	var strCopy2 = ""
	var itemType=0;
	
	var upp_miniMapCmds = Game_Interpreter.prototype.pluginCommand
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		upp_miniMapCmds.apply(this, arguments);
		
		if(command=="upp_getItem") {
			AudioManager.playSe(se);
			newItem = true;
			item = Number(args[0]);
			amount = Number(args[1]);
			$gameParty.gainItem($dataItems[item], amount);
			counter=0;
			twv2=0;
			strCopy2="";
			itemType=0;
		}
		
		if(command=="upp_getWeapon") {
			AudioManager.playSe(se);
			newItem = true;
			item = Number(args[0]);
			amount = Number(args[1]);
			$gameParty.gainItem($dataWeapons[item], amount);
			counter=0;
			twv2=0;
			strCopy2="";
			itemType=1;
		}
		
		if(command=="upp_getArmor") {
			AudioManager.playSe(se);
			newItem = true;
			item = Number(args[0]);
			amount = Number(args[1]);
			$gameParty.gainItem($dataArmors[item], amount);
			counter=0;
			twv2=0;
			strCopy2="";
			itemType=2;
		}
		
		if(command=="upp_getAccessory") {
			AudioManager.playSe(se);
			newItem = true;
			item = Number(args[0]);
			amount = Number(args[1]);
			$gameParty.gainItem($dataArmors[item], amount);
			counter=0;
			twv2=0;
			strCopy2="";
			itemType=3;
		}
		
		if(command=="upp_getGold") {
			AudioManager.playSe(se);
			newItem = true;
			item = currency
			amount = Number(args[0]);
			$gameParty.gainGold(amount);
			counter=0;
			twv2=0;
			strCopy2="";
			itemType=4;
		}
	}
	
	function Window_UppItemGet() {
		this.initialize.apply(this, arguments);
	}
	
	Window_UppItemGet.prototype = Object.create(Window_Base.prototype);
	Window_UppItemGet.prototype.constructor = Window_UppItemGet;
	
	Window_UppItemGet.prototype.initialize = function() {
		Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
		this.dfSize = this.contents.fontSize;
		this.refresh();
		twv2=0;
		strCopy2 = "";
		this.opacity=0;
		this.alpha=0;
		counter=0;
		this.y=-this.lineHeight()*2-Window_Base.prototype.standardPadding();
		this.starty=this.y;
		
		this.itemName = "";
		this.itemDesc = "";
	}
	
	Window_UppItemGet.prototype.standardPadding = function() {
		return 0;
	}
	
	Window_UppItemGet.prototype.refresh = function() {
		if(newItem == true) {
			this.contents.clear();
			var pad = Window_Base.prototype.standardPadding();
			this.contents.fillRect(0, 0, this.contents.width, this.lineHeight()+pad, bgColor);
			this.contents.fillRect(0, this.lineHeight()+pad, this.contents.width, this.lineHeight()*2, bgColor2);
			this.contents.fillRect(0, this.lineHeight()+pad-1, this.contents.width, 2, lineColor);
			this.contents.fillRect(0, this.lineHeight()*3+pad-1, this.contents.width, 2, lineColor);
			switch(itemType) {
				case 0:
					this.itemName = $dataItems[item].name;
					this.itemDesc = $dataItems[item].description;
					this.itemIcon = $dataItems[item].iconIndex;
					this.itemGet="Item Get!";
				break;
				case 1:
					this.itemName = $dataWeapons[item].name;
					this.itemDesc = $dataWeapons[item].description;
					this.itemIcon = $dataWeapons[item].iconIndex;
					this.itemGet="Weapon Get!";
				break;
				case 2:
					this.itemName = $dataArmors[item].name;
					this.itemDesc = $dataArmors[item].description;
					this.itemIcon = $dataArmors[item].iconIndex;
					this.itemGet="Armor Get!";
				break;
				case 3:
					this.itemName = $dataArmors[item].name;
					this.itemDesc = $dataArmors[item].description;
					this.itemIcon = $dataArmors[item].iconIndex;
					this.itemGet="Accessory Get!";
				break;
				case 4:
					this.itemName = currency;
					this.itemDesc = goldMsg;
					this.itemDesc = this.itemDesc.replace(/\$x/g, amount);
					this.itemIcon = 314
					this.itemGet=currency + " Get!";
				break;
			}
			this.contents.fontSize-=8;
			this.contents.drawText(this.itemGet, pad*4, pad, this.contents.width-(pad*8), this.lineHeight());
			this.contents.drawText(this.itemGet, pad*4, pad, this.contents.width-(pad*8), this.lineHeight(), 'right');
			this.contents.fontSize=this.dfSize;
			this.typeWrite(1, this.itemName + " x"+amount, pad, pad, this.contents.width-(pad*2), this.lineHeight());
			this.contents.fontSize-=4;
			this.typeWrite(0, this.itemDesc, pad, pad+this.lineHeight(), this.contents.width-(pad*2), this.lineHeight());
			this.contents.fontSize = this.dfSize;
			this.drawIcon(this.itemIcon, pad, pad);
			this.drawIcon(this.itemIcon, this.contents.width-(pad)-32, pad);
			counter+=1;
		}
		if(counter==itemTimer) { newItem=false; }
		if(counter==itemTimer+60){
				counter=0;
				this.y=-this.lineHeight()*2-Window_Base.prototype.standardPadding();
				this.tvw2=0;
				strCopy2="";
			}
	}
	
	Window_UppItemGet.prototype.typeWrite = function(row, string, x, y, width, height) {
		var pad = Window_Base.prototype.standardPadding();
		switch(row) {
			case 0:
				this.drawTextEx(this.itemDesc, x, y);
			break;
			case 1:
			while(twv2<string.length) {
				strCopy2+=string[twv2];
				twv2+=1;
				break;
			}
			this.contents.drawText(strCopy2, x, y, width, height, 'center');
			break;
		}
	}
	
	Window_UppItemGet.prototype.update = function() {
		switch(newItem) {
			case true:
				if(this.y<0) {
					this.y+=2;
					this.alpha+=(1/(this.lineHeight()*2-Window_Base.prototype.standardPadding()));
				}
			break;
			case false:	
				if(this.y>this.starty) {
					this.y-=2;
					this.alpha-=(1/(this.lineHeight()*2-Window_Base.prototype.standardPadding()));
				}
			break;
		}
		this.refresh();
	}
	
	var smcaw = Scene_Map.prototype.createAllWindows
	Scene_Map.prototype.createAllWindows = function() {
		smcaw.call(this);
		this.uppItemGet = new Window_UppItemGet();
		this.addChild(this.uppItemGet);
	}
	
	var smcm = Scene_Map.prototype.callMenu
	Scene_Map.prototype.callMenu = function() {
		smcm.call(this);
		newItem=false;
	}
	
})();