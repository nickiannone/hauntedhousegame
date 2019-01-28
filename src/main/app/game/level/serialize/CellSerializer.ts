import { Serializer } from "./Serializables";
import { Cell } from "../Level";
import { WallSerializer } from "./WallSerializer";

export class CellSerializer extends Serializer<Cell> {
    private wallSerializer: WallSerializer = new WallSerializer();

    public linkChildren(cell: Cell): void {
        cell.walls.forEach((wall) => {
            wall.parent = cell;
            this.wallSerializer.linkChildren(wall);
        });
    }
}