import { Category, Collection, Product, Series, Type,User } from "@prisma/client";

export interface ProductItem extends Omit<Product, 'updatedAt'> {
    categories: Category[];
    types: Type[];
    series: Series;
    collections: Collection;
    artist: User;
}

export interface ProductResponse {
    products: ProductItem[];
}