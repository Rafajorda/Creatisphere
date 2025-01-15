import { status } from '.prisma/client';
import { Collection } from './Collection';
import { Series } from './Series';
import { Category } from './Category';
import { Type } from './Type';
import { ImagesProduct } from './ImagesProduct';

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number; 
    stock?: number;
    categories: Category[];     // Relación con Category
    types: Type[];              // Relación con Type
    series: Series;             // Relación con Series
    collections: Collection;    // Relación con Collection
    ImagesProduct: ImagesProduct[];  // Relación con ImagesProduct
    status: status;
    createdAt: Date;
}