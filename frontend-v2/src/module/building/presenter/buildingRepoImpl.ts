import axios from "axios";
import BuildingRepo from "../domain/buildingRepo";
import { BACKEND_HOST } from "@/module/config/config";
import BuildingEntity from "../domain/buildingEntity";
import { BuildingRequest, BuildingResponse } from "../application/buildingDto";

export default class BuildingRepoImpl implements BuildingRepo {
    async query(userId: string): Promise<BuildingEntity[]> {
        const params = { user_id: userId };

        const response = await axios.get(new URL("/api/building", BACKEND_HOST).href, {
            params: params,
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return (response.data["data"] as Array<any>).map((building) => new BuildingResponse(building));
    }

    async get(id: number): Promise<BuildingEntity> {
        const response = await axios.get(new URL(`/api/building/${id}`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new BuildingResponse(response.data["data"]);
    }

    async create(building: BuildingEntity): Promise<void> {
        const response = await axios.post(new URL("/api/building", BACKEND_HOST).href,
            new BuildingRequest(building).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status !== 201)
            return Promise.reject(new Error(response.data));
    }

    async update(id: number, building: BuildingEntity): Promise<void> {
        const response = await axios.patch(new URL(`/api/building/${id}`, BACKEND_HOST).href,
            new BuildingRequest(building).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }

    async delete(id: number): Promise<void> {
        const response = await axios.delete(new URL(`/api/building/${id}`, BACKEND_HOST).href);

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
