'use client'

import React, { createContext, useContext, useState } from 'react'
// import { ProductItem } from '@/types/Product'
import { GalleryImage } from '@/hooks/useGalleryImages'

export type productContextType = {
    product: GalleryImage | null
    setProduct: (product: GalleryImage) => void
}
export const productContext = createContext<productContextType>({
    product: null,
    setProduct: () => { },
})

interface productProviderProps {
    product: GalleryImage
    children: React.ReactNode
}

export const ProductProvider = ({
    product: originalproduct,
    children,
}: productProviderProps) => {
    const [product, setProduct] = useState<GalleryImage>(originalproduct)
    return (
        <productContext.Provider value={{ product, setProduct }}>
            {children}
        </productContext.Provider>
    )
}

export const useProduct = () => {
    return useContext(productContext)
}
