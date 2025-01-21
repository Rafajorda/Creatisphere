import { Series, Product } from "@prisma/client";

export interface SeriesItem extends Omit<Series, 'updatedAt'> {
    products: Product[];
}

export interface SeriesResponse {
    series: SeriesItem[];
}