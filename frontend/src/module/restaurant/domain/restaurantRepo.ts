import PagerEntity from "@/module/pager/domain/pagerEntity";
import RestaurantEntity from "./restaurantEntity";
import RestaurantInspectCategoryEnum from "./restaurantInspectCategoryEnum";

export default interface RestaurantRepo {
    query({ }: {
        page?: number,
        category?: RestaurantInspectCategoryEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<[RestaurantEntity[], PagerEntity]>;

    get(id: number): Promise<RestaurantEntity>;

    create(restaurant: RestaurantEntity): Promise<void>;

    update(id: number, restaurant: RestaurantEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
