//=============================================================================
// Window Choice List Alias
// by Astfgl
// Date: 13/09/2017
// Free to use both commercially and non commercially.
// Edits allowed, but the product must be released with the same license.
// Credits required: any of Astfgl/Pierre MATEO/Pierre MATEO (Astfgl)
// Do not claim as your own
//=============================================================================
/*:
 * @plugindesc Choice list modifications
 * @author Astfgl
 * @help Automatically centers the text for the choice window, and draws
 * the rectangle appropriately.
 */
(function(){
	var _Astfgl_newWCLIW = Window_ChoiceList.prototype.itemWidth
	Window_ChoiceList.prototype.itemWidth = function(index) {
		if (this.currentData()) {
			return Math.floor((this.textWidthEx(this.currentData().name)) + this.spacing())
		} else {
			_Astfgl_newWCLIW.call(this,index)
		}
	}
	
	Window_ChoiceList.prototype.hitTest = function(x, y) {
		if (this.isContentsArea(x, y)) {
			var cx = x - this.padding;
			var cy = y - this.padding;
			var topIndex = this.topIndex();
			for (var i = 0; i < this.maxPageItems(); i++) {
				var index = topIndex + i;
				if (index < this.maxItems()) {
					var rect = this.itemRect(index);
					var right = this.width; //changed this line from rect.width + rect.x
					var bottom = rect.y + rect.height;
					if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
						return index;
					}
				}
			}
		}
		return -1;
	};
	
	var _Astfgl_newWCLDI = Window_ChoiceList.prototype.drawItem
	Window_ChoiceList.prototype.drawItem = function(index) {
		var rect = this.itemRectForText(index);
		this.drawTextEx(this.commandName(index), this.width/2 - this.textWidthEx(this.commandName(index))/2 - this.spacing() * 1.5 , rect.y);
	};
	
	Window_ChoiceList.prototype.itemRect = function (index) {
		var rect = new Rectangle();
		var maxCols = this.maxCols();
		rect.width = this.itemWidth();
		rect.height = this.itemHeight();
		if (this._list[index]) {
			rect.x = this.width/2 - this.textWidthEx(this.commandName(index))/2 - this.spacing() * 2 
		} else {
			rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
		}
		rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
		return rect;
	}

})()