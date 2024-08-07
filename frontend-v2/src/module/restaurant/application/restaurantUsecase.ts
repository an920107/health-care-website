import { PagerResponse } from "@/module/pager/application/pagerDto";
import RestaurantInspectCategoryEnum from "../domain/restaurantInspectCategoryEnum";
import RestaurantRepo from "../domain/restaurantRepo";
import { RestaurantRequest, RestaurantResponse } from "./restaurantDto";

export default class RestaurantUsecase {
    private _repo: RestaurantRepo;

    constructor(repo: RestaurantRepo) {
        this._repo = repo;
    }

    async getAllRestaurants({
        page = 1,
        category = [
            RestaurantInspectCategoryEnum.Drink,
            RestaurantInspectCategoryEnum.Food,
            RestaurantInspectCategoryEnum.Ice,
            RestaurantInspectCategoryEnum.Water,
            RestaurantInspectCategoryEnum.Others,
        ],
        visibility = false,
        search,
    }: {
        page?: number,
        category?: RestaurantInspectCategoryEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<[RestaurantResponse[], PagerResponse]> {
        return this._repo.query({
            page: page,
            category: category,
            visibility: visibility,
            search: search,
        })
    }

    async getRestaurantById(id: number): Promise<RestaurantResponse> {
        return this._repo.get(id);
    }

    async createRestaurant(post: RestaurantRequest): Promise<void> {
        return this._repo.create(post);
    }

    async updateRestaurant(id: number, post: RestaurantRequest): Promise<void> {
        return this._repo.update(id, post);
    }

    async deleteRestaurant(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
