import { useTranslations } from "next-intl";
import DownloadPanel from "./download-panel";

type Props = {
  params: { locale: string };
};

export default function DownloadAreaPage({ params }: Props) {
  const trans = useTranslations("Download");

  return (
    <>
      <h1>{trans("title")}</h1>
      <DownloadPanel
        className="mt-6"
        locale={params.locale}
      />
    </>
  );
}
