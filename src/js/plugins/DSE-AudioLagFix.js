//=============================================================================
// DSE-AUDIOLAG-FIX.js 0.63
//=============================================================================
/*:
 * @plugindesc Audio Fix for RPGmaker MV
 * @author SilverKnightArcher
 *
 * @pram ME Override
 * @desc Adjusts the width of the screen.
 * @default null
 *
 * @help
 *============================================================================
 * Introduction
 *============================================================================
 * RPGmakerMV has a reccuring Audio Lag that is very noticable with long tracks.
 * Particulary BGMs which are typically a few minutes long.
 *
 * This is caused by RPGmaker trying to load the entire tack into memory
 * before playing it. Thus longer tracks take a little bit to load and the
 * lag becomes noticable, espically on low end PCs
 *
 * This script Aims to Remove this Lag without increasing loading times.
 *============================================================================
 * Install
 *============================================================================
 *  Simply Place in the JS folder abnd install like any other script.
 *  This plugins may be incompatible with other Audio plugins.
 *
 *============================================================================
 * Bugs
 *============================================================================
 *
 * - Due to the way streamed Audio works, changing 'pitch' will only change
 *    the playback speed of the audio. but the pitch remians the same.
 *
 *============================================================================
 * Change Log
 *============================================================================
 *
 *  12 Dec 16 - 0.01 started script
 *  13 Dec 16 - 0.10 move Audio Context creation into AudioSourceManager class
 *  13 Dec 16 - 0.14 stop random crashing when scene changes
 *  15 Dec 16 - 0.17 stop random crashing when battle ends
 *  21 Dec 16 - 0.50 Stop crashing when same song slected twice
 *  29 Dec 16 - 0.51 Added Fadein-out function
 *  31 Dec 16 - 0.53 Removed Deprecated functions
 *  02 Jan 17 - 0.55 Fixed BGM starting up early after battles
 *  03 Jan 17 - 0.59 Fixed BGM crash when same BGM is used for Map and Battles
 *  05 Jan 17 - 0.60 Removed Debug code causing crash
 *  05 Jan 17 - 0.63 BGS are now streamed
 *
 *============================================================================
 * END HELP
 *============================================================================
 */

var Imported = Imported || {};
Imported.DSE4_AudioFix = true;

var DSEIV = DSEIV || {};
//============================================================================
// Audio Manager
//
// The static class that handles BGM, BGS, ME and SE.
//============================================================================
//-----------------------------------------------------------------------------
// override Play BGM
//-----------------------------------------------------------------------------
AudioManager.playBgm = function (bgm, pos) {
	if (this.isCurrentBgm(bgm)) {
		
		this.updateBgmParameters(bgm);
	} else {
		this.stopBgm();
		if (bgm.name) {
			
			this._bgmBuffer = this.createBGMBuffer('bgm', bgm.name);
			this.updateBgmParameters(bgm);
			if (!this._meBuffer) {
				this._bgmBuffer.play(true, pos || 0);
			}
		}
	}
	this.updateCurrentBgm(bgm, pos);
};
//-----------------------------------------------------------------------------
// Replay BGM
//-----------------------------------------------------------------------------
AudioManager.replayBgm = function (bgm) {
	if (this.isCurrentBgm(bgm)) {
		this.updateBgmParameters(bgm);	
	} else {
		this.playBgm(bgm, bgm.pos);
		if (this._bgmBuffer) {
			this._bgmBuffer.fadeIn(this._replayFadeTime);
		}
	}
};
//-----------------------------------------------------------------------------
// Stop BGM
//-----------------------------------------------------------------------------
AudioManager.stopBgm = function () {
	if (this._bgmBuffer) {
		this._bgmBuffer.stop();
		this._bgmBuffer = null;
		this._currentBgm = null;
	}
};
//-----------------------------------------------------------------------------
// Save BGM
//-----------------------------------------------------------------------------
AudioManager.saveBgm = function () {
	if (this._currentBgm) {
		var bgm = this._currentBgm;
		return {
			name: bgm.name,
			volume: bgm.volume,
			pitch: bgm.pitch,
			pan: bgm.pan,
			pos: this._bgmBuffer ? this._bgmBuffer.seek() : 0
		};
	} else {
		return this.makeEmptyAudioObject();
	}
};

//-----------------------------------------------------------------------------
// new Create Buffeer
//-----------------------------------------------------------------------------
AudioManager.createBGMBuffer = function (folder, name) {
	var ext = this.audioFileExt();
	var url = this._path + folder + '/' + encodeURIComponent(name) + ext;
	if (this.shouldUseHtml5Audio() && folder === 'bgm') {
		Html5Audio.setup(url);
		return Html5Audio;
	} else {
		return new DSEIV.StreamAudio(url);
	}
};
//-----------------------------------------------------------------------------
//
//-----------------------------------------------------------------------------
AudioManager.playBgs = function(bgs, pos) {
    if (this.isCurrentBgs(bgs)) {
        this.updateBgsParameters(bgs);
    } else {
        this.stopBgs();
        if (bgs.name) {
            this._bgsBuffer = this.createBGSBuffer('bgs', bgs.name);
            this.updateBgsParameters(bgs);
            this._bgsBuffer.play(true, pos || 0);
        }
    }
    this.updateCurrentBgs(bgs, pos);
};
//-----------------------------------------------------------------------------
// new Create Buffeer
//-----------------------------------------------------------------------------
AudioManager.createBGSBuffer = function (folder, name) {
	var ext = this.audioFileExt();
	var url = this._path + folder + '/' + encodeURIComponent(name) + ext;
	if (this.shouldUseHtml5Audio() && folder === 'bgs') {
		Html5Audio.setup(url);
		return Html5Audio;
	} else {
		return new DSEIV.StreamAudio(url);
	}
};
//-----------------------------------------------------------------------------
// override Check Errors
//-----------------------------------------------------------------------------
AudioManager.checkErrors = function () {
	this.checkDSEStreamAudioError(this._bgmBuffer);
	this.checkWebAudioError(this._bgsBuffer);
	this.checkWebAudioError(this._meBuffer);
	this._seBuffers.forEach(function (buffer) {
		this.checkWebAudioError(buffer);
	}
		.bind(this));
	this._staticBuffers.forEach(function (buffer) {
		this.checkWebAudioError(buffer);
	}
		.bind(this));
};
//-----------------------------------------------------------------------------
// new Check BGM Web Audio Errors
//-----------------------------------------------------------------------------
AudioManager.checkDSEStreamAudioError = function (streamAudio) {
	if (streamAudio && streamAudio.isError()) {
		throw new Error('Failed to load: ' + streamAudio);
	}
};
//=============================================================================
// AudioSourceManager
// This static class handles our Audio Context whenever we create
// DSEIV Buffer
//=============================================================================
DSEIV.AudioSourceManager = function () {
	throw new Error("cannot create instance of static class")
};
DSEIV.AudioSourceManager.initialized = false;
DSEIV.AudioSourceManager.audioContext = null;
DSEIV.AudioSourceManager.audioSourceElement = null;
DSEIV.AudioSourceManager.audioMasterGainNode = null;

//-----------------------------------------------------------------------------
// Initialise
//-----------------------------------------------------------------------------
DSEIV.AudioSourceManager.initialize = function () {
	
	if (DSEIV.AudioSourceManager.initialized) {
		console.log("re-initializing??");
	}
	
	this.createContext();
	this.createAudioSourceElement();
	DSEIV.AudioSourceManager.initialized = true;
};

//-----------------------------------------------------------------------------
// Create Context
//-----------------------------------------------------------------------------
DSEIV.AudioSourceManager.createContext = function () {
	try {
		if (typeof AudioContext !== 'undefined') {
			DSEIV.AudioSourceManager.audioContext = new AudioContext();
		} else if (typeof webkitAudioContext !== 'undefined') {
			DSEIV.AudioSourceManager.audioContext = new webkitAudioContext();
		}
	} catch (e) {
		DSEIV.AudioSourceManager.audioContext = null;
		console.log(e);
	}

};

//-----------------------------------------------------------------------------
// Create Master Gain Node
//-----------------------------------------------------------------------------
DSEIV.AudioSourceManager.createMasterGainNode = function () {
	if (!!this.audioContext) {
		this.audioMasterGainNode = this.audioContext.createGainNode();
		this.audioMasterGainNode.gain.value = 1;

	} else {
		console.log('Master gain node creation failed: Audio Context does not exsist');
	}

};
//-----------------------------------------------------------------------------
// Create Audio Source Elememnt
//-----------------------------------------------------------------------------
DSEIV.AudioSourceManager.createAudioSourceElement = function () {
	var ele = document.createElement('AudioSource');
	ele.id = 'Audio Context';
	ele.mastervolume = 1;

	DSEIV.AudioSourceManager.audioSourceElement = document.body.appendChild(ele);

};

//=============================================================================
// new class StreamAudio
//
// This class is a duplicate of WebAudio but implements
// MediaElementAudioSourceNode instead of AudioBufferSource Node
// With this, hopefully the lag surrounding BGMS will be gone.
//
//
// this class does not support pitch shifting yet. as it is not supported by
// MediaElementAudioSourceNode.
//=============================================================================
// Constructor
//-----------------------------------------------------------------------------
DSEIV.StreamAudio = function () {
	this.initialize.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Initialise
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.initialize = function (url) {
	if (DSEIV.AudioSourceManager.initialized == false) {
		DSEIV.AudioSourceManager.initialize();
	}
    console.log('new stream Audio for: ' + url);
	this.clear();
	this._url = url;
	this.createAudioStream();

};

//-----------------------------------------------------------------------------
// Define Properties
// Url
//-----------------------------------------------------------------------------
Object.defineProperties(DSEIV.StreamAudio.prototype, {
	url: {
		get: function () {
			return this._url;
		},
		configurable: true
	},

	//-----------------------------------------------------------------------------
	// Volume
	//-----------------------------------------------------------------------------
	volume: {
		get:
		function () {
			return this._volume;
		},
		set: function (value) {
			this._volume = value;
			if (this._gainNode) {
				this._gainNode.gain.value = this._volume;
			}
		},
		configurable: true
	},
	//-----------------------------------------------------------------------------
	// Pitch
	//-----------------------------------------------------------------------------
	pitch: {
		get: function () {
			return this._pitch;
		},
		set: function (value) {
			if (this._pitch !== value) {
				this._pitch = value;
				if (this.isPlaying()) {
					this.play(this._sourceNode.loop, 0);
				}
			}
		},
		configurable: true
	},
	//-----------------------------------------------------------------------------
	// Pan
	//-----------------------------------------------------------------------------
	pan: {
		get: function () {
			return this._pan;
		},
		set: function (value) {
			this._pan = value;
			this.updatePanner()
		},
		configurable: true
	}
});

//-----------------------------------------------------------------------------
// Clears Everything
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.clear = function (url) {
	this._autoPlay = false;
	this._id = 'nil';
	this._volume = 1;
	this._pan = 0;
	this._pitch = 1;
	this._sourceNode = null;
	this._gainNode = null;
	this._pannerNode = null;
	this._stream = null;
	this._loop = false;
	this._startTime = 0.0;
	this._loopStart = 0.0;
	this._loopEnd = 0.0;
	this._endTime = 0.0;
	this._stopDelegates = [];
	this._isError = false;

};
//-----------------------------------------------------------------------------
// Create ID from URL
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.idFromURL = function (url) {
	var regex = /audio\/(\w*)\/(\w*.ogg)/i;
	if (url.match(regex)) {
		var type = RegExp.$1;
		var name = RegExp.$2;

		var id = type + "." + name;
		this._id = id;
		return id;
	} else {
		console.log('no matches found for id!!');
		this._id = url;
		return this._id;
	}
};

//-----------------------------------------------------------------------------
// Create Audio Stream
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.createAudioStream = function () {

	this._stream = new Audio([this._url]);
	this._stream.preservesPitch = false;
	this._id = this.idFromURL(this._url);
	console.log(this._stream);

};

//-----------------------------------------------------------------------------
// Fade In
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.fadeIn = function (duration) {
	console.log('fade in');
	if (this._gainNode) {
		var gain = this._gainNode.gain;
		var currentTime = DSEIV.AudioSourceManager.audioContext.currentTime;
		gain.setValueAtTime(0, currentTime);
		gain.linearRampToValueAtTime(this._volume, currentTime + duration);
	}
	this._autoPlay = true;
};

//-----------------------------------------------------------------------------
// Fade Out
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.fadeOut = function (duration) {
	console.log('fadeing out');
	if (this._gainNode) {
		var gain = this._gainNode.gain;
		var currentTime = DSEIV.AudioSourceManager.audioContext.currentTime;
		gain.setValueAtTime(gain.value, currentTime);
		gain.linearRampToValueAtTime(0, currentTime + duration);
	}
	this._autoPlay = false;

};

//-----------------------------------------------------------------------------
// Seek
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.seek = function () {
	console.log('Seeking...');
	if (this._stream == null) {
		console.log('Seeking... Audio stream is null WTF');
		return 0;
	} else {
		console.log('Seeking... ');
		return this._stream.currentTime;
	}
};

//-----------------------------------------------------------------------------
// IsPlaying?
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.isPlaying = function () {
	return this._sourceNode != null;
};

//-----------------------------------------------------------------------------
// Play
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.play = function (loop, offset) {
	console.log("now playing " + this._id);
	offset = offset || 0;
	loop = loop || true;
	this._autoPlay = true;

	if (this._stream) {

		if (!this.isPlaying()) {
			this.removeNodes();
			this.createNodes();
			this.connectNodes();
		}
		this._stream.play();
		this._stream.currentTime = offset;
		this._stream.loop = loop;
		this._stream.playbackRate = this._stream.defaultPlaybackRate * this._pitch;
	} else if (this._stream == null) {
		console.log('Stream Audio has encountrered an inconsitencey with Audio,' + 
		'attempting restart');
		this.stop();
		try {
		this.restart(loop, offset);
		}
		catch(e) {
			console.log(e);
		}
		
	}

};
//-----------------------------------------------------------------------------
// Restart
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.restart = function (loop, offset) {
	this.createAudioStream();
	this.play(loop, offset);
};
//-----------------------------------------------------------------------------
// Create Nodes
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.createNodes = function () {
	console.log("creating nodes" + this._id);
	this.createSourceNode();
	this.createGainNode();
	this.createPannerNode();

};

//-----------------------------------------------------------------------------
// Create Source Node
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.createSourceNode = function () {
	var context = DSEIV.AudioSourceManager.audioContext;
	if (this._sourceNode == null) {
		this._sourceNode = context.createMediaElementSource(this._stream);
	}
};

//-----------------------------------------------------------------------------
// Create Pan Node
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.createPannerNode = function () {
	var context = DSEIV.AudioSourceManager.audioContext;
	this._pannerNode = context.createPanner();
};

//-----------------------------------------------------------------------------
// Update Pan Node
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.updatePanner = function () {
	if (this._pannerNode) {
		var x = this._pan;
		var z = 1 - Math.abs(x);
		this._pannerNode.setPosition(x, 0, z);
	}
};

//-----------------------------------------------------------------------------
// Create Gain Node
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.createGainNode = function () {
	var context = DSEIV.AudioSourceManager.audioContext;
	this._gainNode = context.createGain();
	this._gainNode.gain.value = this._volume;
};

//-----------------------------------------------------------------------------
// Connect Nodes
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.connectNodes = function () {
	console.log('connecting nodes');
	var context = DSEIV.AudioSourceManager.audioContext;
	this._sourceNode.connect(this._gainNode);
	this._gainNode.connect(context.destination);
};

//-----------------------------------------------------------------------------
// Remove Nodes
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.removeNodes = function () {

	console.log('removing nodes');
	if (this._sourceNode != null) {
		this._sourceNode.disconnect();
		this._gainNode.disconnect();
		this._pannerNode.disconnect();
	}
	this._sourceNode = null;
	this._gainNode = null;
	this._pannerNode = null;

};

//-----------------------------------------------------------------------------
//  Stop
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.stop = function () {

	console.log("stopping audio stream: " + this._id);
	this.removeNodes();

	if (this._stream) {
		console.log("removing stream HTML object");
		this._stream.autoplay = false;
		this._stream.pause();
		this._stream.currentTime = 0;
		this._stream = null;

	}
	//this.invokeStopListeners();
};

//-----------------------------------------------------------------------------
// Add Stop Listener
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.addStopListener = function (listener) {

	this._stopDelegates.push(listener);
};

//-----------------------------------------------------------------------------
// Invoke Stop Listener
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.invokeStopListeners = function () {

	this._stopDelegates.forEach(function (listner) {

		listener();

	});
};

//-----------------------------------------------------------------------------
// Is Error
//-----------------------------------------------------------------------------
DSEIV.StreamAudio.prototype.isError = function () {
	return this._isError;
};
