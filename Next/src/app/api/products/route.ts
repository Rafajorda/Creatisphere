import getProducts from '@/actions/getProducts';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../exceptions';
import {prisma} from '@/lib/prisma';

export const GET = async () => {
    const products = await getProducts();
    return NextResponse.json(products);
}

export const POST = async (req: NextRequest) => {
    try{
    const body = await req.json();
   
    if (!body || !body.name || !body.email ) {
        return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    const generateSlug = (name: string): string => {
        return name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9 -]/g, "") // Elimina caracteres especiales
          .replace(/\s+/g, "-"); // Reemplaza espacios con guiones
      };
      
    const slug =  generateSlug(body.name);

    const result = await prisma.$transaction(async (PrismaClient) => {

        const product = await PrismaClient.product.create({
            data: {
                name: body.name,
                slug: slug,
                userId: user?.id,
                categories: {
                  connect: body.categories.map((categoryId: number) => ({ id: categoryId }))
                }     
                
            }
        });
        
        const path = body.file.path;
        const cleanedPath = path.replace(/^.\//, '');

        const image  = await PrismaClient.imagesProduct.create({
            data: {
                src: cleanedPath,
                alt: body.name,
                size: body.size,
                productId: product.id
            }
        });
        const ProductPrice = await PrismaClient.productPrice.createMany({
            data: body.types.map((type: any) => ({
                typeId: type.id,
                price: type.price,
                productId: product.id
            }))
        });
        return product;
    });

    return NextResponse.json(result);
} catch (error) {
    return ApiResponse.badRequest('Error al crear el producto');
}
    // console.log('ProductPrice data:', ProductPrice);
   
}