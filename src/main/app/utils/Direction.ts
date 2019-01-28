
export type Direction = "up" | "down" | "left" | "right";

export class DirectionUtils {
    public static rotate(d: Direction, stepsClockwise: number): Direction {
        const directions: Direction[] = [ "up", "right", "down", "left" ];
        return directions[directions.indexOf(d) + stepsClockwise % 4];
    }

    public static oppose(d: Direction): Direction {
        return DirectionUtils.rotate(d, 2);
    }
}