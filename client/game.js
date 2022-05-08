"use strict";
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
class UserComponent {
    /**
     * @param gameObject The entity.
     */
    constructor(gameObject) {
        this.scene = gameObject.scene;
        const listenAwake = this.awake !== UserComponent.prototype.awake;
        const listenStart = this.start !== UserComponent.prototype.start;
        const listenUpdate = this.update !== UserComponent.prototype.update;
        const listenDestroy = this.destroy !== UserComponent.prototype.destroy;
        if (listenAwake) {
            this.scene.events.once("scene-awake", this.awake, this);
        }
        if (listenStart) {
            this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        }
        if (listenUpdate) {
            this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        }
        if (listenStart || listenUpdate || listenDestroy) {
            gameObject.on(Phaser.GameObjects.Events.DESTROY, () => {
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.start, this);
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
                if (listenDestroy) {
                    this.destroy();
                }
            });
        }
    }
    scene;
    awake() {
        // override this
    }
    start() {
        // override this
    }
    update() {
        // override this
    }
    destroy() {
        // override this
    }
}
/// <reference path="./UserComponent.ts"/>
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class PreloadText extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PreloadText"] = this;
        /* START-USER-CTR-CODE */
        this.scene.load.on(Phaser.Loader.Events.PROGRESS, (p) => {
            this.gameObject.text = Math.floor(p * 100) + "%";
        });
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PreloadText"];
    }
    gameObject;
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./UserComponent.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class PushOnClick extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PushOnClick"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PushOnClick"];
    }
    gameObject;
    /* START-USER-CODE */
    awake() {
        this.gameObject.setInteractive().on("pointerdown", () => {
            this.scene.add.tween({
                targets: this.gameObject,
                scaleX: 0.8,
                scaleY: 0.8,
                duration: 80,
                yoyo: true
            });
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 366, y ?? 169, texture || "ff1-characters", frame ?? 116);
        /* START-USER-CTR-CODE */
        // Write your code here.
        const sceneArcadePhysics = this.scene.physics;
        sceneArcadePhysics.add.existing(this);
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updatePlayer, this);
        this.moveTarget = new Phaser.Math.Vector2(this.x, this.y);
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    // Write your code here.
    moveTarget;
    maxSpeed = 60;
    characterAnimKey = "black";
    start() {
    }
    updatePlayer() {
        var distance = this.moveTarget.distance(this);
        const arcadeBody = this.body;
        if (arcadeBody.speed > 0) {
            if (distance < this.maxSpeed * this.scene.game.loop.delta * 0.001) {
                // this.setPosition(this.moveTarget.x, this.moveTarget.y);
                let yVelocitySquared = arcadeBody.velocity.y * arcadeBody.velocity.y;
                let xVelocitySquared = arcadeBody.velocity.x * arcadeBody.velocity.x;
                if (yVelocitySquared > xVelocitySquared) {
                    if (arcadeBody.velocity.y >= 0) {
                        this.play(this.characterAnimKey + "-idle-down");
                    }
                    else {
                        this.play(this.characterAnimKey + "-idle-up");
                    }
                }
                else {
                    this.play(this.characterAnimKey + "-idle-left");
                    if (arcadeBody.velocity.x >= 0) {
                        this.setFlipX(true);
                    }
                    else {
                        this.setFlipX(false);
                    }
                }
                arcadeBody.reset(this.moveTarget.x, this.moveTarget.y);
            }
        }
    }
    setMoveTarget(moveTargetVector) {
        const arcadeBody = this.body;
        this.moveTarget = moveTargetVector;
        this.scene.physics.moveToObject(this, this.moveTarget, this.maxSpeed);
        let yVelocitySquared = arcadeBody.velocity.y * arcadeBody.velocity.y;
        let xVelocitySquared = arcadeBody.velocity.x * arcadeBody.velocity.x;
        if (yVelocitySquared > xVelocitySquared) {
            if (arcadeBody.velocity.y > 0) {
                this.play(this.characterAnimKey + "-walk-down");
            }
            else {
                this.play(this.characterAnimKey + "-walk-up");
            }
        }
        else if (xVelocitySquared > yVelocitySquared) {
            this.play(this.characterAnimKey + "-walk-left");
            if (arcadeBody.velocity.x >= 0) {
                this.setFlipX(true);
            }
            else {
                this.setFlipX(false);
            }
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class CharacterTest extends Phaser.Scene {
    constructor() {
        super("CharacterTest");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorCreate() {
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
    hexminiblocking;
    create() {
        this.editorCreate();
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Level extends Phaser.Scene {
    constructor() {
        super("Level");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorCreate() {
        // tilemap
        const tilemap = this.add.tilemap("ff1r-ortho");
        tilemap.addTilesetImage("tile052", "tile052");
        this.tilemap = tilemap;
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    selectedTile;
    tilemap;
    tilemapLayers;
    graphics;
    characterGroup;
    myPlayer;
    // Write your code here.
    createCharactersFromObjectLayers(tilemap) {
        let characters = [];
        let objectLayerNames = tilemap.getObjectLayerNames();
        objectLayerNames.forEach((layerName) => {
            let players = tilemap.createFromObjects(layerName, [
                {
                    name: 'PlayerStart',
                    // @ts-ignore
                    classType: Player,
                    key: 'ff1-characters',
                    frame: 116
                }
            ]);
            players.forEach((player) => {
                let scale = 4.0;
                player.setScale(scale);
                player.setX(player.x * scale);
                player.setY(player.y * scale);
                characters.push(player);
                this.myPlayer = player;
            });
        });
        return characters;
    }
    createTilemapLayers(tilemap) {
        let collisionLayers = [];
        let tilemapLayers = [];
        let characters = [];
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
        this.input.on('pointerup', (pointer) => {
            console.log("Pointer Up ", pointer.worldX, pointer.worldY);
            let tile = this.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY);
            if (tile) {
                let tileWorldPosition = this.tilemap.tileToWorldXY(tile.x, tile.y);
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
                    let player = character.setMoveTarget(destVec);
                });
                // this.myPlayer.setMoveTarget(destVec);
            }
            else {
                console.error("No tile at world position: ", pointer.worldX, pointer.worldY);
            }
        });
        this.input.on('pointermove', (pointer) => {
            let tile = this.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY);
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
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorPreload() {
        this.load.pack("asset-pack", "assets/asset-pack.json");
    }
    editorCreate() {
        // guapen
        const guapen = this.add.image(400, 219, "guapen");
        guapen.scaleX = 0.5915891440784282;
        guapen.scaleY = 0.5915891440784282;
        // progress
        const progress = this.add.text(400, 349, "", {});
        progress.text = "0%";
        progress.setStyle({ "fontSize": "30px" });
        // progress (components)
        new PreloadText(progress);
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    // Write your code here
    preload() {
        this.editorCreate();
        this.editorPreload();
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
    }
}
/* END OF COMPILED CODE */
// You can write more code here
