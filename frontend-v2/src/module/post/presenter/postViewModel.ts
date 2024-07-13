import PostEntity from "../domain/postEntity";

export default class PostViewModel extends PostEntity {
    constructor(post: PostEntity) {
        super(post);
    }

    get releasedDate(): string {
        return this.createdTime.toISOString().substring(0, 10);
    }
}