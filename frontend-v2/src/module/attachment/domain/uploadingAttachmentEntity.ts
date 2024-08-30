import AttachmentEntity from "./attachmentEntity";

export default class UploadingAttachmentEntity {
    state: number;
    file: File;
    uploadPromise: Promise<AttachmentEntity | void>;

    constructor({
        state,
        file,
        uploadPromise,
    }: {
        state: number
        file: File;
        uploadPromise: Promise<AttachmentEntity | void>;
    }) {
        this.state = state;
        this.file = file;
        this.uploadPromise = uploadPromise;
    }
}
