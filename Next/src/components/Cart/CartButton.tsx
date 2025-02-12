import getCurrentUser from "@/actions/getCurrentUser"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import React from "react"

export const CartButton = async () => {
    const currentUser = await getCurrentUser()
    const cartLinesLength = currentUser?.cart[0].cartLines.length || 0

    if (!currentUser) return null

    return (
        <Link href="/Cart">
            <button className="fixed bottom-10 left-10 bg-zinc-800 text-white p-3 rounded-full shadow-lg hover:bg-zinc-700 transition-colors border-filter">
                <ShoppingCart className="w-6 h-6" />
                {cartLinesLength > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartLinesLength}
                    </span>
                )}
            </button>
        </Link>
    )
}

