
export class EntityMovement extends Phaser.Scene {

    controls: Phaser.Cameras.Controls.SmoothedKeyControl;
    camera: Phaser.Cameras.Scene2D.BaseCamera;
    text: Phaser.GameObjects.Text;

    redguy: Phaser.Physics.Arcade.Image;
    redguy2: Phaser.Physics.Arcade.Image;

    constructor() {
        super('Entity Movement prototype');
    }

    preload() {
        this.load.image("redguy", "sprites/redguy/redguy_idle.png");
    }

    create() {
        // Configure camera and input bindings
        let cursors = this.input.keyboard.createCursorKeys();
        let controlConfig: SmoothedKeyControlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.02,
            drag: 0.0005,
            maxSpeed: 15.0
        };
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        this.camera = this.cameras.main.setBounds(0, 0, 1000, 1000);

        // Configure the grid
        let grid = this.add.grid(0, 0, 2000, 2000, 20, 20, 0xff00ff, 1.0, 0x000000, 1.0);
        grid.setAltFillStyle(0x000000, 1.0);

        // Add text boxes to render position
        this.text = this.add.text(0, 0, ["X: ", "Y: "]).setScrollFactor(0);

        // Configure physics
        this.physics.world.setBounds(0, 0, 1000, 1000);

        // Add a character as a static image
        this.redguy = this.physics.add.image(400, 300, 'redguy');
        this.redguy.setCollideWorldBounds(true);

        // Follow the character
        this.cameras.main.startFollow(this.redguy, true);

        // Add another character as a static imagea
        this.redguy2 = this.physics.add.image(500, 500, 'redguy');
        this.redguy2.setCollideWorldBounds(true);

        // 
    }

    update(time: number, delta: number) {
        // Not using the smoothed camera control right now
        // this.controls.update(delta);
        
        this.text.setText([
            "X: " + this.controls.camera.midPoint.x, 
            "Y: " + this.controls.camera.midPoint.y
        ]);

        this.redguy.setVelocity(0);
        this.redguy2.setVelocity(0);

        // Move the first redguy (tied to the camera)
        if (this.controls.up.isDown) {
            this.redguy.setVelocityY(-300);
        } else if (this.controls.down.isDown) {
            this.redguy.setVelocityY(300);
        }

        if (this.controls.left.isDown) {
            this.redguy.setVelocityX(-300);
        } else if (this.controls.right.isDown) {
            this.redguy.setVelocityX(300);
        }

        // Move the second redguy (not tied to the camera)
        // if (this.input.keyboard.keys[])
    }
}