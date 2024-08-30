import DownloadColumnEnum from "../domain/downloadColumnEnum";
import DownloadEntity from "../domain/downloadEntity";

export class DownloadRequest extends DownloadEntity {
    constructor({
        title,
        titleEn,
        column,
        visibility,
    }: {
        title: string,
        titleEn: string,
        column: DownloadColumnEnum,
        visibility: boolean,
    }) {
        super({
            id: -1,
            title: title,
            titleEn: titleEn,
            column: column,
            visibility: visibility,
            createdTime: new Date(),
            updatedTime: new Date(),
        });
    }

    toJson(): any {
        return {
            title: this.title,
            title_en: this.titleEn,
            column: this.column,
            visibility: this.visibility,
        };
    }
}

export class DownloadResponse extends DownloadEntity {
    constructor(json: any) {
        super({
            id: json.id,
            title: json.title,
            titleEn: json.title_en,
            column: json.column,
            visibility: json.visibility,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        });
    }
}
