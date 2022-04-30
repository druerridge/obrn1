
// You can write more code here

/* START OF COMPILED CODE */

class CharacterTest extends Phaser.Scene {

	constructor() {
		super("CharacterTest");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// hexminiblocking
		const hexminiblocking = this.add.tilemap("hexminiblocking");
		hexminiblocking.addTilesetImage("hex mini", "hexmini");
		hexminiblocking.addTilesetImage("hexmini", "hexmini");

		// player
		const player = new Player(this, 400, 300);
		this.add.existing(player);

		// ground_1
		hexminiblocking.createLayer("Ground", ["hexmini"], 0, 0);

		// collision_1
		hexminiblocking.createLayer("Collision", ["hexmini"], 0, 0);

		this.hexminiblocking = hexminiblocking;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	private hexminiblocking?: Phaser.Tilemaps.Tilemap;

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
