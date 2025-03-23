import { prisma } from '@/lib/prisma'
import getCurrentUser from './getCurrentUser';

interface IProductParams {
  slug: string
}
interface IdProduct {
  id: number
}

export async function getProductById(params: IdProduct) {
 
  const data = await prisma.product.findUnique({

    where: { id: params.id, status: 'ACTIVE' },

    include: {
      artist: {
        include: {
          profile: true,
        },
      },
      ImagesProduct: true,
      productPrices: {
        include: {
          type: true,
        },
      },
    },
  })
  if (!data) {
    return null
  }
  return data;
}
  

export async function getProduct(params: IProductParams) {
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id;

  const data = await prisma.product.findUnique({
    where: { slug: params.slug, status: 'ACTIVE' },
    include: {
      artist: {
        include: {
          profile: true,
        },
      },
      favoritedBy: {
        where: {
          userId: userId
        }
      },
      ImagesProduct: true,
      productPrices: {
        include: {
          type: true,
        },
      },
    },
  })
  if (!data) {
    return null
  }

  const favorited = data.favoritedBy.some((fav) => fav.userId === userId);

  return {
    ...data,
    favorited,
    favoritedCount: data.favoritedBy.length,
  };
}
