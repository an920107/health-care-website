"use client";

import { locales } from '@/i18n';
import { redirect } from '@/navigation';
import { useSearchParams } from 'next/navigation';

export default function HomeRedirect() {
    const query = useSearchParams();
    const notfoundPath = query.get("notfound");
    if (notfoundPath !== null) {
        for (var locale of locales)
            if (notfoundPath.startsWith(`/${locale}`))
                redirect(`/404?notfound=${notfoundPath}`);
        redirect(notfoundPath);
    };

    return (
        <></>
    )
}
