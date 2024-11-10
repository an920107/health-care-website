import CarouselEntity from "../domain/carouselEntity";

export class CarouselRequest extends CarouselEntity {
    constructor({
        title,
        titleEn,
        content,
        contentEn,
        visibility,
    }: {
        title: string,
        titleEn: string,
        content: string,
        contentEn: string,
        visibility: boolean,
    }) {
        super({
            id: -1,
            title: title,
            titleEn: titleEn,
            content: content,
            contentEn: contentEn,
            visibility: visibility,
            createdTime: new Date(),
            updatedTime: new Date(),
        });
    }

    toJson(): any {
        return {
            title: this.title,
            title_en: this.titleEn,
            content: this.content,
            content_en: this.contentEn,
            visibility: this.visibility,
        };
    }
}

export class CarouselResponse extends CarouselEntity {
    constructor(json: any) {
        super({
            id: json.id,
            title: json.title,
            titleEn: json.title_en,
            content: json.content,
            contentEn: json.content_en,
            visibility: json.visibility,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        });
    }
}
