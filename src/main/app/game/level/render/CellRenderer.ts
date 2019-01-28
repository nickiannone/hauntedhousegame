import { Cell, Level } from "../Level";
import { Renderer, ImageRenderObject, RenderObject } from "./Renderables";
import { WallRenderer } from "./WallRenderer";

export class CellRenderer extends Renderer<Cell> {
    private wallRenderer: WallRenderer = new WallRenderer();

    public createRenderObjects(scene: Phaser.Scene, cell: Cell): void {
        cell.renderObjects = cell.renderObjects || new Map<string, RenderObject<any>>();

        // Render the cell floor
        if (this.needsDraw(scene, cell, 'floor')) {
            const level: Level = cell.parent;
            
            const floorImage: ImageRenderObject = new ImageRenderObject({
                x: level.borderX + (cell.x * 128) + (128 / 2),
                y: level.borderY + (cell.y * 128) + (128 / 2),
                texture: cell.asset
            });

            floorImage.create(scene);
            
            cell.renderObjects.set('floor', floorImage);
        }

        // Render the walls
        cell.walls.forEach((wall) => {
            this.wallRenderer.createRenderObjects(scene, wall);
        });

        // TODO Render furniture and interactives!

    }
}