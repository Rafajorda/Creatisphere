"use client"

import { Heart } from "lucide-react"
import type React from "react"
import { fetchWrapper } from "@/utils/fetch"
import { useProduct } from "@/components/ProductProvider"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
// import { useRouter } from "next/navigation"

export const FavoriteButton = () => {
    const { product, setProduct } = useProduct()
    const { favorited, slug } = { ...product }
    const [loading, setLoading] = useState(false)
    const currentUser = useSession().data?.user
    const { toast } = useToast();

    const handleFavorites = async () => {
        setLoading(true)

        if (!currentUser) {
            toast({
                title: 'You have to be logged in to favorite a product',
            });

            return
        }
        try {
            const data = favorited
                ?
                await fetchWrapper(`/api/products/${slug}/favorite`, 'DELETE')
                :
                await fetchWrapper(`/api/products/${slug}/favorite`, 'POST')
            if (data) {
                setProduct(data)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="absolute top-2 right-2 z-10 bg-white bg-opacity-50 rounded-full p-1">
            <button onClick={handleFavorites} disabled={loading}>
                <Heart className={`${favorited ? "fill-red-600" : "text-gray-700"}`} size={24} />
            </button>
        </div>
    )
}

