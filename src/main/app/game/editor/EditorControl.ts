import { Level } from "../level/Level";
import { PackFileFiles } from "../level/PackFile";
import { EditorBrush } from "./brushes/EditorBrush";
import { WallCreatorBrush } from "./brushes/WallCreatorBrush";

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

    // The scene being edited by this editor
    private viewportScene: Phaser.Scene;

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

    public constructor(scene: Phaser.Scene, files: PackFileFiles, level: Level) {
        super('Level Editor Controls');
        this.viewportScene = scene;
        this.files = files;
        this.level = level;
    }

    // Activate the given brush.
    public activateBrush(brush: EditorBrush): void {
        if (this.currentBrush === brush) {
            return;
        }

        this.deactivateBrush();

        this.currentBrush = brush;
        this.currentBrush.activate(this.viewportScene);
    }

    // Deactivate the current brush.
    public deactivateBrush(): void {
        if (!this.currentBrush) {
            return;
        }

        this.currentBrush.deactivate();
        this.currentBrush = null;
    }

    preload() {
        // Load the toolbox menu assets
    }

    create() {
        // Create the toolbox and set up the event hooks.
        
    }

    update(time: number, delta: number) {

    }
}