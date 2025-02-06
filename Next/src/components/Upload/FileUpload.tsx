"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import React from "react"

export default function FileUpload() {
    const [files, setFiles] = useState<File[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const uploadFiles = async () => {
        if (files.length === 0) return

        const formData = new FormData()
        files.forEach((file) => {
            formData.append("files", file)
        })

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                console.log("Upload successful:", result)
                setFiles([])
            } else {
                console.error("Upload failed")
            }
        } catch (error) {
            console.error("Error uploading files:", error)
        }
    }

    return (
        <div className="p-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed p-8 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Suelta los archivos aquí...</p>
                ) : (
                    <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos</p>
                )}
            </div>
            {files.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold">Archivos seleccionados:</h3>
                    <ul className="list-disc pl-5">
                        {files.map((file) => (
                            <li key={file.name}>{file.name}</li>
                        ))}
                    </ul>
                    <Button onClick={uploadFiles} className="mt-4">
                        Subir archivos
                    </Button>
                </div>
            )}
        </div>
    )
}

