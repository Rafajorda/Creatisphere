import { Request, Response } from 'express';
import { AppError } from '../../utils/AppError';
import prismaGetOrder from '../../repo/Order/PrismaGetOrder';
import CreateOrder from '../../services/Order/CreateOrder';
import { Order, OrderLine } from '@prisma/client';

export const orders = async (req: Request, res: Response): Promise<void> => {
    try {
       const { orderId } = req.body;

       if (!orderId) {
           res.status(400).json({ message: 'Required data missing: orderId' });
           return;
       }
       const order = await prismaGetOrder(orderId);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        const newNotification = await CreateOrder(order);

        res.status(201).json(newNotification);

    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            console.error('Unexpected error in Orders:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
