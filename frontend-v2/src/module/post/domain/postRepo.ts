import PostEntity from "./postEntity";
import PostColumnEnum from "./postColumnEnum";

export default interface PostRepo {
    query({ }: {
        page?: number,
        limit?: number,
        column?: PostColumnEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<PostEntity[]>;

    get(id: number): Promise<PostEntity>;

    create(post: PostEntity): Promise<void>;

    update(post: PostEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
