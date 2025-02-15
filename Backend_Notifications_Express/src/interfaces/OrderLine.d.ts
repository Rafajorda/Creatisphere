import { OrderLine, ProductPrice } from "@prisma/client";
import { ProductPriceItem } from "./ProductPrice";

export interface OrderLineItem extends OrderLine {
    productprice: ProductPriceItem
}