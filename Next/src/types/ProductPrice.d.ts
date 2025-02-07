import { ProductPrice } from "@prisma/client";
export interface ProductPriceItem extends Omit<ProductProfile, 'updatedAt'> {
    id: number;
    productId: number;
    typeId: number;
    price: number;
    status: $Enums.status;
    
}

export interface ProductPriceResponse {
    productProfile: ProductPriceeItem[];
}