import PostColumnEnum from "../domain/postColumnEnum";
import PostEntity from "../domain/postEntity";

export class PostRequest extends PostEntity {
    constructor({
        title,
        titleEn,
        content,
        contentEn,
        column,
        attachments,
        importance,
        visibility,
    }: {
        title: string,
        titleEn: string,
        content: string,
        contentEn: string,
        column: PostColumnEnum,
        attachments: number[],
        importance: boolean,
        visibility: boolean,
    }) {
        super({
            id: -1,
            title: title,
            titleEn: titleEn,
            content: content,
            contentEn: contentEn,
            column: column,
            attachments: attachments,
            view: -1,
            importance: importance,
            visibility: visibility,
            createdTime: new Date(),
            updatedTime: new Date(),
        });
    }

    toJson(): string {
        return JSON.stringify({
            title: this.title,
            title_en: this.titleEn,
            content: this.content,
            content_en: this.contentEn,
            column: this.column,
            attachments: this.attachments,
            importance: this.importance,
            visibility: this.visibility,
        });
    }
}

export class PostResponse extends PostEntity {
    constructor(json: any) {
        super({
            id: json.id,
            title: json.title,
            titleEn: json.title_en,
            content: json.content,
            contentEn: json.content_en,
            column: json.column,
            attachments: json.attachments,
            view: json.view,
            importance: json.importance,
            visibility: json.visibility,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        });
    }
}
