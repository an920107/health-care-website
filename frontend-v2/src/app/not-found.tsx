import { redirect } from "next/navigation"

type Props = {}

export default function RootNotFound({ }: Props) {
  redirect("/?notfound=true")

  return (
      <></>
  )
}