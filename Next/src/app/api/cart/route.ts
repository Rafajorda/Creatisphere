import getCart from '@/actions/getCart';
// import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import getCurrentUser from '@/actions/getCurrentUser';
import { ApiResponse } from '../exceptions';


export async function GET() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized();
  }
  const cart = getCart(currentUser?.id);

  return NextResponse.json(cart);
}

export async function POST(req: Request) {
  try {
    const { user, productId, priceId } = await req.json();

    // Verificar si los datos esperados están presentes
    if (!user || !productId || !priceId) {
      return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
    }

    console.log(`"user" ${user} Added ${productId} to cart with ${priceId} inside the api/cart route`);

    // Buscar el usuario por correo
    const userRecord = await prisma.user.findUnique({
      where: {
        email: user,
      },
    });

    if (!userRecord) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Buscar el carrito del usuario
    let cart = await prisma.cart.findFirst({
      where: {
        userId: userRecord.id,
      },
    });

    if (!cart) {
      // Si el carrito no existe, creamos uno nuevo
      cart = await prisma.cart.create({
        data: {
          userId: userRecord.id,
          total: 0,
        },
      });
    }

    // Crear la relación entre el carrito y el producto
    await prisma.cartProduct.create({
      data: {
        cartId: cart.id,
        productPriceId: priceId,
      },
    });

    // Obtener el precio del producto
    const productPrice = await prisma.productPrice.findUnique({
      where: {
        id: priceId,
      },
    });

    if (!productPrice) {
      return NextResponse.json({ success: false, message: 'Product price not found' }, { status: 404 });
    }

    // Actualizar el total del carrito
    const updatedCart = await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        total: cart.total + productPrice.price,
      },
    });

    // Responder con el cartId y éxito
    return NextResponse.json({ success: true, cartId: cart.id, total: updatedCart.total });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Error processing the request' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {

  try {
    const { user,cartid, productPriceId } = await req.json();

    // Verificar si los datos esperados están presentes
    if (!user || !cartid || !productPriceId) {
      return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
    }



    // Buscar el usuario por correo
    const userRecord = await prisma.user.findUnique({
      where: {
        email: user,
      },
    });

    if (!userRecord) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Buscar el carrito del usuario
    const cart = await prisma.cart.findFirst({
      where: {
        userId: userRecord.id,
      },
    });

    if (!cart) {
      return NextResponse.json({ success: false, message: 'Cart not found' }, { status: 404 });
    }

    // Eliminar la relación entre el carrito y el producto
    await prisma.cartProduct.deleteMany({
      where: {
        cartId: cartid,
        productPriceId: productPriceId,
      },
    });

    // Obtener el precio del producto
    const productPrice = await prisma.productPrice.findUnique({
      where: {
        id: productPriceId,
      },
    });

    if (!productPrice) {
      return NextResponse.json({ success: false, message: 'Product price not found' }, { status: 404 });
    }

    // Actualizar el total del carrito
    const updatedCart = await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        total: cart.total - productPrice.price,
      },
    });

    // Responder con el cartId y éxito
    return NextResponse.json({ success: true, cartId: cart.id, total: updatedCart.total });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Error processing the request' }, { status: 500 });
  }
}
