import { ProductItem } from "@/types/Product";
import { UserProfileResponse } from "@/types/UserProfile";
import React from "react";

interface ProfileProductsProps {
    profile: UserProfileResponse
}

export const ProfileProducts = ({ profile }: ProfileProductsProps) => {
    return (
        <>
            {profile.products.products.map((product: ProductItem) => {
                return (
                    <ul key={product.id}>
                        <li>{product.name}</li>
                    </ul>
                );
            })}
        </>
    )
}