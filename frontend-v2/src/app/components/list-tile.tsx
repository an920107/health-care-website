"use client";

import { MouseEventHandler, useEffect, useState } from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function ListTile({ className, children, onClick }: Props) {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    }
  });

  return (
    <div className={`${className} w-full cursor-pointer ${isMouseDown ? "bg-opacity-10 bg-black" : "bg-opacity-0 bg-transparent"} transition-all duration-150`} onClick={onClick} onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)}>
      {children}
    </div>
  )
}