import { Serializer } from "./Serializables";
import { Wall } from "../Level";
import { WallAttachmentSerializer } from "./WallAttachmentSerializer";
import { DoorSerializer } from "./DoorSerializer";

export class WallSerializer extends Serializer<Wall> {
    private wallAttachmentSerializer: WallAttachmentSerializer = new WallAttachmentSerializer();
    private doorSerializer: DoorSerializer = new DoorSerializer();

    public linkChildren(wall: Wall): void {
        wall.attachments.forEach((attachment) => {
            attachment.parent = wall;
            this.wallAttachmentSerializer.linkChildren(attachment);
        });

        if (wall.door) {
            wall.door.parent = wall;
            this.doorSerializer.linkChildren(wall.door);
        }
    }
}