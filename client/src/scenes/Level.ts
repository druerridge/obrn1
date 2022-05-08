
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

		// tilemap
		const tilemap = this.add.tilemap("ff1r-ortho");
		tilemap.addTilesetImage("tile052", "tile052");

		this.tilemap = tilemap;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	private selectedTile!: Phaser.Tilemaps.Tile;
	private tilemap!: Phaser.Tilemaps.Tilemap;
	private tilemapLayers!: Phaser.Tilemaps.TilemapLayer[];
	private graphics!: Phaser.GameObjects.Graphics;
	private characterGroup!: Phaser.GameObjects.Group;
	private myPlayer!: Player;
	// Write your code here.

	createCharactersFromObjectLayers(tilemap: Phaser.Tilemaps.Tilemap): Phaser.GameObjects.GameObject[] {
		let characters: Phaser.GameObjects.GameObject[] = [];
		let objectLayerNames: string[] = tilemap.getObjectLayerNames();
		objectLayerNames.forEach((layerName) => {
			let players: Player[] = tilemap.createFromObjects(layerName, [
				{
					name: 'PlayerStart',
					// @ts-ignore
					classType: Player
				}
			]) as Player[];
			players.forEach((player) => {
				player.setScale(4.0);
				characters.push(player);
				this.myPlayer = (player as Player);
			});
		});
		return characters;
	}

	createTilemapLayers(tilemap: Phaser.Tilemaps.Tilemap): Phaser.Tilemaps.TilemapLayer[] {
		let collisionLayers: Phaser.Tilemaps.TilemapLayer[] = [];
		let tilemapLayers: Phaser.Tilemaps.TilemapLayer[] = [];
		let characters: Phaser.GameObjects.GameObject[] = [];
		tilemap.getTileLayerNames().forEach((layerName) => {
			let nameComponents = layerName.split('_');
			let layerIndex = nameComponents[1];
			let layerType = nameComponents[2];

			if (layerIndex === "1" && characters.length == 0) {
				characters = this.createCharactersFromObjectLayers(tilemap); // characters go between layer 0 & 1 - TODO: handle depth better
			}

			const layer = tilemap.createLayer(layerName, tilemap.tilesets, 0, 0);
			layer.scaleX = 4;
			layer.scaleY = 4;

			if (layerType === "collision") {
				collisionLayers.push(layer);
			}

			tilemapLayers.push(layer);
		});

		tilemap.setLayer(0);

		this.characterGroup = this.add.group(characters);

		collisionLayers.forEach((collisionLayer) => {
			collisionLayer.setCollisionByExclusion([-1], true);
			this.characterGroup.getChildren().forEach((character) => {
				this.physics.add.collider(character, collisionLayer);
				this.physics.collide(character, collisionLayer);
			});
		});

		return tilemapLayers;
	}

	create() {
		this.editorCreate();
		this.tilemapLayers = this.createTilemapLayers(this.tilemap);
		this.graphics = this.add.graphics();
		this.input.on('pointerup', (pointer: any) => {
			console.log("Pointer Up " , pointer.worldX, pointer.worldY);

			let tile: Phaser.Tilemaps.Tile = this.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY);
			if (tile) {
				let tileWorldPosition: Phaser.Math.Vector2 = this.tilemap.tileToWorldXY(tile.x, tile.y);

				// start debug

				// console.log("tile:", tile.x, tile.y);
				// console.log("tileWorldPosition", tileWorldPosition);

				// console.log("Tilemap\n");
				// 	console.log("\t format: " + this.tilemap.format);
				// 	console.log("\t orientation: " + this.tilemap.orientation);
				// 	console.log("\t tile height: " + this.tilemap.tileHeight);
				// 	console.log("\t tileWidth: " + this.tilemap.tileWidth);
				// 	console.log("\t hexSideLength: " + this.tilemap.hexSideLength);
				// 	console.log("\t height: " + this.tilemap.height);
				// 	console.log("\t width: " + this.tilemap.width);
				// 	console.log("\t getTileLayerNames: " + this.tilemap.getTileLayerNames());
				// 	console.log("\t renderOrder: " + this.tilemap.renderOrder);
				// 	console.log("\t currentLayerIndex: " + this.tilemap.currentLayerIndex);

				// this.graphics.clear();
				// this.graphics.lineStyle(3, 0xff0000, 1);
				// let tileBounds: any = tile.getBounds();
				// this.graphics.strokeRectShape(tileBounds);
				// console.log("Tile Bounds:", tileBounds);
				// const playerArcadeBody = (this.myPlayer.body as Phaser.Physics.Arcade.Body);
				// const playerArcadeBodyBounds: any = {};
				// playerArcadeBody.getBounds(playerArcadeBodyBounds);
				// this.graphics.strokeRectShape(this.myPlayer.getBounds());
				// console.log("Player Bounds:", playerArcadeBodyBounds);

				// end debug

				let destVec = new Phaser.Math.Vector2(this.myPlayer.originX * this.myPlayer.displayWidth, this.myPlayer.originY * this.myPlayer.displayHeight)
					.add(tileWorldPosition);
				this.characterGroup.children.each((character) => {
					let player = (character as Player).setMoveTarget(destVec);
				});
				// this.myPlayer.setMoveTarget(destVec);
			} else {
				console.error("No tile at world position: ", pointer.worldX, pointer.worldY);
			}
		});

		this.input.on('pointermove', (pointer: any) => {
			let tile: Phaser.Tilemaps.Tile = this.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY);
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
