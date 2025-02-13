"use client"
import { CardCart } from "../shared/Cards/CardCart"
import Link from "next/link"
import { fetchWrapper } from "@/utils/fetch"
import { Button } from "../ui/button"
import { useState } from "react"
import React from "react"

interface CartListProps {
  cart: any[]
}

export const CartList = ({ cart }: CartListProps) => {
  const [isClosing, setIsClosing] = useState(false)

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return <p className="text-gray-700 text-center py-8">No items in the cart yet.</p>
  }

  const total = cart.reduce((accum, cartItem: any) => {
    const itemPrice = cartItem.productPrice.price
    return accum + itemPrice
  }, 0)

  const closeOrder = async () => {
    setIsClosing(true)
    try {
      await fetchWrapper("/api/checkout", "POST")
    } catch (error) {
      console.error("Error closing order:", error)
    } finally {
      setIsClosing(false)
    }
  }

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
          <Button className="bg-dark-gold p-3 rounded-lg mt-3 font-bold hover:bg-gold">Checkout</Button>
        </Link>

        <Button
          onClick={closeOrder}
          className="bg-dark-gold p-3 rounded-lg mt-3 font-bold hover:bg-gold ml-2"
          disabled={isClosing}
        >
          {isClosing ? "Closing..." : "Close order"}
        </Button>
      </div>
    </div>
  )
}

