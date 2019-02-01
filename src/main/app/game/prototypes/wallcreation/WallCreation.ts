import { Level } from "../../level/Level";
import { Point2D } from "../../../utils/Point2D";
import { LevelRenderer } from "../../level/render/LevelRenderer";
import { LevelGenerator } from "../../level/LevelGenerator";

export class WallCreation extends Phaser.Scene {

    cursors: Phaser.Input.Keyboard.CursorKeys;
    controls: Phaser.Cameras.Controls.SmoothedKeyControl;
    camera: Phaser.Cameras.Scene2D.BaseCamera;

    level: Level;

    // For wall creation pen
    blueboy: Phaser.GameObjects.Image;
    origin?: Point2D;
    wallCursor?: Point2D;

    prevMousePos: Point2D;

    constructor() {
        super('Wall Creation prototype');
    }

    preload() {
        this.load.image('blueboy', 'sprites/blueboy/blueboy.png');

        // TODO Move this to LevelLoader.preloadLevel()!
        // Load floor reference image
        this.load.image('floor', 'sprites/floors/floor.png');

        // Load wall reference images
        this.load.image('wall_ref/wall', 'sprites/walls/wall_ref/wall.png');
        this.load.image('wall_ref/wall_door', 'sprites/walls/wall_ref/wall_door.png');
        this.load.image('wall_ref/wall_door_lc', 'sprites/walls/wall_ref/wall_door_lc.png');
        this.load.image('wall_ref/wall_door_lc_rc', 'sprites/walls/wall_ref/wall_door_lc_rc.png');
        this.load.image('wall_ref/wall_door_rc', 'sprites/walls/wall_ref/wall_door_rc.png');
        this.load.image('wall_ref/wall_lc', 'sprites/walls/wall_ref/wall_lc.png');
        this.load.image('wall_ref/wall_lc_rc', 'sprites/walls/wall_ref/wall_lc_rc.png');
        this.load.image('wall_ref/wall_rc', 'sprites/walls/wall_ref/wall_rc.png');

        // End of preload
    }

    create() {
        // Load the level
        // TODO Load from an external JSON file!
        // this.level = LevelLoader.loadLevel(this, 'levels/test_level.json');
        this.level = LevelGenerator.generateLevel({
            width: 5,
            height: 5,
            borderX: 64,
            borderY: 64,
            entrances: [
                { x: 0, y: 0, direction: 'up', type: 'customer' },
                { x: 2, y: 4, direction: 'down', type: 'staff' }
            ],
            exits: [
                { x: 2, y: 4, direction: 'down', type: 'staff' },
                { x: 4, y: 0, direction: 'up', type: 'customer' }
            ],
            defaultDoorAsset: 'door_ref',
            defaultFloorAsset: 'floor',
            defaultWallAsset: 'wall_ref'
        });

        // Load level assets into world
        new LevelRenderer().createRenderObjects(this, this.level);

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

        let worldWidth = (this.level.borderX * 2) + (this.level.width * 128);
        let worldHeight = (this.level.borderY * 2) + (this.level.height * 128);

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        this.camera = this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        
        // Create the cursor
        this.blueboy = this.add.image(0, 0, 'blueboy');
        this.input.setPollAlways();

        // TODO Bind the mouse inputs to handle click and drag
        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            console.log('Key down');
            console.log(event);
        });

        this.input.keyboard.on('keyup', (event: KeyboardEvent) => {
            console.log('Key up');
            console.log(event);
        });

        this.prevMousePos = { x: this.input.mousePointer.x, y: this.input.mousePointer.y };
    }

    update(time: number, delta: number) {
        this.controls.update(delta);

        // Snap the cursor to the grid
        let worldX = this.input.x + this.controls.camera.scrollX;
        let worldY = this.input.y + this.controls.camera.scrollY;
        this.blueboy.setPosition(worldX - (worldX % 128) + 64, 
            worldY - (worldY % 128) + 64);

        const currMousePos = {
            x: this.input.mousePointer.x,
            y: this.input.mousePointer.y
        };

        if (this.input.mousePointer.justMoved) {
            console.log('Mouse move');
            console.log({ prev: this.prevMousePos, curr: currMousePos });
        }

        if (this.input.mousePointer.justUp) {
            console.log('Mouse up');
            console.log(currMousePos);
        }

        if (this.input.mousePointer.justDown) {
            console.log('Mouse down');
            console.log(currMousePos);
        }

        this.prevMousePos = currMousePos;
    }
}