import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const isLogged = request.cookies.get("next-auth.session-token")?.value

    if (isLogged && (request.nextUrl.pathname === "/Login" || request.nextUrl.pathname === "/Register")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/Login", "/Register"],
}