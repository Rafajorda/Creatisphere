import type { FavoriteItem } from "@/types/Favorite"
import type { UserProfileResponse } from "@/types/UserProfile"
import { CardProductProfile } from "../shared/Cards/CardProductProfile"
import React from "react"

interface ProfileFavoritesProps {
    profile: UserProfileResponse
}

export const ProfileFavorites = ({ profile }: ProfileFavoritesProps) => {
    return (
        <>
            <div className="grid grid-cols-4 mb-5">
                {profile.favorites.map((favorite: FavoriteItem) => (
                    <CardProductProfile key={favorite.product.id} product={favorite.product} />
                ))}
            </div>
        </>
    )
}

