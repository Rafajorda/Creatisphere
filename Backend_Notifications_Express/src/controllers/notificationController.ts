import { PrismaClient } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';


const prisma = new PrismaClient();



export const Likes = async (req: Request, res: Response): Promise<void> => {

     const { userId, productId } = req.body;
    if (!userId || !productId) {
        res.status(400).json({ message: 'Faltan datos requeridos: userId o productId' });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            profile: true
        }
    });

    
    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
    }

    const product = await prisma.product.findUnique({

        where: {
            id: productId
        }
    });


    if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
    }
    const username = user?.profile?.username;

    const newNotification = await prisma.notification.create({
        data: {
            userId: product.userId,
            notificationType: 'bell',
            message: `Usuario ${username} ha dado like a ${product?.name}`,
            isRead: false
        }
    });

    res.status(201).json(newNotification);

};