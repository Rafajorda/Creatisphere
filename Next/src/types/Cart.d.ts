import { Cart, CartProduct, ProductPrice } from '@prisma/client';


export interface CartProductResponse extends Omit<CartProduct, 'updatedAt'> {
  productPrice: ProductPrice;
  product: Pick<Product, 'id' | 'name' | 'productPrices'>; 
}



export interface CartResponse extends Omit<Cart, 'updatedAt'> {
  cartLines: CartProductResponse[]; 
}