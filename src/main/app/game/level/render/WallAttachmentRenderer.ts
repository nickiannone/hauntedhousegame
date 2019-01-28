import { Renderer, RenderObject } from "./Renderables";
import { WallAttachment } from "../Level";

export class WallAttachmentRenderer extends Renderer<WallAttachment> {
    public createRenderObjects(scene: Phaser.Scene, attachment: WallAttachment): void {
        attachment.renderObjects = attachment.renderObjects || new Map<string, RenderObject<any>>();

        // TODO Render the attachment
    }
}