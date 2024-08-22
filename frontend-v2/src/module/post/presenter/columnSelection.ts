import PostColumnEnum from "../domain/postColumnEnum";

export type ColumnSelectionType = {
    label: string;
    value: PostColumnEnum[];
};

export const normalPostColumnSelections: ColumnSelectionType[] = [
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

export const diseasePostColumnSelections: ColumnSelectionType[] = [
    {
        label: "all",
        value: [
            PostColumnEnum.Influenza,
            PostColumnEnum.Dengue,
            PostColumnEnum.Tuberculosis,
            PostColumnEnum.Chickenpox,
        ],
    },
    {
        label: PostColumnEnum.Influenza,
        value: [PostColumnEnum.Influenza],
    },
    {
        label: PostColumnEnum.Dengue,
        value: [PostColumnEnum.Dengue],
    },
    {
        label: PostColumnEnum.Tuberculosis,
        value: [PostColumnEnum.Tuberculosis],
    },
    {
        label: PostColumnEnum.Chickenpox,
        value: [PostColumnEnum.Chickenpox],
    },
];
