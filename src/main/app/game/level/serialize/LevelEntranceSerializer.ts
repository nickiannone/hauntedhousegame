import { Serializer } from "./Serializables";
import { LevelEntrance } from "../Level";

export class LevelEntranceSerializer extends Serializer<LevelEntrance> {
    public linkChildren(entrance: LevelEntrance): void {
        // Do nothing; no children
    }
}