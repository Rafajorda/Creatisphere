import getCart from "@/actions/getCart"
import getCurrentUser from "@/actions/getCurrentUser"
import { PaymentForm } from "@/components/forms/PaymentForm"
import { StripeProvider } from "@/components/StripeProvider"
import { redirect } from "next/navigation"
import React from "react"

interface CheckoutProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

const Checkout = async ({ searchParams }: CheckoutProps) => {
    const isGetPremium = searchParams.isGetPremium === "true"

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        redirect("/Login")
    }

    let cart
    try {
        cart = await getCart(currentUser.id)
    } catch (e) {
        console.log(e)
        cart = null
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">
                <div className="w-full">
                    <StripeProvider>
                        {isGetPremium ? (
                            <PaymentForm total={19.99} isGetPremium={true} />
                        ) : (
                            <PaymentForm total={cart?.total} isGetPremium={false} />
                        )}
                    </StripeProvider>
                </div>
            </div>
        </main>
    )
}

export default Checkout

