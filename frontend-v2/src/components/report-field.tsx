"use client";

import { useTranslations } from "next-intl";
import DateField from "./date-field";
import { useState } from "react";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

type Props = {
  locale: string;
  translationKey: string;
  onReport?: (beginDate: Date, endDate: Date) => void;
};

export default function ReportField({
  locale,
  translationKey,
  onReport,
}: Props) {
  const trans = useTranslations(translationKey);

  const [beginDate, setBeginDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  function handleReport() {
    if (beginDate === undefined || endDate === undefined) {
      alert(trans("alert_empty"));
      return;
    }

    if (beginDate > endDate) {
      alert(trans("alert_invalid"));
      return;
    }

    onReport?.(beginDate, endDate);
  }

  return (
    <div className="flex flex-row gap-2 items-end">
      <DateField
        locale={locale}
        label="begin_date"
        labelText={trans("begin_date")}
        value={beginDate}
        onChange={setBeginDate}
      />
      <DateField
        locale={locale}
        label="end_date"
        labelText={trans("end_date")}
        value={endDate}
        onChange={setEndDate}
      />
      <Button className="border h-fit" onClick={handleReport}>
        <FontAwesomeIcon icon={faFileLines} className="size-4 me-2" />
        <span className="py-1">{trans("report")}</span>
      </Button>
    </div>
  );
}
