"use client";

import { useState } from "react";
import DropdownMenu from "./dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  className?: string;
  label?: string;
  options: string[];
  onChange?(index: number): void;
};

export default function DropdownButton({
  className,
  label,
  options,
  onChange,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  const handleOptionClick = (index: number) => {
    setSelectedOptionIndex(index);
    setIsDropdownOpen(false);
    if (onChange === undefined) return;
    onChange(index);
  };

  return (
    <div className="w-fit text-nowrap">
      {label && (
        <label htmlFor={label} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={`rounded-lg border py-1 px-2 flex flex-row items-center gap-1.5 cursor-pointer ${className ?? ""}`} onClick={() => setIsDropdownOpen(true)}>
        {options[selectedOptionIndex]}
        <FontAwesomeIcon icon={faCaretDown} className="mt-[-0.2rem] size-4" />
      </div>
      <DropdownMenu isOpen={isDropdownOpen} onCancel={() => setIsDropdownOpen(false)}>
        {
          options.map((option, index) => (
            <div
              key={index}
              className="px-2 py-1 rounded-md cursor-pointer hover:bg-black hover:bg-opacity-5"
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </div>
          ))
        }
      </DropdownMenu>
    </div>
  )
}