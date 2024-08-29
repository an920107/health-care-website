"use client";

import Card from "@/components/card";
import DropdownButton from "@/components/dropdown-button";
import GroupedButton from "@/components/grouped-button";
import DownloadUsecase from "@/module/download/application/downloadUsecase";
import { ColumnSelectionType, downloadColumnSelections } from "@/module/download/presenter/columnSelection";
import DownloadRepoImpl from "@/module/download/presenter/downloadRepoImpl";
import DownloadViewModel from "@/module/download/presenter/downloadViewModel";
import { Link } from "@/navigation";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  locale: string;
  isAdmin?: boolean;
};

export default function DownloadPanel({
  className,
  locale,
  isAdmin = false,
}: Props) {
  const trans = useTranslations("Download");
  const statusTrans = useTranslations("Status");
  const isEn = locale === "en";

  const [downloads, setDownloads] = useState<DownloadViewModel[]>([]);
  const [columnSelected, setColumnSelected] = useState<ColumnSelectionType>(downloadColumnSelections[0]);

  async function fetchAll() {
    const usecase = new DownloadUsecase(new DownloadRepoImpl());
    try {
      const entities = await usecase.getAllDownload({
        column: columnSelected.value,
        visibility: !isAdmin,
      });
      setDownloads(entities.map((entity) => new DownloadViewModel(entity)));
    } catch (err) {
      console.error(err);
    }
  }

  function handleColumnSelectionChange(index: number) {
    setColumnSelected(downloadColumnSelections[index]);
  }

  useEffect(() => {
    fetchAll();
  }, [columnSelected]);

  return (
    <div className={className}>
      <DropdownButton
        className={"md:hidden mt-3 h-[2.625rem]"}
        options={downloadColumnSelections.map((e) => (trans(e.label)))}
        onChange={handleColumnSelectionChange}
      />
      <div className="mt-4 border shadow-md rounded-xl overflow-hidden">
        <GroupedButton
          className="w-full rounded-t-md overflow-hidden max-md:hidden border-b-2"
          textClassName="font-bold"
          options={downloadColumnSelections.map((e) => (trans(e.label)))}
          onChange={handleColumnSelectionChange}
        />
        <Card className="w-full rounded-b-xl overflow-hidden" isRounded={false} isBorder={false}>
          <DownloadTable />
        </Card>
      </div>
    </div>
  );

  function DownloadTable() {
    return downloads.length === 0
      ? (
        <p className="py-12 text-center">{trans("not_found")}</p>
      )
      : (
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2">
              <th className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap">{trans("table_column")}</th>
              <th className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap w-full">{trans("table_title")}</th>
              <th className={`px-3 md:px-6 py-3 ${isAdmin ? "max-md:pe-5" : "md:pe-10"} max-md:hidden text-nowrap`}>{trans("table_date")}</th>
              {
                isAdmin &&
                <>
                  <th className={`px-3 md:px-6 py-3 max-md:pe-5 text-nowrap`}>{statusTrans("status")}</th>
                  <th className="px-3 md:px-6 py-3 md:pe-10 text-nowrap">{trans("table_edit")}</th>
                </>
              }
            </tr>
          </thead>
          <tbody>
            {
              downloads.map((download) => (
                <tr key={download.id} className="border-t">
                  <td className="px-3 md:px-6 py-3 md:ps-10 ps-5 text-nowrap">{trans(download.column)}</td>
                  <td className="px-3 md:px-6 py-3 max-md:pe-5 text-nowrap">
                    <Link href={download.downloadUrl} className="link" target="_blank">
                      {isEn ? download.titleEn : download.title}
                    </Link>
                  </td>
                  <td className={`px-3 md:px-6 py-3 ${isAdmin ? "max-md:pe-5" : "md:pe-10"} max-md:hidden text-nowrap`}>
                    {download.releasedDateString}
                  </td>
                  {
                    isAdmin &&
                    <>
                      <td className={`px-3 md:px-6 py-3 max-md:pe-5 text-nowrap`}>{statusTrans(download.releaseStatus)}</td>
                      <td className="px-3 md:px-6 py-3 md:pe-10 text-nowrap">
                        <Link href={`/admin/download_area/edit/${download.id}`}>
                          <FontAwesomeIcon icon={faPen} className="size-4" />
                        </Link>
                      </td>
                    </>
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      );
  }
}
