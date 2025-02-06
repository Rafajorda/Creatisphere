"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface FileWithPreview extends File {
    preview: string
}

export function useFileManagement() {
    const [files, setFiles] = useState<FileWithPreview[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [
            ...prevFiles,
            ...acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            ),
        ])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".gif"],
        },
    })

    const removeFile = (fileToRemove: FileWithPreview) => {
        setFiles((files) => files.filter((file) => file !== fileToRemove))
        URL.revokeObjectURL(fileToRemove.preview)
    }

    return {
        files,
        setFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        removeFile,
    }
}

