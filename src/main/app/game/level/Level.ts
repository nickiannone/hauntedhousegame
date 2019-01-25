import { Point2D } from "../../utils/Point2D";

export interface Level {
    width: number;
    height: number;
    borderX: number;
    borderY: number;
    entrances: LevelEntrance[];
    exits: LevelExit[];
    cells: Cell[];
}

export type Direction = "up" | "down" | "left" | "right";

export type EntranceType = 'customer' | 'staff' | 'other';

export interface LevelEntrance {
    x: number;
    y: number;
    direction: Direction;
    type: EntranceType;
}

export type ExitType = 'customer' | 'staff' | 'emergency' | 'other';

export interface LevelExit {
    x: number;
    y: number;
    direction: Direction;
    type: ExitType;
}

export interface Cell {
    x: number;
    y: number;
    asset: string;
    walls: Wall[];
    // Render
    floorImage?: Phaser.GameObjects.Image;
}

export interface Wall {
    direction: Direction;
    attachments: WallAttachment[];
    door?: Door;
    asset: string;
    backside?: Wall;
    isOuter?: boolean;
    // Render
    image?: Phaser.GameObjects.Image;
}

export interface WallAttachment {
    asset: string;
    position: number;
    height: number;
    // Render
    image?: Phaser.GameObjects.Image;
}

export interface Door {
    asset: string;
    // Not serialized:
    fixed?: boolean;
    backsideDoor?: Door;
    // Render
    image?: Phaser.GameObjects.Image;
}

// Derived objects
export interface Room {
    cells: Cell[];
    doors: Door[];
}

export interface Path {
    cells: Cell[];
}
