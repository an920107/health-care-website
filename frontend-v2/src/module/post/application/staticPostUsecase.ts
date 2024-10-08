import PostColumnEnum from "../domain/postColumnEnum";
import PostRepo from "../domain/postRepo";
import { PostResponse, StaticPostRequest } from "./postDto";

export default class StaticPostUsecase {
    private _repo: PostRepo;

    constructor(repo: PostRepo) {
        this._repo = repo;
    }

    async getStaticPost(label: string): Promise<PostResponse> {
        const [posts, _] = await this._repo.query({
            page: 1,
            column: [PostColumnEnum.Static],
            visibility: false,
            search: label,
        });
        if (posts.length !== 1)
            return Promise.reject(new Error(`No post found for ${label}`));

        return this._repo.get(posts[0].id);
    }

    async updateStaticPost(post: StaticPostRequest): Promise<void> {
        try {
            const postId = (await this.getStaticPost(post.title)).id;
            return this._repo.update(postId, post);
        } catch {
            return this._repo.create(post);
        }
    }
}
