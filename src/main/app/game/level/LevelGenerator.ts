import { Level, Wall, LevelEntrance, LevelExit, EntranceType, ExitType } from "./Level";
import { LevelSerializer } from "./serialize/LevelSerializer";
import { Direction } from "../../utils/Direction";

export interface LevelGenerationInfo {
    borderX: number;
    borderY: number;
    width: number;
    height: number;
    entrances: LevelEntrance[];
    exits: LevelExit[];
    defaultDoorAsset: string;
    defaultWallAsset: string;
    defaultFloorAsset: string;
}

export class LevelGenerator {

    public static generateLevel(info: LevelGenerationInfo): Level {
        const level: Level = {
            width: info.width,
            height: info.height,
            borderX: info.borderX,
            borderY: info.borderY,
            entrances: info.entrances,
            exits: info.exits,
            cells: []
        };

        // Initialize cells with border walls
        for (let i = 0; i < level.width; i++) {
            for (let j = 0; j < level.height; j++) {
                let walls: Wall[] = [];

                if (i === 0) {
                    walls.push({
                        direction: 'left',
                        attachments: [],
                        door: (LevelGenerator.hasEntranceOrExit(level, i, j, 'left')) ? {
                            asset: info.defaultDoorAsset,
                            fixed: true
                        } : undefined,
                        asset: info.defaultWallAsset
                    });
                }
                
                if (i === level.width - 1) {
                    walls.push({
                        direction: 'right',
                        attachments: [],
                        door: (LevelGenerator.hasEntranceOrExit(level, i, j, 'right')) ? {
                            asset: info.defaultDoorAsset,
                            fixed: true
                        } : undefined,
                        asset: info.defaultWallAsset
                    });
                }

                if (j === 0) {
                    walls.push({
                        direction: 'up',
                        attachments: [],
                        door: (LevelGenerator.hasEntranceOrExit(level, i, j, 'up')) ? {
                            asset: info.defaultDoorAsset,
                            fixed: true
                        } : undefined,
                        asset: info.defaultWallAsset
                    });
                }
                
                if (j === level.height - 1) {
                    walls.push({
                        direction: 'down',
                        attachments: [],
                        door: (LevelGenerator.hasEntranceOrExit(level, i, j, 'down')) ? {
                            asset: info.defaultDoorAsset,
                            fixed: true
                        } : undefined,
                        asset: info.defaultWallAsset
                    });
                }

                level.cells.push({
                    x: i,
                    y: j,
                    asset: info.defaultFloorAsset,
                    walls: walls
                });
            }
        }

        // Link children
        new LevelSerializer().linkChildren(level);

        return level;
    }

    private static hasEntranceOrExit(level: Level, x: number, y: number, d: Direction): boolean {
        for (let entrance of level.entrances) {
            if (entrance.x === x && entrance.y === y && entrance.direction === d) {
                return true;
            }
        }
        for (let exit of level.exits) {
            if (exit.x === x && exit.y === y && exit.direction === d) {
                return true;
            }
        }

        return false;
    }
}