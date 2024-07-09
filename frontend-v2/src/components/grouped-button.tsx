"use client";

import { useState } from "react";

type Props = {
  className?: string
  options: string[],
  onChange?(index: number): void
};

export default function GroupedButton({
  className,
  options,
  onChange,
}: Props) {
  const [selected, setSelected] = useState<number>(0);

  const handleClick = (index: number) => {
    if (selected === index) return;
    setSelected(index);
    if (onChange === undefined) return;
    onChange(index);
  };

  return (
    <div className={className}>
      <div className="flex flex-row divide-x">
        {
          options.map((label, index) => (
            <div
              key={index}
              className={`flex-auto text-center cursor-pointer ${index === selected ? "bg-yellow-700 bg-opacity-5" : "bg-opacity-0"} transition-colors ease-in-out duration-200`}
              onClick={() => handleClick(index)}
            >
              <div className={`py-2 bg-black bg-opacity-0 hover:bg-opacity-5 transition-colors ease-in-out duration-200`}>
                <p>{label}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}