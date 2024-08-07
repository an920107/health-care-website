export default class CarouselEntity {
    id: number;
    title: string;
    content: string;
    visibility: boolean;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        title,
        content,
        visibility,
        createdTime,
        updatedTime,
    }: CarouselEntity) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.visibility = visibility;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}

