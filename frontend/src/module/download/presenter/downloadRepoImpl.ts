import axios from "axios";
import { DownloadRequest, DownloadResponse } from "../application/downloadDto";
import DownloadRepo from "../domain/downloadRepo";
import { BACKEND_HOST } from "@/module/config/config";
import DownloadColumnEnum from "../domain/downloadColumnEnum";
import PagerEntity from "@/module/pager/domain/pagerEntity";
import { PagerResponse } from "@/module/pager/application/pagerDto";
import Cookies from "js-cookie";

export default class DownloadRepoImpl implements DownloadRepo {
    async query({
        page,
        column,
        visibility,
    }: {
        page?: number;
        column?: DownloadColumnEnum[];
        visibility?: boolean;
    }): Promise<[DownloadResponse[], PagerEntity]> {
        const params: any = {};
        if (page) params.page = page;
        if (column) params.column = column.join("+");
        if (visibility === true) params.visibility = visibility;

        const response = await axios.get(new URL("/api/download", BACKEND_HOST).href, {
            params: params
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return [
            (response.data["data"] as Array<any>).map((download) => new DownloadResponse(download)),
            new PagerResponse(response.data),
        ];
    }

    async get(id: number): Promise<DownloadResponse> {
        const response = await axios.get(new URL(`/api/download/${id}/info`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new DownloadResponse(response.data["data"]);
    }

    async create(file: File, download: DownloadRequest): Promise<void> {
        const formData = new FormData();
        const requestJson = new DownloadRequest(download).toJson();
        for (var key in requestJson)
            formData.append(key, requestJson[key]);
        formData.append("file", file);

        const response = await axios.post(new URL("/api/download", BACKEND_HOST).href,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
"X-CSRF-Token": Cookies.get("csrf_access_token"),
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
"X-CSRF-Token": Cookies.get("csrf_access_token"),
                }
            }
        );

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }

    async delete(id: number): Promise<void> {
        const response = await axios.delete(new URL(`/api/download/${id}`, BACKEND_HOST).href, {
            headers: {
                "X-CSRF-Token": Cookies.get("csrf_access_token"),
            },
        });

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
