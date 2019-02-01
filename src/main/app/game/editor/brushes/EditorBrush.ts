import { EditorControl } from "../EditorControl";
import { Point2D } from "../../../utils/Point2D";
import { Direction } from "../../../utils/Direction";

export abstract class EditorBrush {

    // The internal state for the state machine.
    private _state: string = '';

    // The scene of the game world.
    protected scene: Phaser.Scene;

    // The editor control scene.
    protected editorControl: EditorControl

    public constructor(editorControl: EditorControl) {
        this.editorControl = editorControl;
    }

    // Lifecycle management
    //======================

    // Called during the editor's preload phase.
    protected abstract onPreload(): void;
    // Called when this brush is selected from the canvas
    protected abstract onActivate(): void;
    // Called when another brush is selected from the canvas
    protected abstract onDeactivate(): void;

    // Input Events
    //==============

    protected onMouseDown(pos: Point2D): void {}
    protected onMouseUp(pos: Point2D): void {}
    protected onMouseMove(pos: Point2D): void {}
    protected onKeyDown(event: KeyboardEvent): void {}
    protected onKeyUp(event: KeyboardEvent): void {}
    protected onUpdate(time: number, delta: number): void {}

    /**
     * Reads the amount of pixels away from the edge of the viewport you are,
     * when the mouse moves within the editor threshold.
     * 
     * @param direction The edge you're near.
     * @param distancePx The distance from the edge. Positive = inside edge, negative = outside.
     */
    protected onViewportEdge(direction: Direction, distancePx: number) {}

    // Brush State Events
    //====================

    protected onStateTransition(state: string, oldState: string): void {}

    // Menu Events
    //=============
    protected onMenuFocus(): void {}
    protected onMenuBlur(): void {}
    protected onMenuChange(event: string, key: string, value: any): void {}

    // END OF ABSTRACT METHODS

    // State management
    public set state(state: string) {
        const oldState = this._state;
        this._state = state;
        this.onStateTransition(this._state, oldState);
    }

    public get state(): string {
        return this._state;
    }

    // Activates the brush.
    public activate(scene: Phaser.Scene) {
        // TODO Bind keyboard, mouse, and update events

        this.onActivate();
    }

    // Deactivates the brush.
    public deactivate() {
        // TODO Unbind keyboard, mouse, and update events

        this.onDeactivate();
    }
}