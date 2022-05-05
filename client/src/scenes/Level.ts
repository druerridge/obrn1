
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

		// hexTileMap
		const hexTileMap = this.add.tilemap("hexminiblocking");
		hexTileMap.addTilesetImage("hexmini", "hexmini");

		// groundLayer
		const groundLayer = hexTileMap.createLayer("Ground", ["hexmini"], 0, 0);

		// collisionLayer
		const collisionLayer = hexTileMap.createLayer("Collision", ["hexmini"], 0, 0);

		// PlayerLayer
		const playerLayer = this.add.layer();

		// player
		const player = new Player(this, 282, 227);
		playerLayer.add(player);

		this.groundLayer = groundLayer;
		this.collisionLayer = collisionLayer;
		this.player = player;
		this.hexTileMap = hexTileMap;

		this.events.emit("scene-awake");
	}

	private groundLayer!: Phaser.Tilemaps.TilemapLayer;
	private collisionLayer!: Phaser.Tilemaps.TilemapLayer;
	private player!: Player;

	/* START-USER-CODE */
	private selectedTile!: Phaser.Tilemaps.Tile;
	private hexTileMap!: Phaser.Tilemaps.Tilemap;
	// Write your code here.

	create() {
		this.editorCreate();
		this.collisionLayer.setCollisionByExclusion([-1], true);
		this.physics.add.collider(this.player, this.collisionLayer);
		this.physics.collide(this.player, this.collisionLayer);

		this.groundLayer.tilemap.setLayer('Ground');
		this.groundLayer.setInteractive();

		this.input.on('pointerup', (pointer: any) => {
			console.log("Pointer Up " , pointer.worldX, pointer.worldY);
			console.log("hexTileMap\n");
				console.log("\t format: " + this.hexTileMap.format);
				console.log("\t orientation: " + this.hexTileMap.orientation);
				console.log("\t hex orientation: " + Phaser.Tilemaps.Orientation.HEXAGONAL);
				console.log("\t tile height: " + this.hexTileMap.tileHeight);
				console.log("\t ileWidth: " + this.hexTileMap.tileWidth);
				console.log("\t hexSideLength: " + this.hexTileMap.hexSideLength);
				console.log("\t height: " + this.hexTileMap.height);
				console.log("\t width: " + this.hexTileMap.width);
				console.log("\t getTileLayerNames: " + this.hexTileMap.getTileLayerNames());
				console.log("\t renderOrder: " + this.hexTileMap.renderOrder);
			console.log("groundLayer: ");
				console.log("\t layerIndex: " + this.groundLayer.layerIndex);

			let tile: Phaser.Tilemaps.Tile = this.groundLayer.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY);
			if (tile) {
				console.log("tile:", tile.x, tile.y);
				let tileWorldPosition: Phaser.Math.Vector2 = this.groundLayer.tilemap.tileToWorldXY(tile.x, tile.y);
				console.log("tileWorldPosition", tileWorldPosition);
				this.player.setMoveTarget(tileWorldPosition);
			} else {
				console.error("No tile at world position: ", pointer.worldX, pointer.worldY);
			}
		});

		this.input.on('pointermove', (pointer: any) => {
			let tempPoint: Phaser.Math.Vector2;
			let tile: Phaser.Tilemaps.Tile = this.groundLayer.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY);
			if (tile) {
				// console.log("Pointermove tile: ", tile.x, tile.y);
				let regularTint = tile.tint;
				if (this.selectedTile) {
					this.selectedTile.tint = regularTint;
				}
				this.selectedTile = tile;
				this.selectedTile.tint = 0xff0000;
			}
			// console.log("Pointermove: ", pointer.worldX, pointer.worldY);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
