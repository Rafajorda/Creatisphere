import { Product, ProductPrice, Type } from "@prisma/client";

export interface ProductPriceItem extends ProductPrice {
    product: Product
    type: Type
}