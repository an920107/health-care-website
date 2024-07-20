import PostEntity from "./postEntity";
import PostColumnEnum from "./postColumnEnum";
import PagerEntity from "@/module/pager/domain/pagerEntity";

export default interface PostRepo {
    query({ }: {
        page?: number,
        column?: PostColumnEnum[],
        visibility?: boolean,
        search?: string,
    }): Promise<[PostEntity[], PagerEntity]>;

    get(id: number): Promise<PostEntity>;

    create(post: PostEntity): Promise<void>;

    update(post: PostEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
