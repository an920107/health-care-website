import { MouseEventHandler } from "react";

type Props = {
  className?: string;
  children: Readonly<React.ReactNode>;
  title?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  className,
  children,
  title,
  disabled = false,
  onClick
}: Props) {
  return (
    <div className={className}>
      <button
        title={title}
        className={`flex flex-row items-center px-3 py-1 rounded-full
          ${disabled ? "text-gray-300" : "hover:bg-opacity-5 hover:bg-black transition-colors"}`}
        disabled={disabled}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}