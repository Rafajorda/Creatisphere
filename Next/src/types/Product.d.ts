import { Category, ImagesProduct, Product, User, ProductPrice } from "@prisma/client";

export interface ProductItem extends Omit<Product, 'updatedAt'> {
    categories: Category[];
    productPrices: ProductPrice[];
    artist: User;
    ImagesProduct: ImagesProduct[];
    file: string;
    fileSize: number;
    triangles: number;
    description: string;
    size: string;
    favorited: boolean;
    favoritedBy: User[];
}

export interface ProductResponse {
    products: ProductItem[];
}