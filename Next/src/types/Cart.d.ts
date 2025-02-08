import { Cart, CartProduct, ProductPrice } from '@prisma/client';
import { TypeItem } from './Type';


export interface CartProductResponse extends Omit<CartProduct, 'updatedAt'> {
  productPrice: ProductPrice;
  product: Pick<Product, 'id' | 'name' | 'productPrices'>; 
  type: TypeItem[]
}



export interface CartResponse extends Omit<Cart, 'updatedAt'> {
  cartLines: CartProductResponse[]; 
}