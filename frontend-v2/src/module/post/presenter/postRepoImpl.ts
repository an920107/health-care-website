import { BACKEND_HOST } from "@/module/config/config";
import PostColumnEnum from "../domain/postColumnEnum";
import PostEntity from "../domain/postEntity";
import PostRepo from "../domain/postRepo";
import axios from "axios";
import { PostRequest, PostResponse } from "../application/postDto";
import PagerEntity from "@/module/pager/domain/pagerEntity";
import { PagerResponse } from "@/module/pager/application/pagerDto";

export default class PostRepoImpl implements PostRepo {
    async query({
        page,
        column,
        visibility,
        search,
    }: {
        page?: number,
        column?: PostColumnEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<[PostEntity[], PagerEntity]> {
        const params: any = {};

        if (page) params.page = page;
        if (column) params.column = column.join("+");
        if (visibility !== undefined) params.visibility = visibility;
        if ((search ?? "").trim().length > 0) {
            params.search = search;
        }

        console.debug("GET /api/post with params:", params);
        const response = await axios.get(new URL("/api/post", BACKEND_HOST).href, {
            params: params
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return [
            (response.data["data"] as Array<any>).map((post) => new PostResponse(post)),
            new PagerResponse(response.data),
        ];
    }

    async get(id: number): Promise<PostEntity> {
        const response = await axios.get(new URL(`/api/post/${id}`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new PostResponse(response.data["data"]);
    }

    async create(post: PostEntity): Promise<void> {
        console.debug("POST /api/post with body:", new PostRequest(post));
        const response = await axios.post(new URL("/api/post", BACKEND_HOST).href,
            new PostRequest(post).toJson(),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (response.status !== 201)
            return Promise.reject(new Error(response.data));
    }

    async update(post: PostEntity): Promise<void> {
        const response = await axios.patch(new URL("/api/post", BACKEND_HOST).href,
            new PostRequest(post).toJson(),
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
        const response = await axios.delete(new URL(`/api/post/${id}`, BACKEND_HOST).href);

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
