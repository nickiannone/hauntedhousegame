
export class GridCamera extends Phaser.Scene {

    controls: Phaser.Cameras.Controls.SmoothedKeyControl;
    camera: Phaser.Cameras.Scene2D.BaseCamera;
    xText: Phaser.GameObjects.Text;
    yText: Phaser.GameObjects.Text;

    constructor() {
        super('Grid Camera prototype');
    }

    preload() {
        
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
        this.xText = this.add.text(0, 0, "X: ").setScrollFactor(0);
        this.yText = this.add.text(0, 24, "Y: ").setScrollFactor(0);
    }

    update(time: number, delta: number) {
        this.controls.update(delta);

        this.xText.x = this.camera.x;
        this.xText.y = this.camera.y;

        this.yText.x = this.camera.x;
        this.yText.y = this.camera.y + 24;

        this.xText.setText("X: " + this.camera.x);
        this.yText.setText("Y: " + this.camera.y);

        this.xText.updateText();
        this.yText.updateText();
    }
}