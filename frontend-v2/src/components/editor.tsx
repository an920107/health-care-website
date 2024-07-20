"use client";

import ReactQuill from "react-quill";
import "./editor.css";

type Props = {
  className?: string;
  label?: string;
};

export default function Editor({
  className,
  label,
}: Props) {
  return (
    <div className={`${className} w-full`}>
      {label && (
        <label htmlFor={label} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <ReactQuill
        theme="snow"
        className="w-full text-lg rounded-lg ring-1 ring-gray-200 outline-none focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-yellow-900 transition-all duration-200"
      />
    </div>
  );
}