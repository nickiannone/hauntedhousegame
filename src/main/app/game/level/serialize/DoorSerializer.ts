import { Serializer } from "./Serializables";
import { Door } from "../Level";

export class DoorSerializer extends Serializer<Door> {
    public linkChildren(door: Door): void {
        // Do nothing; no children
    }
}