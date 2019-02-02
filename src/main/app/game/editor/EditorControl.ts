import { Level } from "../level/Level";
import { PackFileFiles } from "../level/PackFile";
import { EditorBrush } from "./brushes/EditorBrush";
import { WallCreatorBrush } from "./brushes/WallCreatorBrush";
import { Point2D } from "../../utils/Point2D";
import { ViewportEdgeData } from "./ViewportEdgeData";

/**
 * The editor control panel.
 * 
 * Consists of two sections:
 * 
 * ```
 *  ________________________________    V   E
 * |          -Viewport-            |   |V
 * |                                |   |
 * |                                |   |
 * |                                |   |
 * |                                |   |
 * |                                |   |
 * |________________________________|   |
 * |           -Toolbox-            |   |   |T
 * | Main | Brushes                 |   |   |
 * |______|_________________________|   |   |
 * |      -Current brush menu-      |   |   |C
 * |________________________________|   |   |
 * ```
 * 
 * - Viewport: The main view into the level being edited.
 * - Toolbox: The menu controls for the editor.
 * 
 * The viewport takes up the full width of the scene, and the
 * toolbox overlays it on the bottom edge; this allows us to not
 * lose mouse inputs when the mouse goes over the toolbox.
 * 
 * Since we want to be able to pull up the editor over an existing
 * rendered level scene, we pass in the reference to the viewport
 * scene when we create this control, and render the toolbox onto
 * this scene as an overlay.
 */
export class EditorControl extends Phaser.Scene {

    // Maximum edge-drag velocity, in scroll units per frame.
    private static readonly MAX_DRAG_VELOCITY: number = 1.5;

    // Thickness of the drag region around the edges of the viewport, in scene grid units (== pixels?).
    private static readonly DRAG_REGION_THICKNESS: number = 20.0;

    // The scene being edited by this editor
    private levelScene: Phaser.Scene;

    // The section of the pack file representing this level
    private files: PackFileFiles;

    // The level being edited by this editor
    private level: Level;

    // The editor brushes
    private brushes: EditorBrush[] = [
        new WallCreatorBrush(this),
        /*
        new WallRemoverBrush(this),
        new DoorCreatorBrush(this),
        new DoorRemoverBrush(this) 
        */
    ];

    // The current brush.
    private currentBrush: EditorBrush;

    // The mouse position tracker.
    private prevMousePos: Point2D;

    // Whether viewport drag is enabled.
    private _isViewportDragEnabled: boolean = true;

    public constructor(scene: Phaser.Scene, files: PackFileFiles, level: Level) {
        super('Level Editor Controls');
        this.levelScene = scene;
        this.files = files;
        this.level = level;
        this.prevMousePos = { x: 0, y: 0 };
    }

    // Activate the given brush.
    public activateBrush(brush: EditorBrush): void {
        if (this.currentBrush === brush) {
            return;
        }

        this.deactivateBrush();

        this.currentBrush = brush;
        this.currentBrush.activate(this.levelScene);
    }

    // Deactivate the current brush.
    public deactivateBrush(): void {
        if (!this.currentBrush) {
            return;
        }

        this.currentBrush.deactivate();
        this.currentBrush = null;
    }

    // To be called from the UI when a tool's options change
    public dispatchMenuChangeEvent(event: string, key: string, value: any): void {
        if (this.currentBrush) {
            this.currentBrush.onMenuChange(event, key, value);
        }
    }

    // Sets 
    public setViewportDragEnabled(enabled: boolean) {
        this._isViewportDragEnabled = enabled;
    }

    public isViewportDragEnabled(): boolean {
        return this._isViewportDragEnabled;
    }

    preload() {
        // TODO Load the toolbox menu assets

        // Preload assets for the brushes
        this.brushes.forEach(brush => {
            brush.preload();
        });
    }

    create() {
        // Create the toolbox and set up the event hooks.

        // TODO Create the brushes

        // TODO Create the UI for the toolbox
        
        // Save the initial mouse position
        this.prevMousePos = {
            x: this.input.x,
            y: this.input.y
        };

        // Set up the event hooks
        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (this.currentBrush) {
                this.currentBrush.onKeyDown(event);
            }
        });

        this.input.keyboard.on('keyup', (event: KeyboardEvent) => {
            if (this.currentBrush) {
                this.currentBrush.onKeyUp(event);
            }
        });

        // TODO Attach hooks to the focus/blur emitters from the menu UI!
        
        // TODO Attach hooks to the generated UI system for menuChange events!

        // Activate the first brush, by default
        this.activateBrush(this.brushes[0]);
    }

    update(time: number, delta: number) {

        const currMousePos: Point2D = {
            x: this.input.x,
            y: this.input.y
        };

        // If viewport edge drag is enabled, drag the viewport.
        const viewportEdgeData: ViewportEdgeData[] = this.calculateViewportEdgeProximity(currMousePos);
        if (viewportEdgeData.length > 0 && this.isViewportDragEnabled) {
            this.dragViewport(viewportEdgeData);
        }

        if (this.currentBrush) {
            // NOTE onUpdate happens BEFORE mouse updates!
            this.currentBrush.onUpdate(time, delta);

            if (this.input.mousePointer.justMoved) {
                this.currentBrush.onMouseMove(this.prevMousePos, currMousePos);
            }

            if (this.input.mousePointer.justDown) {
                this.currentBrush.onMouseDown(currMousePos);
            }

            if (this.input.mousePointer.justUp) {
                this.currentBrush.onMouseUp(currMousePos);
            }
        }

        this.prevMousePos = currMousePos;
    }

    private calculateViewportEdgeProximity(pos: Point2D): ViewportEdgeData[] {
        // TODO Implement me!
        return [];
    }

    public dragViewport(viewportEdgeData: ViewportEdgeData[]): void {
        // Set up our delta drag
        const deltaDrag: Point2D = { x: 0.0, y: 0.0 };

        // Calculate the sum drag coefficient
        for (let viewportEdge of viewportEdgeData) {

            // TODO Verify that this is acceptable for the velocity!
            const velocity = (viewportEdge.proximityPx > 0.0) ?
                EditorControl.MAX_DRAG_VELOCITY * EditorControl.DRAG_REGION_THICKNESS / viewportEdge.proximityPx :
                EditorControl.MAX_DRAG_VELOCITY;

            switch (viewportEdge.direction) {
                case 'up':
                    deltaDrag.y = -velocity;
                    break;
                case 'down':
                    deltaDrag.y = velocity;
                    break;
                case 'left':
                    deltaDrag.x = -velocity;
                    break;
                case 'right':
                    deltaDrag.x = velocity;
                    break;
            }
        }

        // Apply drag to the viewport camera control.
        // TODO Verify that this is correct!
        this.levelScene.cameras.main.scrollX += deltaDrag.x;
        this.levelScene.cameras.main.scrollY += deltaDrag.y;

        // Notify the current brush
        if (this.currentBrush) {
            this.currentBrush.onViewportDrag(viewportEdgeData, deltaDrag);
        }
    }
}