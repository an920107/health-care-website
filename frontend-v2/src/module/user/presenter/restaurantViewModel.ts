import UserEntity from "../domain/userEntity";

export default class RestaurantViewModel extends UserEntity {
    constructor(restaurant: UserEntity) {
        super(restaurant);
    }

    get inspectedDate(): string {
        return this.inspectedTime.toISOString().substring(0, 10);
    }
}
