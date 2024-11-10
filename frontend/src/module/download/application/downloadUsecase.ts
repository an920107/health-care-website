import PagerEntity from "@/module/pager/domain/pagerEntity";
import DownloadColumnEnum from "../domain/downloadColumnEnum";
import DownloadEntity from "../domain/downloadEntity";
import DownloadRepo from "../domain/downloadRepo";

export default class DownloadUsecase {
    private _repo: DownloadRepo;

    constructor(repo: DownloadRepo) {
        this._repo = repo;
    }

    async getAllDownload({
        page = 1,
        column = [
            DownloadColumnEnum.FreshmenCheckUp,
            DownloadColumnEnum.StudentGroupInsurance,
            DownloadColumnEnum.StaffCheckUp,
            DownloadColumnEnum.MedicalEquipmentLoan,
            DownloadColumnEnum.Others,
        ],
        visibility = false,
    }: {
        page?: number,
        column?: DownloadColumnEnum[],
        visibility?: boolean,
    }): Promise<[DownloadEntity[], PagerEntity]> {
        return this._repo.query({ page, column, visibility });
    }

    async getDownloadById(id: number): Promise<DownloadEntity> {
        return this._repo.get(id);
    }

    async createDownload(file: File, download: DownloadEntity): Promise<void> {
        return this._repo.create(file, download);
    }

    async updateDownload(id: number, download: DownloadEntity): Promise<void> {
        return this._repo.update(id, download);
    }

    async deleteDownload(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
