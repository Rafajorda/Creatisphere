import { Category, Collection, ImagesProduct, Product, Series, User, ProductPrice } from "@prisma/client";

export interface ProductItem extends Omit<Product, 'updatedAt'> {
    categories: Category[];
    productPrices: ProductPrice[];
    series: Series;
    collections: Collection;
    artist: User;
    ImagesProduct: ImagesProduct[];
    size: string;
}

export interface ProductResponse {
    products: ProductItem[];
}