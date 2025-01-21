import { Type, Product } from "@prisma/client";

export interface TypeItem extends Omit<Type, 'updatedAt'> {
    products: Product[];
}

export interface TypeResponse {
    types: TypeItem[];
}