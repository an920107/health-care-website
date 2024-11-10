import { useTranslations } from "next-intl";
import DownloadEditor from "../download-editor";

export default function CreateDownloadPage() {
  const trans = useTranslations("Download");
  return (
    <>
      <h1>{trans("new")}</h1>
      <DownloadEditor className="mt-6"/>
    </>
  );
}
