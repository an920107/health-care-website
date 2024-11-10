export default class ViewCountEntity {
    id: number;
    view: number;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        view,
        createdTime,
        updatedTime,
    }: ViewCountEntity) {
        this.id = id;
        this.view = view;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
