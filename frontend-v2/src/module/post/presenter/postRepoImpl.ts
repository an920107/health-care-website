import { BACKEND_HOST } from "@/module/config/config";
import PostColumnEnum from "../domain/postColumnEnum";
import PostEntity from "../domain/postEntity";
import PostRepo from "../domain/postRepo";
import axios from "axios";
import { PostRequest, PostResponse } from "../application/postDto";

export default class PostRepoImpl implements PostRepo {
    async query({
        page,
        limit,
        column,
        visibility,
        search,
    }: {
        page?: number,
        limit?: number,
        column?: PostColumnEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<PostEntity[]> {
        const params: any = {};

        if (page) params.page = page;
        if (limit) params.limit = limit;
        if (column) params.column = column;
        if (visibility !== undefined) params.visibility = visibility;
        if ((search ?? "").trim().length > 0) {
            params.search = search;
        }

        console.log(params);

        // const response = await axios.get(new URL("/api/post", BACKEND_HOST).href, {
        //     params: params
        // });

        // if (response.status !== 200)
        //     return Promise.reject(new Error(response.data));

        // return (JSON.parse(response.data) as Array<any>)
        //     .map((post) => new PostResponse(post));

        return [
            new PostEntity({
                id: 0,
                title: "Haha",
                content: "",
                column: PostColumnEnum.Latest,
                attachments: [],
                view: 300,
                importance: true,
                visibility: true,
                createdTime: new Date(Date.now()),
                updatedTime: new Date(Date.now()),
            }),
            new PostEntity({
                id: 1,
                title: "Haha222",
                content: "",
                column: PostColumnEnum.Latest,
                attachments: [],
                view: 300,
                importance: true,
                visibility: true,
                createdTime: new Date(Date.now()),
                updatedTime: new Date(Date.now()),
            })
        ]
    }

    async get(id: number): Promise<PostEntity> {
        const response = await axios.get(new URL(`/api/post/${id}`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new PostResponse(JSON.parse(response.data));
    }

    async create(post: PostEntity): Promise<void> {
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
