'use client'
import React from "react"
import { handleAddToCart } from "./AddToCart"
import { Product, ProductPrice } from "@prisma/client"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Asegúrate de que este sea el path correcto
import { ProductPriceItem } from "@/types/ProductPrice";

interface AddtoCartButtonProps {
    product: Product;
    defaultPrice: ProductPriceItem;
   
}


export const AddtoCartButton = ({ product, defaultPrice }: AddtoCartButtonProps) => {
    const selectedPrice = useSelector((state: RootState) => state.price.selectedprice);
    const priceToUse = selectedPrice ? selectedPrice : defaultPrice;
    return (
        <>
               
            <button
                onClick={(event) => handleAddToCart(event, product, priceToUse)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
            >
                add to Cart
            </button>
                
        </>
    )
}

