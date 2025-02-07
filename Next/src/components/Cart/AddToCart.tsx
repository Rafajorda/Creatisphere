'use client'

import { useDispatch } from "react-redux";  // Importar useDispatch aquí
import { ProductPriceItem } from "@/types/ProductPrice";
import { Session } from "next-auth";
import { fetchWrapper } from "@/utils/fetch";
import { addProductToCart } from "@/store/slices/cartSlice";
import { CartProductItem } from "@/types/CartProduct"; // Importa la interfaz CartProduct

export const handleAddToCart = async (
  event: React.MouseEvent<HTMLButtonElement>,
  product: { id: number },
  selectedPrice: ProductPriceItem,
  session: Session,
  dispatch: any
) => {
    console.log(`"user" ${session.user.email} Added ${product.id} to cart with ${selectedPrice.price}`);
    console.log('Selected Price:', selectedPrice);
    console.log('Product ID:', product.id);


  try {
    console.log('Sending request to API...');
    const response = await fetchWrapper('/api/cart', 'POST', {
      user: session.user.email,
      productId: product.id,
      priceId: selectedPrice.id,
    });
    console.log('API response:', response);
    if (response && response.success) {
      console.log('Product added to cart:', response);

      // Disparar la acción para actualizar el carrito en el estado global (Redux)
      dispatch(
        addProductToCart({
            cartId: response.cartId, // Este es el cartId devuelto por la API
            productPriceid: selectedPrice.id,
            quantity: 1,
            price: selectedPrice.price,
        })
      );
    } else {
      console.error('Error adding product to cart:', response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
