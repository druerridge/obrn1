window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 960,
		height: 540,
		physics: {
			default: "arcade",
			arcade: {
				debug: true
			}
		},
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
    game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {

		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {

        this.scene.start("Preload");
	}

}