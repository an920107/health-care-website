import { BACKEND_HOST } from "@/module/config/config";
import RestaurantEntity from "../domain/restaurantEntity";
import axios from "axios";
import RestaurantRepo from "../domain/restaurantRepo";
import RestaurantInspectCategoryEnum from "../domain/restaurantInspectCategoryEnum";
import { RestaurantRequest, RestaurantResponse } from "../application/restaurantDto";
import { PagerResponse } from "@/module/pager/application/pagerDto";
import PagerEntity from "@/module/pager/domain/pagerEntity";

export default class RestaurantRepoImpl implements RestaurantRepo {
    async query({
        page,
        category,
        visibility,
        search,
    }: {
        page?: number,
        category?: RestaurantInspectCategoryEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<[RestaurantEntity[], PagerEntity]> {
        const params: any = {};

        if (page) params.page = page;
        if (category) params.category = category.join("+");
        if (visibility === true) params.visibility = visibility;
        if ((search ?? "").trim().length > 0) {
            params.search = search;
        }

        console.debug("GET /api/restaurant with params:", params);
        const response = await axios.get(new URL("/api/restaurant", BACKEND_HOST).href, {
            params: params
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return [
            (response.data["data"] as Array<any>).map((restaurant) => new RestaurantResponse(restaurant)),
            new PagerResponse(response.data)
        ];
    }

    async get(id: number): Promise<RestaurantEntity> {
        const response = await axios.get(new URL(`/api/restaurant/${id}`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new RestaurantResponse(response.data["data"]);
    }

    async create(restaurant: RestaurantEntity): Promise<void> {
        const response = await axios.post(new URL("/api/restaurant", BACKEND_HOST).href,
            new RestaurantRequest(restaurant).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (response.status !== 201)
            return Promise.reject(new Error(response.data));
    }

    async update(id: number, restaurant: RestaurantEntity): Promise<void> {
        const response = await axios.patch(new URL(`/api/restaurant/${id}`, BACKEND_HOST).href,
            new RestaurantRequest(restaurant).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }

    async delete(id: number): Promise<void> {
        const response = await axios.delete(new URL(`/api/restaurant/${id}`, BACKEND_HOST).href);

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
