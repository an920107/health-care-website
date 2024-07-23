import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";
import PostColumnEnum from "../domain/postColumnEnum";
import PostEntity from "../domain/postEntity";

export default class PostViewModel extends PostEntity {
    constructor(post: PostEntity) {
        super(post);
    }

    get releasedDate(): string {
        return this.createdTime.toISOString().substring(0, 10);
    }

    get releaseStatus(): ReleaseStatusEnum {
        return this.visibility ? ReleaseStatusEnum.Released : ReleaseStatusEnum.Draft;
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
