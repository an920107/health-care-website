type Props = {
    children: Readonly<React.ReactNode>;
}

export default function Button({children}: Props) {
  return (
    <div className="flex flex-row items-center px-3 py-1 rounded-full hover:bg-opacity-5 hover:bg-black transition-all">
        {children}
    </div>
  )
}