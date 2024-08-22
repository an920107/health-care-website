import { useTranslations } from "next-intl";
import BuildingPanel from "./building-panel";

export default function AdminDanguePage() {
  const trans = useTranslations("AdminDangue");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <BuildingPanel className="mt-6"/>
    </div>
  );
}
