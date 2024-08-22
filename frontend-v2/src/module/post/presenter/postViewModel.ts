import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";
import PostEntity from "../domain/postEntity";
import ImportanceEnum from "@/module/status/doamin/importanceEnum";
import { formatDate } from "date-fns";

export default class PostViewModel extends PostEntity {
    constructor(post: PostEntity) {
        super(post);
    }

    get releasedDate(): string {
        return formatDate(this.createdTime, "yyyy-MM-dd");
    }

    get releaseStatus(): ReleaseStatusEnum {
        return this.visibility ? ReleaseStatusEnum.Released : ReleaseStatusEnum.Draft;
    }

    get importanceStatus(): ImportanceEnum {
        return this.importance ? ImportanceEnum.Important : ImportanceEnum.Normal;
    }
}
