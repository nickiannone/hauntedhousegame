import { Level, Wall, Direction, Cell } from "../../level/Level";
import { Point2D } from "../../../utils/Point2D";
import { WallRenderable, FloorRenderable } from "../../level/Renderables";
import { LevelLoader } from "../../level/LevelLoader";

export class WallCreation extends Phaser.Scene {

    cursors: Phaser.Input.Keyboard.CursorKeys;
    controls: Phaser.Cameras.Controls.SmoothedKeyControl;
    camera: Phaser.Cameras.Scene2D.BaseCamera;

    level: Level;

    // For wall creation pen
    blueboy: Phaser.GameObjects.Image;
    origin?: Point2D;
    wallCursor?: Point2D;

    constructor() {
        super('Wall Creation prototype');
    }

    static hasEntranceOrExit(level: Level, x: number, y: number, d: Direction): boolean {
        for (let entrance of level.entrances) {
            if (entrance.x === x && entrance.y === y && entrance.direction === d) {
                return true;
            }
        }
        for (let exit of level.exits) {
            if (exit.x === x && exit.y === y && exit.direction === d) {
                return true;
            }
        }

        return false;
    }

    static rotate(d: Direction, clockwise: boolean, steps: number): Direction {
        let directions: Direction[] = [ 'up', 'right', 'down', 'left' ];
        return directions[directions.indexOf(d) + (clockwise ? steps : -steps) % 4];
    }

    preload() {
        this.load.image('blueboy', 'sprites/blueboy/blueboy.png');

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

        this.level = LevelLoader.loadLevel(this, 'levels/test_level.json');

        // TODO Automate level loading & move to level loader class!
        this.level = {
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
            cells: []
        };

        // Initialize cells with border walls
        for (let i = 0; i < this.level.width; i++) {
            for (let j = 0; j < this.level.height; j++) {
                let walls: Wall[] = [];

                if (i === 0) {
                    walls.push({
                        direction: 'left',
                        attachments: [],
                        door: (WallCreation.hasEntranceOrExit(this.level, i, j, 'left')) ? {
                            asset: 'door_exterior',
                            fixed: true
                        } : undefined,
                        asset: 'wall_ref',
                        
                    });
                }
                
                if (i === this.level.width - 1) {
                    walls.push({
                        direction: 'right',
                        attachments: [],
                        door: (WallCreation.hasEntranceOrExit(this.level, i, j, 'right')) ? {
                            asset: 'door_exterior',
                            fixed: true
                        } : undefined,
                        asset: 'wall_ref',
                    });
                }

                if (j === 0) {
                    walls.push({
                        direction: 'up',
                        attachments: [],
                        door: (WallCreation.hasEntranceOrExit(this.level, i, j, 'up')) ? {
                            asset: 'door_exterior',
                            fixed: true
                        } : undefined,
                        asset: 'wall_ref'
                    });
                }
                
                if (j === this.level.height - 1) {
                    walls.push({
                        direction: 'down',
                        attachments: [],
                        door: (WallCreation.hasEntranceOrExit(this.level, i, j, 'down')) ? {
                            asset: 'door_exterior',
                            fixed: true
                        } : undefined,
                        asset: 'wall_ref'
                    });
                }

                this.level.cells.push({
                    x: i,
                    y: j,
                    asset: 'floor',
                    walls: walls
                });
            }
        }

        // End of preload
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

        let worldWidth = (this.level.borderX * 2) + (this.level.width * 128);
        let worldHeight = (this.level.borderY * 2) + (this.level.height * 128);

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        this.camera = this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        
        // Render the level assets
        for (let cell of this.level.cells) {
            // Draw each floor
            let floorRenderable: FloorRenderable = WallCreation.calculateFloorRenderable(this.level, cell);
            let floorImage = this.add.image(floorRenderable.x, floorRenderable.y, floorRenderable.texture);
            cell.floorImage = floorImage;

            // Draw each wall first
            for (let wall of cell.walls) {
                let wallRenderable: WallRenderable = WallCreation.calculateWallRenderable(this.level, cell, wall);
                let wallImage = this.add.image(wallRenderable.x, wallRenderable.y, wallRenderable.texture);
                wallImage.setRotation(wallRenderable.rotation);
                wall.image = wallImage;

                // TODO Render attachments

                // TODO Render doors
            }
        }

        // Create the cursor
        this.blueboy = this.add.image(0, 0, 'blueboy');
        this.input.setPollAlways();

        // TODO Bind the mouse inputs to handle click and drag

        // TODO Bind the keyboard inputs to handle switching between adding walls, removing walls, and adding/removing doors
    }

    update(time: number, delta: number) {
        this.controls.update(delta);

        // Snap the cursor to the grid
        let worldX = this.input.x + this.controls.camera.scrollX;
        let worldY = this.input.y + this.controls.camera.scrollY;
        this.blueboy.setPosition(worldX - (worldX % 128) + 64, 
            worldY - (worldY % 128) + 64);
    }

    // TODO Move this into a Floor class!
    private static calculateFloorRenderable(level: Level, cell: Cell): FloorRenderable {
        let x: number = level.borderX + (cell.x * 128) + (128 / 2);
        let y: number = level.borderY + (cell.y * 128) + (128 / 2);
        let texture: string = cell.asset;

        return {
            x: x,
            y: y,
            texture: texture,
        };
    }

    // TODO Move this into a Wall class!
    private static calculateWallRenderable(level: Level, cell: Cell, wall: Wall): WallRenderable {
        let x: number = level.borderX;
        let y: number = level.borderY;
        let texture: string = wall.asset + '/wall' + ((wall.door) ? '_door' : '');
        let rotation: number;

        // Thickness of a wall is 20px, width and height of a cell is 128px
        switch (wall.direction) {
            case 'up':
                x += (cell.x * 128) + (128 / 2);
                y += (cell.y * 128) + (20 / 2);
                if (cell.walls.filter((wall) => wall.direction === 'left').length) {
                    texture += '_lc';
                }
                if (cell.walls.filter((wall) => wall.direction === 'right').length) {
                    texture += '_rc';
                }
                rotation = 0;
                break;
            case 'down':
                x += (cell.x * 128) + (128 / 2);
                y += (cell.y * 128) + 128 - (20 / 2);
                if (cell.walls.filter((wall) => wall.direction === 'right').length) {
                    texture += '_lc';
                }
                if (cell.walls.filter((wall) => wall.direction === 'left').length) {
                    texture += '_rc';
                }
                rotation = Math.PI;
                break;
            case 'left':
                x += (cell.x * 128) + (20 / 2);
                y += (cell.y * 128) + (128 / 2);
                if (cell.walls.filter((wall) => wall.direction === 'down').length) {
                    texture += '_lc';
                }
                if (cell.walls.filter((wall) => wall.direction === 'up').length) {
                    texture += '_rc';
                }
                rotation = Math.PI * 1.5;
                break;
            case 'right':
                x += (cell.x * 128) + 128 - (20 / 2);
                y += (cell.y * 128) + (128 / 2);
                if (cell.walls.filter((wall) => wall.direction === 'up').length) {
                    texture += '_lc';
                }
                if (cell.walls.filter((wall) => wall.direction === 'down').length) {
                    texture += '_rc';
                }
                rotation = Math.PI * 0.5;
                break;
            default:
                // TODO Make an assert-unreachable!
                break;
        }

        return {
            x: x,
            y: y,
            texture: texture,
            rotation: rotation
        };
    }
}