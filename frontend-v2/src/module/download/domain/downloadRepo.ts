import DownloadEntity from "./downloadEntity";

export default interface DownloadRepo {
    query({ }: {
        column?: string[],
        visibility?: boolean,
    }): Promise<DownloadEntity[]>;

    get(id: number): Promise<DownloadEntity>;

    create(download: DownloadEntity): Promise<void>;

    update(id: number, download: DownloadEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
