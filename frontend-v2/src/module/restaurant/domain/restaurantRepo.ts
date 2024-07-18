import RestaurantEntity from "./restaurantEntity";
import RestaurantInspectCategoryEnum from "./restaurantInspectCategoryEnum";

export default interface RestaurantRepo {
    query({ }: {
        page?: number,
        category?: RestaurantInspectCategoryEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<RestaurantEntity[]>;

    get(id: number): Promise<RestaurantEntity>;

    create(restaurant: RestaurantEntity): Promise<void>;

    update(restaurant: RestaurantEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
