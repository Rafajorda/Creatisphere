import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server"
import { NextMiddlewareFactory } from "./Chain"

export const AuthGuard: NextMiddlewareFactory = (middleware: NextMiddleware) => {
    return (request: NextRequest, _next: NextFetchEvent) => {
        const isLogged = request.cookies.get("next-auth.session-token")?.value

        if (isLogged && (request.nextUrl.pathname === "/Login" || request.nextUrl.pathname === "/Register")) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        if (!isLogged && request.nextUrl.pathname === '/settings') {
            return NextResponse.redirect(new URL("/Login", request.url))
        }

        return middleware(request, _next)
    }
}

export const config = {
    matcher: ["/Login", "/Register", "/settings"],
}