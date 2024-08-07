import CarouselEntity from "../domain/carouselEntity";

export class CarouselRequest extends CarouselEntity {
    constructor({
        title,
        content,
        visibility,
    }: {
        title: string,
        content: string,
        visibility: boolean,
    }) {
        super({
            id: -1,
            title: title,
            content: content,
            visibility: visibility,
            createdTime: new Date(),
            updatedTime: new Date(),
        });
    }

    toJson(): any {
        return {
            title: this.title,
            content: this.content,
            visibility: this.visibility,
        };
    }
}

export class CarouselResponse extends CarouselEntity {
    constructor(json: any) {
        super({
            id: json.id,
            title: json.title,
            content: json.content,
            visibility: json.visibility,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        });
    }
}
