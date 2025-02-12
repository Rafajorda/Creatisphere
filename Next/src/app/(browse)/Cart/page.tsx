import type { Metadata } from "next"
import { Suspense } from "react"
import { useGetProfile } from "@/hooks/useAuth"
import { redirect } from "next/navigation"
import { CartList } from "@/components/Cart/CartList"
import getCurrentUser from "@/actions/getCurrentUser"
import getCart from "@/actions/getCart"
import React from "react"

interface CartPageProps {
  params: { username: string }
}

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const { username } = await params
  const profile = await useGetProfile(username)
  return profile ? { title: profile.username } : {}
}

const CartPage = async () => {
  const profile = await getCurrentUser()
  if (!profile) {
    redirect("/404")
  }

  let cart
  try {
    cart = await getCart(profile.id)
  } catch (e) {
    console.log(e);
    cart = null
  }

  return (
    <div className="profile-page text-white text-xl container mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        {cart ? (
          <CartList cart={cart.cartLines} />
        ) : (
          <p className="text-gray-700">No hay artículos en el carrito</p>
        )}
      </Suspense>
    </div>
  )
}

export default CartPage

