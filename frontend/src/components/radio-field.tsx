"use client";

type Props = {
  hidden?: boolean;
  className?: string;
  label?: string;
  labelText?: string;
  options: string[];
  index?: number;
  onChange(index: number): void;
};

export default function RadioField({
  hidden,
  className,
  label,
  labelText,
  options,
  index = -1,
  onChange,

}: Props) {
  return (
    <div hidden={hidden} className={className}>
      {label && <label htmlFor={label} className="label">{labelText ?? label}</label>}
      <fieldset className="flex flex-row gap-3 items-center">
        {
          options.map((option, currentIndex) => (
            <div key={currentIndex}>
              <input
                type="radio"
                name={label}
                value={option}
                checked={currentIndex === index}
                onChange={() => onChange(currentIndex)}
              />
              <label htmlFor={option} className="ms-1">{option}</label>
            </div>
          ))
        }
      </fieldset>
    </div>
  );
}
