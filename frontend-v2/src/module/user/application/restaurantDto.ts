import UserEntity from "../domain/userEntity";
import RestaurantInspectCategoryEnum from "../domain/restaurantInspectCategoryEnum";

export class RestaurantRequest extends UserEntity {
    constructor({
        title,
        category,
        item,
        attachments,
        valid,
        visibility,
        inspectedTime,
    }: {
        title: string,
        category: RestaurantInspectCategoryEnum,
        item: string,
        attachments: number[],
        valid: boolean,
        visibility: boolean,
        inspectedTime: Date,
    }) {
        super({
            id: -1,
            title: title,
            category: category,
            item: item,
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
            title: this.title,
            category: this.category,
            item: this.item,
            attachments: this.attachments,
            valid: this.valid,
            visibility: this.visibility,
            inspectedTime: this.inspectedTime,
        });
    }
}

export class RestaurantResponse extends UserEntity {
    constructor(json: any) {
        super({
            id: json.id,
            title: json.title,
            category: json.category,
            item: json.item,
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
