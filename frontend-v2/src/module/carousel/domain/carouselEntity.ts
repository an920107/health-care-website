export default class CarouselEntity {
    id: number;
    title: string;
    titleEn: string;
    content: string;
    contentEn: string;
    visibility: boolean;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        title,
        titleEn,
        content,
        contentEn,
        visibility,
        createdTime,
        updatedTime,
    }: CarouselEntity) {
        this.id = id;
        this.title = title;
        this.titleEn = titleEn;
        this.content = content;
        this.contentEn = contentEn;
        this.visibility = visibility;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
