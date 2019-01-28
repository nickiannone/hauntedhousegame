import { Renderer, ImageRenderObject, RenderObject } from "./Renderables";
import { Wall, Level, Cell } from "../Level";
import { WallAttachmentRenderer } from "./WallAttachmentRenderer";
import { DoorRenderer } from "./DoorRenderer";

export class WallRenderer extends Renderer<Wall> {
    private wallAttachmentRenderer: WallAttachmentRenderer = new WallAttachmentRenderer();
    private doorRenderer: DoorRenderer = new DoorRenderer();

    public createRenderObjects(scene: Phaser.Scene, wall: Wall): void {
        wall.renderObjects = wall.renderObjects || new Map<string, RenderObject<any>>();

        // Render the wall
        if (this.needsDraw(scene, wall, 'wall')) {
            const cell: Cell = wall.parent;
            const level: Level = cell.parent;

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

            const wallImage: ImageRenderObject = new ImageRenderObject({
                x: x,
                y: y,
                texture: texture,
                rotation: rotation
            });

            wallImage.create(scene);

            cell.renderObjects.set('wall', wallImage);
        }

        // Render attachments
        wall.attachments.forEach((attachment) => {
            this.wallAttachmentRenderer.createRenderObjects(scene, attachment);
        });

        // Render door, if any
        if (wall.door) {
            this.doorRenderer.createRenderObjects(scene, wall.door);
        }
    }
}