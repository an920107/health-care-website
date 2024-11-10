import RestaurantInspectCategoryEnum from "./restaurantInspectCategoryEnum";

export default class RestaurantEntity {
    id: number;
    category: RestaurantInspectCategoryEnum;
    title: string;
    titleEn: string
    item: string;
    itemEn: string;
    attachments: number[];
    view: number;
    valid: boolean;
    visibility: boolean;
    inspectedTime: Date;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        category,
        title,
        titleEn,
        item,
        itemEn,
        attachments,
        view,
        valid,
        visibility,
        inspectedTime,
        createdTime,
        updatedTime,
    }: RestaurantEntity) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.titleEn = titleEn;
        this.item = item;
        this.itemEn = itemEn;
        this.attachments = attachments;
        this.view = view;
        this.valid = valid;
        this.visibility = visibility;
        this.inspectedTime = inspectedTime;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
