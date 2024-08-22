import { useTranslations } from "next-intl";
import InsurancePanel from "./insurance-panel";
import Button from "@/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@/navigation";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function AdminInsurancePage() {
  const trans = useTranslations("Insurance");

  const actions = (
    <Button className="border">
      <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
      <Link href="/admin/insurance/new" className="py-1">{trans("new")}</Link>
    </Button>
  );

  return (
    <>
      <h1>{trans("title")}</h1>
      <InsurancePanel className="mt-6" actions={actions} />
    </>
  );
}
