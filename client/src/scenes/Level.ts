
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
		const player = new Player(this, 118, 54);
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
	private graphics!: Phaser.GameObjects.Graphics;
	// Write your code here.

	create() {
		this.editorCreate();
		this.graphics = this.add.graphics();
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
				console.log("\t tileWidth: " + this.hexTileMap.tileWidth);
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

				// start debug

				// this.graphics.clear();
				// this.graphics.lineStyle(3, 0xff0000, 1);
				// let tileBounds: any = tile.getBounds();
				// this.graphics.strokeRectShape(tileBounds);
				// console.log("Tile Bounds:", tileBounds);
				// const playerArcadeBody = (this.player.body as Phaser.Physics.Arcade.Body);
				// const playerArcadeBodyBounds: any = {};
				// playerArcadeBody.getBounds(playerArcadeBodyBounds);
				// this.graphics.strokeRectShape(this.player.getBounds());
				// console.log("Player Bounds:", playerArcadeBodyBounds);

				// end debug
				let destVec = new Phaser.Math.Vector2(tile.width * 0.5, tile.height * 0.5);
				destVec.add(tileWorldPosition);
				destVec.subtract(new Phaser.Math.Vector2((this.player.body as Phaser.Physics.Arcade.Body).width * 0.5, (this.player.body as Phaser.Physics.Arcade.Body).height * 0.5))
				this.player.setMoveTarget(destVec);
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
