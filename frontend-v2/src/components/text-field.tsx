"use client";

import ValidationInterface from "@/module/validation/domain/validationInterface";
import { useEffect, useState } from "react";

export type ValidateCallback = (text: string) => string;

type Props = {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?(text: string): void;
  onValidate?(result: boolean): void;
  toValidate?: boolean;
  validations?: ValidationInterface<string>[];
};

export default function TextField({
  className,
  label,
  placeholder,
  value = "",
  onChange,
  onValidate,
  toValidate = false,
  validations = [],
}: Props) {
  const [validationLock, setValidationLock] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<string>("");

  function shouldShowValidationError() {
    return validationLock && validationResult.length > 0;
  }

  useEffect(() => {
    if (!toValidate) return;
    for (var validation of validations) {
      if (validation.validate(value)) continue;

      setValidationLock(true);
      setValidationResult(validation.errorMessage);
      onValidate && onValidate(false);
      return;
    }
    setValidationResult("");
    onValidate && onValidate(true);
  }, [toValidate]);

  useEffect(() => {
    setValidationLock(false);
  }, [value]);

  useEffect(() => {
    if (toValidate) setValidationLock(toValidate);
  }, [toValidate]);

  return (
    <div className={`${className ?? ""} block w-full`}>
      {label && <label htmlFor={label} className="label">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full px-2 py-1.5 text-lg rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-yellow-900 transition-all duration-200
          ${shouldShowValidationError() ? "ring-2 ring-red-300" : "ring-1 ring-gray-200"}`}
        value={value}
        onChange={(event) => onChange && onChange(event.target.value)}
      />
      {shouldShowValidationError() && <p className="text-red-500 text-sm font-medium mt-1">{validationResult}</p>}
    </div>
  );
}
