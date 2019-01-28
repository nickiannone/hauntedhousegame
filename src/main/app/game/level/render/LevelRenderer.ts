import { Renderer, RenderObject } from "./Renderables";
import { Level } from "../Level";
import { CellRenderer } from "./CellRenderer";

export class LevelRenderer extends Renderer<Level> {
    private cellRenderer: CellRenderer = new CellRenderer();

    public createRenderObjects(scene: Phaser.Scene, level: Level): void {
        level.renderObjects = level.renderObjects || new Map<string, RenderObject<any>>();

        // TODO Render background image
        
        // Render the cells
        level.cells.forEach((cell) => {
            this.cellRenderer.createRenderObjects(scene, cell);
        });
    }
}