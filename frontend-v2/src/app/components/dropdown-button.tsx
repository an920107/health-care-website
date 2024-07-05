"use client";

import { useState } from "react";
import DropdownMenu from "./dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  className?: string;
  options: string[];
  onChange?(index: number): void;
};

export default function DropdownButton({
  className,
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
    <div className={className}>
      <div className="w-fit">
        <div className="rounded-lg border py-1 px-2" onClick={() => setIsDropdownOpen(true)}>
          <div className="flex flex-row items-center gap-1.5">
            {options[selectedOptionIndex]}
            <FontAwesomeIcon icon={faCaretDown} className="mt-[-0.2rem] size-4" />
          </div>
        </div>
        <DropdownMenu isOpen={isDropdownOpen} onCancel={() => setIsDropdownOpen(false)}>
          {
            options.map((option, index) => (
              <div key={index} className="px-2 py-1 rounded-md" onClick={() => handleOptionClick(index)}>
                {option}
              </div>
            ))
          }
        </DropdownMenu>
      </div>
    </div>
  )
}