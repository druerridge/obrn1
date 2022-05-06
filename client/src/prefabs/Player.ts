
// You can write more code here

/* START OF COMPILED CODE */

class Player extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 366, y ?? 169, texture || "black-mage", frame ?? 9);

		this.scaleX = 0.5;
		this.scaleY = 0.5;

		/* START-USER-CTR-CODE */
		// Write your code here.
		const sceneArcadePhysics = this.scene.physics as Phaser.Physics.Arcade.ArcadePhysics;
		sceneArcadePhysics.add.existing(this);
		const arcadeBody = (this.body as Phaser.Physics.Arcade.Body);
		arcadeBody.setSize(this.width, this.height * 0.5, true);
		arcadeBody.setOffset(0, this.height * 0.5);

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updatePlayer, this);
		this.moveTarget = new Phaser.Math.Vector2(this.x, this.y);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	private moveTarget: Phaser.Math.Vector2;
	private maxSpeed: number = 60;

	start() {

	}

	updatePlayer() {
		var distance = this.moveTarget.distance(this);

		const arcadeBody = (this.body as Phaser.Physics.Arcade.Body);
		if (arcadeBody.speed > 0)
		{
			if (distance < 4)
			{
				if (arcadeBody.velocity.y >= 0) {
					this.play("idle-down");
				} else {
					this.play("idle-up");
				}
				arcadeBody.reset(this.moveTarget.x, this.moveTarget.y);
			}
		}
	}

	public setMoveTarget(moveTargetVector: Phaser.Math.Vector2) {
		const arcadeBody = (this.body as Phaser.Physics.Arcade.Body);

		this.moveTarget = moveTargetVector;
		this.scene.physics.moveToObject(this, this.moveTarget, this.maxSpeed);

		if (arcadeBody.velocity.y >= 0) {
			this.play("walk-down");
		} else {
			this.play("walk-up");
		}
		if (arcadeBody.velocity.x >= 0) {
			this.setFlipX(true);
		} else {
			this.setFlipX(false);
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
