//=============================================================================
// Arisu's Dollhouse - Notification Windows - for RPG Maker MV version 1.6.1
// Arisu_NotificationWindows.js
//=============================================================================
 /*:
 * @plugindesc <NotificationWindows> created by Arisu's Dollhouse
 * @author Arisu's Dollhouse
 *
 * @help
 * == Introduction ==
 *
 * Sometimes you want to display a notification for the player without having to
 * put it in a Show Message event. This plugin creates 9 different positions for
 * you to place notifications on the screen to alert the player of what is now
 * happening without having to require player input to continue gameplay.
 *
 *
 *
 * == Installation ==
 *
 * # Install this plugin into your RPG Maker MV project's js/plugin folder.
 * # Open your game project in RPG Maker MV and open up the Plugin Manager.
 * # Add a new plugin and place this plugin beneath all Yanfly plugins present.
 * # Adjust any Plugin Parameter settings to this plugin.
 * # Read through plugin help file to understand how to use plugin.
 * # When testing this plugin, save first.
 *
 * == Numpad Location ==
 *
 * Further down in the help will say things like "corresponding to the NumPad"
 * to determine screen location. What that means is there are numbers on the
 * right side of a desktop keyboard called the NumPad. The screen locations
 * will appear like below:
 *
 * 7 8 9
 * 4 5 6
 * 1 2 3
 *
 * Use those numbers to determine the screen position of Notification Windows.
 * If 0 is used, the Notification Window will appear in the default location
 * specified by the Plugin Parameter.
 *
 *
 *
 * == Plugin Commands ==
 *
 * Displaying a notification can be achieved through Plugin Commands.
 * Notifications may appear in any scene.
 *
 *   Notify: text
 *   - Replace 'text' with the text you wish to display.
 *   - This can use text codes.
 *   - This will appear in the 'Default Location' set by the Plugin Parameter.
 * 
 *   Notify1: text
 *   Notify2: text
 *   Notify3: text
 *   Notify4: text
 *   Notify5: text
 *   Notify6: text
 *   Notify7: text
 *   Notify8: text
 *   Notify9: text
 *   - Use the number corresponding to the NumPad to determine screen location.
 *   - Replace 'text' with the text you wish to display.
 *   - This can use text codes.
 *
 *   NotifyColor: rgba(255, 0, 0, 1)
 *   - This changes the color of the next notification's background to the
 *   shown rgba color.
 *   Read more about it here: https://www.w3schools.com/cssref/func_rgba.asp
 *
 *
 *
 * == Script Calls ==
 *
 * Displaying a notification can be achieved through Script Calls.
 * Notifications may appear in any scene.
 *
 *   var text = 'Hello world!';
 *   Notification.add(text);
 *   - 'text' variable is a string.
 *   - This can use text codes, but they must be in string format.
 *   - This will appear in the 'Default Location' set by the Plugin Parameter.
 *   - This will have black background by default.
 *
 *   var text = 'Hello world!';
 *   var location = 5;
 *   Notification.add(text, location);
 *   - 'text' variable is a string.
 *   - 'location' variable is a number 1 through 9 to determine screen location.
 *   - This can use text codes, but they must be in string format.
 *   - This will have black background by default.
 *
 *   var text = 'Hello world!';
 *   var location = 5;
 *   var color = 'rgba(255, 0, 0, 1)';
 *   Notification.add(text, location);
 *   - 'text' variable is a string.
 *   - 'location' variable is a number 1 through 9 to determine screen location.
 *   - 'color' variable is a string using the rgba CSS JavaScript function.
 *   Read more about it here: https://www.w3schools.com/cssref/func_rgba.asp
 *   - This can use text codes, but they must be in string format.
 *   - This will have black background by default.
 *
 *
 *
 * == RPG Maker Version ==
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 *
 *
 * == Terms of Use ==
 *
 * # For Free and Commercial Use.
 * # Put "Arisu's Dollhouse" in your game's credits.
 * # Do not redistribute this plugin without permission.
 * # Do not take code from this plugin without permission.
 * # Edit of code is allowed as long as it's within plugin file.
 * # I do not support changes made to code edit.
 *
 *
 *
 * == Changelog ==
 * 
 * * None
 *
 *
 *
 * @param
 *
 * @param Default Location
 * @desc Default location to display notify texts.
 * Use 1-9 position based on NumPad.
 * @default 1
 *
 * @param
 *
 * @param Window Opacity
 * @desc Opacity of the window background.
 * Use 0-255 values.
 * @default 128
 *
 * @param
 *
 * @param Display Frames
 * @desc Time in frames to display the window
 * 60 frames = 1 second.
 * @default 120
 *
 * @param
 *
 * @param Toggle Frames
 * @desc Time in frames to toggle the window
 * 60 frames = 1 second.
 * @default 40
 *
 * @param
 *
 */
//=============================================================================

var Imported=Imported||{};Imported.Arisu_NotificationWindows=true;var Arisu=Arisu||{};Arisu.NotificationWindows=Arisu.NotificationWindows||{};var parameters=$plugins.filter(function(p){return p.description.contains("<NotificationWindows>")})[0].parameters;Arisu.NotificationWindows.DefaultLocation=Number(parameters["Default Location"]);Arisu.NotificationWindows.WindowOpacity=Number(parameters["Window Opacity"]);Arisu.NotificationWindows.DisplayFrames=Number(parameters["Display Frames"]);Arisu.NotificationWindows.ToggleFrames=Number(parameters["Toggle Frames"]);function Notification(){throw new Error("This is a static class")}Notification=function(){};Notification.nextColor="rgba(0, 0, 0, 1)";Notification.windows1=[];Notification.windows2=[];Notification.windows3=[];Notification.windows4=[];Notification.windows5=[];Notification.windows6=[];Notification.windows7=[];Notification.windows8=[];Notification.windows9=[];Notification.add=function(text,location,color){if(location===undefined)location=Arisu.NotificationWindows.DefaultLocation;location=location||0;location=location.clamp(1,9);if(color===undefined)color=Notification.nextColor;Notification.nextColor="rgba(0, 0, 0, 1)";var array=this["windows"+location];var notificationWindow=new Arisu_NotificationWindow(array.length,text,location,color);array.push(notificationWindow);SceneManager._scene.addChild(notificationWindow);Notification.refreshY(array)};Notification.remove=function(location){location=location||0;location=location.clamp(1,9);var array=this["windows"+location];var notificationWindow=array.shift();SceneManager._scene._windowLayer.removeChild(notificationWindow);Notification.refreshY(array)};Notification.refreshY=function(array){for(var i=0;i<array.length;i++){if(array[i])array[i].y=array[i].calculateYPosition(i)}};Notification.removeAll=function(){for(var i=1;i<=9;i++){var array=this["windows"+i];while(array.length!=0){var notificationWindow=array.shift();SceneManager._scene._windowLayer.removeChild(notificationWindow)}}};Arisu.NotificationWindows.Game_Interpreter_command356=Game_Interpreter.prototype.command356;Game_Interpreter.prototype.command356=function(){if(this._params[0].match(/Notify:/i)||this._params[0].match(/Notify(\d+):/i))return this.commandArisuNotify();if(this._params[0].match(/NotifyColor:/i))return this.commandArisuNotifyColor();return Arisu.NotificationWindows.Game_Interpreter_command356.call(this)};Game_Interpreter.prototype.commandArisuNotify=function(){if(this._params[0].match(/Notify:[ ](.*)/i)){var location=Arisu.NotificationWindows.DefaultLocation.clamp(1,9);var text=String(RegExp.$1)}else if(this._params[0].match(/Notify(\d+):[ ](.*)/i)){var location=Number(RegExp.$1);var text=String(RegExp.$2)}Notification.add(text,location);return true};Game_Interpreter.prototype.commandArisuNotifyColor=function(){if(this._params[0].match(/NotifyColor:[ ](.*)/i)){Notification.nextColor=String(RegExp.$1)}return true};Arisu.NotificationWindows.Scene_Base_terminate=Scene_Base.prototype.terminate;Scene_Base.prototype.terminate=function(){Arisu.NotificationWindows.Scene_Base_terminate.call(this);Notification.removeAll()};function Arisu_NotificationWindow(){this.initialize.apply(this,arguments)}Arisu_NotificationWindow.prototype=Object.create(Window_Base.prototype);Arisu_NotificationWindow.prototype.constructor=Arisu_NotificationWindow;Arisu_NotificationWindow.prototype.initialize=function(index,text,location,color){location=location||0;location=location.clamp(1,9);this.location=location;this.bgcolor=color;var y=this.calculateYPosition(index);Window_Base.prototype.initialize.call(this,0,y,Graphics.width,this.lineHeight());this.frameCount=0;this.isFadingIn=true;this.isFadingOut=false;this.isShowing=false;this.text=text;this.opacity=0;this.contentsOpacity=0;this.createBackground();this.refresh()};Arisu_NotificationWindow.prototype.calculateYPosition=function(index){switch(this.location){case 1:case 2:case 3:var size=(Notification["windows"+this.location].length+1)*this.lineHeight();return Graphics.boxHeight-size+this.lineHeight()*index;break;case 4:case 5:case 6:var size=Notification["windows"+this.location].length*this.lineHeight();return(Graphics.boxHeight-size)/2+this.lineHeight()*index;break;case 7:case 8:case 9:return this.lineHeight()*(index+1);break}};Arisu_NotificationWindow.prototype.standardPadding=function(){return 0};Arisu_NotificationWindow.prototype.createBackground=function(){this._backSprite=new Sprite;this._backSprite.bitmap=new Bitmap(this.width,this.height);this.addChildToBack(this._backSprite);var c1=this.bgcolor;var c2="rgba(0, 0, 0, 0)";switch(this.location){case 1:case 4:case 7:this._backSprite.bitmap.gradientFillRect(0,0,this.width,this.height,c1,c2);break;case 2:case 5:case 8:this._backSprite.bitmap.gradientFillRect(0,0,this.width/2,this.height,c2,c1);this._backSprite.bitmap.gradientFillRect(this.width/2,0,this.width/2,this.height,c1,c2);break;case 3:case 6:case 9:this._backSprite.bitmap.gradientFillRect(0,0,this.width,this.height,c2,c1);break}this._backSprite.opacity=0};Arisu_NotificationWindow.prototype.refresh=function(){this.contents.clear();switch(this.location){case 1:case 4:case 7:var x=this.textPadding();break;case 2:case 5:case 8:var x=(this.width-Window_ChoiceList.prototype.textWidthEx.call(this,this.text))/2;break;case 3:case 6:case 9:var x=this.width-Window_ChoiceList.prototype.textWidthEx.call(this,this.text)-this.textPadding();break}this.drawTextEx(this.text,x,0)};Arisu_NotificationWindow.prototype.update=function(){Window_Base.prototype.update.call(this);this.frameCount++;if(this.isFadingIn){this._backSprite.opacity=this.frameCount/Arisu.NotificationWindows.ToggleFrames*Arisu.NotificationWindows.WindowOpacity;this.contentsOpacity=this.frameCount/Arisu.NotificationWindows.ToggleFrames*255;this.textX=((1-this.frameCount*2/Arisu.NotificationWindows.ToggleFrames)*100).clamp(0,100);if(this.frameCount==Arisu.NotificationWindows.ToggleFrames){this.isFadingIn=false;this.isShowing=true;this.frameCount=0}}else if(this.isShowing){if(this.frameCount==Arisu.NotificationWindows.DisplayFrames){this.isShowing=false;this.isFadingOut=true;this.frameCount=0}}else if(this.isFadingOut){this._backSprite.opacity=(1-this.frameCount/Arisu.NotificationWindows.ToggleFrames)*Arisu.NotificationWindows.WindowOpacity;this.contentsOpacity=(1-this.frameCount/Arisu.NotificationWindows.ToggleFrames)*255;if(this.frameCount==Arisu.NotificationWindows.ToggleFrames){Notification.remove(this.location)}}};