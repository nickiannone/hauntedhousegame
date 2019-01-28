
// The core render object.
export abstract class RenderObject<T> {
    public needsRedraw?: boolean;
    public asset?: T;

    public abstract create(scene: Phaser.Scene): void;
    public abstract destroy(scene: Phaser.Scene): void;
}

export interface ImageRenderInfo {
    x: number;
    y: number;
    texture: string;
    rotation?: number;
}

export class ImageRenderObject extends RenderObject<Phaser.GameObjects.Image> {
    private info: ImageRenderInfo;

    public constructor(info: ImageRenderInfo) {
        super();
        this.info = info;
    }
    
    public create(scene: Phaser.Scene): void {
        this.asset = scene.add.image(this.info.x, this.info.y, this.info.texture);
        this.asset.setRotation(this.info.rotation || 0);
    }

    public destroy(scene: Phaser.Scene): void {
        this.asset.destroy();
    }
}

export abstract class Renderer<RENDERABLE extends Renderable<any>> {
    // Checks to see if a component needs to be drawn, destroying the old one if it exists
    public needsDraw(scene: Phaser.Scene, renderable: RENDERABLE, objectName: string): boolean {
        let oldRenderable: RenderObject<any> = renderable.renderObjects.get(objectName);
        if (!oldRenderable) {
            // If we can't find one, we assume that asking about it means we need to add it
            return true;
        } else if (oldRenderable.needsRedraw) {
            // If we have to redraw it, delete the old one and return true
            oldRenderable.destroy(scene);
            renderable.renderObjects.delete(objectName);
            return true;
        } else {
            // We have one that doesn't need to be redrawn
            return false;
        }
    }

    // Creates all render objects for the renderable
    public abstract createRenderObjects(scene: Phaser.Scene, renderable: RENDERABLE): void;
    
    // Destroys all render objects
    public destroyRenderObjects(scene: Phaser.Scene, renderable: RENDERABLE): void {
        renderable.renderObjects.forEach((renderObject) => {
            renderObject.destroy(scene);
        });
        renderable.renderObjects.clear();
    }
}

// Extend this class to provide rendering functionality!
export class Renderable<RENDERER extends Renderer<any>> {
    public renderObjects?: Map<string, RenderObject<any>> = new Map<string, RenderObject<any>>();
}
