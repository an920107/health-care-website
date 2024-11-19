import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";
import { NextRequest, NextResponse } from "next/server";
import UserUsecase from "./module/user/application/userUsecase";
import UserRepoImpl from "./module/user/presenter/userRepoImpl";

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(zh|en)/:path*"]
};

const userUsecase = new UserUsecase(new UserRepoImpl());

export default function middleware(request: NextRequest) {
    // var userRole: UserRoleEnum
    // try {
    //     const user = await userUsecase.getCurrentUser();
    //     userRole = user.role;
    // } catch (err) {
    //     userRole = UserRoleEnum.None;
    //     console.error(err);
    // }

    // const pathname = request.nextUrl.pathname;
    // if (pathname.match(/\/[^\/]+\/admin/) && userRole > UserRoleEnum.StudentB) {
    //     return NextResponse.redirect(request.url.replace(/\/admin.*/, ""));
    // } else if (pathname.match(/\/[^\/]+\/dengue/) && userRole > UserRoleEnum.Normal) {
    //     return NextResponse.redirect(request.url.replace(/\/dengue.*/, ""));
    // }

    const handleI18nRouting = createMiddleware({
        locales: locales,
        defaultLocale: "zh",
    })
    const response = handleI18nRouting(request);

    if (response.headers.getSetCookie().length > 0) {
        var setCookieHeader = response.headers.getSetCookie()[0].split(";");
        setCookieHeader = setCookieHeader.map((cookie) => {
            const [key, val] = cookie.trim().split("=");
            if (key === "SameSite") {
                return ` ${key}=strict; Secure; HttpOnly`;
            }
            return cookie;
        });
        response.headers.set("Set-Cookie", setCookieHeader.join(";"));
    }

    return response;
}
