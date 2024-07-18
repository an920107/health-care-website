import RestaurantEntity from "../domain/restaurantEntity";

export default class RestaurantViewModel extends RestaurantEntity {
    constructor(restaurant: RestaurantEntity) {
        super(restaurant);
    }

    get inspectedDate(): string {
        return this.inspectedTime.toISOString().substring(0, 10);
    }
}
