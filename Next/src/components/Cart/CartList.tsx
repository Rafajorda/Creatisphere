import { CardCart } from "../shared/Cards/CardCart"
import Link from "next/link"
import { Button } from "../ui/button"
import React from "react"

interface CartListProps {
  cart: any[]
}

export const CartList = ({ cart }: CartListProps) => {

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return <p className="text-gray-700 text-center py-8">No items in the cart yet.</p>
  }

  const total = cart.reduce((accum, cartItem: any) => {
    const itemPrice = cartItem.productPrice.price
    return accum + itemPrice
  }, 0)

  return (
    <div className="bg-zinc-900 shadow-md p-6 max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Your Cart</h1>
      <div>
        {cart.map((cartItem: any) => (
          <CardCart key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <div className="mt-8 text-right">
        <h3 className="text-2xl font-bold text-white">
          Total: <span>{total.toFixed(2)}€</span>
        </h3>

        <Link href="/Checkout">
          <Button className="bg-teal-800 p-3 rounded-lg mt-3 font-bold hover:bg-gold">Checkout</Button>
        </Link>
      </div>
    </div>
  )
}

