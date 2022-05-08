
// You can write more code here

/* START OF COMPILED CODE */

class Player extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 366, y ?? 169, texture || "ff1-characters", frame ?? 116);

		/* START-USER-CTR-CODE */
		// Write your code here.
		const sceneArcadePhysics = this.scene.physics as Phaser.Physics.Arcade.ArcadePhysics;
		sceneArcadePhysics.add.existing(this);
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updatePlayer, this);
		this.moveTarget = new Phaser.Math.Vector2(this.x, this.y);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	private moveTarget: Phaser.Math.Vector2;
	private maxSpeed: number = 60;
	private characterAnimKey: string = "black";

	start() {

	}

	updatePlayer() {
		var distance = this.moveTarget.distance(this);

		const arcadeBody = (this.body as Phaser.Physics.Arcade.Body);
		if (arcadeBody.speed > 0)
		{
			if (distance < this.maxSpeed * this.scene.game.loop.delta * 0.001)
			{
				// this.setPosition(this.moveTarget.x, this.moveTarget.y);
				let yVelocitySquared: number = arcadeBody.velocity.y * arcadeBody.velocity.y;
				let xVelocitySquared: number = arcadeBody.velocity.x * arcadeBody.velocity.x;
				if (yVelocitySquared > xVelocitySquared) {
					if (arcadeBody.velocity.y >= 0) {
						this.play(this.characterAnimKey + "-idle-down");
					} else {
						this.play(this.characterAnimKey + "-idle-up");
					}
				} else {
					this.play(this.characterAnimKey + "-idle-left");
					if (arcadeBody.velocity.x >= 0) {
						this.setFlipX(true);
					} else {
						this.setFlipX(false);
					}
				}
				arcadeBody.reset(this.moveTarget.x, this.moveTarget.y);
			}
		}
	}

	public setMoveTarget(moveTargetVector: Phaser.Math.Vector2) {
		const arcadeBody = (this.body as Phaser.Physics.Arcade.Body);

		this.moveTarget = moveTargetVector;
		this.scene.physics.moveToObject(this, this.moveTarget, this.maxSpeed);

		let yVelocitySquared: number = arcadeBody.velocity.y * arcadeBody.velocity.y;
		let xVelocitySquared: number = arcadeBody.velocity.x * arcadeBody.velocity.x;
		if (yVelocitySquared > xVelocitySquared) {
			if (arcadeBody.velocity.y > 0) {
				this.play(this.characterAnimKey + "-walk-down");
			} else {
				this.play(this.characterAnimKey + "-walk-up");
			}
		} else if (xVelocitySquared > yVelocitySquared) {
			this.play(this.characterAnimKey + "-walk-left");
			if (arcadeBody.velocity.x >= 0) {
				this.setFlipX(true);
			} else {
				this.setFlipX(false);
			}
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
