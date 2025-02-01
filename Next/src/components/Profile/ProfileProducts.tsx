import { ProductItem } from "@/types/Product";
import { UserProfileResponse } from "@/types/UserProfile";
import React from "react";
import { CardProductProfile } from "../shared/Cards/CardProductProfile";

interface ProfileProductsProps {
    profile: UserProfileResponse
}

export const ProfileProducts = ({ profile }: ProfileProductsProps) => {
    return (
        <>
            <div className="grid grid-cols-4 mb-5">
                {profile.products.products.map((product: ProductItem) => {
                    return (
                        <CardProductProfile key={product.id} product={product} />
                    );
                })}
            </div>
        </>
    )
}