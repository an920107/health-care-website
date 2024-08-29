import DownloadColumnEnum from "./downloadColumnEnum";

export default class DownloadEntity {
    id: number;
    title: string;
    titleEn: string;
    column: DownloadColumnEnum;
    visibility: boolean;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        title,
        titleEn,
        column,
        visibility,
        createdTime,
        updatedTime,
    }: DownloadEntity) {
        this.id = id;
        this.title = title;
        this.titleEn = titleEn;
        this.column = column;
        this.visibility = visibility;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
