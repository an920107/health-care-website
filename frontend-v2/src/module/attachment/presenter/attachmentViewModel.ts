import { BACKEND_HOST } from "@/module/config/config";
import AttachmentEntity from "../domain/attachmentEntity";

export default class AttachmentViewModel extends AttachmentEntity {
    constructor(entity: AttachmentEntity) {
        super(entity);
    }

    get uploadedTime(): string {
        return this.createdTime.toISOString().substring(0, 19).replace("T", " ");
    }

    get url(): string {
        return new URL(`/api/attachment/${this.id}`, BACKEND_HOST).href;
    }
}