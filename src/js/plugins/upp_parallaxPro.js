/*:
 * @plugindesc Version 1.00 | Great for parallax mapping!
 * @author William Ramsey (TheUnproPro)
 *
 * @help
 *
 * This plugin allows you to have unlimited underlays and overlays.
 * You can use this plugin for parallax mapping, creating beautiful
 * water effects below the player, and amazing overlays above
 * them.
 *
 * Notes:
 * sx=Scroll X, sy=Scroll Y.
 * dx=Distance X, dy=Distance Y.
 *
 * id is the number, this is important, as overlays and underlays
 * both act as pictures and will remain displayed when switching
 * maps unless manually removed like a picture.
 *
 * Setting dx and dy to 1 means it'll follow the map the same way
 * the ground does. setting it to 2 would make it move the same way
 * a regular parallax moves. setting it to 0.5 would make it appear
 * to be much higher up.
 *
 * Blend modes are numbers (0, 1, etc). Play around with them to enjoy them!
 *
 * IMPORTANT!
 * You must delete the pictures either before or right after switching
 * maps, otherwise, the overlays/parallaxes you've set will remain on
 * the new map. Plugin commands below can teach you all you need to know.
 * 
 * Plugin commands:
 *
 * addMapOverlay id x y sx sy dx dy img blend
 * addMapParallax id x y sx sy dx dy img blend
 *
 * setOverlayOpacity id opacity (0-255)
 * setParallaxOpacity id opacity
 *
 * setOverlayLocation id x y
 * setParallaxLocation id x y
 *
 * setOverlayScroll id sx sy
 * setParallaxScroll id sx sy
 *
 * setOverlayDistance id dx dy
 * setParallaxDistance id dx dy
 *
 * setOverlayBlend id blend
 * setParallaxBlend id blend
 *
 * deleteOverlay id
 * deleteParallax id
 *
 * clearOverlays (clears all overlays)
 * clearParallaxes (clears all parallaxes)
 */
 
(function() {
	var upp_miniMapCmds = Game_Interpreter.prototype.pluginCommand
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		upp_miniMapCmds.apply(this, arguments);

		if(command == "addMapOverlay"){
			var vars = [];
			var id = args[0]
			//x
			vars[1] = Number(args[1]);
			//y
			vars[2] = Number(args[2]);
			//xs
			vars[3] = Number(args[3]);
			//ys
			vars[4] = Number(args[4]);
			//xd
			vars[5] = Number(args[5]);
			//yd
			vars[6] = Number(args[6]);
			//img
			vars[7] = args[7];
			//blend
			vars[8] = Number(args[8]);
			if(typeof $gameMap.overlays[id] != 'object') {
				$gameMap.overlays[id] = {
					x:vars[1],
					y:vars[2],
					xs:vars[3],
					ys:vars[4],
					xd:vars[5],
					yd:vars[6],
					img:vars[7],
					blend:vars[8],
					opac: 255,
					sprite: new TilingSprite(),
					delete: false
				}
				$gameMap.overlays[id].sprite.bitmap = ImageManager.loadPicture($gameMap.overlays[id].img);
			}
		}
		
		if(command == "addMapParallax"){
			var vars = [];
			var id = args[0]
			//x
			vars[1] = Number(args[1]);
			//y
			vars[2] = Number(args[2]);
			//xs
			vars[3] = Number(args[3]);
			//ys
			vars[4] = Number(args[4]);
			//xd
			vars[5] = Number(args[5]);
			//yd
			vars[6] = Number(args[6]);
			//img
			vars[7] = args[7];
			//blend
			vars[8] = Number(args[8]);
			if(typeof $gameMap.underlays[id] != 'object') {
				$gameMap.underlays[id] = {
					x:vars[1],
					y:vars[2],
					xs:vars[3],
					ys:vars[4],
					xd:vars[5],
					yd:vars[6],
					img:vars[7],
					blend:vars[8],
					opac: 255,
					sprite: new TilingSprite(),
					delete: false
				}
				$gameMap.underlays[id].sprite.bitmap = ImageManager.loadPicture($gameMap.underlays[id].img);
			}
		}
		
		if(command == "setOverlayOpacity"){
			var id = Number(args[0]);
			$gameMap.overlays[id].opac = Number(args[1]);
		}
		
		if(command == "setOverlayBlend"){
			var id = Number(args[0]);
			$gameMap.overlays[id].blend = Number(args[1]);
		}
		
		if(command == "setOverlayLocation"){
			var id = Number(args[0]);
			$gameMap.overlays[id].x = Number(args[1]);
			$gameMap.overlays[id].y = Number(args[2]);
		}
		
		if(command == "setOverlayScroll"){
			var id = Number(args[0]);
			$gameMap.overlays[id].xs = Number(args[1]);
			$gameMap.overlays[id].ys = Number(args[2]);
		}
		
		if(command == "setOverlayDistance"){
			var id = Number(args[0]);
			$gameMap.overlays[id].xd = Number(args[1]);
			$gameMap.overlays[id].yd = Number(args[2]);
		}
		
		if(command == "setParallaxOpacity"){
			var id = Number(args[0]);
			$gameMap.underlays[id].opac = Number(args[1]);
		}
		
		if(command == "setParallaxBlend"){
			var id = Number(args[0]);
			$gameMap.underlays[id].blend = Number(args[1]);
		}
		
		if(command == "setParallaxLocation"){
			var id = Number(args[0]);
			$gameMap.underlays[id].x = Number(args[1]);
			$gameMap.underlays[id].y = Number(args[2]);
		}
		
		if(command == "setParallaxScroll"){
			var id = Number(args[0]);
			$gameMap.underlays[id].xs = Number(args[1]);
			$gameMap.underlays[id].ys = Number(args[2]);
		}
		
		if(command == "setParallaxDistance"){
			var id = Number(args[0]);
			$gameMap.underlays[id].xd = Number(args[1]);
			$gameMap.underlays[id].yd = Number(args[2]);
		}
		
		if(command == "deleteOverlay"){
			var id = Number(args[0]);
			if(typeof $gameMap.overlays[id] == 'object') {
				$gameMap.overlays[id].delete = true;
			}
		}
		
		if(command == "deleteParallax"){
			var id = Number(args[0]);
			if(typeof $gameMap.underlays[id] == 'object') {
				$gameMap.underlays[id].delete = true;
			}
		}
		
		if(command == "clearOverlays"){
			for(var i=0;i<$gameMap.overlays.length;i++) {
				if(typeof $gameMap.overlays[i] == 'object') {
					$gameMap.overlays[i].delete = true;
				}
			}
		}
		
		if(command == "clearUnderlays"){
			for(var i=0;i<$gameMap.underlays.length;i++) {
				if(typeof $gameMap.underlays[i] == 'object') {
					$gameMap.underlays[i].delete = true;
				}
			}
		}
	}
	var smsAlias = Game_Map.prototype.initialize
	Game_Map.prototype.initialize = function() {
		smsAlias.call(this);
		this.overlays=[];
		this.underlays=[];
	}
	
	var smInit = Scene_Map.prototype.initialize
	Scene_Map.prototype.initialize = function() {
		smInit.call(this);
		this.created=[];
		this.ucreated=[];
	}
	
	var smAlias = Scene_Map.prototype.start
	Scene_Map.prototype.start = function() {
		smAlias.call(this);
	}
	
	var smUpdate = Scene_Map.prototype.update
	Scene_Map.prototype.update = function() {
		smUpdate.call(this);
		for(var i=0;i<$gameMap.overlays.length;i++) {
			if(typeof $gameMap.overlays[i] == 'object') {
				if(this.created[i]!=true) {
					if($gameMap.overlays[i].sprite == null) {
						$gameMap.overlays[i].sprite = new TilingSprite();
						$gameMap.overlays[i].sprite.bitmap = ImageManager.loadPicture($gameMap.overlays[i].img);
					}
					this.addOverlay($gameMap.overlays[i].sprite, 1);
					this.created[i]=true;
					$gameMap.overlays[i].sprite.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
					$gameMap.overlays[i].sprite.origin.x=$gameMap.overlays[i].x;
					$gameMap.overlays[i].sprite.origin.y=$gameMap.overlays[i].y;
					$gameMap.overlays[i].sprite.blendMode=$gameMap.overlays[i].blend;
				}
				$gameMap.overlays[i].x -= $gameMap.overlays[i].xs;
				$gameMap.overlays[i].y -= $gameMap.overlays[i].ys;
				$gameMap.overlays[i].sprite.origin.x=$gameMap.overlays[i].x+($gameMap._displayX*48)/$gameMap.overlays[i].xd;
				$gameMap.overlays[i].sprite.origin.y=$gameMap.overlays[i].y+($gameMap._displayY*48)/$gameMap.overlays[i].yd;
				
				$gameMap.overlays[i].sprite.opacity
				
				if(typeof $gameMap.overlays[i] != 'undefined' && $gameMap.overlays[i].delete == true) {
					this.removeOverlay($gameMap.overlays[i].sprite);
					$gameMap.overlays.splice(i, 1);
					this.created.splice(i, 1);
				}
			}
		}
		
		for(var i=0;i<$gameMap.underlays.length;i++) {
			if(typeof $gameMap.underlays[i] == 'object') {
				if(this.ucreated[i]!=true) {
					var index = this._spriteset._baseSprite.children.indexOf(this._spriteset._parallax);
					if($gameMap.underlays[i].sprite == null) {
						$gameMap.underlays[i].sprite = new TilingSprite();
						$gameMap.underlays[i].sprite.bitmap = ImageManager.loadPicture($gameMap.underlays[i].img);
					}
					this._spriteset._baseSprite.addChildAt($gameMap.underlays[i].sprite, index);
					this.ucreated[i]=true;
					$gameMap.underlays[i].sprite.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
					$gameMap.underlays[i].sprite.origin.x=$gameMap.underlays[i].x;
					$gameMap.underlays[i].sprite.origin.y=$gameMap.underlays[i].y;
					$gameMap.underlays[i].sprite.blendMode=$gameMap.underlays[i].blend;
				}
				$gameMap.underlays[i].x -= $gameMap.underlays[i].xs;
				$gameMap.underlays[i].y -= $gameMap.underlays[i].ys;
				$gameMap.underlays[i].sprite.origin.x=$gameMap.underlays[i].x+($gameMap._displayX*48)/$gameMap.underlays[i].xd;
				$gameMap.underlays[i].sprite.origin.y=$gameMap.underlays[i].y+($gameMap._displayY*48)/$gameMap.underlays[i].yd;
				
				$gameMap.underlays[i].sprite.opacity
				
				if(typeof $gameMap.underlays[i] != 'undefined' && $gameMap.underlays[i].delete == true) {
					this.removeUnderlay($gameMap.underlays[i].sprite);
					$gameMap.underlays.splice(i, 1);
					this.ucreated.splice(i, 1);
				}
			}
		}
	}
	
	Scene_Map.prototype.addOverlay = function(a1, a2) {
		this.addChildAt(a1, a2);
	}
	
	Scene_Map.prototype.removeOverlay = function(i) {
		this.removeChild(i);
	}
	
	Scene_Map.prototype.removeUnderlay = function(i) {
		this._spriteset._baseSprite.removeChild(i);
	}
	
	var saveAlias = Scene_Save.prototype.onSavefileOk
	Scene_Save.prototype.onSavefileOk = function() {
		for(var i=0;i<$gameMap.overlays.length;i++) {
			$gameMap.overlays[i].sprite = null;
		}
		for(var i=0;i<$gameMap.underlays.length;i++) {
			$gameMap.underlays[i].sprite = null;
		}
		saveAlias.call(this);
	}
})();