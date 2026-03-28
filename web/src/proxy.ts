import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/auth/signin", "/auth/register", "/auth/error"];
const AUTH_API_PREFIX = "/api/auth";

export default async function proxy(request: NextRequest) {
    const { nextUrl } = request;

    const isAuthApi = nextUrl.pathname.startsWith(AUTH_API_PREFIX);
    if (isAuthApi) return NextResponse.next();

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isLoggedIn = !!token;

    const isPublicPath = PUBLIC_PATHS.some((path) =>
        nextUrl.pathname.startsWith(path)
    );

    if (isPublicPath) {
        if (isLoggedIn) return NextResponse.redirect(new URL("/", nextUrl));
        return NextResponse.next();
    }

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2)).*)"],
};
