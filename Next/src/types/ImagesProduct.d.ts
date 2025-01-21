import { ImagesProduct, Product } from "@prisma/client";

export interface ImagesProductItem extends Omit<ImagesProduct, 'updatedAt'> {
    product: Product;
}

export interface ImagesProductResponse {
    imagesProduct: ImagesProductItem[];
}