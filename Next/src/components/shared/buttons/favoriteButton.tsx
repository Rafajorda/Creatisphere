"use client"

import { useAppDispatch, useAppSelector } from "@/store/store"
import { addFavorite, removeFavorite } from "@/store/slices/favoriteSlice"
import { Heart } from "lucide-react"
import type React from "react"
import { useRouter } from "next/navigation"

interface FavoriteButtonProps {
    productSlug: string
    favorited: boolean
}

export const FavoriteButton = ({ productSlug, favorited }: FavoriteButtonProps) => {
    const dispatch = useAppDispatch()
    // const { user: currentUser } = useAppSelector((state) => state.auth)
    // const favorites = useAppSelector((state) => state.favorite.favorites)
    // const isFavorited = favorites.includes(productSlug)

    const handleFavorites = async () => {
        // if (!currentUser) {
        //     console.log(`no user`);
        //     // Usa router.push en lugar de redirect
        //     // const router = useRouter()
        //     // router.push("/Login")
        //     return
        // }

        try {
            if (favorited) {
                await dispatch(removeFavorite(productSlug))
            } else {
                console.log(`not favorited`);
                await dispatch(addFavorite(productSlug))
            }
        } catch (error) {
            console.error("Error updating favorite:", error)
        }
    }

    return (
        <div className="absolute top-2 right-2 z-10 bg-white bg-opacity-50 rounded-full p-1">
            <button onClick={handleFavorites}>
                <Heart className={`${favorited ? "fill-red-600" : "text-gray-700"}`} size={24} />
            </button>
        </div>
    )
}

