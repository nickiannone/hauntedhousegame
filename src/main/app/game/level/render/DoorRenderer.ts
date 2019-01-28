import { Renderer, RenderObject } from "./Renderables";
import { Door } from "../Level";

export class DoorRenderer extends Renderer<Door> {
    public createRenderObjects(scene: Phaser.Scene, door: Door): void {
        door.renderObjects = door.renderObjects || new Map<string, RenderObject<any>>();

        // TODO Render the door
        
    }
}