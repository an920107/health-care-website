"use client";

import Button from "@/components/button";
import { Link } from "@/navigation";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import RestaurantPanel from "../../restaurant/restaurant-panel";
import ReportField from "@/components/report-field";
import { BACKEND_HOST } from "@/module/config/config";

type Props = {
  params: { locale: string };
}

export default function AdminRestaurantPage({ params }: Props) {
  const trans = useTranslations("Restaurant");

  const actions = (
    <div className="flex flex-row items-end gap-2">
      <Button className="border">
        <FontAwesomeIcon icon={faAdd} className="size-4 me-2" />
        <Link href={`/admin/restaurant/new`} className="py-1">{trans("new")}</Link>
      </Button>
      <ReportField
        locale={params.locale}
        translationKey="Restaurant"
        onReport={(beginDate, endDate) => {
          const url = new URL(`/api/restaurant/report`, BACKEND_HOST);
          url.searchParams.append("from", beginDate.toISOString());
          url.searchParams.append("to", endDate.toISOString());
          return window.open(url, "_blank");
        }}
      />
    </div>
  );

  return (
    <div>
      <h1>{trans("title")}</h1>
      <RestaurantPanel locale={params.locale} isAdmin={true} isEnableSearch={true} isEnablePager={true} actions={actions} />
    </div>
  );
}
