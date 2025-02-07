import { prisma } from '@/lib/prisma'
import { CartResponse} from '@/types/Cart'


export default async function getCart(id: number): Promise<CartResponse> {
	
    const response = await prisma.cart.findFirst({
        where: {
            userId: id, 
          },
        include: { 
            cartLines: {
                include: {
                    productPrice: {
                        include: {
                            product:{
                              include: {
                                ImagesProduct: true,
                              },
                            },
                        }
                    }
                }
            }
        }
    });

	if (!response) {
		throw new Error('Cart not found');
	}
   
  const transformedResponse: CartResponse = {
    ...response,
    cartLines: response.cartLines.map(cartLine => ({
      ...cartLine,
      product: {
        id: cartLine.productPrice.productId,
        name: cartLine.productPrice.product.name,
        src: cartLine.productPrice.product.ImagesProduct[0].src,
        productPrices: [cartLine.productPrice]
      }
    }))
  };

  return transformedResponse;
    // id: cart.id,
    // status: cart.status,
    // cartLines: cart.cartLines,
    // createdAt: cart.createdAt,
    // userId: cart.userId,
    // total: cart.total
  
}



