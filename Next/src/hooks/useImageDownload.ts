"use client"

import { useCallback } from "react"

export const useImageDownload = () => {
    const downloadImage = useCallback(async (imageSrc: string, fileName: string) => {
        try {
            const response = await fetch(imageSrc)
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Error downloading the image:", error)
        }
    }, [])

    return downloadImage
}

