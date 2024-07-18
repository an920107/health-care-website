import AttachmentEntity from "../domain/attachmentEntity";

export default class RestaurantViewModel extends AttachmentEntity {
    constructor(restaurant: AttachmentEntity) {
        super(restaurant);
    }

    get inspectedDate(): string {
        return this.inspectedTime.toISOString().substring(0, 10);
    }
}
