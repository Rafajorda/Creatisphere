import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server"
import { NextMiddlewareFactory } from "./Chain"
// import getCurrentUser from "@/actions/getCurrentUser";

export const PremiumGuard: NextMiddlewareFactory = (middleware: NextMiddleware) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const isLogged = request.cookies.get("next-auth.session-token")?.value
        // const currentUser = await getCurrentUser();

        if (!isLogged && request.nextUrl.pathname === '/Premium') {
            return NextResponse.redirect(new URL('/GetPremium', request.url))
        } // Si no estás logeado, no puedes entrar a premium

        // if (currentUser?.role === 'USER' && request.nextUrl.pathname === '/Premium') {
        //     return NextResponse.redirect(new URL('/GetPremium', request.url))
        // } // Si eres un usuario normal, no puedes entrar a premium

        return middleware(request, _next)
    }
}

export const config = {
    matcher: ["/Premium", "/GetPremium"],
}