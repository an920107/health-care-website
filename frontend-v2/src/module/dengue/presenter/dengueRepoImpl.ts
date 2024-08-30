import axios from "axios";
import { DengueRequest, DengueResponse } from "../application/dengueDto";
import DengueRepo from "../domain/dengueRepo";
import { BACKEND_HOST } from "@/module/config/config";
import { PagerResponse } from "@/module/pager/application/pagerDto";
import Cookies from "js-cookie";

export default class DengueRepoImpl implements DengueRepo {
    async query({
        page,
    }: {
        page?: number;
    }): Promise<[DengueResponse[], PagerResponse]> {
        const params: any = {};

        if (page) params.page = page;

        const response = await axios.get(new URL("/api/dengue", BACKEND_HOST).href, {
            params: params
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return [
            (response.data["data"] as Array<any>).map((dengue) => new DengueResponse(dengue)),
            new PagerResponse(response.data),
        ];
    }

    async get(id: number): Promise<DengueResponse> {
        const response = await axios.get(new URL(`/api/dengue/${id}`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new DengueResponse(response.data["data"]);
    }

    async create(dengue: DengueRequest): Promise<void> {
        const response = await axios.post(new URL("/api/dengue", BACKEND_HOST).href,
            new DengueRequest(dengue).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": Cookies.get("csrf_access_token"),
                },
            }
        );

        if (response.status !== 201)
            return Promise.reject(new Error(response.data));
    }

    async update(id: number, dengue: DengueRequest): Promise<void> {
        const response = await axios.put(new URL(`/api/dengue/${id}`, BACKEND_HOST).href,
            new DengueRequest(dengue).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": Cookies.get("csrf_access_token"),
                },
            }
        );

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }

    async delete(id: number): Promise<void> {
        const response = await axios.delete(new URL(`/api/dengue/${id}`, BACKEND_HOST).href, {
            headers: {
                "X-CSRF-Token": Cookies.get("csrf_access_token"),
            },
        });

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
