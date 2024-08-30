"use client";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ListTile from "./list-tile";

type Props = {
  className?: string;
  titleClassName?: string;
  children: React.ReactNode;
  title: string;
};

export default function ExpensionTile({ className, titleClassName, children, title }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleIsOpen = () => {
    setIsOpen((value) => (!value));
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-start h-fit w-full">
        <ListTile className={titleClassName} onClick={toggleIsOpen}>
          <div className="flex flex-row justify-between items-center w-full">
            <h4>{title}</h4>
            <div className="h-4 w-4 overflow-clip">
              <FontAwesomeIcon icon={faAngleDown} className={`transform ${isOpen ? "rotate-180" : "rotate-0"} transition-transform ease-in-out`} />
            </div>
          </div>
        </ListTile>
        <div className={`overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"} transition-all duration-300 ease-in-out w-full`}>
          <div className={`flex flex-col items-start transform ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 opacity-0 pointer-events-none"} transition-all duration-300 ease-in-out w-full`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}