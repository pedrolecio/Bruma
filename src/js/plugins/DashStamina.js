//=============================================================================
// SilvStamina.js
// Version: 1.10
//=============================================================================
/*:
 * @plugindesc v1.10 Basic dashing stamina script.
   <SilverStamina>
 * @author Silver
 *
 * @param -- General --
 *
 * @param Show Stamina Window
 * @desc true/false
 * @default true
 *
 * @param Default SFX Volume
 * @desc The default volume level for all ItemLog SFX. Use the value -1 to use the "live AudioManager.seVolume" instead.
 * @default -1
 *
 * @param Stamina Decrease Tiled SFX
 * @desc The SFX to play whenever stamina is decreased (only works when "Stamina Decrease Mode" is set to "Tile". Use "None" w/o quotes to disable this.
 * @default Switch1
 *
 * @param -- Positioning & Size --
 *
 * @param Window X
 * @desc X-location of stamina window. If window-alignment is set to Right, this will act as an offset value instead
 * @default 10
 *
 * @param Window Y
 * @desc Y-location of stamina window. If window-alignment is set to Top, this will act as an offset value instead
 * @default 10
 *
 * @param Window Width
 * @desc width of the stamina window
 * @default 170
 *
 * @param Window Height
 * @desc height of the stamina window
 * @default 72
 *
 * @param Window Horizontal Alignment
 * @desc Left/Right
 * @default Left
 *
 * @param Window Vertical Alignment
 * @desc Top/Bottom
 * @default Top
 *
 * @param Stamina Gauge Rectangle
 * @desc The gauge rectangle. Format: x y width height
 * @default 0 -20 132 24
 *
 * @param -- Stamina Pool --
 *
 * @param Stamina Decrease Mode
 * @desc Use "Default" to decrease while moving. Use "Tile" to decrease stamina whenever the player enters a new tile. And no quotes of course.
 * @default Default
 *
 * @param Stamina Decrease
 * @desc Amount of stamina subtracted per update (use a positive number)
 * @default 1
 *
 * @param Stamina Max
 * @desc Maximum amount of stamina
 * @default 300
 *
 * @param Stamina Recovery Delay
 * @desc delay in update-calls before recovering stamina when not dashing
 * @default 180
 *
 * @param Stamina Recovery Rate
 * @desc How fast stamina is recovered (only when recovering)
 * @default 0.3
 *
 * @param Stamina AutoDash Threshold
 * @desc Do not automatically dash again before stamina is above this threshold (%) when recovering stamina. (0-100)
 * @default 40
 *
 * @param Use Custom Stamina Regen Formula?
 * @desc Use a custom stamina regeneration formula? If true, then the parameter "Stamina Regen Formula" is used as the formula. When false the default formula is used (which executes slightly faster).
 * @default false
 *
 * @param Stamina Regen Formula
 * @desc The formula for how fast to regenerate stamina over longer period of time. "Base" is the recovery rate. Case sensitive!
 * @default base + Math.sqrt(x/50);
 *
 * @param -- Visuals --
 *
 * @param Stamina Gauge Color 1
 * @desc Bar gradient color1 (start of bar) in hex
 * @default #009900
 *
 * @param Stamina Gauge Color 2
 * @desc Bar gradient color2 (end of bar) in hex
 * @default #CC0000
 *
 * @param Draw Stamina Value
 * @desc Draw text in stamina bar? Accepted values: absolute/percentage/both/none
 * @default percentage
 *
 * @param Font Size
 * @desc Size for stamina value
 * @default 20
 *
 * @param Auto Hide Stamina Window
 * @desc Automatically hide the stamina window if it's at max stamina for a specific period of time? true/false
 * @default true
 *
 * @param -- Window Prefix Text--
 *
 * @param Window Text
 * @desc Use :none to disable this
 * @default :none
 *
 * @param Window Text Offset Y
 * @desc y-coordinate for the text
 * @default 19
 *
 * @param Window Text Spacing X
 * @desc amount of room in coordinates between text and gauge
 * @default 4
 *
 * @param -- Window --
 *
 * @param Hide Stamina Window Delay
 * @desc After how many updates the stamina window should hide itself (if it remains at max stamina)
 * @default 160
 *
 * @param Stamina Window Opacity
 * @desc Stamina window opacity. Set to 0 to hide the window (will still show the bar)
 * @default 255
 *
 * @param Window Slideout Direction
 * @desc What direction to slide the stamina window out to. NoSlide/Left/Top/Right/Bottom
 * @default Left 
 *
 * @param Window Slideout Speed
 * @desc How fast the window slides in&out
 * @default 2
 *
 * @param -- Advanced --
 *
 * @param Common Events At Stamina Values
 * @desc Example to run common event 15 at 0 stamina and common event 17 at 100% stamina: 0 15 100% 17.
 *
 * @param Common Event Stamina Value Activation Delta
 * @desc How big the difference in stamina value must be between now and the last time a common event was ran. A value of 0 will run the Common Event every frame (if it matches the stamina value).
 * @default 5
 *
 * @param Disable Stamina Consumption GameSwitch
 * @desc The gameswitch to use to disable stamina consumption (or -1 to use none). ON = disabled
 * @default -1
 *
 * @param Window Z-Index
 * @desc Window Z-Index. Value must be > 0.
 * @default 1
 *
 * @param Plugin Command Identifier
 * @desc Do not change if you do not know what this is!
 * @default stamina
 *
 * @help
 * -------------------------------------
 * Plugin Commands (not case sensitive):
 * -------------------------------------
 *
 * Stamina Refill
 * Instantly refills all of your stamina.
 *
 * Stamina Set <value>
 * Instantly sets your stamina to the specified percentage (0-100).
 * Example to set your stamina bar to 64: Stamina Set 64
 *
 * Stamina SetVar <variableIndex>
 * Instantly sets your stamina to the specified percentage (0-100).
 * Example to set the stamina using game-variable #10: Stamina SetVar 10
 *
 * Stamina SetEval <eval>
 * Instantly sets your stamina to the specified percentage (0-100).
 * Example: Example Stamina SetEval ($gameVariables.value(10) + 1) / 2
 *
 * Stamina Deplete
 * Instantly sets your stamina to 0.
 *
 * Stamina ShowWindow
 * Shows the stamina window. Does not work if you disabled the stamina window.
 *
 * Stamina HideWindow
 * Hides the stamina window. Does not work if you disabled the stamina window.
 * Also does not work if the stamina is currently regenerating.
 *
 * Stamina RefillHide
 * Instantly refills all of your stamina and also hides the stamina window.
 *
 * Stamina SetMax <value>
 * Sets a new max-stamina value.
 *
 * Stamina SetMaxVar <variableIndex>
 * Sets a new max-stamina value.
 * Example to set the max-stamina using game-variable #10: Stamina SetMaxVar 10
 *
 * Stamina SetMaxEval <eval>
 * Sets a new max-stamina value. But this time it evaluates the code you enter as <eva>.
 * Example: Stamina SetMaxEval ($gameVariables.value(10) + 1) / 2
 * The above example assigns a new max-stamina using the game-variable 10 and then adding a 1 and then dividing it all by 2.
 *
 * Stamina IncreaseMax <value>
 * Increases max stamina by the specified value. You can also use negative values.
 *
 * Stamina EnableDashing <true/false/toggle>
 * Allows or prohibits dashing on the map.
 * Examples:
 * Stamina EnableDashing true
 * Stamina EnableDashing false
 * Stamina EnableDashing toggle
 *
 * Stamina ForceHide <true/false>
 * Example: 
 * Stamina ForceHide true
 *
 * -------------------------------------
 * Map Notetags
 * -------------------------------------
 * <dstam_disable>
 * Prevents stamina consumption on this map. Not that if the "Disable Stamina Consumption GameSwitch"
 * is turned ON then you consume no stamina anyway.
 *
 * <disable_dashing>
 * Prevents dashing on the map (with or without stamina).
 *
 * -------------------------------------
 * Item Notetags (not case sensitive)
 * -------------------------------------
 * <dash_stamina:command (value)>
 * Available commands:
 *  - Add (may have a negative value)
 *  - Refill
 *  - Deplete
 *  - IncreaseMax (may have a negative value)
 * Examples:
 * <dash_stamina:Add 10>
 * <dash_stamina:Add -10>
 * <dash_stamina:Refill>
 * <dash_stamina:Deplete>
 * <dash_stamina:IncreaseMax 1500>
 * Note that those only work from the menu, not from battle
 *
 *--------------------------------------
 * Version History:
 *--------------------------------------
 * v1.10 (5 June 2016)
 * - Added a new plugin command to enforce to hide the stamina-bar (for cut-scenes and such): Stamina ForceHide true/false.
 * - Fixed a bug that wouldn't correctly render the stamina window when setting "Autohide" to false. Consuming stamina at least once also used to fix this.
 *
 * v1.09 (11 April 2016)
 * - Refactoring & minor performance optimizations.
 *
 * v1.08 (3 April 2016) [Parameters Changed]
 * - Added an optional SFX to the tile-mode.
 * - Added two new parameters: "Default SFX Volume" and "Stamina Decrease Tiled SFX".
 *
 * v1.07a (1 April 2016) [Parameters Changed]
 * - Added a new parameter to run common events at certain stamina values/percentages.
 * - Added a new parameter "Use Custom Stamina Regen Formula?" for those who need more optimization. By default it does NOT use the custom formula (faster).
 * - Added more comments to the code.
 *
 * v1.06 (26 March 2016)
 * - Added new plugin commands: SetVar, SetEval, SetMaxEval & SetMaxVar.
 * - The plugin command "Stamina EnableDashing" now accepts a third value: toggle.
 *
 * v1.05 (21 March 2016)
 * - Added a new parameter "Stamina Decrease Mode". Now stamina can also be decreased on a per-tile-basis instead of only on a per-update-cycle-basis.
 * - Added new functions and a new alias to accomodate the above new feature.
 *
 * v1.04 (03 February 2016)
 * - Fixed a crash when transferring between maps using an autorun event with manual fading in or out (autorun stops execution of other events and some scripts like this one, which caused the crash).
 *
 * v1.03 (01 January 2016)
 * - Used my new coding standards & refactored.
 * - Switched to the Imported variable.
 * - Fixed an accidental duplicate alias.
 * - Fixed a bug in Scene_Map.prototype.updateMain() (which just so happened to cause no side-effects).
 *
 * v1.02 (12 December 2015)
 * - Dashing for the current map can now be entirely disabled with a map-notetag and switched with a plugin command at any time.
 * - Created a simple plugin addon to store the player-stamina in a global game-variable.
 * - Enabled custom text to be drawn in front of the Stamina Window.
 * - New feature: items can replenish, lower, refill and deplete stamina (only in the menu, not in battle).
 *
 * v1.01 (1 December 2015)
 * - Removed strict-mode because... Possible bug in RPG Maker...
 * - Refactored and fixed semicolons and missing var-keywords.
 *
 * v1.00 (26 November 2015)
 * - First release.
 * Alpha (November 2015)
 * - First alpha release.
 *
 */
// Imported
var Imported = Imported || {};
Imported.Silv_DashStamina = 1.10;

// #Parameters
var Silv = Silv || {};
Silv.Parameters = $plugins.filter(function(p) { return p.description.contains('<SilverStamina>'); })[0].parameters;
Silv.DashStamina = Silv.DashStamina || {};
// Non-parameters
Silv.DashStamina.Window = null;
Silv.DashStamina.ScreenIsFading = false;
Silv.DashStamina.DashingDisabled = false;
Silv.DashStamina.CommonEvents = [];
Silv.DashStamina.HasCommonEvents = false;
// General
Silv.DashStamina.ShowWindow = Silv.Parameters['Show Stamina Window'].toLowerCase() === 'true';
Silv.DashStamina.DefaultVolume = parseInt(Silv.Parameters['Default SFX Volume']);
Silv.DashStamina.TiledStaminaDecreaseSFX = Silv.Parameters['Stamina Decrease Tiled SFX'];
// Positioning & Size
Silv.DashStamina.Window_X = parseInt(Silv.Parameters['Window X']);
Silv.DashStamina.Window_Y = parseInt(Silv.Parameters['Window Y']);
Silv.DashStamina.WindowWidth = parseInt(Silv.Parameters['Window Width']);
Silv.DashStamina.WindowHeight = parseInt(Silv.Parameters['Window Height']);
Silv.DashStamina.WindowHorizontalAlignment = (Silv.Parameters['Window Horizontal Alignment']).toLowerCase();
Silv.DashStamina.WindowVerticalAlignment = (Silv.Parameters['Window Vertical Alignment']).toLowerCase();
Silv.DashStamina.StaminaGaugeRectangle = {x: parseInt(Silv.Parameters['Stamina Gauge Rectangle'].split(' ')[0]), y: parseInt(Silv.Parameters['Stamina Gauge Rectangle'].split(' ')[1]), width: parseInt(Silv.Parameters['Stamina Gauge Rectangle'].split(' ')[2]), height: parseInt(Silv.Parameters['Stamina Gauge Rectangle'].split(' ')[3])};
// Stamina Pool
Silv.DashStamina.DecreaseMode = Silv.Parameters['Stamina Decrease Mode'].toLowerCase();
Silv.DashStamina.StaminaDecrease = parseInt(Silv.Parameters['Stamina Decrease']);
Silv.DashStamina.StaminaMax = parseInt(Silv.Parameters['Stamina Max']);
Silv.DashStamina.StaminaRecoveryDelay = parseInt(Silv.Parameters['Stamina Recovery Delay']);
Silv.DashStamina.StaminaRecoveryRate = parseInt(Silv.Parameters['Stamina Recovery Rate']);
Silv.DashStamina.StaminaAutoDashThreshold = parseInt(Silv.Parameters['Stamina AutoDash Threshold']);
Silv.DashStamina.UseCustomRegenFormula = Silv.Parameters['Use Custom Stamina Regen Formula?'].toLowerCase() === 'true';
Silv.DashStamina.RegenFormula = Silv.Parameters['Stamina Regen Formula'];
// Visuals
Silv.DashStamina.StaminaGaugeColor1 = (Silv.Parameters['Stamina Gauge Color 1']).toUpperCase();
Silv.DashStamina.StaminaGaugeColor2 = (Silv.Parameters['Stamina Gauge Color 2']).toUpperCase();
Silv.DashStamina.DrawStaminaValue = Silv.Parameters['Draw Stamina Value'].toLowerCase();
Silv.DashStamina.FontSize = parseInt(Silv.Parameters['Font Size']);
// Window Prefix Text
Silv.DashStamina.WindowText = Silv.Parameters['Window Text'];
Silv.DashStamina.WindowTextOffsetY = parseInt(Silv.Parameters['Window Text Offset Y']);
Silv.DashStamina.WindowTextGaugeSpacingX = parseInt(Silv.Parameters['Window Text Spacing X']);
// Window
Silv.DashStamina.AutoHideStaminaWindow = Silv.Parameters['Auto Hide Stamina Window'].toLowerCase() === 'true';
Silv.DashStamina.HideStaminaWindowDelay = parseInt(Silv.Parameters['Hide Stamina Window Delay']);
Silv.DashStamina.WindowOpacity = parseInt(Silv.Parameters['Stamina Window Opacity']);
Silv.DashStamina.WindowSlideOutDir = Silv.Parameters['Window Slideout Direction'].toLowerCase();
Silv.DashStamina.WindowSlideOutSpeed = parseFloat(Silv.Parameters['Window Slideout Speed']);
// Advanced
Silv.DashStamina.CE_Delta = parseInt(Silv.Parameters['Common Event Stamina Value Activation Delta']);
Silv.DashStamina.DisableGameSwitch = parseInt(Silv.Parameters['Disable Stamina Consumption GameSwitch']);
Silv.DashStamina.Window_Z = parseInt(Silv.Parameters['Window Z-Index']);
Silv.DashStamina.PluginCmdId = Silv.Parameters['Plugin Command Identifier'];

// Non-parameters
Silv.DashStamina.ForcedHidden = false;

// Alias
Silv.Alias = Silv.Alias || {};
if (!Silv.AddAlias)
{
	Silv.AddAlias = function(alias, original_method)
	{
		if (Silv.Alias[alias]) { throw new Error('Alias already exists: ' + alias); }
		Silv.Alias[alias] = original_method;
	};
}


// Convert&store data for running common events at certain stamina percentages
(function()
{
	var splitted = Silv.Parameters['Common Events At Stamina Values'].split(' ');
	for (var ceIdx=0; ceIdx<splitted.length; ceIdx+=2)
	{
		var threshold = splitted[ceIdx];
		var thresholdIsPerc = false;
		if (~threshold.indexOf('%'))
		{
			thresholdIsPerc = true;
			threshold = parseInt(threshold.slice(0, -1)); // Remove % character
		}
		else
		{
			threshold = parseInt(threshold);
		}
		var commonEventID = parseInt(splitted[ceIdx + 1]);
		
		Silv.DashStamina.CommonEvents[ceIdx / 2] = { threshold:threshold, thresholdIsPerc:thresholdIsPerc, commonEventID:commonEventID, lastRunStaminaAmount:null };
	}
	Silv.DashStamina.HasCommonEvents = (Silv.DashStamina.CommonEvents.length > 0);
})();

// Sanity checks
(function()
{
	if ((Silv.DashStamina.DecreaseMode !== 'default') && (Silv.DashStamina.DecreaseMode !== 'tile')) { throw new Error('Invalid parameter-value for "Decrease Mode": ' + Silv.DashStamina.DecreaseMode + '.'); }
})();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function()
{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilities
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Usage: alert( hexToRgb("#0033ff").g ); // "51"; 
function hexToRgb(hex)
{
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Player
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------
// Can the player possibly consume stamina?
//------------------------------------------------------------------------------------------------------------------------------------
Game_Player.prototype.hasStaminaConsumption = function()
{
	if ($gameSwitches.value(Silv.DashStamina.DisableGameSwitch)) { return false; }
	if (!this.mapConsumeStamina) { return false; }
	return true;
};

//------------------------------------------------------------------------------------------------------------------------------------
// Alias for whenever the player entered a new tile
//------------------------------------------------------------------------------------------------------------------------------------
Silv.AddAlias('dashStamina_Game_Player_updateMove', Game_Player.prototype.updateMove);
Game_Player.prototype.updateMove = function()
{
	Silv.Alias.dashStamina_Game_Player_updateMove.apply(this, arguments);
	if ((Silv.DashStamina.DecreaseMode === 'tile') && !this.isMoving() && this.isDashing() && this.hasStaminaConsumption())
	{
		// Consume stamina for the tile-decrease-mode
		this.dashStamina -= Silv.DashStamina.StaminaDecrease;
		if (Silv.DashStamina.TiledStaminaDecreaseSFX.toLowerCase() !== 'none') { Play_SE(Silv.DashStamina.TiledStaminaDecreaseSFX); }
		this.postDecreaseStaminaHandling();
	}
};

//------------------------------------------------------------------------------------------------------------------------------------
// Is&can the player consume stamina?
//------------------------------------------------------------------------------------------------------------------------------------
Game_Player.prototype.isConsumingStamina = function()
{
	return (this.isDashing() && this.isMoving() && this.hasStaminaConsumption());
};

//------------------------------------------------------------------------------------------------------------------------------------
// Call this method after decreasing the stamina
//------------------------------------------------------------------------------------------------------------------------------------
Game_Player.prototype.postDecreaseStaminaHandling = function()
{
	if (this.dashStamina < 0) { this.dashStamina = 0; }
	this.isRecoveringStamina = false;
	if (Silv.DashStamina.ShowWindow && !Silv.DashStamina.ScreenIsFading) { Silv.DashStamina.Window.showMe(); }
};

//------------------------------------------------------------------------------------------------------------------------------------
// Check if #Common Events (CE) need running and do so if applicable
//------------------------------------------------------------------------------------------------------------------------------------
Game_Player.prototype.staminaEventChecks = function()
{
	if (Silv.DashStamina.HasCommonEvents)
	{
		var staminaPercRounded = Math.round(this.dashStaminaPerc * 100);
		for (var ceIdx=0; ceIdx<Silv.DashStamina.CommonEvents.length; ceIdx++)
		{
			if (Silv.DashStamina.CommonEvents[ceIdx].lastRunStaminaAmount === null)
			{
				if (Silv.DashStamina.CommonEvents[ceIdx].thresholdIsPerc)
				{
					if (staminaPercRounded === Silv.DashStamina.CommonEvents[ceIdx].threshold) { this.staminaRunCE(ceIdx); }
				}
				else
				{
					if (this.dashStamina === Silv.DashStamina.CommonEvents[ceIdx].threshold) { this.staminaRunCE(ceIdx); }
				}
			}
			else
			{
				if (Math.abs(Silv.DashStamina.CommonEvents[ceIdx].lastRunStaminaAmount - this.dashStamina) >= (Silv.DashStamina.CE_Delta - 1))
				{
					Silv.DashStamina.CommonEvents[ceIdx].lastRunStaminaAmount = null; // Allow this CE to be run again next time
				}
			}
		}
	}
};

Game_Player.prototype.staminaRunCE = function(ceIdx)
{
	$gameTemp.reserveCommonEvent(Silv.DashStamina.CommonEvents[ceIdx].commonEventID);
	Silv.DashStamina.CommonEvents[ceIdx].lastRunStaminaAmount = this.dashStamina;
};

//------------------------------------------------------------------------------------------------------------------------------------
// #Update Stamina
//------------------------------------------------------------------------------------------------------------------------------------
Game_Player.prototype.updateStamina = function()
{
	this.oldDashStamina = this.dashStamina;
	
	var isConsumingStamina = this.isConsumingStamina();
	if (isConsumingStamina)
	{
		// Only consume stamina here if the decrease-mode is set to default
		if (Silv.DashStamina.DecreaseMode === 'default') { this.dashStamina -= Silv.DashStamina.StaminaDecrease; } 
		this.postDecreaseStaminaHandling();
	}
	else // not currently consuming stamina
	{		
		if (this.isRecoveringStamina)
		{
			this.staminaRecoveryTimeCnt++;
			if (this.dashStamina < this.dashStaminaMax) // Recover the stamina
			{
				// Recover stamina
				this.dashStamina += this.calculateStaminaRegen(Silv.DashStamina.StaminaRecoveryRate);
				Silv.DashStamina.clampMaxStamina();
				
				if (Silv.DashStamina.ShowWindow && !Silv.DashStamina.ScreenIsFading) { Silv.DashStamina.Window.showMe(); }
			}
			else // Already at max stamina, find out when to hide the window if applicable and do so if possible
			{
				// If the stamina window is used, attempt to autohide it if applicable
				if (Silv.DashStamina.ShowWindow && Silv.DashStamina.AutoHideStaminaWindow)
				{
					this.hideStaminaWindowDelayCnt += 1;
					if (this.hideStaminaWindowDelayCnt >= Silv.DashStamina.HideStaminaWindowDelay)
					{
						Silv.DashStamina.Window.hideMe();
						this.hideStaminaWindowDelayCnt = 0;
					}
				}
					
			}
		}
		else // not currently recovering stamina, so find out when to start recovering it and do so if required
		{
			this.staminaRecoveryTimeCnt = 0;
			this.staminaRecoveryDelayCnt += 1;
			if (this.staminaRecoveryDelayCnt >= Silv.DashStamina.StaminaRecoveryDelay)
			{
				this.staminaRecoveryDelayCnt = 0;
				this.isRecoveringStamina = true;
			}
		}
	}
 
    // Stamina Percentage
	this.dashStaminaPerc = this.dashStamina / parseFloat(this.dashStaminaMax);

	// Threshold
	if (!isConsumingStamina)
	{
		this.requiresThresholdAmount = this.dashStaminaPerc * 100 < Silv.DashStamina.StaminaAutoDashThreshold;
	}
	
	if (this.oldDashStamina !== this.dashStamina) { this.onAfterStaminaChanged() }
	
	this.staminaEventChecks();
};

Game_Player.prototype.onAfterStaminaChanged = function()
{
	if (Silv.DashStamina.Window) { Silv.DashStamina.Window.onAfterStaminaChanged(); }
};

//------------------------------------------------------------------------------------------------------------------------------------
// Regeneration Formula
//------------------------------------------------------------------------------------------------------------------------------------
Game_Player.prototype.calculateStaminaRegen = function()
{
	if (!Silv.DashStamina.UseCustomRegenFormula) { return this.calculateStaminaRegenEval();	}
	else { return this.calculateStaminaRegenNoEval();}
};
	
Game_Player.prototype.calculateStaminaRegenEval = function()
{
	var base = Silv.DashStamina.StaminaRecoveryRate;
	var x = this.staminaRecoveryTimeCnt;
	return eval(Silv.DashStamina.RegenFormula);
};

Game_Player.prototype.calculateStaminaRegenNoEval = function()
{
	return Silv.DashStamina.StaminaRecoveryRate + Math.sqrt(this.staminaRecoveryTimeCnt / 50);
};

//------------------------------------------------------------------------------------------------------------------------------------
// #Initialize
//------------------------------------------------------------------------------------------------------------------------------------
Silv.AddAlias('dashStamina_Game_Player_initialize', Game_Player.prototype.initialize);
Game_Player.prototype.initialize = function()
{
	Silv.Alias.dashStamina_Game_Player_initialize.apply(this, arguments);

	this.dashStamina = this.dashStaminaMax = Silv.DashStamina.StaminaMax;
	this.staminaRecoveryDelayCnt = 0; // counter for when to start recovering stamina
	this.staminaRecoveryTimeCnt = 0; // counter for how long the player has been recovering stamina (in frames)
	this.isRecoveringStamina = false;
	this.dashStaminaPerc = 1.0;
	this.hideStaminaWindowDelayCnt = 0;
	this.requiresThresholdAmount = false;
	this.wasDashing = false;
};

//------------------------------------------------------------------------------------------------------------------------------------
// Is the player currently allowed to dash?
//------------------------------------------------------------------------------------------------------------------------------------
Game_Player.prototype.dashingAllowed = function()
{
	if (this.dashStamina === 0 ||
	   (!this.wasDashing && this.requiresThresholdAmount)) // Do not allow to dash if the player was not dashing the previous frame AND if the threshold was passed.
	{
		return false;
	}
	
	return true;
};

//------------------------------------------------------------------------------------------------------------------------------------
// Alias for disallowing dashing
//------------------------------------------------------------------------------------------------------------------------------------
Silv.AddAlias('dashStamina_Game_Player_updateDashing', Game_Player.prototype.updateDashing);
Game_Player.prototype.updateDashing = function()
{
	Silv.Alias.dashStamina_Game_Player_updateDashing.apply(this, arguments);
	
	if (Silv.DashStamina.DashingDisabled)
	{
		this._dashing = false;
		return;
	}
	
	if (!this.dashingAllowed()) { this._dashing = false; }
	this.wasDashing = this._dashing;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Screen
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Do not just show the minimap on top of a faded-out screen.
Silv.AddAlias('dashStamina_Game_Screen_updateFadeOut', Game_Screen.prototype.updateFadeOut);
Game_Screen.prototype.updateFadeOut = function()
{
	Silv.Alias.dashStamina_Game_Screen_updateFadeOut.apply(this, arguments);
    
	if (this._brightness < 255) // (this._fadeOutDuration > 0)
	{
		if (Silv.DashStamina.Window !== null) { Silv.DashStamina.Window.visible = false; }
		Silv.DashStamina.ScreenIsFading = true;
	}
	else
	{
		Silv.DashStamina.ScreenIsFading = false;
	}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scene Base
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Silv.AddAlias('dashStamina_Scene_Base_startFadeIn', Scene_Base.prototype.startFadeIn);
Scene_Base.prototype.startFadeIn = function()
{
	Silv.Alias.dashStamina_Scene_Base_startFadeIn.apply(this, arguments);
	if (Silv.DashStamina.Window !== null) { Silv.DashStamina.Window.visible = false; }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scene Map
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hook into the main loop
Silv.AddAlias('dashStamina_Scene_Map_updateMain', Scene_Map.prototype.updateMain);
Scene_Map.prototype.updateMain = function()
{
	Silv.Alias.dashStamina_Scene_Map_updateMain.apply(this, arguments);
	$gamePlayer.updateStamina();
	if (Silv.DashStamina.ShowWindow) { Silv.DashStamina.Window.update(); }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Map
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Disable Dashing?
Silv.AddAlias('dashStamina_Game_Map_setup', Game_Map.prototype.setup);
Game_Map.prototype.setup = function(mapId)
{
	Silv.Alias.dashStamina_Game_Map_setup.apply(this, arguments);
	Silv.DashStamina.DashingDisabled = ('disable_dashing' in $dataMap.meta);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stamina Regen/Deplete #Items
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Silv.AddAlias('dashStamina_Scene_ItemBase_useItem', Scene_ItemBase.prototype.useItem);
Scene_ItemBase.prototype.useItem = function()
{
	var item = this.item();
	if ('dash_stamina' in item.meta)
	{
		var args = item.meta.dash_stamina.split(' ');
		switch(args[0].toLowerCase())
		{
			case 'add':
				if (args.length < 2) { throw 'Item-add-command is missing the value-argument.'; }
				$gamePlayer.dashStamina += parseInt(args[1]);
				if ($gamePlayer.dashStamina > $gamePlayer.dashStaminaMax) { $gamePlayer.dashStamina = $gamePlayer.dashStaminaMax; }
				else if ($gamePlayer.dashStamina < 0) { $gamePlayer.dashStamina = 0; }
				break;
			case 'refill':
				$gamePlayer.dashStamina = $gamePlayer.dashStaminaMax;
				break;
			case 'deplete':
				$gamePlayer.dashStamina = 0;
				break;
			case 'increasemax':
				if (args.length < 2) { throw 'Item-increasemax-command is missing the value-argument.'; }
				$gamePlayer.dashStaminaMax += parseInt(args[1]);
				if ($gamePlayer.dashStaminaMax < 1 ) { $gamePlayer.dashStaminaMax = 1; }
				break;
			default:
				throw 'Unknown dash_stamina itemnotetag: ' + item.meta;
		}
		
	}
	
	Silv.Alias.dashStamina_Scene_ItemBase_useItem.apply(this, arguments);
};

Silv.AddAlias('dashStamina_Game_Action_testApply', Game_Action.prototype.testApply);
Game_Action.prototype.testApply = function(target)
{
	if ('dash_stamina' in this.item().meta)
	{
		return true;
	}
	else
	{
		return Silv.Alias.dashStamina_Game_Action_testApply.apply(this, arguments);
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stamina #Window
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Window_DashStamina() { this.initialize.apply(this, arguments); }
Window_DashStamina.prototype = Object.create(Window_Base.prototype);
Window_DashStamina.prototype.constructor = Window_DashStamina;
// Font Size
Window_DashStamina.prototype.standardFontSize = function() { return Silv.DashStamina.FontSize; };

// #Initialize
Window_DashStamina.prototype.initialize = function(x, y, width, height)
{
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._helpWindow = null;
    this._handlers = {};
    this._touching = false;
    this.deactivate();
	
    this.opacity = Silv.DashStamina.WindowOpacity;
	this.slideDirection = {x: 0, y: 0 };
	this.originalWinLoc = {x: 0, y: 0 };
	this.sliding = 'none';
	this.isFullySlidedOut = false;
	this.isFullySlidedIn = true;
	this.originalWinLoc.x = x; // for some reason "this." is not allowed here
	this.originalWinLoc.y = y; // for some reason "this." is not allowed here
	this.gaugeText = '';
	
	if (Silv.DashStamina.WindowText != ':none')
	{
		this.windowText = Silv.DashStamina.WindowText;
		this.windowTextWidth = this.contents.measureTextWidth(this.windowText);
		this.windowTextGaugeSpacingX = Silv.DashStamina.WindowTextGaugeSpacingX;
	}
	else
	{
		this.windowText = null;
		this.windowTextWidth = 0;
		this.windowTextGaugeSpacingX = Silv.DashStamina.WindowTextGaugeSpacingX;
	}
	
	this.calculateGaugeFillColour();
    this.update();
	this.onAfterStaminaChanged();
};

//------------------------------------------------------------------------------------------------------------------------------------
// Stamina Window Update
//------------------------------------------------------------------------------------------------------------------------------------
Window_DashStamina.prototype.update = function()
{
	if (Silv.DashStamina.ScreenIsFading)
	{
		this.visible = false;
	}
	else
	{
		Window_Base.prototype.update.call(this);
		this.drawStaminaWindow(0, 0);
		this.updateSliding();
	}
};

//------------------------------------------------------------------------------------------------------------------------------------
// Stamina Window Drawing #Optimizations (are not called every frame, unless the stamina is changing every frame of course)
//------------------------------------------------------------------------------------------------------------------------------------
Window_DashStamina.prototype.setGaugeFillWidth = function(rate)
{
	this.gaugeFillWidth = Math.floor(Silv.DashStamina.StaminaGaugeRectangle.width * rate);
};

// Set the desired gauge-text variable
Window_DashStamina.prototype.setGaugeText = function()
{
	switch(Silv.DashStamina.DrawStaminaValue) // allowed values: absolute/percentage/both/none
	{
		case 'absolute':
			this.gaugeText = parseInt($gamePlayer.dashStamina) + '/' + parseInt($gamePlayer.dashStaminaMax);
			break;
		case 'percentage':
			this.gaugeText = Math.round($gamePlayer.dashStaminaPerc * 100) + '%';
			break;
		case 'both':
			this.gaugeText = parseInt($gamePlayer.dashStamina) + '/' + parseInt($gamePlayer.dashStaminaMax) + ' (' + Math.round($gamePlayer.dashStaminaPerc * 100) + '%)';
			break;
		case 'none':
			this.gaugeText = '';
			return;
		default:
			throw 'ERROR: drawStaminaWindow missing case-statement or incorrect Silv.DashStamina.DrawStaminaValue value. Value: ' + Silv.DashStamina.DrawStaminaValue;
	}
};

Window_DashStamina.prototype.onAfterStaminaChanged = function()
{
	this.calculateGaugeFillColour();
	this.setGaugeFillWidth($gamePlayer.dashStaminaPerc);
	this.setGaugeText();
};

//------------------------------------------------------------------------------------------------------------------------------------
// Stamina Window #Drawing
//------------------------------------------------------------------------------------------------------------------------------------
Window_DashStamina.prototype.drawStaminaGauge = function(x, y)
{
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, Silv.DashStamina.StaminaGaugeRectangle.width, Silv.DashStamina.StaminaGaugeRectangle.height, this.gaugeBackColor());
	this.contents.fillRect(x, gaugeY, this.gaugeFillWidth, Silv.DashStamina.StaminaGaugeRectangle.height, this.gaugeFillColour);
};

Window_DashStamina.prototype.drawStaminaWindow = function(x, y)
{
	this.contents.clear();
	
	// Draw the prefix text (if applicable)
	if (this.windowText !== null)
	{
		this.contents.drawText(this.windowText, 0, Silv.DashStamina.WindowTextOffsetY, this.windowTextWidth, 0);
	}

	// Draw gauge
	this.drawStaminaGauge(Silv.DashStamina.StaminaGaugeRectangle.x + this.windowTextWidth + this.windowTextGaugeSpacingX, Silv.DashStamina.StaminaGaugeRectangle.y);
	
	this.resetTextColor();
	this.drawText(this.gaugeText, x + this.windowTextWidth + this.windowTextGaugeSpacingX, y + 1, Silv.DashStamina.StaminaGaugeRectangle.width, 'center');
};

// Calculate what colour the gauge should be between the two colours depending on the percentage value of the current-stamina value.
Window_DashStamina.prototype.calculateGaugeFillColour = function()
{
	var c1 = hexToRgb(Silv.DashStamina.StaminaGaugeColor1);
	var c2 = hexToRgb(Silv.DashStamina.StaminaGaugeColor2);
		
	var ratio = $gamePlayer.dashStaminaPerc;
	var hex = function(x) {
		x = x.toString(16);
		return (x.length === 1) ? '0' + x : x;
	};

	var r = Math.ceil(c1.r * ratio + c2.r * (1-ratio));
	var g = Math.ceil(c1.g * ratio + c2.g * (1-ratio));
	var b = Math.ceil(c1.b * ratio + c2.b * (1-ratio));

	var middle = '#' + hex(r) + hex(g) + hex(b);
	this.gaugeFillColour = middle;
};

//------------------------------------------------------------------------------------------------------------------------------------
// Stamina Window #Show & #Hide
//------------------------------------------------------------------------------------------------------------------------------------
Window_DashStamina.prototype.showMe = function()
{
	//if (this.visible) { return; };
	if (this.isFullySlidedIn && (!Silv.DashStamina.ForcedHidden))
	{
		this.visible = true;
		return;
	}
	
	if (Silv.DashStamina.WindowSlideOutDir === 'noslide' || this.visible === false) { this.visible = true; }
	else
	{
		this.sliding = 'in';
		switch (Silv.DashStamina.WindowSlideOutDir)
		{
			case 'top':
				this.slideDirection.x = 0;
				this.slideDirection.y = 1;
				break;
			case 'left':
				this.slideDirection.x = 1;
				this.slideDirection.y = 0;
				break;
			case 'right':
				this.slideDirection.x = -1;
				this.slideDirection.y = 0;
				break;
			case 'bottom':
				this.slideDirection.x = 0;
				this.slideDirection.y = -1;
				break;
			default:
				throw 'Window_DashStamina.prototype.HideMe: Unknown switch value: ' + Silv.DashStamina.WindowSlideOutDir;
		}
	}
	
	if (Silv.DashStamina.ForcedHidden) { this.visible = false; }
};

Window_DashStamina.prototype.hideMe = function()
{
	if (!this.visible || this.isFullySlidedOut) { return; }
	
	if (Silv.DashStamina.WindowSlideOutDir === 'noslide') { this.visible = false; }
	else
	{
		this.sliding = 'out';
		switch (Silv.DashStamina.WindowSlideOutDir)
		{
			case 'top':
				this.slideDirection.x = 0;
				this.slideDirection.y = -1;
				break;
			case 'left':
				this.slideDirection.x = -1;
				this.slideDirection.y = 0;
				break;
			case 'right':
				this.slideDirection.x = 1;
				this.slideDirection.y = 0;
				break;
			case 'bottom':
				this.slideDirection.x = 0;
				this.slideDirection.y = 1;
				break;
			default:
				throw 'Window_DashStamina.prototype.HideMe: Unknown switch value: ' + Silv.DashStamina.WindowSlideOutDir;
		}
	}
	
	if (Silv.DashStamina.ForcedHidden) { this.visible = false; }
};

//------------------------------------------------------------------------------------------------------------------------------------
// Stamina Window #Sliding of the Window
//------------------------------------------------------------------------------------------------------------------------------------
Window_DashStamina.prototype.handleSlidingEnd = function()
{
	if (this.sliding === 'in')
	{
		// Stop sliding in
		if (this.slideDirection.x  === 1 && this.x > this.originalWinLoc.x ||
			this.slideDirection.x  === -1 && this.x < this.originalWinLoc.x ||
			this.slideDirection.y  === 1 && this.y > this.originalWinLoc.y ||
			this.slideDirection.y  === -1 && this.y < this.originalWinLoc.y)
		{
			this.sliding = 'none';
			this.isFullySlidedIn = true;
		}
	}
	else
	{
		// Stop sliding out
		if (this.x < -this.width || this.x > Graphics._width + this.width ||
			this.y < -this.height || this.x > Graphics._height + this.height)
		{
			this.sliding = 'none';
			this.isFullySlidedOut = true;
		}
	}
};

Window_DashStamina.prototype.updateSliding = function()
{
	if (this.sliding === 'none') { return; }
	this.x += this.slideDirection.x * Silv.DashStamina.WindowSlideOutSpeed;
	this.y += this.slideDirection.y * Silv.DashStamina.WindowSlideOutSpeed;
	
	this.isFullySlidedOut = false;
	this.isFullySlidedIn = false;
	
	this.handleSlidingEnd();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// #Create Stamina Window
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Scene_Map.prototype.createDashWindow = function()
{
	// Dispose the old window, if any
	if (Silv.DashStamina.Window !== null) { this.removeWindow(Silv.DashStamina.Window); }
	
	// Does the map consume stamina?
	$gamePlayer.mapConsumeStamina = !('dstam_disable' in $dataMap.meta);
	if(Silv.DashStamina.ShowWindow)
	{
		var x = 0;
		if (Silv.DashStamina.WindowHorizontalAlignment === 'right') { x = Graphics.width - Silv.DashStamina.WindowWidth; }
		var y = 0;
		if (Silv.DashStamina.WindowVerticalAlignment === 'bottom') { y = Graphics.height - Silv.DashStamina.WindowHeight; }
		
		Silv.DashStamina.Window = new Window_DashStamina(x + Silv.DashStamina.Window_X, y + Silv.DashStamina.Window_Y, Silv.DashStamina.WindowWidth, Silv.DashStamina.WindowHeight);
		
		this.addChild(Silv.DashStamina.Window); //, Silv.DashStamina.Window_Z)
		if (Silv.DashStamina.AutoHideStaminaWindow) { Silv.DashStamina.Window.visible = false; }
	}
};

// Omg why does RPG Maker not have this method by default...
Scene_Base.prototype.removeWindow = function(window)
{
	var index = this.children.indexOf(window);
	if (index > -1) { this.children.splice(index, 1); }
};

Silv.AddAlias('dashStamina_Scene_Map_createDisplayObjects', Scene_Map.prototype.createDisplayObjects);
Scene_Map.prototype.createDisplayObjects = function()
{
	Silv.Alias.dashStamina_Scene_Map_createDisplayObjects.apply(this, arguments);
	this.createDashWindow();
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Play SFX
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Play_SE(filename)
{
	var volume = (Silv.DashStamina.DefaultVolume > -1) ? Silv.DashStamina.DefaultVolume : AudioManager.seVolume;
	AudioManager.playSe({name: filename, volume: volume, pitch: 100, pan: 0});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Saving & Loading
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Silv.AddAlias('dashStamina_DataManager_makeSaveContents', DataManager.makeSaveContents);
DataManager.makeSaveContents = function()
{
	contents = Silv.Alias.dashStamina_DataManager_makeSaveContents.apply(this, arguments);
	contents.dashStamina = $gamePlayer.dashStamina;
	contents.dashStaminaMax = $gamePlayer.dashStaminaMax;
	return contents;
};

Silv.AddAlias('dashStamina_DataManager_extractSaveContents', DataManager.extractSaveContents);
DataManager.extractSaveContents = function(contents)
{
	Silv.Alias.dashStamina_DataManager_extractSaveContents.apply(this, arguments);
	$gamePlayer.dashStamina = contents.dashStamina;
	$gamePlayer.dashStaminaMax = contents.dashStaminaMax;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Plugin Command
// Note: The items are separated by spaces. The command is the first word and any following words are args. args is an array.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Silv.AddAlias('dashStamina_Game_Interpreter_pluginCommand', Game_Interpreter.prototype.pluginCommand);
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	Silv.Alias.dashStamina_Game_Interpreter_pluginCommand.apply(this, arguments);
	if (command.toLowerCase() === Silv.DashStamina.PluginCmdId) { Silv.DashStamina.PluginCommand(command, args); }
};

// Concatenate the 'arguments' starting at a specific index because they are all part of an eval.
Silv.DashStamina.concatArgs = function(args, startIdx)
{
	var evalstr = '';
	for (var argIdx = startIdx; argIdx < args.length; argIdx++)
	{
		evalstr += args[argIdx] + ' ';
	}
	return evalstr;
};

// newValue must be between 0 - 100.
Silv.DashStamina.assignNewStaminaValue = function(newValue)
{
	var perc = Math.max(0, Math.min(100, newValue)); // clamp value between 0-100
	$gamePlayer.dashStamina = $gamePlayer.dashStaminaMax * (perc / 100.0);
};

Silv.DashStamina.clampMaxStamina = function()
{
	if ($gamePlayer.dashStamina > $gamePlayer.dashStaminaMax) { $gamePlayer.dashStamina = $gamePlayer.dashStaminaMax; }
};

Silv.DashStamina.PluginCommand = function(cmd, args)
{
	switch(args[0].toLowerCase())
	{
		case 'refill':
			$gamePlayer.dashStamina = $gamePlayer.dashStaminaMax;
			break;
		case 'deplete':
			$gamePlayer.dashStamina = 0;
			break;
		case 'set':
			Silv.DashStamina.assignNewStaminaValue(parseInt(args[1]));
		break;
		case 'setvar':
			Silv.DashStamina.assignNewStaminaValue(parseInt($gameVariables.value(args[1])));
		break;
		case 'seteval':
			var perc = parseInt(eval(Silv.DashStamina.concatArgs(args, 1)));
			if (isNaN(perc)) { throw new Error('Plugin command: "Stamina SetEval" evaled to a NaN value: ' + perc + '.'); }
			Silv.DashStamina.assignNewStaminaValue(perc);
		break;
		case 'showwindow':
			if (Silv.DashStamina.Window !== null)
			{
				$gamePlayer.hideStaminaWindowDelayCnt = 0;
				Silv.DashStamina.Window.visible = (!Silv.DashStamina.ForcedHidden);
			}
			break;
		case 'refillhide':
			$gamePlayer.dashStamina = $gamePlayer.dashStaminaMax;
			// NO break-statement here! We want to hide the window as well!
		case 'hidewindow':
			if (Silv.DashStamina.Window !== null)
			{
				$gamePlayer.hideStaminaWindowDelayCnt = Silv.DashStamina.HideStaminaWindowDelay;
				Silv.DashStamina.Window.visible = false;
			}
			break;
		case 'setmax':
			$gamePlayer.dashStaminaMax = Math.max(1, parseInt(args[1]));
			Silv.DashStamina.clampMaxStamina();
			break;
		case 'setmaxeval':
			$gamePlayer.dashStaminaMax = Math.max(1, parseInt(eval(Silv.DashStamina.concatArgs(args, 1))));
			Silv.DashStamina.clampMaxStamina();
			break;
		case 'setmaxvar':
			$gamePlayer.dashStaminaMax = Math.max(1, parseInt($gameVariables.value(args[1])));
			Silv.DashStamina.clampMaxStamina();
			break;
		case 'increasemax':
			$gamePlayer.dashStaminaMax += parseInt(args[1]);
			if ($gamePlayer.dashStaminaMax < 1) { $gamePlayer.dashStaminaMax = 1; }
			if ($gamePlayer.dashStamina > $gamePlayer.dashStaminaMax) { $gamePlayer.dashStamina = $gamePlayer.dashStaminaMax; }
			break;
		case 'enabledashing':
			switch(args[1].toLowerCase())
			{
				case 'true':
					Silv.DashStamina.DashingDisabled = false;
					break;
				case 'false':
					Silv.DashStamina.DashingDisabled = true;
					break;
				case 'toggle':
					Silv.DashStamina.DashingDisabled = !Silv.DashStamina.DashingDisabled;
					break;
				default:
					throw new Error('"Stamina EnableDashing" received an unknown argument: ' + args[1] + '. Expected: True, False or Toggle.');
			}
			break;
		case 'forcehide':
			Silv.DashStamina.ForcedHidden = (args[1].toLowerCase() === 'true');
			if (Silv.DashStamina.Window !== null)
			{
				Silv.DashStamina.Window.visible = !Silv.DashStamina.ForcedHidden;
			}
			break;
		default:
			throw 'Stamina PluginCommand invalid command: ' + args[0];
	} 
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This is the end of this awesome script!
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////