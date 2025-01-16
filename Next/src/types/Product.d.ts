import { Category, Collection, Product, Series, Type } from "@prisma/client";

export interface ProductItem extends Omit<Product, 'updatedAt'> {
    categories: Category[];
    types: Type[];
    series: Series;
    collections: Collection;
}

export interface ProductResponse {
    products: ProductItem[];
}