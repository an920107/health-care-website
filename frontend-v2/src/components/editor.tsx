"use client";

import ReactQuill from "react-quill";
import { DeltaStatic, Sources } from "quill";
import "./editor.css";
import { useState } from "react";

type Props = {
  className?: string;
  label?: string;
  value?: ReactQuill.Value;
  onChange?(value: string, delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor): void;
};

export default function Editor({
  className,
  label,
  value,
  onChange,
}: Props) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div className={`${className} w-full`}>
      {label && <label htmlFor={label} className="label">{label}</label>}
      <ReactQuill
        theme="snow"
        className={`w-full text-lg rounded-lg outline-none transition-all duration-200
          ${isFocus ? "ring-opacity-30 ring-yellow-900 ring-2" : "ring-gray-200 ring-1"}`}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
}
