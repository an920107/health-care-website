import AttachmentEntity from "../domain/attachmentEntity";

export default class AttachmentViewModel extends AttachmentEntity {
    constructor(entity: AttachmentEntity) {
        super(entity);
    }

    get uploadedTime(): string {
        return this.createdTime.toISOString().substring(0, 19).replace("T", " ");
    }
}