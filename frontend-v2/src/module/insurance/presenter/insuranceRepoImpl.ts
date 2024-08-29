import PagerEntity from "@/module/pager/domain/pagerEntity";
import InsuranceRepo from "../doamin/insuranceRepo";
import InsuranceEntity from "../doamin/insuranceEntity";
import { BACKEND_HOST } from "@/module/config/config";
import axios from "axios";
import { InsuranceRequest, InsuranceResponse } from "../application/insuranceDto";
import { PagerResponse } from "@/module/pager/application/pagerDto";

export default class InsuranceRepoImpl implements InsuranceRepo {
    async query({
        page,
    }: {
        page?: number;
    }): Promise<[InsuranceEntity[], PagerEntity]> {
        const params: any = {};

        if (page) params.page = page;

        const response = await axios.get(new URL("/api/insurance", BACKEND_HOST).href, {
            params: params
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return [
            (response.data["data"] as Array<any>).map((insurance) => new InsuranceResponse(insurance)),
            new PagerResponse(response.data),
        ];
    }

    async get(id: number): Promise<InsuranceEntity> {
        const response = await axios.get(new URL(`/api/insurance/${id}`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new InsuranceResponse(response.data["data"]);
    }

    async create(insurance: InsuranceEntity): Promise<void> {
        const response = await axios.post(new URL("/api/insurance", BACKEND_HOST).href,
            new InsuranceRequest(insurance).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (response.status !== 201)
            return Promise.reject(new Error(response.data));
    }

    async update(id: number, insurance: InsuranceEntity): Promise<void> {
        const response = await axios.patch(new URL(`/api/insurance/${id}`, BACKEND_HOST).href,
            new InsuranceRequest(insurance).toJson(),
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
        const response = await axios.delete(new URL(`/api/insurance/${id}`, BACKEND_HOST).href);

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
