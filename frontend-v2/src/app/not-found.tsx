"use client";

import { redirect, usePathname } from "next/navigation"

type Props = {}

export default function RootNotFound({ }: Props) {
  const pathname = usePathname();
  redirect(`/?notfound=${pathname}`);

  return (
      <></>
  )
}
