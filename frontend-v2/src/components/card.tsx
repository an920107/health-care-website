type Props = {
  className?: string;
  children: Readonly<React.ReactNode>;
  isRounded?: boolean;
  isBorder?: boolean;
};

export default function Card({
  className,
  children,
  isRounded = true,
  isBorder = true,
}: Props) {
  return (
    <div className={className}>
      <div className={`bg-yellow-700 bg-opacity-5 ${isRounded ? "rounded-xl" : ""} ${isBorder ? "border" : ""} shadow-md`}>
        {children}
      </div>
    </div>
  )
}