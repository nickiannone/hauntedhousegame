import { Level, Wall, Direction, Cell } from "../../level/Level";
import { WallCollision } from "../walls/WallCollision";
import { Point2D } from "../../../utils/Point2D";
import { WallRenderable } from "../../level/Renderables";

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

    preload() {
        this.load.image('vwall', 'sprites/wall/v_wall.png');
        this.load.image('hwall', 'sprites/wall/h_wall.png');
        this.load.image('blueboy', 'sprites/blueboy/blueboy.png');

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
                        asset: 'wall_default',
                        
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
                        asset: 'wall_default',
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
                        asset: 'wall_default'
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
                        asset: 'wall_default'
                    });
                }

                this.level.cells.push({
                    x: i,
                    y: j,
                    asset: 'floor_default',
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

        // Create the cursor
        this.blueboy = this.add.image(0, 0, 'blueboy');
        this.input.setPollAlways();
        
        // Render the level assets
        for (let cell of this.level.cells) {
            // Draw each wall first
            for (let wall of cell.walls) {
                let wallRenderable: WallRenderable = WallCreation.calculateWallRenderable(this.level, cell, wall);
                this.add.image(wallRenderable.x, wallRenderable.y, wallRenderable.texture);
            }
        }
    }

    update(time: number, delta: number) {
        // Snap the cursor to the grid

    }

    private static calculateWallRenderable(level: Level, cell: Cell, wall: Wall): WallRenderable {
        let x: number = level.borderX;
        let y: number = level.borderY;
        let texture: string = wall.asset + '_' + wall.direction + (wall.door) ? '_door' : '';

        // Thickness of a wall is 20px, width and height of a cell is 128px
        switch (wall.direction) {
            case 'up':
                x += (cell.x * 128) + (128 / 2);
                y += (cell.y * 128) + (20 / 2);
                if (cell.walls.filter((wall) => wall.direction === 'left').length) {
                    texture += '_leftcorner';
                }
                if (cell.walls.filter((wall) => wall.direction === 'right').length) {
                    texture += '_rightcorner';
                }
                break;
            case 'down':
                x += (cell.x * 128) + (128 / 2);
                y += (cell.y * 128) + 128 - (20 / 2);
                // TODO
                break;
            case 'left':
                x += (cell.x * 128) + (20 / 2);
                y += (cell.y * 128) + (128 / 2);
                // TODO
                break;
            case 'right':
                x += (cell.x * 128) + 128 - (20 / 2);
                y += (cell.y * 128) + (128 / 2);
                // TODO
                break;
            default:
                // TODO Make an assert-unreachable!
                break;
        }

        return {
            x: x,
            y: y,
            texture: texture
        };
    }
}