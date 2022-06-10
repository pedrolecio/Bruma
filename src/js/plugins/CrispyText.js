//=============================================================================
// CrispyText.js
//=============================================================================

/*:
 * @plugindesc Makes the game font look nice and crispy!
 * @author mogwai
 *
 * @help This plugin removes all transparent pixels (font) one by one.
 Has varying degrees of success and depending on the font you use, you may need
 to change the default font size (using Yan's Core Engine).
 */

Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
   var context = this._context;
   context.imageSmoothingEnabled = false;
   context.fillStyle = this.textColor;
   context.fillText(text, tx, ty, maxWidth*2);

   var imageData = context.getImageData(0, 0, this.width, this.height);
   var data = imageData.data;
   for (var i = 0; i < data.length; i += 4) {
       if(data[i + 3] < 200) // if alpha less than
           data[i + 3] = 0;  // set alpha to 0
       data[i]     = data[i];     // red
       data[i + 1] = data[i + 1]; // green
       data[i + 2] = data[i + 2]; // blue
   }
   context.putImageData(imageData, 0, 0);
};