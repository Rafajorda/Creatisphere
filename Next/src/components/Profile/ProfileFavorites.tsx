import { FavoriteItem } from "@/types/Favorite";
import { UserProfileResponse } from "@/types/UserProfile";
import React from "react";

interface ProfileFavoritesProps {
    profile: UserProfileResponse
}

export const ProfileFavorites = ({ profile }: ProfileFavoritesProps) => {
    return (
        <>
            {profile.favorites.map((favorite: FavoriteItem) => (
                <div key={favorite.product.id}>
                    <h1>{favorite.product.name}</h1>
                </div>
            ))}
        </>
    )
}