import { useEffect } from "react";

type Props = {
    children: Readonly<React.ReactNode>;
    isOpen: boolean;
    onClose?: () => void;
  }

export default function Drawer({ children, isOpen, onClose: closeCallback }: Props) {
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!document.getElementById("drawer")?.contains(event.target as Node))
        closeCallback?.();
    };

    if (isOpen)
      document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  return (
    <>
      <div className={`fixed inset-0 bg-black ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-500 transition-opacity ease-in-out`}></div>
      <div id="drawer" className={`fixed top-0 left-0 h-full bg-white w-72 rounded-r-xl transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        {children}
      </div>
    </>
  )
}