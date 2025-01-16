import { Collection, Product } from "@prisma/client";

export interface CollectionItem extends Omit<Collection, 'updatedAt'> {
    products: Product[];
}

export interface CollectionResponse {
    collections: CollectionItem[];
}