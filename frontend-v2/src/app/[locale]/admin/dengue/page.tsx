import { useTranslations } from "next-intl";
import BuildingPanel from "./building-panel";

type Props = {
  params: { locale: string };
};

export default function AdminDenguePage({ params }: Props) {
  const trans = useTranslations("AdminDengue");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <BuildingPanel locale={params.locale} className="mt-6"/>
    </div>
  );
}
