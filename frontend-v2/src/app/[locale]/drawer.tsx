type Props = {
    children: Readonly<React.ReactNode>;
    isOpen: boolean;
    closeCallback?: () => void;
  }

export default function Drawer({ children, isOpen, closeCallback }: Props) {
  return (
    <>
      <button
        className={`fixed inset-0 bg-black transform ${isOpen ? "translate-x-0" : "-translate-x-full"} ${isOpen ? "opacity-50" : "opacity-0"} duration-500 transition-opacity ease-in-out`}
        onClick={closeCallback}
      ></button>
      <div className={`fixed top-0 left-0 h-full bg-white w-72 rounded-r-xl transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        {children}
      </div>
    </>
  )
}