import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantInspectCategoryEnum from "../domain/restaurantInspectCategoryEnum";

export class RestaurantRequest extends RestaurantEntity {
    constructor({
        category,
        title,
        titleEn,
        item,
        itemEn,
        attachments,
        valid,
        visibility,
        inspectedTime,
    }: {
        category: RestaurantInspectCategoryEnum,
        title: string,
        titleEn: string,
        item: string,
        itemEn: string,
        attachments: number[],
        valid: boolean,
        visibility: boolean,
        inspectedTime: Date,
    }) {
        super({
            id: -1,
            category: category,
            title: title,
            titleEn: titleEn,
            item: item,
            itemEn: itemEn,
            attachments: attachments,
            view: -1,
            valid: valid,
            visibility: visibility,
            inspectedTime: inspectedTime,
            createdTime: new Date(),
            updatedTime: new Date(),
        });
    }

    toJson(): string {
        return JSON.stringify({
            category: this.category,
            title: this.title,
            title_en: this.titleEn,
            item: this.item,
            item_en: this.itemEn,
            attachments: this.attachments,
            valid: this.valid,
            visibility: this.visibility,
            inspected_time: this.inspectedTime.toISOString(),
        });
    }
}

export class RestaurantResponse extends RestaurantEntity {
    constructor(json: any) {
        super({
            id: json.id,
            category: json.category,
            title: json.title,
            titleEn: json.title_en,
            item: json.item,
            itemEn: json.item_en,
            attachments: json.attachments,
            view: json.view,
            valid: json.valid,
            visibility: json.visibility,
            inspectedTime: json.inspected_time,
            createdTime: json.created_time,
            updatedTime: json.updated_time,
        });
    }
}
