import { Product } from './Product';  // Relación con Product
import { status } from '.prisma/client';  // Para el tipo 'status'

export interface ImagesProduct {
    id: number;
    image: string;
    alt: string;
    product: Product;  // Relación con el modelo Product
    status: status;
}