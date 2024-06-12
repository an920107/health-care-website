"use client";

import { redirect } from "@/navigation";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const query = useSearchParams();
  const notfoundPath = query.get("notfound");
  if (notfoundPath !== null) redirect(`/404?notfound=${notfoundPath}`);

  return (
    <div className="container">HomePage</div>
  )
}