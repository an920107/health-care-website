type Props = {
  children: Readonly<React.ReactNode>;
};

export default function Card({ children }: Props) {
  return (
    <div className="bg-yellow-700 bg-opacity-5 rounded-xl shadow-md">
      {children}
    </div>
  )
}