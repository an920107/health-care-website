import axios from "axios";
import { DownloadRequest, DownloadResponse } from "../application/downloadDto";
import DownloadRepo from "../domain/downloadRepo";
import { BACKEND_HOST } from "@/module/config/config";

export default class DownloadRepoImpl implements DownloadRepo {
    async query({
        column,
        visibility,
    }: {
        column?: string[];
        visibility?: boolean;
    }): Promise<DownloadResponse[]> {
        const params: any = {};
        if (column) params.column = column.join("+");
        if (visibility === true) params.visibility = visibility;

        const response = await axios.get(new URL("/api/download", BACKEND_HOST).href, {
            params: params
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return (response.data["data"] as Array<any>).map((download) => new DownloadResponse(download));
    }

    async get(id: number): Promise<DownloadResponse> {
        const response = await axios.get(new URL(`/api/download/${id}/info`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new DownloadResponse(response.data["data"]);
    }

    async create(download: DownloadRequest): Promise<void> {
        const response = await axios.post(new URL("/api/download", BACKEND_HOST).href,
            new DownloadRequest(download).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (response.status !== 201)
            return Promise.reject(new Error(response.data));
    }

    async update(id: number, download: DownloadRequest): Promise<void> {
        const response = await axios.patch(new URL(`/api/download/${id}`, BACKEND_HOST).href,
            new DownloadRequest(download).toJson(),
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
        const response = await axios.delete(new URL(`/api/download/${id}`, BACKEND_HOST).href);

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
