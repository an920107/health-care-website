export default class DownloadEntity {
    id: number;
    title: string;
    column: string;
    visibility: boolean;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        title,
        column,
        visibility,
        createdTime,
        updatedTime,
    }: DownloadEntity) {
        this.id = id;
        this.title = title;
        this.column = column;
        this.visibility = visibility;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
