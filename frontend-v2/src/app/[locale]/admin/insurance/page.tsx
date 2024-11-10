"use client";

import { useTranslations } from "next-intl";
import InsurancePanel from "./insurance-panel";
import Button from "@/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@/navigation";
import { faAdd, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_HOST } from "@/module/config/config";
import ReportField from "@/components/report-field";

type Props = {
  params: { locale: string };
};

export default function AdminInsurancePage({ params }: Props) {
  const trans = useTranslations("Insurance");

  const actions = (
    <div className="flex flex-row items-end gap-2">
      <Button className="border h-fit">
        <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
        <Link href="/admin/insurance/new" className="py-1">{trans("new")}</Link>
      </Button>
      <ReportField
        locale={params.locale}
        translationKey="Insurance"
        onReport={(beginDate, endDate) => {
          const url = new URL(`/api/insurance/report`, BACKEND_HOST);
          url.searchParams.append("from", beginDate.toISOString());
          url.searchParams.append("to", endDate.toISOString());
          return window.open(url, "_blank");
        }}
      />
    </div>
  );

  return (
    <>
      <h1>{trans("title")}</h1>
      <InsurancePanel className="mt-6" actions={actions} />
    </>
  );
}
