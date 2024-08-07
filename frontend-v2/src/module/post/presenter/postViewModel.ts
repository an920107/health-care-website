import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";
import PostColumnEnum from "../domain/postColumnEnum";
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

    static get columnSelections(): ColumnSelectionType[] {
        return [
            {
                label: "all",
                value: [
                    PostColumnEnum.Latest,
                    PostColumnEnum.Activity,
                    PostColumnEnum.Health,
                    PostColumnEnum.Nutrition,
                ],
            },
            {
                label: PostColumnEnum.Latest,
                value: [PostColumnEnum.Latest],
            },
            {
                label: PostColumnEnum.Activity,
                value: [PostColumnEnum.Activity],
            },
            {
                label: PostColumnEnum.Health,
                value: [PostColumnEnum.Health],
            },
            {
                label: PostColumnEnum.Nutrition,
                value: [PostColumnEnum.Nutrition],
            }
        ];
    }
}

export type ColumnSelectionType = {
    label: string;
    value: PostColumnEnum[];
};
