//=============================================================================
// EquipmentRarityColors.js
//=============================================================================

/*:
 * @plugindesc Changes the weapons color based on rarity value you assign.
 * @author Jeremy Cannady
 *
 *
 * @help Changes the Items color based on the rarity you assign in the note field.
 *
 *
 <itemRarity:1> Uncommon
 <itemRarity:2>
 <itemRarity:3>
 <itemRarity:4>
 <itemRarity:5> Super Rare Mega Death Thingy
 *
 *
 *
*/

(function(){

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
		if(typeof item.meta.itemRarity !== "undefined"){
			var rarity = parseInt(item.meta.itemRarity);
			//Change the this.textColor(x) where x is the color you want based off the system window.png
			if(rarity == 1){this.changeTextColor(this.textColor(3)) //Green
			console.log("rarity 1");
			}else if (rarity == 2){this.changeTextColor(this.textColor(1))//Blue
			console.log("rarity 2");
			}else if (rarity == 3){this.changeTextColor(this.textColor(20))//Orange
			console.log("rarity 3");
			}else if (rarity == 4){this.changeTextColor(this.textColor(10))//Red
			console.log("rarity 4");
			}else if (rarity == 5){this.changeTextColor(this.textColor(30))//Purple
			console.log("rarity 5");
			}else{this.resetTextColor();};
		
		};
		this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
		this.resetTextColor();
	};
};
})();