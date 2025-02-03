import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
// import getCurrentUser from "./actions/getCurrentUser"

const 

export function middleware(request: NextRequest) {
    const isLogged = request.cookies.get("next-auth.session-token")?.value
    // const currentUser = await getCurrentUser();

    if (isLogged && (request.nextUrl.pathname === "/Login" || request.nextUrl.pathname === "/Register")) {
        return NextResponse.redirect(new URL("/", request.url))
    } // Si estás logeado, no puedes entrar a Login o Register

    if (!isLogged && request.nextUrl.pathname === '/settings') {
        return NextResponse.redirect(new URL("/Login", request.url))
    } // Si no estás logeado, no puedes entrar a settings

    if (!isLogged && request.nextUrl.pathname === '/Premium') {
        return NextResponse.redirect(new URL('/GetPremium', request.url))
    } // Si no estás logeado, no puedes entrar a premium

    // if (currentUser?.role === 'USER' && request.nextUrl.pathname === '/Premium') {
    //     return NextResponse.redirect(new URL('/GetPremium', request.url))
    // } // Si eres un usuario normal, no puedes entrar a premium

    return NextResponse.next()
}

export const config = {
    matcher: ["/Login", "/Register", "/settings", "/Premium", "/GetPremium"],
}