/*:
 * @author William Ramsey
 * @plugindesc Sparkly water!
 * 
 * @param quality
 * @text Sparkle Quality
 * @default 10
 * @type number
 * 
 * @param speed
 * @text Sparkle Speed
 * @default 8
 * @type number
 */

(() => {

    const sm_start = Scene_Map.prototype.start;
    const sm_update = Scene_Map.prototype.update;

    const params = PluginManager.parameters('Sparkles');
    let quality = Number(params['quality']);
    let speed = Number(params['speed']);

    let clearInterval = speed;
    let clearTimer = 0;
    Scene_Map.prototype.start = function() {
        sm_start.apply(this, arguments);
        this._sparkleArray = [];
        this.sparkles = new Sprite();
        this.sparkles.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
        this.addChild(this.sparkles);
        for (let i = 0; i < $gameMap.width(); i++) {
            for (let j = 0; j < $gameMap.height(); j++) {
                if ($gameMap.terrainTag(i, j) === 1) {
                    this._sparkleArray.push({ x: i, y: j });
                }
            }
        }
    }

    Scene_Map.prototype.update = function() {
        sm_update.apply(this, arguments);
        clearTimer++;
        if (clearTimer === clearInterval) {
            clearTimer = 0;
            this.sparkles.bitmap.clearRect(0, 0, Graphics.boxWidth, Graphics.boxHeight);
            for (let i in this._sparkleArray) {
                let id = this._sparkleArray[i];
                let x = (id.x - $gameMap._displayX) * 48;
                let y = (id.y - $gameMap._displayY) * 48;

                if ($gameMap.terrainTag(id.x, id.y) !== 2) randSparks(this.sparkles.bitmap, x + 8, y + 8)
            }
        }
    }

    const randSparks = (bitmap, x, y) => {
        for (let i = 0; i < quality; i++) {
            let brightness = Math.floor(255 - (Math.random() * 20));
            let rgba = `rgba(${brightness}, ${brightness}, ${brightness}, ${0.5-(Math.random()/2)})`
            let scale = 1;
            bitmap.fillRect(x + Math.random() * 48, y + Math.random() * 48, scale, scale, `${rgba}`);
        }
    }
})();