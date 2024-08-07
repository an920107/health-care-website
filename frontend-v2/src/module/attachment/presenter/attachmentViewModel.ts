import { BACKEND_HOST } from "@/module/config/config";
import AttachmentEntity from "../domain/attachmentEntity";
import { formatDate } from "date-fns";

export default class AttachmentViewModel extends AttachmentEntity {
    constructor(entity: AttachmentEntity) {
        super(entity);
    }

    get uploadedTime(): string {
        return formatDate(this.createdTime, "yyyy-MM-dd HH:mm:ss");
    }

    get uploadedDate(): string {
        return formatDate(this.createdTime, "yyyy-MM-dd");
    }

    get url(): string {
        return new URL(`/api/attachment/${this.id}`, BACKEND_HOST).href;
    }
}