// TODO: make lables and messages translatable

"use client";

import DownloadUsecase from "@/module/download/application/downloadUsecase";
import DownloadRepoImpl from "@/module/download/presenter/downloadRepoImpl";
import DownloadViewModel from "@/module/download/presenter/downloadViewModel";
import { useEffect, useState } from "react";
import DownloadEditor from "../../download-editor";
import { notFound } from "next/navigation";

type Props = {
  params: { locale: string; id: string };
};

const usecase = new DownloadUsecase(new DownloadRepoImpl());

export default function DownloadEditPage({ params }: Props) {
  const [download, setDownload] = useState<DownloadViewModel | undefined>(undefined);

  async function fetchAll() {
    const idNum = parseInt(params.id);
    const entity = await usecase.getDownloadById(idNum);
    setDownload(new DownloadViewModel(entity));
  }

  useEffect(() => {
    fetchAll().catch((err) => {
      console.error(err);
      notFound();
    });
  }, []);

  return (
    <>
      <h1>編輯下載</h1>
      <DownloadEditor className="mt-6" download={download} />
    </>
  );
}
