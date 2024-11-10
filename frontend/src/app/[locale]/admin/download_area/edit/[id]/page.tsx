// TODO: make lables and messages translatable

"use client";

import DownloadUsecase from "@/module/download/application/downloadUsecase";
import DownloadRepoImpl from "@/module/download/presenter/downloadRepoImpl";
import DownloadViewModel from "@/module/download/presenter/downloadViewModel";
import { useEffect, useState } from "react";
import DownloadEditor from "../../download-editor";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  params: { locale: string; id: string };
};

const usecase = new DownloadUsecase(new DownloadRepoImpl());

export default function DownloadEditPage({ params }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [download, setDownload] = useState<DownloadViewModel | undefined>(undefined);

  async function fetchAll() {
    const idNum = parseInt(params.id);
    const entity = await usecase.getDownloadById(idNum);
    setDownload(new DownloadViewModel(entity));
  }

  useEffect(() => {
    fetchAll().catch((err) => {
      console.error(err);
      router.replace(`/${params.locale}/404?notfound=${pathname}`);
    });
  }, []);

  return (
    <>
      <h1>編輯下載</h1>
      {
        download === undefined
          ? <></>
          : <DownloadEditor className="mt-6" download={download} />
      }
    </>
  );
}
