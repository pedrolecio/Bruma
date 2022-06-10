/*:
@author Chaucer
@plugindesc | Scene Stabilizer : Version - 4.1.7 | Stabilizes scenes on scene transfer.
@help
===============================================================================
 Introduction :
===============================================================================

 This plugin uploads all images required for a scene to the gpu before the
 scene begins. This ensures that the scene is loaded in smoothly, without
 any stuttering or skipped frames. As of version 4.0.0, all skills/items of
 enemy and player characters are scanned before each battle, and are
 preloaded & uploaded before the scene begins to ensure that animations do
 not cause stuttering.

 As of version 4.0.0, this plugin no longer has any ties to audio preloading(
 this will be re-added in the future, however at this time, it's currently
 not available. ), This plugin also now includes the option to define custom
 assets that should be preloaded in advance, for example, if you want to load
 a large image through an event on a specific map, or if you want to play an
 animation that's not preloaded automatically in a battle, you can define
 the asset, and have it preloaded & uploaded, before the scene begins so
 your game doesn't have to load that image on the spot!

===============================================================================
  Special Thanks :
===============================================================================

  Oscar92player : requesting audio preload.
  Tuomo : Reporting bugs with YEP_Core & YEP_VictoryAftermath.
  Archeia : Reporting issue with Replay BGM function.

===============================================================================
 Requirements :
===============================================================================

---------------------------------------
 None.
---------------------------------------

===============================================================================
 Instructions :
===============================================================================

---------------------------------------
 Preloading Custom Assets :
---------------------------------------

  At this moment, you are only able to preload assets on maps, and in battles,
  you can do so by adding the following to an maps notes, or a troops notes.

  <preload>
    KIND : TYPE
  </preload>

  KIND :
   "animation", "battleback1", "battleback2", "enemy", "character", "face",
   "parallax", "picture", "sv_actor", "sv_enemy", "system", "tileset",
   "title1", "title2"
------------------------------------------------------------------------------
  DESCRIPTION :
   replace "KIND" with one of the following tags( do not use
   quotes! ), this tag refers to what kind of image your loading, as well as
   what folder your loading the image from, for example, if you use "animation"
   as a tag, an image will be chosen from the "img/animations" folder.



  TYPE :
   "animationId", "imageName"
------------------------------------------------------------------------------
  DESCRIPTION :
   replace "TYPE" with either, the "animationId"( only available for
   "animation"! ), or the "imageName"( for anything NOT "animation" )
   of the image your preloading.


===============================================================================
 Terms Of Use :
===============================================================================

  This Plugin may be used commercially, or non commercially so long as credit
 is given, either in the games credit section, or in a text file alongside
 the game. This plugin may NOT be sold, or Plagiarized. This plugin may
 be extended upon, and shared freely.


===============================================================================
 Version History :
===============================================================================

 ● Version : 1.0.0
 ● Date : 13/01/2018
   ★ Release.

 ● Version : 1.4.0
 ● Date : 17/01/2018
   ★ Added the option to attempt to stabilize animations.

 ● Version : 1.5.0
 ● Date : 17/01/2018
   ★ Upload Animations to GPU before playing.
   ✩ Fixed issue with picture stabilization.

 ● Version : 1.5.1
 ● Date : 17/01/2018
   ✩ Accidentally deleted code to shorten pause time.

 ● Version : 2.0.0
 ● Date : 17/01/2018
   ★ Added preload for BGM and BGS( map/battle/title scene only ).

 ● Version : 2.0.1
 ● Date : 17/01/2018
   ✩ Fixed a bug which can cause the game to freeze.

 ● Version : 2.1.0
 ● Date : 05/03/2018
   ★ Added compatability for YEP_VictoryAftermath( credits to Tuomo L @rmw ).
   ✩ Audio is now unaltered when preload_audio is turned off.

 ● Version : 2.1.1
 ● Date : 08/03/2018
   ✩ AudioManager.playBgm & AudioManager.playBgs are no longer altered.

 ● Version : 2.1.2
 ● Date : 08/03/2018
   ✩ buffer parameters are applied before being played.

 ● Version : 4.0.0
 ● Date : 03/10/2018
   ★ Images are now uploaded to the GPU instead of pausing the scene on start.
   ★ Now able to preload custom assets in map and battle scenes.
   ✩ Audio preloading has been removed for the time being!

 ● Version : 4.1.0
 ● Date : 04/10/2018
   ★ The time taken to upload images to gpu has been drastically reduced.
   ★ Added fallback to prevent game from freezing if scene never stabilizes.
   ✩ removed some unnecessary code.

 ● Version : 4.1.1
 ● Date : 04/10/2018
   ✩ Fixed a bug that caused crash with canvas renderer.

 ● Version : 4.1.2
 ● Date : 04/10/2018
   ✩ Fixed compatability issue with GALV_AnimatedSplashScreens.js.

 ● Version : 4.1.5
 ● Date : 14/10/2018
   ✩ Plugin will now work with plugins that overwrite Scene_Base Initialize.
   ✩ Plugins that add custom sprites to map should no longer be an issue.

 ● Version : 4.1.6
 ● Date : 14/10/2018
   ✩ Fixed issue with animations appearing on screen.

 ● Version : 4.1.7
 ● Date : 15/10/2018
   ✩ Animations that are preloaded should no longer play Audio.

===============================================================================
 Contact Me :
===============================================================================

  If you have questions, about this plugin, or commissioning me, or have
 a bug to report, please feel free to contact me by any of the below
 methods.

 rmw : https://forums.rpgmakerweb.com/index.php?members/chaucer.44456
 patreon : https://www.patreon.com/chaucer91
 discord : chaucer#7538
 skypeId : chaucer1991
 gmail : chaucer91

 ()()
 (^.^)
 c(")(")

===============================================================================

*/

//=============================================================================
var Imported = Imported || {};
Imported['CHAU SCENESTABILIZER'] = true;
//=============================================================================
var Chaucer = Chaucer || {};
Chaucer.sceneStabilizer = {};
//=============================================================================


( function ( $ ) { //IIFE
  $ = $ || {};

//Create plugin information.
//=============================================================================
  var regxp = /Scene Stabilizer : Version - \d+\.\d+\.\d+/;
  for ( var i = 0; i < $plugins.length; i++ )
  { // setup plugin data.
    var desc = $plugins[i].description.match( regxp );
    if ( !desc ) continue;
    $.alias = {};
    $.params = Parse( Object.create( $plugins[i].parameters ) );
    $.name = desc[0].split(":")[0].trim();
    $.version = desc[0].split("-")[1].trim();
    break;
  }

//=============================================================================

  //--------------------------------------------------------------------------
  function Parse( object )
  { // parse all data in an object
  //--------------------------------------------------------------------------
    try {
      object = JSON.parse( object );
     } catch (e) {
      object = object;
     } finally {
      if ( typeof object === 'object' ) {
        if ( Array.isArray( object ) ) {
          for ( var i = 0; i < object.length; i++ ) {
            object[i] = Parse( object[i] );
          }
        } else {
          for ( var key in object ) {
            object[key] = Parse( object[key] );
          }
        }
      }
     }
     return object;
  }

//=============================================================================
// Chaucer :
//=============================================================================
  $.ticker = new PIXI.ticker.Ticker();

//=============================================================================
// Scene_Base :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias.SB_p_initialize = Scene_Base.prototype.initialize;
//-----------------------------------------------------------------------------
  Scene_Base.prototype.initialize = function ()
  { // Alias of initialize
//-----------------------------------------------------------------------------
    $.alias.SB_p_initialize.call( this );
    this.prepareForUpload();
  };

//-----------------------------------------------------------------------------
  $.alias.SB_p_isReady = Scene_Base.prototype.isReady;
//-----------------------------------------------------------------------------
  Scene_Base.prototype.isReady = function ()
  { // Alias of isReady
//-----------------------------------------------------------------------------
    var uploader = Graphics._renderer.plugins.prepare;
    var isReady = $.alias.SB_p_isReady.call( this );
    if ( isReady ) {
      if ( !this._uploading ) {
        this.startUploading();
      } else if ( !this._uploaded ) {
        this.processUpload();
      }
    }
    return isReady && this._uploaded;
  };

//=============================================================================
// Sprite_Animation :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias.SA_p_processTD = Sprite_Animation.prototype.processTimingData;
//-----------------------------------------------------------------------------
  Sprite_Animation.prototype.processTimingData = function ( timing )
  { // Alias of processTimingData
//-----------------------------------------------------------------------------
    if ( SceneManager._sceneStarted ) {
      $.alias.SA_p_processTD.call( this, timing );
    }
  };

//=============================================================================
} )( Chaucer.sceneStabilizer );
//=============================================================================

//-----------------------------------------------------------------------------
Scene_Base.prototype.prepareForUpload = function ( delta )
{ // prepare scene to be uploaded.
//-----------------------------------------------------------------------------
  this._spriteCache = [];
  this._uploading = false;
  this._uploaded = false;
  this._bufferTimer = 60;
  this._delta = 0;
  this._stabilizer = Chaucer.sceneStabilizer.ticker;
  this._stabilizer.add( this.stabilityCheck, this );
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.addTempBg = function ( delta )
{ // add a temporary bg image for scene map.
//-----------------------------------------------------------------------------
  var bitmap = SceneManager.snap();
  this._tempBg = new Sprite( bitmap );
  this.addChild( this._tempBg );
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.removeTempBg = function ( delta )
{ // add a temporary bg image for scene map.
//-----------------------------------------------------------------------------
  this.removeChild( this._tempBg );
  this._tempBg.bitmap.baseTexture.destroy();
  this._tempBg = null;
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.stabilityCheck = function ( delta )
{ // check if the scene is stable.
//-----------------------------------------------------------------------------
  this._bufferTimer--;
  var difference = Math.abs( delta - this._delta );
  if ( difference < 0.01 || this._bufferTimer === 0 ) {
    this.clearCache();
    this._stabilizer.stop();
    this._uploaded = true;
    this._stabilizer.remove( this.stabilityCheck, this );
    if ( this._tempBg ) this.removeTempBg();
  }
  this._delta = delta;
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.startUploading = function ()
{ // start uploading used images to the gpu.
//-----------------------------------------------------------------------------
  this._uploading = true;
  var speed = this.fadeSpeed();
  var background = SceneManager._backgroundBitmap;
  var uploader = Graphics._renderer.plugins.prepare;

  if ( !this._spriteCache ) this.prepareForUpload();
  this.preloadAssets();
  uploader.upload( this, function() {
    this._stabilizer.start();
  }.bind( this ) );
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.preloadAssets = function ()
{ // preload assets required for the scene.
//-----------------------------------------------------------------------------
  var uploader = Graphics._renderer.plugins.prepare;
  this.customPreload( null );
  this._spriteCache.forEach( function( s ) {
    s.x = s.y = -25000;
    this.addChild( s );
  }, this );
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.processUpload = function ()
{ // upload images to gpu until all images are processed.
//-----------------------------------------------------------------------------
  var uploader = Graphics._renderer.plugins.prepare;
  if ( !this._stabilizer.started ) {
    if ( !Graphics.isWebGL() ) { // remove textures without a canvas.
      uploader.queue = uploader.queue.filter( function( texture ) {
        return !!texture.source;
      } );
    }
    if ( uploader.prepareItems ) {
      uploader.limiter.maxItemsPerFrame = uploader.queue.length;
      uploader.tick();
    } else {
      while ( uploader.queue.length > 0 ) { uploader.tick(); }
    }
  }
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.clearCache = function ()
{ // finish uploading to gpu and remove all extra assets.
//-----------------------------------------------------------------------------
  this._spriteCache.forEach( function( s, i ) {
    if ( s.parent ) {
      s.parent.removeChild( s );
      this._spriteCache.splice( i, 1 );
    }
  }, this );
};

// PRELOAD CUSTOM SPRITES FOR MAPS & BATTLES.
//=============================================================================

//-----------------------------------------------------------------------------
Scene_Base.prototype.customPreload = function ( notes )
{ // preload custom assets based on note tags.
//-----------------------------------------------------------------------------
  if ( notes ) {
    var sprites = this.spritesFromNotes( notes );
    this._spriteCache = this._spriteCache.concat( sprites );
  }
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.spritesFromNotes = function ( notes )
{ // return sprites based on notes provided.
//-----------------------------------------------------------------------------
  var sprites = [];
  var valid = false;
  if ( notes ) {
    notes = notes.split( '\n' );
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      if ( valid ) {
        if ( note.match( '</preload>' ) ) break;
        sprites.push( this.spriteFromNote( note ) );
      }
      if ( !valid ) valid = note.match( '<preload>' );
    }
  }
  return sprites;
};

//-----------------------------------------------------------------------------
Scene_Base.prototype.spriteFromNote = function ( note )
{ // return a new bitmap from a note tag.
//-----------------------------------------------------------------------------
  note = note.split( ':' );
  var key = note[0].trim();
  var name = key === 'animation' ? Number( note[1] ) : note[1].trim();
  switch ( key ) {
    case 'animation' :
      var animeId = Number( name );
      var sprite = new Sprite_Animation();
      sprite.setup( sprite, $dataAnimations[animeId], false, 0 );
      sprite._muted = true;
      return sprite;
    case 'battleback1' :
      return new TilingSprite( ImageManager.loadBattleback1( name ) );
    case 'battleback2' :
      return new TilingSprite( ImageManager.loadBattleback1( name ) );
    case 'enemy' :
      return new Sprite( ImageManager.loadEnemy( name ) );
    case 'character' :
      return new Sprite( ImageManager.loadCharacter( name ) );
    case 'face' :
      return new Sprite( ImageManager.loadFace( name ) );
    case 'parallax' :
      return new TilingSprite( ImageManager.loadParallax( name ) );
    case 'picture' :
      return new Sprite( ImageManager.loadPicture( name ) );
    case 'sv_actor' :
      return new Sprite( ImageManager.loadSvActor( name ) );
    case 'sv_enemy' :
    case 'system' :
      return new Sprite( ImageManager.loadSvEnemy( name ) );
      return new Sprite( ImageManager.loadSystem( name ) );
    case 'tileset' :
      return new Sprite( ImageManager.loadTileset( name ) );
    case 'title1' :
      return new Sprite( ImageManager.loadTitle1( name ) );
    case 'title2' :
      return new Sprite( ImageManager.loadTitle2( name ) );
  }
};

//=============================================================================
// Scene_Map :
//=============================================================================

//-----------------------------------------------------------------------------
Scene_Map.prototype.stabilityCheck = function ( delta )
{ // extend stability check of map.
//-----------------------------------------------------------------------------
  if ( this.needsFadeIn() || this._transfer )  this.startFadeIn( 1, false );
  if ( !this._tempBg ) this.addTempBg();
  Graphics.render( this );
  Scene_Base.prototype.stabilityCheck.call( this, delta );
};

//-----------------------------------------------------------------------------
Scene_Map.prototype.customPreload = function ( notes )
{ // description.
//-----------------------------------------------------------------------------
  Scene_Base.prototype.customPreload.call( this, $dataMap.note );
};

//=============================================================================
// Scene_Battle :
//=============================================================================

//-----------------------------------------------------------------------------
Scene_Battle.prototype.preloadAssets = function ()
{ // extend preload assets.
//-----------------------------------------------------------------------------
  var uploader = Graphics._renderer.plugins.prepare;
  Scene_Base.prototype.preloadAssets.call( this );
  this.preloadAnimations( uploader );
};

//-----------------------------------------------------------------------------
Scene_Battle.prototype.customPreload = function ( notes )
{ // extend custom preload.
//-----------------------------------------------------------------------------
  Scene_Base.prototype.customPreload.call( $gameTroop.note );
};

//-----------------------------------------------------------------------------
Scene_Battle.prototype.preloadAnimations = function ( uploader )
{ // preload all animations that can be used in this battle.
//-----------------------------------------------------------------------------
  this.preloadEnemyAnimations( uploader );
  this.preloadActorAnimations( uploader );
};

//-----------------------------------------------------------------------------
Scene_Battle.prototype.preloadEnemyAnimations = function ( uploader )
{ // preload all enemy animations.
//-----------------------------------------------------------------------------
  $gameTroop.members().forEach( function( enemy ) {
    var actions = enemy.enemy().actions;
    for (var i = 0; i < actions.length; i++) {
      var animationId = $dataSkills[actions[i].skillId].animationId;
      var animation = $dataAnimations[animationId];
      if ( animation ) {
        var sprite = new Sprite_Animation();
        sprite.setup( sprite, animation, false, 0 );
        this._spriteCache.push( sprite );
        sprite._muted = true;
      }
    }
  }, this );
};

//-----------------------------------------------------------------------------
Scene_Battle.prototype.preloadActorAnimations = function ( uploader )
{ // preload all actor animations.
//-----------------------------------------------------------------------------
  this.preloadActorSkills();
  this.preloadPartyItems();
};

//-----------------------------------------------------------------------------
Scene_Battle.prototype.preloadActorSkills = function ( uploader )
{ // preload actor skills.
//-----------------------------------------------------------------------------
  $gameParty.members().forEach( function( member ) {
    for (var i = 0; i < member.skills().length; i++) {
      var animationId = member.skills()[i].animationId;
      var animation = $dataAnimations[animationId];
      if ( animation ) {
        var sprite = new Sprite_Animation();
        sprite.setup( sprite, animation, false, 0 );
        this._spriteCache.push( sprite );
        sprite._muted = true;
      }
    }
  }, this );
};

//-----------------------------------------------------------------------------
Scene_Battle.prototype.preloadPartyItems = function ( uploader )
{ // preload actor skills.
//-----------------------------------------------------------------------------
  $gameParty.items().forEach( function( item ) {
    var animation = $dataAnimations[item.animationId];
    if ( animation ) {
      var sprite = new Sprite_Animation();
      sprite.setup( sprite, animation, false, 0 );
      this._spriteCache.push( sprite );
      sprite._muted = true;
    }
  }, this );
};
// TODO: Find out why windows are causing lag...
