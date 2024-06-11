"use client";

import { useSearchParams } from "next/navigation";
import { redirect } from "../../navigation";

export default function HomePage() {
  const query = useSearchParams();
  if (query.get("notfound") ?? false) redirect("/404");

  return (
    <div className="container">HomePage</div>
  )
}