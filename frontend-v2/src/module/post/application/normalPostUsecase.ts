import PostColumnEnum from "../domain/postColumnEnum";
import PostRepo from "../domain/postRepo";
import { NormalPostRequest, PostResponse } from "./postDto";
import { PagerResponse } from "@/module/pager/application/pagerDto";

export default class NormalPostUsecase {
    private _repo: PostRepo;

    constructor(repo: PostRepo) {
        this._repo = repo;
    }

    async getAllPosts({
        page = 1,
        column = [
            PostColumnEnum.Latest,
            PostColumnEnum.Activity,
            PostColumnEnum.Health,
            PostColumnEnum.Nutrition,
        ],
        visibility = false,
        search,
    }: {
        page?: number,
        column?: PostColumnEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<[PostResponse[], PagerResponse]> {
        return this._repo.query({
            page: page,
            column: column,
            visibility: visibility,
            search: search,
        })
    }

    async getPostById(id: number): Promise<PostResponse> {
        return this._repo.get(id);
    }

    async createPost(post: NormalPostRequest): Promise<void> {
        return this._repo.create(post);
    }

    async updatePost(id: number, post: NormalPostRequest): Promise<void> {
        return this._repo.update(id, post);
    }

    async deletePost(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
