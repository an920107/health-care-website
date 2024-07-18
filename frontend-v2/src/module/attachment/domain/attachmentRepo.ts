import AttachmentEntity from "./attachmentEntity";

export default interface AttachmentRepo {
    get(id: number): Promise<AttachmentEntity>;

    create(attachment: AttachmentEntity): Promise<void>;

    update(attachment: AttachmentEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
