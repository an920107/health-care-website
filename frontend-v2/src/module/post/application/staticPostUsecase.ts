import PostColumnEnum from "../domain/postColumnEnum";
import PostRepo from "../domain/postRepo";
import { PostRequest, PostResponse } from "./postDto";

export default class StaticPostUsecase {
    private _repo: PostRepo;

    constructor(repo: PostRepo) {
        this._repo = repo;
    }

    async getStaticPost(label: string): Promise<PostResponse> {
        const posts = await this._repo.query({
            page: 1,
            limit: 1,
            column: [PostColumnEnum.Static],
            visibility: false,
            search: label,
        });
        if (posts.length !== 1)
            return Promise.reject(new Error(`No post found for ${label}`));
        return Promise.resolve(posts[0]);
    }

    async updateStaticPost(post: PostRequest): Promise<void> {
        try {
            await this.getStaticPost(post.title);
        } catch (err) {
            return this._repo.create(post);
        }
        return this._repo.update(post);
    }
}
