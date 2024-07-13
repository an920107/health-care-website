import PostColumnEnum from "./postColumnEnum";

export default class PostEntity {
    id: number;
    title: string;
    content: string;
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
        content,
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
        this.content = content;
        this.column = column;
        this.attachments = attachments;
        this.view = view;
        this.importance = importance;
        this.visibility = visibility;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
