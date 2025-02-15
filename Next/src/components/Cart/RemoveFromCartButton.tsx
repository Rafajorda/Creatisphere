'use client'
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { handleRemoveFromCart } from "@/components/Cart/RemoveFromCart";

interface RemoveFromCartButtonProps {
    productPriceId: number;
    cartId: number;
   
}

export const RemoveFromCartButton = ({ productPriceId, cartId }: RemoveFromCartButtonProps) => {
    // export const RemoveFromCartButton = () => {

    const { data: session } = useSession();
   
    
    const DeleteFromCart = async () => {
    
      if(!session){  
                redirect('/Login');
            }
            else{
                console.log('Session found, calling handleAddToCart...');
                console.log('cartId:', cartId);
                console.log('Product ID:', productPriceId);
               handleRemoveFromCart(cartId, productPriceId, session); 
            } 
   
    }

        return (
        <>
            <button
                onClick={DeleteFromCart}
                className="mt-4 px-6 py-2 bg-gold text-black text-lg font-semibold rounded-lg hover:bg-dark-gold transition"
                >
                    Remove
            </button>
        </>  

                    
            
        )
    }
// }
