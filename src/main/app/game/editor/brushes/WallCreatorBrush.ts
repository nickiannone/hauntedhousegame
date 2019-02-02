import { EditorBrush } from "./EditorBrush";
import { EditorControl } from "../EditorControl";
import { Point2D } from "../../../utils/Point2D";
import { ViewportEdgeData } from "../ViewportEdgeData";

export class WallCreatorBrush extends EditorBrush {

    private cursorImage: Phaser.GameObjects.Image;

    public onKeyDown(event: KeyboardEvent): void {}
    public onKeyUp(event: KeyboardEvent): void {}
    public onUpdate(time: number, delta: number): void {}

    public onViewportDrag(viewportEdgeData: ViewportEdgeData[]): void {}

    public onMenuFocus(): void {
        if (this.state !== 'dragging') {
            this.state = 'menu';
        }
    }
    public onMenuBlur(): void {
        if (this.state !== 'dragging') {
            this.state = 'idle';
        }
    }
    public onMenuChange(event: string, key: string, value: any): void {
        // TODO Implement menu option handling!
    }

    /**
     * State machine:
     * 
     * (menu) <-> *(idle) <-> (dragging)
     * 
     * idle: Initial state, allows the mouse to drag over the cells.
     * dragging: Pulls out a straight line from the origin, and inserts
     *      a wall into the level when released. Also moves the camera
     *      when dragging close to the toolbar or the viewport edge, so
     *      we can drag out past the edge of the viewport.
     * menu: Allows us to change menu settings; in this case, lets us
     *      pick which wall we're creating.
     */
    public static states: string[] = [
        'idle',
        'dragging',
        'menu'
    ];

    public originPoint: Point2D;
    public currentPoint: Point2D;
    public tempLine: Phaser.GameObjects.Line;

    public constructor(editorControl: EditorControl) {
        super(editorControl);
    }

    protected onPreload(): void {
        this.editorControl.load.image('blueboy', 'sprites/blueboy/blueboy.png');
    }

    protected onActivate(): void {
        // Add cursor image to editor control
        this.cursorImage = this.editorControl.add.image(0, 0, 'blueboy');

        // TODO Initialize menu options!
        //this.editorControl.brushOptionsPanel.clear();
        //this.editorControl.brushOptionsPanel.push({ ... });

        // Set the state.
        this.state = 'idle';
    }
    
    protected onDeactivate(): void {
        this.cursorImage.destroy();
    }

    public onStateTransition(state: string, oldState: string): void {
        // Just handle reset on idle.
        if (state === 'idle') {
            this.originPoint = null;
            this.currentPoint = null;
            if (this.tempLine) {
                this.tempLine.destroy();
                this.tempLine = null;
            }
        }
    }

    public onMouseDown(pos: Point2D): void {
        if (this.state === 'idle') {
            this.state = 'dragging';
            this.originPoint = this.roundToNearestCellCorner(pos);
            this.currentPoint = this.originPoint;
        } else if (this.state === 'menu') {
            // TODO Let the editor UI handle the event!
        }
    }

    public onMouseMove(prevPos: Point2D, pos: Point2D): void {
        if (this.state === 'dragging') {
            this.currentPoint = this.roundToNearestCellCorner(pos);
            if (!this.tempLine) {
                // Add a line

            } else {
                // Update the existing line
            }
        }
    }

    public onMouseUp(pos: Point2D): void {
        if (this.state === 'dragging') {
            // TODO Calculate the new end position and create the line!


            this.state = 'idle';
        } else if (this.state === 'menu') {
            // TODO Let the editor UI handle the event!
        }
    }

    private roundToNearestCellCorner(pos: Point2D): Point2D {
        // TODO Implement!
        return pos;
    }
}