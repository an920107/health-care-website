import { useTranslations } from "next-intl"
import Link from "next/link"

type Props = {}

export default function NotFoundPage({ }: Props) {
    const trans = useTranslations("NotFound");

    return (
        <div className="h-[80vh] flex flex-col justify-center items-center text-center gap-4">
            <h1>{trans("title")}</h1>
            <p>{trans("message")} <Link href="/" className="link">{trans("homepage")}</Link></p>
        </div>
    )
}