import { useTranslations } from "next-intl";
import BuildingPanel from "./building-panel";

export default function AdminDanguePage() {
  const trans = useTranslations("Dangue");

  return (
    <div>
      <h1>{trans("title")}</h1>
      <BuildingPanel className="mt-6"/>
    </div>
  );
}
