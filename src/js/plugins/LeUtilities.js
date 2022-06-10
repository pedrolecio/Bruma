/*
#=============================================================================
# Lecode's Utilities
# LeUtilities.js
# By Lecode
# Version 1.2
#-----------------------------------------------------------------------------
# TERMS OF USE
#-----------------------------------------------------------------------------
# - Credit required
# - Keep this header
# - Free for commercial use
#-----------------------------------------------------------------------------
# Version History
#-----------------------------------------------------------------------------
# - 1.0 : Initial release
# - 1.1 : stringAppendWithSym
#		: stringAppendWithComma
#		: stringSplit
#		: commandGetTextAsArg
# - 1.2 : getRandomValueInArray
#=============================================================================
*/
var Imported = Imported || {};
Imported.Lecode_Utilities = true;
/*:
 * @plugindesc Lecode's utilities plugin.
 * @author Lecode
 * @version 1.1
 *
 * @help
 * ( Nothing :B )
*/
//#=============================================================================

function LeUtilities() {
    throw new Error('This is a static class');
}

LeUtilities.findBattlerSprite = function(battler) {
	if( LeUtilities.isScene("Scene_Battle") ) {
		if( battler.isActor() ) {
			var sprites = LeUtilities.getScene()._spriteset._actorSprites;
		} else {
			var sprites = LeUtilities.getScene()._spriteset._enemySprites;
		}
		for(var i = 0; i < sprites.length; i++) {
			var sprite = sprites[i];
			if(sprite._battler === battler) return sprite;
		}
	} else {
		return null;
	}
};

LeUtilities.getScene = function() {
	return SceneManager._scene;
};

LeUtilities.isScene = function(str) {
	var scene = this.getScene();
	var bool = eval("scene instanceof "+str);
	return bool;
};

LeUtilities.stringAppendWithSym = function(str,toAppend,sym) {
	toAppend = String(toAppend);
	sym = String(sym);
	if(toAppend === "") return str;
	return (str === "") ? toAppend : str+sym+toAppend;
};

LeUtilities.stringAppendWithComma = function(str,toAppend) {
	return this.stringAppendWithSym(str,toAppend,",");
};

LeUtilities.stringSplit = function(str,sym) {
	str = String(str);
	if(str === "") {
		return [];
	} else if (!str.match(sym)) {
		return [str];
	} else {
		return str.split(sym);
	}
};

LeUtilities.CommandGetTextAsArg = function(args,start) {
    var text = "";
    for(var i = start; i < args.length; i++) {
        text += args[i];
        if(i != args.length-1) {
            text += " "; 
        }
    }
    return text;
};

LeUtilities.getRandomValueInArray = function(array) {
	var index = Math.floor((Math.random() * array.length));
	return array[index]; 
};

LeUtilities.removeInArray = function(array,element) {
	if(array.contains(element)) {
    	var index = array.indexOf(element);
    	array.splice(index,1);
	}
};

LeUtilities.removeAllChildren = function(holder) {
	while(holder.children[0]) { holder.removeChild(holder.children[0]); }
};

LeUtilities.rectRectCollision = function(rect1,rect2) {
	return (rect1.x < rect2.x + rect2.width &&
   		rect1.x + rect1.width > rect2.x &&
   		rect1.y < rect2.y + rect2.height &&
   		rect1.height + rect1.y > rect2.y);
}

LeUtilities.circleCircleCollision = function(circle1,circle2) {
	var cx1 = this.getSpriteCenter(circle1).x;
	var cy1 = this.getSpriteCenter(circle1).y;
	var cx2 = this.getSpriteCenter(circle2).x;
	var cy2 = this.getSpriteCenter(circle2).y;

	var dx = cx1 - cx2;
	var dy = cy1 - cy2;
	var distance = Math.sqrt(dx * dx + dy * dy);

    var radius1 = (circle1.width*circle1.scale.x)/2;
    var radius2 = (circle2.width*circle2.scale.x)/2;

	return (distance < radius1 + radius2);
};

LeUtilities.circleRectCollision = function(circle,rect)
{
	var cx = this.getSpriteCenter(circle).x;
	var cy = this.getSpriteCenter(circle).y;
	var rx = this.getSpriteCenter(rect).x;
	var ry = this.getSpriteCenter(rect).y;


    var circleDistance_x = Math.abs(cx - rx);
    var circleDistance_y = Math.abs(cy - ry);
    var radius = (circle.width*circle.scale.x)/2;

    if (circleDistance_x > (rect.width/2 + radius)) { return false; }
    if (circleDistance_y > (rect.height/2 + radius)) { return false; }

    if (circleDistance_x <= (rect.width/2)) { return true; } 
    if (circleDistance_y <= (rect.height/2)) { return true; }

    var cornerDistance_sq = (circleDistance_x - rect.width/2)^2 +
                         (circleDistance_y - rect.height/2)^2;

    return (cornerDistance_sq <= (radius^2));
};

LeUtilities.getSpriteCenter = function(sprite) {
	var w = sprite.width*sprite.scale.x;
	var h = sprite.height*sprite.scale.y;
	return {
		x: sprite.x + w/2 - sprite.anchor.x*w,
		y: sprite.y + h/2 - sprite.anchor.y*h
	};
};

