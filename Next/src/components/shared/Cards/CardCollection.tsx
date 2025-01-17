import { CollectionItem } from "@/types/Collection";
import React from "react";

interface CardCollectionProps {
    collection: CollectionItem;
}

export const CardCollection = ({ collection }: CardCollectionProps) => {
    return (
        <div className="card">
            <h1>{collection.name}</h1>
            <img src={collection.image ?? ''} alt={collection.name} />
        </div>
    );
}

