import PostColumnEnum from "./postColumnEnum";

export default class PostEntity {
    id: number;
    title: string;
    titleEn: string;
    content: string;
    contentEn: string;
    column: PostColumnEnum;
    attachments: number[];
    view: number;
    importance: boolean;
    visibility: boolean;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        title,
        titleEn,
        content,
        contentEn,
        column,
        attachments,
        view,
        importance,
        visibility,
        createdTime,
        updatedTime,
    }: PostEntity) {
        this.id = id;
        this.title = title;
        this.titleEn = titleEn;
        this.content = content;
        this.contentEn = contentEn;
        this.column = column;
        this.attachments = attachments;
        this.view = view;
        this.importance = importance;
        this.visibility = visibility;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
