import RestaurantInspectCategoryEnum from "../domain/restaurantInspectCategoryEnum";
import AttachmentRepo from "../domain/attachmentRepo";
import { RestaurantRequest, RestaurantResponse } from "./restaurantDto";

export default class RestaurantUsecase {
    private _repo: AttachmentRepo;

    constructor(repo: AttachmentRepo) {
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
    }): Promise<RestaurantResponse[]> {
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

    async updateRestaurant(post: RestaurantRequest): Promise<void> {
        return this._repo.update(post);
    }

    async deleteRestaurant(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
