//=============================================================================
// JahwsUF - New Game Event
// JAH_NewGameEvent.js
// Version: 1.0.0
//=============================================================================

/*:
 * @plugindesc v1.0.0 Allows for a Common Event to be launched immediately upon selection of a New Game.
 * @author JahwsUF
 *
 * @param Launch Event ID
 * @desc The Common Event to be launched immediately upon starting a New Game.
 * @default
 *
 * @help
 * Set the ID of a common event to this plugin, and it will be automatically used upon
 * selection of a New Game.  This can easily be used to allow player customization, such
 * as changing main character gender, name, and even starting location!
 *
 * Not all standard Event components will be available, as this will occur
 * before the player and first map ever appear.  The Event will be the FIRST thing that 
 * occurs immediately upon choosing New Game, and can even cause a player to initially 
 * spawn on a different map via transfer than the one set in the database.  
 *
 * As a result, don't expect animations or movement commands to work.
 */

var Imported = Imported || {}; // Let's not erase old evidence as we declare our presence.
Imported.JahwsUF_NewGame = true;  // Oh yeah, may as well say we're here, too.

var JahwsUF = JahwsUF || {};
JahwsUF.NewGame = JahwsUF.NewGame || {};

JahwsUF.NewGame.Parameters = PluginManager.parameters('JAH_NewGameEvent');
JahwsUF.NewGame.Param = JahwsUF.NewGame.Param || {};

(function() {

var commonEventID = Number(JahwsUF.NewGame.Parameters['Launch Event ID']);

JahwsUF.NewGame.Param.EventID = commonEventID;

}());

//-----------------------------------------------------------------------------
// Spriteset_OpeningEvent
//
// The scene class used to support an event triggered by starting a "New Game."
//
// After this scene completes, it transitions to the standard game and starting position.

function Spriteset_OpeningEvent() {
    this.initialize.apply(this, arguments);
}

Spriteset_OpeningEvent.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_OpeningEvent.prototype.constructor = Spriteset_OpeningEvent;

Spriteset_OpeningEvent.prototype.initialize = function() {
    Spriteset_Base.prototype.initialize.call(this);
};

if(Imported.YEP_CoreEngine)
{
	Spriteset_OpeningEvent.prototype.rescaleTitleSprite = Scene_Title.prototype.rescaleTitleSprite;
}

Spriteset_OpeningEvent.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);

	this.createBackground();
    this.createForeground();
		
    this.centerSprite(this._backSprite1);
    this.centerSprite(this._backSprite2);
	
	if(Imported.YEP_CoreEngine)
	{
		if (eval(Yanfly.Param.ScaleTitle)) 
		{
			this.rescaleTitleSprite(this._backSprite1);
			this.rescaleTitleSprite(this._backSprite2);
		}
	}
};

// Problem - standard background hides $gameScreen, while $gameScreen hides standard background.
Spriteset_OpeningEvent.prototype.createBackground = function() {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name)); //Can empty out for no image.
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
};

Spriteset_OpeningEvent.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this._gameTitleSprite);
};

Spriteset_OpeningEvent.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

//-----------------------------------------------------------------------------
// Scene_OpeningEvent
//
// The scene class used to support an event triggered by starting a "New Game."
//
// After this scene completes, it transitions to the standard game and starting position.

function Scene_OpeningEvent() {
    this.initialize.apply(this, arguments);
}

Scene_OpeningEvent.prototype = Object.create(Scene_Base.prototype);
Scene_OpeningEvent.prototype.constructor = Scene_OpeningEvent;

Scene_OpeningEvent.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_OpeningEvent.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createSpriteset();  // Necessary if we want any screen-based Event interactions!  Do before the actual windows, though, else they'll be hidden.
	
    this.createWindowLayer();
	this.createMessageWindow();
	this.createScrollTextWindow();
};

Scene_OpeningEvent.prototype.createSpriteset = function() {
    this._spriteset = new Spriteset_OpeningEvent();
    this.addChild(this._spriteset);
};

Scene_OpeningEvent.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
	
    SceneManager.clearStack();

	// if(!JahwsUF.NewGame._startEvent)
		// this.startFadeIn(this.fadeSpeed(), false);
};

Scene_OpeningEvent.prototype.update = function() {
	var active = this.isActive();
	
	$gameMap.update(active);
	$gameTimer.update(active);
	$gameScreen.update();
	
	// Trickiness!  SceneManager's pop() method aims to RESTART a scene.  In the middle of an event.  We need to signify 
	// whether or not this is the first pass.
	//
	// The below catches this and continues the event as if there were no interruptions.
	if(JahwsUF.NewGame._startEvent && !this._startEvent)
	{
		this._startEvent = JahwsUF.NewGame._startEvent;
	}
	
	if (!this._startEvent && !this.isBusy()) {
		this.startEvent();
		JahwsUF.NewGame._startEvent = this._startEvent;
	}
	else if (this._startEvent && active) { 
		if(!this._startEvent._interpreter.isRunning())
		{
			this.fadeOutAll();
			SceneManager.goto(Scene_Map);
		}
		else 
		{
			if(this._startEvent)
				this._startEvent._interpreter.update();
		}
	}

	Scene_Base.prototype.update.call(this);
};

Scene_OpeningEvent.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
};

Scene_OpeningEvent.prototype.createMessageWindow = function() {
	
	// The event will automatically connect to this message window when it activates.
	// Unfortunately, Window_Message MUST be created before it has a message waiting for it, else there will be a crash.
	// Bad programming design in the original Window_CommandList.

    this._messageWindow = new Window_Message();
    this.addWindow(this._messageWindow);
    this._messageWindow.subWindows().forEach(function(window) {
        this.addWindow(window);
    }, this);
};

Scene_OpeningEvent.prototype.createScrollTextWindow = function() {
    this._scrollTextWindow = new Window_ScrollText();
    this.addWindow(this._scrollTextWindow);
};

Scene_OpeningEvent.prototype.startEvent = function()
{
	var eventData = $dataCommonEvents[JahwsUF.NewGame.Param.EventID];
	
	if(eventData)
	{
		var event = new Game_CommonEvent(JahwsUF.NewGame.Param.EventID);
		event.isActive = function() { return true; };  // Hotwire this event - forced immediate trigger.
		event._interpreter = new Game_Interpreter();
		event._interpreter.setup(event.list());
		
		// Restricted wait conditions - not all of these should appear in a game-opening event.
		event._interpreter.updateWaitMode = function() {
			var waiting = false;
			switch (this._waitMode) {
			case 'message':
				waiting = $gameMessage.isBusy();
				break;
			case 'transfer':
				waiting = false;
				break;
			case 'scroll':
				waiting = false;
				break;
			case 'route':
				waiting = false;
				break;
			case 'animation':
				waiting = false;
				break;
			case 'balloon':
				waiting = false;
				break;
			case 'gather':
				waiting = false;
				break;
			case 'action':
				waiting = false;
				break;
			case 'video':
				waiting = Graphics.isVideoPlaying();
				break;
			case 'image':
				waiting = !ImageManager.isReady();
				break;
			}
			if (!waiting) {
				this._waitMode = '';
			}
			return waiting;
		};
		
		this._startEvent = event;
	}
}
 
 
//-----------------------------------------------------------------------------
// Scene_Title
//
// Extensions to the opening Title Scene object.

if(JahwsUF.NewGame.Param.EventID)
{

	Scene_Title.prototype.commandNewGame = function() {
		
		DataManager.setupNewGame();
		this._commandWindow.close();
		//this.fadeOutAll();
		SceneManager.goto(Scene_OpeningEvent);
	};

}
// else leave default behavior in place.