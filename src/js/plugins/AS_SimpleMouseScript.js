/*:
 * @plugindesc Creates MouseX, MouseY, MouseXGrid, MouseYGrid and Custom Cursor. Also hides system cursor.
 * 
 * @author Astra Cat
 * 
 * @param MouseX and Y Updating
 * @desc By default this is off in RPG Maker MV, needed for MouseX and MouseY global variables.
 * @default true
 * @param Custom Cursor Filename
 * @desc Mouse Cursor Filename (no extension please, in /Pictures folder). Default is "cursor".
 * @default cursor
 * @param Mouse X Offset
 * @desc X Offset of Mouse Picture (for crosshairs generally)
 * @default 0
 * @param Mouse Y Offset
 * @desc Y Offset of Mouse Picture
 * @default 0
 * @param System Cursor Hide?
 * @desc Hides the system cursor on your game screen.
 * @default true
 * @param Custom Cursor Visible?
 * @desc Custom mouse cursor visibility when game first started.
 * @default true
 * @help Simple mouse plugin.

 */

//init values
var MouseX = 0;
var MouseY = 0;
var MouseXGrid = 0;
var MouseYGrid = 0;
var MouseCreationTimer = 3;

//parameters
var parameters = PluginManager.parameters('AS_SimpleMouseScript');
var EnableMouseCoords = String(parameters['MouseX and Y Updating'] || 'false');
var MouseCursorFileName = String(parameters['Custom Cursor Filename'] || 'cursor');
var MouseHideSystemCursor = String(parameters['System Cursor Hide?'] || 'false');
var MouseXo = Number(parameters['Mouse X Offset'] || 0);
var MouseYo = Number(parameters['Mouse Y Offset'] || 0);
var MouseCustomCursorVisible = String(parameters['Custom Cursor Visible?'] || 'false')

var alias_AstraCat_LoadCustomMouseCursorSprite_SceneBaseStart = Scene_Base.prototype.start;
    Scene_Base.prototype.create = function() {
        alias_AstraCat_LoadCustomMouseCursorSprite_SceneBaseStart.call(this);
        if (MouseCreationTimer < 1) { MouseCreationTimer = 3; }
    };

var alias_AstraCat_ShowCustomMouseCursorSprite_SceneBaseUpdate = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        alias_AstraCat_ShowCustomMouseCursorSprite_SceneBaseUpdate.call(this);
        
        //Create cursor and update it when timer runs out
        if (MouseCreationTimer > 0) { MouseCreationTimer -= 1; }
        
        if (MouseCreationTimer == 1) {
            //create mouse if timer is close to ending
            this.MouseCustomCursorSprite = new Sprite();
            this.MouseCustomCursorSprite.bitmap = ImageManager.loadPicture(String(MouseCursorFileName));
            this.MouseCustomCursorSprite.visible = true;
            this.addChild(this.MouseCustomCursorSprite); 
        }
        //update mouse if created
        if (MouseCreationTimer == 0) {
        
        this.MouseCustomCursorSprite.x = MouseX-MouseXo;
        this.MouseCustomCursorSprite.y = MouseY-MouseYo;
        
            //mouse custom cursor visibility
            if (MouseCustomCursorVisible == 'true') {
                this.MouseCustomCursorSprite.visible = true;
            }
            else if (MouseCustomCursorVisible == 'false') {
                this.MouseCustomCursorSprite.visible = false;
            }
            else if (MouseCustomCursorVisible != 'true' && MouseCustomCursorVisible != 'false') {
                MouseCustomCursorVisible = 'false';
            }
    
            //mouse custom cursor x and y position
            MouseX = TouchInput._x;
            MouseY = TouchInput._y;
            MouseXGrid = $gameMap.canvasToMapX(MouseX);
            MouseYGrid = $gameMap.canvasToMapY(MouseY);
    
            //mouse system cursor visibility
            if (MouseHideSystemCursor == 'true') {
                document.body.style.cursor = 'none';
            }
            else 
            {
                document.body.style.cursor = 'default';
            } 
        }
    }
    
var alias_AstraCat_LoadCustomMouseCursorSprite_SceneBaseTerminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
    alias_AstraCat_LoadCustomMouseCursorSprite_SceneBaseTerminate.call(this);
    this.removeChild(this.MouseCustomCursorSprite); 
};

if (EnableMouseCoords == 'true') {
    TouchInput._onMouseMove = function(event) {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            this._onMove(x, y);

    };
}
else if (EnableMouseCoords == 'false') {
    TouchInput._onMouseMove = function(event) {
        if (this._mousePressed) {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            this._onMove(x, y);
        }
    };
}