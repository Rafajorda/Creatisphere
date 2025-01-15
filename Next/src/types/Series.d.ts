import { Product } from './Product';  // Relación con Product
import { status } from '.prisma/client';  // Para el tipo 'status'

export interface Series {
    id: number;
    name: string;
    slug: string;
    image?: string;
    products: Product[];  // Relación con el modelo Product
    status: status;
}