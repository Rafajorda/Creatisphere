"use client"

import { useState } from "react"

interface FileWithPreview extends File {
    name: string;
    preview?: string;
}

export function useFileUpload() {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    const uploadFiles = async (files: FileWithPreview[]) => {
        if (files.length === 0) {
            console.error("❌ No hay archivos para subir");
            return false;
        }

        setIsUploading(true)
        setUploadError(null)

        const formData = new FormData()
       files.forEach((file) => {
        if (file instanceof File) {
            formData.append("files", file, file.name);
        } else {
            console.error("No es un archivo válido:", file);
        }
    });

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                console.log("Upload successful:", result)
                return true
            } else {
                throw new Error("Upload failed")
            }
        } catch (error) {
            console.error("Error uploading files:", error)
            setUploadError("Error al subir los archivos. Por favor, inténtalo de nuevo.")
            return false
        } finally {
            setIsUploading(false)
        }
    }

    return { uploadFiles, isUploading, uploadError }
}

