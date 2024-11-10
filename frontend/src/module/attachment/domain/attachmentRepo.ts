import AttachmentEntity from "./attachmentEntity";

export default interface AttachmentRepo {
    get(id: number): Promise<AttachmentEntity>;

    upload(
        file: File,
        onProgress?: (progress: number) => void
    ): Promise<AttachmentEntity>;

    delete(id: number): Promise<void>;
}
