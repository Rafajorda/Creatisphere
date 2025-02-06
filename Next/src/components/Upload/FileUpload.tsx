"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useFileManagement } from "@/hooks/useFileManagement"
import { useFileUpload } from "@/hooks/useFileUpload"
import React from "react"
import { useToast } from "@/hooks/use-toast"

export default function FileUpload() {
    const { files, setFiles, getRootProps, getInputProps, isDragActive, removeFile } = useFileManagement()
    const { uploadFiles, isUploading, uploadError } = useFileUpload()
    const { toast } = useToast()

    const handleUpload = async () => {
        const success = await uploadFiles(files)
        if (success) {
            setFiles([])
            toast({
                title: 'Upload successful',
                description: 'Your images have been uploaded successfully',
            })
        }
    }

    return (
        <div className="mt-10">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed p-8 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Suelta las imágenes aquí...</p>
                ) : (
                    <p>Arrastra y suelta imágenes aquí, o haz clic para seleccionar imágenes</p>
                )}
            </div>
            {files.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Imágenes seleccionadas:</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {files.map((file) => (
                            <div key={file.name} className="relative group">
                                <Image
                                    src={file.preview || "/placeholder.svg"}
                                    alt={file.name}
                                    width={200}
                                    height={200}
                                    className="object-cover rounded"
                                    onLoad={() => {
                                        URL.revokeObjectURL(file.preview)
                                    }}
                                />
                                <button
                                    onClick={() => removeFile(file)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Eliminar imagen"
                                >
                                    <X size={16} />
                                </button>
                                <p className="text-sm mt-1 truncate">{file.name}</p>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleUpload} className="mt-4" disabled={isUploading}>
                        {isUploading ? "Subiendo..." : "Subir imágenes"}
                    </Button>
                    {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
                </div>
            )}
        </div>
    )
}

