
import { useDispatch } from "react-redux";  // Importar useDispatch aquí
import { fetchWrapper } from "@/utils/fetch";
import { removeProductFromCart } from "@/store/slices/cartSlice";
import { Session } from "next-auth";


export const handleRemoveFromCart  = async (
    cartId: number,
    productPriceId: number,
    session: Session,
  ) => {



  try {
    console.log('Sending request to API...');
     const response = await fetchWrapper('/api/cart', 'DELETE', {
        user: session.user.email,
        cartid: cartId,
        productPriceId: productPriceId,

     });
     // console.log('cartId:', cartId);
    // console.log('Product ID:', productPriceId);
    if (response && response.success) {
        console.log('Product removed to cart:', response);
        location.reload();
    }
    

    } catch (error) {
        console.error('Error:', error);
    }

  }