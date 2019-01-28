import { Renderable } from "./render/Renderables";
import { CellRenderer } from "./render/CellRenderer";
import { LevelRenderer } from "./render/LevelRenderer";
import { WallRenderer } from "./render/WallRenderer";
import { WallAttachmentRenderer } from "./render/WallAttachmentRenderer";
import { DoorRenderer } from "./render/DoorRenderer";
import { Serializable } from "./serialize/Serializables";
import { Direction } from "../../utils/Direction";

export interface Level extends Renderable<LevelRenderer>, Serializable<void> {
    width: number;
    height: number;
    borderX: number;
    borderY: number;
    entrances: LevelEntrance[];
    exits: LevelExit[];
    cells: Cell[];
}

export type EntranceType = 'customer' | 'staff' | 'other';

export interface LevelEntrance extends Serializable<Level> {
    x: number;
    y: number;
    direction: Direction;
    type: EntranceType;
}

export type ExitType = 'customer' | 'staff' | 'emergency' | 'other';

export interface LevelExit extends Serializable<Level> {
    x: number;
    y: number;
    direction: Direction;
    type: ExitType;
}

export interface Cell extends Renderable<CellRenderer>, Serializable<Level> {
    x: number;
    y: number;
    asset: string;
    walls: Wall[];
}

export interface Wall extends Renderable<WallRenderer>, Serializable<Cell> {
    direction: Direction;
    attachments: WallAttachment[];
    door?: Door;
    asset: string;
    backside?: Wall;
    isOuter?: boolean;
}

export interface WallAttachment extends Renderable<WallAttachmentRenderer>, Serializable<Wall> {
    asset: string;
    position: number;
    height: number;
}

export interface Door extends Renderable<DoorRenderer>, Serializable<Wall> {
    asset: string;
    // Not serialized:
    fixed?: boolean;
    backsideDoor?: Door;
}

// TODO Add furniture and interactives!

// Derived objects (non-Serializables)
export interface Room {
    cells: Cell[];
    doors: Door[];
}

export interface Path {
    cells: Cell[];
}
