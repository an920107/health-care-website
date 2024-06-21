"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    const dropdownMenuElement = document.getElementById("dropdown-menu");

    // Set width for fixed element: `dropdown-menu-inner`
    const width = dropdownMenuElement?.offsetWidth ?? 0;
    const dropdownMenuInnerElement = document.getElementById("dropdown-menu-inner");
    if (dropdownMenuInnerElement !== null)
      dropdownMenuInnerElement!.style.width = `${width}px`;

    // Close dropdown menu when click outside
    const clickHandler = (event: MouseEvent) => {
      if (!dropdownMenuElement?.contains(event.target as Node))
        onCancel?.();
    };

    if (isOpen)
      document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [isOpen]);

  return (
    <div id="dropdown-menu" className={className}>
      <div id="dropdown-menu-inner" className={`fixed transform ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 opacity-0 pointer-events-none"} transition-all duration-200 ease-in-out`}>
        <div className="flex flex-col my-2 p-1 rounded-lg bg-gray-50 border border-gray-300 backdrop-blur-md shadow-lg">
          {children}
        </div>
      </div>
    </div>
  )
}