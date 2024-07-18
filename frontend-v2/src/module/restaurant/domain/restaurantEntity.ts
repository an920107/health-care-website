import RestaurantInspectCategoryEnum from "./restaurantInspectCategoryEnum";

export default class RestaurantEntity {
    id: number;
    title: string;
    category: RestaurantInspectCategoryEnum;
    item: string;
    attachments: number[];
    view: number;
    valid: boolean;
    visibility: boolean;
    inspectedTime: Date;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        title,
        category,
        item,
        attachments,
        view,
        valid,
        visibility,
        inspectedTime,
        createdTime,
        updatedTime,
    }: RestaurantEntity) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.item = item;
        this.attachments = attachments;
        this.view = view;
        this.valid = valid;
        this.visibility = visibility;
        this.inspectedTime = inspectedTime;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
