import { Serializer } from "./Serializables";
import { WallAttachment } from "../Level";

export class WallAttachmentSerializer extends Serializer<WallAttachment> {
    public linkChildren(attachment: WallAttachment): void {
        // Do nothing; no children
    }
}