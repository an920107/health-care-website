import PostColumnEnum from "../domain/postColumnEnum";
import PostRepo from "../domain/postRepo";
import { PostRequest, PostResponse } from "./postDto";

export default class NormalPostUsecase {
    private _repo: PostRepo;

    constructor(repo: PostRepo) {
        this._repo = repo;
    }

    async getAllPosts({
        page = 1,
        limit = 10,
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
        limit?: number,
        column?: PostColumnEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<PostResponse[]> {
        return this._repo.query({
            page: page,
            limit: limit,
            column: column,
            visibility: visibility,
            search: search,
        })
    }

    async getPostById(id: number): Promise<PostResponse> {
        return this._repo.get(id);
    }

    async createPost(post: PostRequest): Promise<void> {
        return this._repo.create(post);
    }

    async updatePost(post: PostRequest): Promise<void> {
        return this._repo.update(post);
    }

    async deletePost(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
