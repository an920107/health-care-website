import DownloadEntity from "./downloadEntity";

export default interface DownloadRepo {
    query({ }: {
        columns?: string[],
        visibility?: boolean,
        search?: string,
    }): Promise<DownloadEntity[]>;

    get(id: number): Promise<DownloadEntity>;

    create(download: DownloadEntity): Promise<void>;

    update(download: DownloadEntity): Promise<void>;
}
