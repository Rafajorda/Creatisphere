'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"

export const BuyPremiumButton = () => {
    const router = useRouter();


    return (
        <Button
            variant="outline"
            className="mt-2 p-7 text-2xl shadow-lg font-bold bg-teal-400 text-white hover:bg-teal-800 hover:text-white"
            onClick={() => router.push("/Checkout?isGetPremium=true")}
        >
            Get Premium
        </Button>
    )
}