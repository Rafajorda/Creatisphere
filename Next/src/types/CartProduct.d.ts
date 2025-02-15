import { Product } from "./Product";
import { ProductPrice, status } from "@prisma/client";



export interface CartProductItem extends Omit<CartProduct,'createdAt', 'updatedAt'> {
    cartId: number;
    productPriceid: number;
    quantity: number;
    price: number;
  }
  
export interface CartProductResponse {
    cartProducts: CartProductItem[];
  }