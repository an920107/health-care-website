import PagerEntity from "@/module/pager/domain/pagerEntity";
import DownloadColumnEnum from "./downloadColumnEnum";
import DownloadEntity from "./downloadEntity";

export default interface DownloadRepo {
    query({ }: {
        page?: number,
        column?: DownloadColumnEnum[],
        visibility?: boolean,
    }): Promise<[DownloadEntity[], PagerEntity]>;

    get(id: number): Promise<DownloadEntity>;

    create(file: File, download: DownloadEntity): Promise<void>;

    update(id: number, download: DownloadEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
