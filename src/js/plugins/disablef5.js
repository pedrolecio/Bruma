(function() {
	var alias = SceneManager.onKeyDown;
	SceneManager.onKeyDown = function(event) {
		if (event.keyCode !== 116) alias.call(this, event);
	};
})();