import { Category, Collection, ImagesProduct, Product, Series, Type, User } from "@prisma/client";

export interface ProductItem extends Omit<Product, 'updatedAt'> {
    categories: Category[];
    types: Type[];
    series: Series;
    collections: Collection;
    artist: User;
    ImagesProduct: ImagesProduct[];
}

export interface ProductResponse {
    products: ProductItem[];
}