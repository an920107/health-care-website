import { formatDate } from "date-fns";
import RestaurantEntity from "../domain/restaurantEntity";

export default class RestaurantViewModel extends RestaurantEntity {
    constructor(restaurant: RestaurantEntity) {
        super(restaurant);
    }

    get inspectedDate(): string {
        return formatDate(this.inspectedTime, "yyyy-MM-dd");
    }
}
