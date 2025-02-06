import getCurrentUser from "@/actions/getCurrentUser";
import type { UserProfileResponse } from "@/types/UserProfile"
import React from "react"


interface CartListProps{
    profile: Partial<UserProfileResponse>
}

export const CartList = async ({ profile }: CartListProps) => {
    const cartItems = profile.cart ?? [] 
    console.log(profile.cart);
    console.log(cartItems);
    console.log("patata");

    return (
        <div className={`bg-white shadow-xl rounded-3xl overflow-hidden max-w-md mx-auto my-5`}>
          <div className={`py-5 px-4 grid grid-cols-5`}>
            <div className="col-span-4 ml-3">
              <h1 className={`text-xl font-bold text-gray-800 mb-1`}>Cart Items</h1>
              
              {/* Si el carrito está vacío o no existe */}
              {cartItems.length === 0 ? (
               <p className="text-gray-700">No items in the cart yet.</p> // Mensaje si el carrito está vacío
              ) : (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>{item.id}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )
    }