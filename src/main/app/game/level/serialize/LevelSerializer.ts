import { Level } from "../Level";
import { Serializer } from "./Serializables";
import { CellSerializer } from "./CellSerializer";
import { LevelEntranceSerializer } from "./LevelEntranceSerializer";
import { LevelExitSerializer } from "./LevelExitSerializer";

export class LevelSerializer extends Serializer<Level> {
    private cellSerializer: CellSerializer = new CellSerializer();
    private levelEntranceSerializer: LevelEntranceSerializer = new LevelEntranceSerializer();
    private levelExitSerializer: LevelExitSerializer = new LevelExitSerializer();
    
    public linkChildren(level: Level): void {
        level.cells.forEach((cell) => {
            cell.parent = level;
            this.cellSerializer.linkChildren(cell);
        });

        level.entrances.forEach((entrance) => {
            entrance.parent = level;
            this.levelEntranceSerializer.linkChildren(entrance);
        });

        level.exits.forEach((exit) => {
            exit.parent = level;
            this.levelExitSerializer.linkChildren(exit);
        });
    };
}