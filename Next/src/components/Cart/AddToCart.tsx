import { ProductPrice } from "@prisma/client";
import React from "react"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Asegúrate de que este sea el path correcto
import { ProductPriceItem } from "@/types/ProductPrice";


interface Product{
    id: number

}



export const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, product: Product,selectedPrice: ProductPriceItem) => {
    console.log(`Added ${product.id} to cart with ${selectedPrice.price}`);
    console.log(selectedPrice);
  };
