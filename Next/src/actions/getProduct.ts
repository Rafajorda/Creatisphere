import { prisma } from '@/lib/prisma'

interface IProductParams {
    slug: string
  }
  

  
export async function getProduct(params: IProductParams) {
    
    const data = await prisma.product.findUnique({
        // const currentUser = await getCurrentUser()
        // const userId = currentUser?.id;
      where: { slug: params.slug },
      include: {
        artist: true,
        series: true,
        collections: true,
        types:true
        },
    })
    if (!data) {
      return null
    }
    return data;

}
  