//=============================================================================
// SA_AnotherWeather.js
// ----------------------------------------------------------------------------
// Created by seea
// License: MIT License  https://opensource.org/licenses/mit-license.php
//
// Original code copyright:
//  ©2015 KADOKAWA CORPORATION./YOJI OJIMA
//
// Plugin author:
//  Contact: https://nekono.org
//
// Free of charge.
// Allow any encryption or digital rights management.
// The method of copyright notation is left to the user.
//=============================================================================
// History
// 17.0 2017/07/30 Initial release.

/*:
 * ==============================================================================
 * @plugindesc v17.0 SA Another weather system
 * @author seea
 * @require rpg_core.js v1.5.0/1.5.1
 *
 * @help
 * SA Another weather system -- 修正された天候システム
 *
 * 必須 - rpg_core.js v1.5.0/1.5.1
 *
 * 「雨」 …… 異なる描写に置き換えられます。
 * 「嵐」 …… 異なる描写に置き換えられます。
 * 「雪」 …… 変更ありません。
 */

var Imported = Imported || {};
Imported.SA_AnotherWeather = true;

//-----------------------------------------------------------------------------
/**
 * The weather effect which displays rain, storm, or snow.
 *
 * @class Weather
 * @constructor
 */
function Weather() {
	this.initialize.apply(this, arguments);
}

Weather.prototype = Object.create(PIXI.Container.prototype);
Weather.prototype.constructor = Weather;

Weather.prototype.initialize = function () {
	PIXI.Container.call(this);

	this._width = Graphics.width;
	this._height = Graphics.height;
	this._sprites = [];

	this._createBitmaps();
	this._createDimmer();

	/**
	 * The type of the weather in ['none', 'rain', 'storm', 'snow'].
	 *
	 * @property type
	 * @type String
	 */
	this.type = 'none';

	/**
	 * The power of the weather in the range (0, 9).
	 *
	 * @property power
	 * @type Number
	 */
	this.power = 0;

	/**
	 * The origin point of the weather for scrolling.
	 *
	 * @property origin
	 * @type Point
	 */
	this.origin = new Point();
};

/**
 * Updates the weather for each frame.
 *
 * @method update
 */
Weather.prototype.update = function () {
	this._updateDimmer();
	this._updateAllSprites();
};

/**
 * @method _createBitmaps
 * @private
 */
Weather.prototype._createBitmaps = function () {
	this._rainBitmap = new Bitmap(1, 30);
	this._rainBitmap.fillAll('white');
	//this._stormBitmap = new Bitmap(2, 100);
	this._stormBitmap = new Bitmap(2, 60);
	this._stormBitmap.fillAll('white');
	this._snowBitmap = new Bitmap(9, 9);
	this._snowBitmap.drawCircle(4, 4, 4, 'white');
};

/**
 * @method _createDimmer
 * @private
 */
Weather.prototype._createDimmer = function () {
	this._dimmerSprite = new ScreenSprite();
	this._dimmerSprite.setColor(80, 80, 80);
	this.addChild(this._dimmerSprite);
};

/**
 * @method _updateDimmer
 * @private
 */
Weather.prototype._updateDimmer = function () {
	this._dimmerSprite.opacity = Math.floor(this.power * 6);
};

/**
 * @method _updateAllSprites
 * @private
 */
Weather.prototype._updateAllSprites = function () {
	//var maxSprites = Math.floor(this.power * 10);
	var maxSprites = Math.floor(this.power * this.power * 5);
	while (this._sprites.length < maxSprites) {
		this._addSprite();
	}
	while (this._sprites.length > maxSprites) {
		this._removeSprite();
	}
	this._sprites.forEach(function (sprite) {
		this._updateSprite(sprite);
		sprite.x = sprite.ax - this.origin.x;
		sprite.y = sprite.ay - this.origin.y;
	}, this);
};

/**
 * @method _addSprite
 * @private
 */
Weather.prototype._addSprite = function () {
	var sprite = new Sprite(this.viewport);
	sprite.opacity = 0;
	this._sprites.push(sprite);
	this.addChild(sprite);
};

/**
 * @method _removeSprite
 * @private
 */
Weather.prototype._removeSprite = function () {
	this.removeChild(this._sprites.pop());
};

/**
 * @method _updateSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateSprite = function (sprite) {
	switch (this.type) {
	case 'rain':
		this._updateRainSprite(sprite);
		if (sprite.opacity < 20) {
			this._rebornRainSprite(sprite);
		}
		break;
	case 'storm':
		this._updateStormSprite(sprite);
		if (sprite.opacity < 20) {
			this._rebornStormSprite(sprite);
		}
		break;
	case 'snow':
		this._updateSnowSprite(sprite);
		if (sprite.opacity < 40) {
			this._rebornSprite(sprite);
		}
		break;
	}
};

/**
 * @method _updateRainSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateRainSprite = function (sprite) {
	sprite.bitmap = this._rainBitmap;
	// 降雨の強さから落下速度を決める
	// this.powerは整数ではなく実数なので注意
	var fall_speed;
	var d_opacity;
	if (this.power >= 9.0) {
		fall_speed = 16;
		d_opacity = 4;
	} else if (this.power >= 8.0) {
		fall_speed = 14;
		d_opacity = 3;
	} else if (this.power >= 7.0) {
		fall_speed = 13;
		d_opacity = 3;
	} else if (this.power >= 6.0) {
		fall_speed = 12;
		d_opacity = 3;
	} else if (this.power >= 5.0) {
		fall_speed = 11;
		d_opacity = 3;
	} else if (this.power >= 4.0) {
		fall_speed = 10;
		d_opacity = 3;
	} else if (this.power >= 3.0) {
		fall_speed = 8;
		d_opacity = 3;
	} else if (this.power >= 2.0) {
		fall_speed = 6;
		d_opacity = 2;
	} else {
		fall_speed = 4;
		d_opacity = 2;
	}
	sprite.ax -= fall_speed * Math.sin(sprite.rotation);
	sprite.ay += fall_speed * Math.cos(sprite.rotation);
	sprite.opacity -= d_opacity;
};

/**
 * @method _updateStormSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateStormSprite = function (sprite) {
	sprite.bitmap = this._stormBitmap;
	//sprite.rotation = Math.PI / 8;
	//sprite.ax -= 8 * Math.sin(sprite.rotation);
	//sprite.ay += 8 * Math.cos(sprite.rotation);
	//sprite.opacity -= 8;
	sprite.ax -= 16 * Math.sin(sprite.rotation);
	sprite.ay += 16 * Math.cos(sprite.rotation);
	sprite.opacity -= 6;
};

/**
 * @method _updateSnowSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateSnowSprite = function (sprite) {
	sprite.bitmap = this._snowBitmap;
	sprite.rotation = Math.PI / 16;
	sprite.ax -= 3 * Math.sin(sprite.rotation);
	sprite.ay += 3 * Math.cos(sprite.rotation);
	sprite.opacity -= 3;
};

/**
 * @method _rebornSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._rebornSprite = function (sprite) {
	sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
	sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
	sprite.opacity = 160 + Math.randomInt(60);
};

Weather.prototype._rebornRainSprite = function (sprite) {
	sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
	sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
	// vv 2017-07-30 change start by seea
	//sprite.opacity = 160 + Math.randomInt(60);
	sprite.opacity = 60 + Math.randomInt(30); // changed 160->60, 60->30
	// ^^ 2017-07-30 change end

	//sprite.rotation = Math.PI / 16;
	sprite.rotation = ((Math.PI * (1 / 12 * Math.random() - 1 / 24)) + (Math.PI * (1 / 12 * Math.random() - 1 / 24))) / 2.0;
};

Weather.prototype._rebornStormSprite = function (sprite) {
	sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
	sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
	// vv 2017-07-30 change start by seea
	//sprite.opacity = 160 + Math.randomInt(60);
	sprite.opacity = 60 + Math.randomInt(30); // changed 160->60, 60->30
	// ^^ 2017-07-30 change end

	sprite.rotation = Math.PI / 24;
	//sprite.rotation = ((Math.PI * (1 / 12 * Math.random() - 1 / 24)) + (Math.PI * (1 / 12 * Math.random() - 1 / 24))) / 2.0;
};