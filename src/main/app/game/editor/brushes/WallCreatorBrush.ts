import { EditorBrush } from "./EditorBrush";
import { EditorControl } from "../EditorControl";
import { Point2D } from "../../../utils/Point2D";

export class WallCreatorBrush extends EditorBrush {

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
        this.state = 'idle';
    }
    
    protected onDeactivate(): void {

    }

    protected onStateTransition(state: string, oldState: string): void {
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

    protected onMouseDown(pos: Point2D): void {
        if (this.state !== 'dragging') {
            this.state = 'dragging';
            this.originPoint = this.roundToNearestCellCorner(pos);
            this.currentPoint = this.originPoint;
        }
    }

    protected onDrag(pos: Point2D): void {
        if (this.state === 'dragging') {
            this.currentPoint = this.roundToNearestCellCorner(pos);
            if (!this.tempLine) {
                // Add a line

            } else {
                // Update the existing line
            }
        }
    }

    protected onMouseUp(pos: Point2D): void {

    }

    private roundToNearestCellCorner(pos: Point2D): Point2D {
        // TODO Implement!
        return pos;
    }
}