import { prisma } from "@/lib/prisma"
import type { CartResponse } from "@/types/Cart"

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
              product: {
                include: {
                  ImagesProduct: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!response) {
    throw new Error("Cart not found")
  }

  // Fetch all types concurrently
  const types = await Promise.all(
    response.cartLines.map((cartLine) =>
      prisma.type.findFirst({
        where: {
          id: cartLine.productPrice.typeId,
        },
        select: {
          name: true,
        },
      }),
    ),
  )

  const transformedResponse: CartResponse = {
    ...response,
    cartLines: response.cartLines.map((cartLine, index) => ({
      ...cartLine,
      product: {
        id: cartLine.productPrice.productId,
        name: cartLine.productPrice.product.name,
        src: cartLine.productPrice.product.ImagesProduct[0]?.src || "",
        productPrices: [cartLine.productPrice],
      },
      types: types[index], // Add the corresponding type to each cartLine
    })),
  }

  return transformedResponse
}

