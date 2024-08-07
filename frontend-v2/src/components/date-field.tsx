"use client";

import "react-calendar/dist/Calendar.css";
import TextField from "./text-field";
import { useState } from "react";
import DropdownMenu from "./dropdown-menu";
import Calendar from "react-calendar";
import ValidationInterface from "@/module/validation/domain/validationInterface";
import { formatDate } from "date-fns";

type Props = {
  className?: string;
  locale?: string;
  label?: string;
  value?: Date;
  onChange?(date?: Date): void;
  onValidate?(result: boolean): void;
  toValidate?: boolean;
  validations?: ValidationInterface<string>[];
}

export default function DateField({
  className,
  locale,
  label,
  value,
  onChange,
  onValidate,
  toValidate,
  validations,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  function handleOnChange(date: Date) {
    console.log();
    setIsDropdownOpen(false);
    onChange?.(date);
  }

  return (
    <div className={`${className ?? ""} w-36 text-nowrap`}>
      <TextField
        label={label}
        value={value !== undefined ? formatDate(value, "yyyy-MM-dd") : ""}
        onClick={() => setIsDropdownOpen(true)}
        onValidate={onValidate}
        toValidate={toValidate}
        validations={validations}
      />
      <DropdownMenu isOpen={isDropdownOpen} onCancel={() => setIsDropdownOpen(false)}>
        <Calendar
          locale={locale}
          onChange={(date) => handleOnChange(date as Date)}
        />
      </DropdownMenu>
    </div>
  );
}
