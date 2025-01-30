import { Request, Response } from 'express';
import { AppError } from '../../utils/AppError';
import CreateNotificationDeleted from '../../services/Notification/Create/CreateNotificationDeleted';
import prismaGetProduct from '../../repo/Product/PrismaGetProduct';
export const deleted = async (req: Request, res: Response): Promise<void> => {
    try {
     const { message, productId } = req.body;

    if (!message || !productId) {
        res.status(400).json({ message: 'Required data missing: message or productId' });
        return;
    }

    const product = await prismaGetProduct(productId);

    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    const newNotification = await CreateNotificationDeleted(message, product);

    res.status(201).json(newNotification);

    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            console.error('Unexpected error in delete:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
