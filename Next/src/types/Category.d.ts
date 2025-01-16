import { Product } from './Product';  // Relación con Product
import { status } from '.prisma/client';  // Para el tipo 'status'

export interface CategoryItem extends Omit<Category, 'updatedAt'> {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    products: Product[];  // Relación con el modelo Product
    status: status;
}


export interface CategoryResponse {
    categories: Category[];
}