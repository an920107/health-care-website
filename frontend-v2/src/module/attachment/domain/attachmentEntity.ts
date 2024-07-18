export default class AttachmentEntity {
    id: number;
    filename: string;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        filename,
        createdTime,
        updatedTime,
    }: AttachmentEntity) {
        this.id = id;
        this.filename = filename;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
