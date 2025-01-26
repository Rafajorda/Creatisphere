import { Cart, CartProduct } from '@prisma/client';

export interface CartResponse extends Omit<Cart, 'updatedAt'> {
  cartLines: CartProduct[]; // Incluimos los productos relacionados en el carrito
}