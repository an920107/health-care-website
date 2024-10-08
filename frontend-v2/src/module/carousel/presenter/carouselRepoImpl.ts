import { BACKEND_HOST } from "@/module/config/config";
import CarouselEntity from "../domain/carouselEntity";
import CarouselRepo from "../domain/carouselRepo";
import axios from "axios";
import { CarouselRequest, CarouselResponse } from "../application/carouselDto";
import Cookies from "js-cookie";

export default class CarouselRepoImpl implements CarouselRepo {
    async query({
        visibility,
    }: {
        visibility?: boolean;
    }): Promise<CarouselEntity[]> {
        const params: any = {};

        if (visibility === true) params.visibility = visibility;

        const response = await axios.get(new URL("/api/carousel", BACKEND_HOST).href, {
            params: params
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return (response.data["data"] as Array<any>).map((carousel) => new CarouselEntity(carousel));
    }

    async get(id: number): Promise<CarouselEntity> {
        const response = await axios.get(new URL(`/api/carousel/${id}/info`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new CarouselResponse(response.data["data"]);
    }

    async create(
        file: File,
        carousel: CarouselEntity,
        onProgress?: (progress: number) => void,
    ): Promise<void> {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", carousel.title);
        formData.append("title_en", carousel.titleEn);
        formData.append("content", carousel.content);
        formData.append("content_en", carousel.contentEn);
        formData.append("visibility", carousel.visibility ? "true" : "false");

        const response = await axios.post(new URL("/api/carousel", BACKEND_HOST).href,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-Token": Cookies.get("csrf_access_token"),
                },
                onUploadProgress: (event) => onProgress && onProgress(
                    event.total === undefined ? Number.NaN : event.loaded / event.total!),
            }
        );

        if (response.status !== 201)
            return Promise.reject(new Error(response.data));
    }

    async update(id: number, carousel: CarouselEntity): Promise<void> {
        const response = await axios.patch(new URL(`/api/carousel/${id}`, BACKEND_HOST).href,
            new CarouselRequest(carousel).toJson(),
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
        const response = await axios.delete(new URL(`/api/carousel/${id}`, BACKEND_HOST).href, {
            headers: {
                "X-CSRF-Token": Cookies.get("csrf_access_token"),
            },
        });

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
