import DownloadColumnEnum from "../domain/downloadColumnEnum";

export type ColumnSelectionType = {
    label: string;
    value: DownloadColumnEnum[];
};

export const downloadColumnSelections: ColumnSelectionType[] = [
    {
        label: "all",
        value: [
            DownloadColumnEnum.FreshmenCheckUp,
            DownloadColumnEnum.StudentGroupInsurance,
            DownloadColumnEnum.StaffCheckUp,
            DownloadColumnEnum.MedicalEquipmentLoan,
            DownloadColumnEnum.Others,
        ],
    },
    {
        label: DownloadColumnEnum.FreshmenCheckUp,
        value: [DownloadColumnEnum.FreshmenCheckUp],
    },
    {
        label: DownloadColumnEnum.StudentGroupInsurance,
        value: [DownloadColumnEnum.StudentGroupInsurance],
    },
    {
        label: DownloadColumnEnum.StaffCheckUp,
        value: [DownloadColumnEnum.StaffCheckUp],
    },
    {
        label: DownloadColumnEnum.MedicalEquipmentLoan,
        value: [DownloadColumnEnum.MedicalEquipmentLoan],
    },
    {
        label: DownloadColumnEnum.Others,
        value: [DownloadColumnEnum.Others],
    }
];
