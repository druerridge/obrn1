
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// hexminiblocking
		const hexminiblocking = this.add.tilemap("hexminiblocking");
		hexminiblocking.addTilesetImage("hex mini", "hexmini");
		hexminiblocking.addTilesetImage("hexmini", "hexmini");

		// groundLayer
		const groundLayer = hexminiblocking.createLayer("Ground", ["hexmini"], 0, 0);

		// collisionLayer
		const collisionLayer = hexminiblocking.createLayer("Collision", ["hexmini"], 0, 0);

		// PlayerLayer
		const playerLayer = this.add.layer();

		// player
		const player = new Player(this, 282, 227);
		playerLayer.add(player);

		this.groundLayer = groundLayer;
		this.collisionLayer = collisionLayer;
		this.player = player;
		this.hexminiblocking = hexminiblocking;

		this.events.emit("scene-awake");
	}

	private groundLayer!: Phaser.Tilemaps.TilemapLayer;
	private collisionLayer!: Phaser.Tilemaps.TilemapLayer;
	private player!: Player;

	/* START-USER-CODE */
    private hexminiblocking!: Phaser.Tilemaps.Tilemap;
	private selectedTile!: Phaser.Tilemaps.Tile;
	// Write your code here.

	create() {
		this.editorCreate();

		this.groundLayer.setInteractive();
		this.input.on('pointerup', (pointer: any) => {
			console.log("Pointer Up " , pointer.worldX, pointer.worldY);
			let tile: Phaser.Tilemaps.Tile = this.groundLayer.getTileAtWorldXY(pointer.worldX, pointer.worldY);
			if (tile) {
				console.log("tile:", tile.x, tile.y);
				let tileWorldPosition: Phaser.Math.Vector2 = this.groundLayer.tileToWorldXY(tile.x, tile.y);
				console.log("tileWorldPosition", tileWorldPosition);
				this.player.setMoveTarget(tileWorldPosition);
			} else {
				console.error("No tile at world position: ", pointer.worldX, pointer.worldY);
			}
		});

		this.input.on('pointermove', (pointer: any) => {
			let tempPoint: Phaser.Math.Vector2;
			let tile: Phaser.Tilemaps.Tile = this.groundLayer.getTileAtWorldXY(pointer.worldX, pointer.worldY);
			if (tile) {
				console.log("Pointermove tile: ", tile.x, tile.y);
				let regularTint = tile.tint;
				if (this.selectedTile) {
					this.selectedTile.tint = regularTint;
				}
				this.selectedTile = tile;
				this.selectedTile.tint = 0xff0000;
			}
			console.log("Pointermove: ", pointer.worldX, pointer.worldY);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
