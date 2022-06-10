//=============================================================================
// ChunkyText.js
//=============================================================================

/*:
 * @plugindesc Makes the game font look fat and chunky!
 * @author mogwai
 *
 * @help This plugin uses a repeat-layer trick that solidifies the anti-aliasing.
 Has varying degrees of success and depending on the font you use, you may need
 to change the default font size (using Yan's Core Engine).
 */

Bitmap.prototype._drawTextOutline = function() { // only use to get rid of text stroke
   return;
};
Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
    var context = this._context;
    context.imageSmoothingEnabled = false;
    context.fillStyle = this.textColor;
    for(var i = 0; i < 12; i++) // repeat the layer 12 times like in GIMP
       context.fillText(text, tx, ty, maxWidth);
};