window.onload = function () {

    var canvas = require('canvas');
    var tile = require('tile');
    var sprite = require('sprite');
    var loop = require('loop');

    var screen = new canvas.Canvas({width: 500, height: 500});
    var layer = new canvas.Layer();
    screen.root.addLayer({layer: layer});

    function MainMode() {
        this.loaded = false;
        tile.load({url: '/static/assets/tilesets', success: this.onTileLoaded.bind(this)});
    }

    MainMode.prototype.onTileLoaded = function (options) {
        console.log(this.onAladdinSetLoaded);
        this.aladdinSet = options.tilesets.aladdin;
        this.aladdinSet.load({success: this.onAladdinSetLoaded.bind(this)});
    };

    MainMode.prototype.onAladdinSetLoaded = function () {
        this.aladdin = new sprite.Sprite({tileset: this.aladdinSet, animation: 'run', x: 100, y: 100});
        layer.addView({view: this.aladdin});
        this.loaded = true;
    };

    MainMode.prototype.draw = function () {
        if (this.loaded) {
            this.aladdin.step();
        }

        screen.draw();
    };

    MainMode.prototype.onMouseDown = function(event) {
        console.log('mouse down', event);
    };

    var mainMode = new MainMode();
    loop.setMode({mode: mainMode});
    loop.start({mouseArea: screen.el});
};