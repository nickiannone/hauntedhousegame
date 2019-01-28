import { Serializer } from "./Serializables";
import { LevelExit } from "../Level";

export class LevelExitSerializer extends Serializer<LevelExit> {
    public linkChildren(exit: LevelExit): void {
        // Do nothing; no children
    }
}