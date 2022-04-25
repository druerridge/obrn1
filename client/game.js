"use strict";
window.addEventListener('load', function () {
    var game = new Phaser.Game({
        width: 800,
        height: 600,
        physics: {
            default: "arcade",
            arcade: {
                debug: false
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
        super(scene, x ?? 366, y ?? 169, texture || "black-mage", frame ?? 9);
        /* START-USER-CTR-CODE */
        // Write your code here.
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updatePlayer, this);
        this.moveTarget = new Phaser.Math.Vector2(this.x, this.y);
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    // Write your code here.
    moveTarget;
    maxSpeed = 60;
    start() {
        const arcade = this.scene.physics;
        arcade.add.existing(this);
    }
    updatePlayer() {
        const arcadeBody = this.body;
        var pointer = this.scene.input.activePointer;
        if (pointer.isDown) {
            this.moveTarget = new Phaser.Math.Vector2(pointer.x, pointer.y);
            this.scene.physics.moveToObject(this, this.moveTarget, this.maxSpeed);
            if (arcadeBody.velocity.y >= 0) {
                this.play("walk-down");
            }
            else {
                this.play("walk-up");
            }
            if (arcadeBody.velocity.x >= 0) {
                this.setFlipX(true);
            }
            else {
                this.setFlipX(false);
            }
        }
        var distance = this.moveTarget.distance(this);
        if (arcadeBody.speed > 0) {
            if (distance < 4) {
                if (arcadeBody.velocity.y >= 0) {
                    this.play("idle-down");
                }
                else {
                    this.play("idle-up");
                }
                arcadeBody.reset(this.moveTarget.x, this.moveTarget.y);
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
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    // Write your code here
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
        // dino
        const dino = this.add.image(400, 245.50984430371858, "dino");
        // text_1
        const text_1 = this.add.text(400, 406, "", {});
        text_1.setOrigin(0.5, 0);
        text_1.text = "Phaser 3 + Phaser Editor 2D + TypeScript";
        text_1.setStyle({ "fontFamily": "arial", "fontSize": "3em" });
        // PlayerLayer
        const playerLayer = this.add.layer();
        // player
        const player = new Player(this, 280, 249);
        playerLayer.add(player);
        // dino (components)
        new PushOnClick(dino);
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    // Write your code here.
    create() {
        this.editorCreate();
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
        const progress = this.add.text(381.5, 335, "", {});
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
