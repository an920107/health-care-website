export default class ImageEntity {
    id: number;
    filename: string;
    updatedTime: Date;
    createdTime: Date;

    constructor({
        id,
        filename,
        updatedTime,
        createdTime,
    }: ImageEntity) {
        this.id = id;
        this.filename = filename;
        this.updatedTime = updatedTime;
        this.createdTime = createdTime;
    }
}
