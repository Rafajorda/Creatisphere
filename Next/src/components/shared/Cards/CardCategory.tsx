import { CategoryItem } from "@/types/Category";
import React from "react";

interface CardCategoryProps {
    category: CategoryItem;
}

export const CardCategory = ({ category }: CardCategoryProps) => {
    return (
        <div className="card">
            <h1>{category.name}</h1>
            <img src={category.image ?? ''} alt={category.name} />
        </div>
    );
}

