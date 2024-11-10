"use client";

import { useTranslations } from "next-intl"
import Link from "next/link"
import { useSearchParams } from "next/navigation";

export default function NotFoundPage() {
    const trans = useTranslations("NotFound");

    const query = useSearchParams();
    const notfoundPath = query.get("notfound")

    return (
        <div className="h-[80vh] flex flex-col justify-center items-center text-center gap-4">
            <h1>{trans("title")}</h1>
            {notfoundPath !== null && <p>{notfoundPath}</p>}
            <h3>{trans("message")} <Link href="/" className="link">{trans("homepage")}</Link></h3>
        </div>
    )
}