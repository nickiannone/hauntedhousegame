import { Direction } from "../../utils/Direction";

export interface ViewportEdgeData {

    // The edge of the viewport we're near.
    direction: Direction;

    // The number of pixels we are inside the viewport from this edge.
    // Positive = inside, negative = outside.
    proximityPx: number;
}