
export class WallCollision extends Phaser.Scene {

    cursors: Phaser.Input.Keyboard.CursorKeys;
    controls: Phaser.Cameras.Controls.SmoothedKeyControl;
    camera: Phaser.Cameras.Scene2D.BaseCamera;

    walls: Phaser.Physics.Arcade.StaticGroup;

    player: Phaser.Physics.Arcade.Image;

    constructor() {
        super('Wall Collision prototype');
    }

    preload() {
        this.load.image('vwall', 'sprites/wall/v_wall.png');
        this.load.image('hwall', 'sprites/wall/h_wall.png');

        this.load.image('blueboy', 'sprites/blueboy/blueboy.png');
    }

    create() {
        // Configure camera and input
        this.cursors = this.input.keyboard.createCursorKeys();
        let controlConfig: SmoothedKeyControlConfig = {
            camera: this.cameras.main,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            acceleration: 0.02,
            drag: 0.0005,
            maxSpeed: 15.0
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        this.camera = this.cameras.main.setBounds(0, 0, 1000, 1000);

        // Configure the grid
        let grid = this.add.grid(0, 0, 2000, 2000, 64, 64, 0xff00ff, 1.0, 0xffffff, 1.0);
        grid.setAltFillStyle(0xffffff, 1.0);
        
        this.physics.world.setBounds(0, 0, 1000, 1000);

        /**
         *    A B C D
         *     _
         * 0  |_| | |
         * 1    |_ _
         * 2  |_ _| |
         * 3  |  _| |
         * 4
         */

        // Add walls
        // TODO Build a wall editor/saver!
        let walldata = [
            { gx: 0, gy: 0, vwall: true, hwall: true },
            { gx: 1, gy: 0, vwall: true, hwall: false },
            { gx: 2, gy: 0, vwall: true, hwall: false },
            { gx: 3, gy: 0, vwall: true, hwall: false },
            { gx: 0, gy: 1, vwall: false, hwall: true },
            { gx: 1, gy: 1, vwall: true, hwall: false },
            { gx: 0, gy: 2, vwall: true, hwall: false },
            { gx: 1, gy: 2, vwall: false, hwall: true },
            { gx: 2, gy: 2, vwall: true, hwall: true },
            { gx: 3, gy: 2, vwall: true, hwall: false },
            { gx: 0, gy: 3, vwall: true, hwall: true },
            { gx: 1, gy: 3, vwall: false, hwall: true },
            { gx: 2, gy: 3, vwall: true, hwall: false },
            { gx: 3, gy: 3, vwall: true, hwall: false },
            { gx: 1, gy: 4, vwall: false, hwall: true }
        ];

        this.walls = this.physics.add.staticGroup();
        walldata.forEach(wall => {
            if (wall.vwall) {
                this.walls.create(wall.gx * 64 + 128 - 32, wall.gy * 64 + 128, 'vwall');
            }
            if (wall.hwall) {
                this.walls.create(wall.gx * 64 + 128, wall.gy * 64 + 128 - 32, 'hwall');
            }
        });

        // Add player
        this.player = this.physics.add.image(0, 0, 'blueboy');
        this.player.setCollideWorldBounds(true);

        // Add collision info
        this.physics.add.collider(this.player, this.walls);
    }

    update() {
        this.player.setVelocity(0,0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } 
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }
}