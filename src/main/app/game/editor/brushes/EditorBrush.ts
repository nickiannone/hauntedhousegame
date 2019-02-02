import { EditorControl } from "../EditorControl";
import { Point2D } from "../../../utils/Point2D";
import { Direction } from "../../../utils/Direction";
import { ViewportEdgeData } from "../ViewportEdgeData";

export abstract class EditorBrush {

    // The internal state for the state machine.
    private _state: string = '';

    // The scene of the game world.
    protected levelScene: Phaser.Scene;

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

    public abstract onMouseDown(pos: Point2D): void;
    public abstract onMouseUp(pos: Point2D): void;
    public abstract onMouseMove(prevPos: Point2D, pos: Point2D): void;
    public abstract onKeyDown(event: KeyboardEvent): void;
    public abstract onKeyUp(event: KeyboardEvent): void;
    public abstract onUpdate(time: number, delta: number): void;

    /**
     * Notifies the brush when the viewport is dragged by cursor proximity to an edge.
     * Does not get called when the editor control has isViewportDragEnabled set to false.
     */
    public abstract onViewportDrag(edgeData: ViewportEdgeData[], deltaDrag: Point2D): void;

    // Brush State Events
    //====================

    public abstract onStateTransition(state: string, oldState: string): void;

    // Menu Events
    //=============
    public abstract onMenuFocus(): void;
    public abstract onMenuBlur(): void;
    public abstract onMenuChange(event: string, key: string, value: any): void;

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
    public activate(levelScene: Phaser.Scene) {
        this.levelScene = levelScene;
        this.onActivate();
    }

    // Deactivates the brush.
    public deactivate() {
        this.onDeactivate();
    }

    // Dispatches input events
    public preload() {
        this.onPreload();
    }
}