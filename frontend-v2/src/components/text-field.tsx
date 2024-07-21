"use client";

type Props = {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?(text: string): void;
};

export default function TextField({
  className,
  label,
  placeholder,
  value = "",
  onChange,
}: Props) {
  return (
    <div className={`${className ?? ""} block w-full`}>
      {label && <label htmlFor={label} className="label">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-2 py-1.5 text-lg rounded-lg ring-1 ring-gray-200 outline-none focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-yellow-900 transition-all duration-200"
        value={value}
        onChange={(event) => onChange && onChange(event.target.value)}
      />
    </div>
  );
}
