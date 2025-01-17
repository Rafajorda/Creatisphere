import { TypeItem } from "@/types/Type";
import React from "react";

interface CardTypesProps {
    type: TypeItem;
}

export const CardTypes = ({ type }: CardTypesProps) => {
    return (
        <div className="card">
            <h1>{type.name}</h1>
            <img src={type.image ?? ''} alt={type.name} />
        </div>
    );
}

