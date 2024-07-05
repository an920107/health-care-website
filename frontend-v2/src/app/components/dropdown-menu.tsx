"use client";

import { useEffect, useState } from "react";

type Props = {
  className?: string;
  children: Readonly<React.ReactNode>;
  isOpen?: boolean;
  onCancel?: () => void;
}

export default function DropdownMenu({
  className,
  children,
  isOpen = true,
  onCancel,
}: Props) {
  const [rnd, setRnd] = useState<number>(0);

  useEffect(() => {
    setRnd(Math.random());

    const dropdownMenuElement = document.getElementById(`dropdown-menu-${rnd}`);

    // Set width for fixed element: `dropdown-menu-inner`
    const dropdownWidth = dropdownMenuElement?.offsetWidth ?? 0;
    const dropdownMenuInnerElement = document.getElementById(`dropdown-menu-inner-${rnd}`);
    if (dropdownMenuInnerElement !== null)
      dropdownMenuInnerElement!.style.minWidth = `${dropdownWidth}px`;

    // Check if the dropdown menu is too close to bottom
    const adjustDropdownDirection = () => {
      const dropdownMenuBottom = dropdownMenuElement?.getBoundingClientRect()?.bottom ?? 0;
      const dropdownInnerHight = dropdownMenuInnerElement?.offsetHeight ?? 0;
      const buttomSpace = dropdownMenuBottom + dropdownInnerHight - window.innerHeight + 10;
      if (buttomSpace > 0 && dropdownMenuInnerElement !== null) {
        dropdownMenuInnerElement.style.marginTop = `-${buttomSpace}px`;
      }
    };
    adjustDropdownDirection();

    // Close dropdown menu when click outside
    const clickHandler = (event: MouseEvent) => {
      if (!dropdownMenuElement?.contains(event.target as Node))
        onCancel?.();
    };

    if (isOpen) {
      document.addEventListener("click", clickHandler);
      document.addEventListener("resize", adjustDropdownDirection);
      document.addEventListener("scroll", adjustDropdownDirection);
    }

    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("resize", adjustDropdownDirection);
      document.removeEventListener("scroll", adjustDropdownDirection);
    };
  }, [isOpen]);

  return (
    <div id={`dropdown-menu-${rnd}`} className={className}>
      <div id={`dropdown-menu-inner-${rnd}`}
        className={`absolute transform transition-all duration-200 ease-in-out
        ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col my-2 p-1 rounded-lg bg-yellow-700 bg-opacity-5 border border-gray-200 backdrop-blur-md shadow-lg">
          {children}
        </div>
      </div>
    </div>
  )
}