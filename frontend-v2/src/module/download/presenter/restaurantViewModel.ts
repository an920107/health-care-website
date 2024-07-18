import DownloadEntity from "../domain/downloadEntity";

export default class RestaurantViewModel extends DownloadEntity {
    constructor(restaurant: DownloadEntity) {
        super(restaurant);
    }

    get inspectedDate(): string {
        return this.inspectedTime.toISOString().substring(0, 10);
    }
}
