import { ProductItem } from "@/types/Product";
import React from "react";

interface CardProductProps {
    product: ProductItem;
}

export const CardProduct = ({ product }: CardProductProps) => {
    return (
        <div className="card">
            <h1>{product.name}</h1>
            <p>{product.price}</p>
        </div>
    );
}

