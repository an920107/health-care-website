import { MouseEventHandler } from "react";

type Props = {
  className?: string;
  children: Readonly<React.ReactNode>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ className, children, onClick }: Props) {
  return (
    <div className={className}>
      <button
        className="flex flex-row items-center px-3 py-1 rounded-full hover:bg-opacity-5 hover:bg-black transition-colors"
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}