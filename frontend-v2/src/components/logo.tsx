import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {}

export default function Logo({ }: Props) {
  return (
    <Link href="/" className="flex items-center h-32">
      <Image alt="logo" src="/logo.png" height={128} width={181} priority={true} />
      <div className="flex flex-col items-center">
        <span className="text-2xl font-semibold">衛生保健組</span>
        <span className="text-xl font-semibold">Health Center</span>
      </div>
    </Link>
  )
}