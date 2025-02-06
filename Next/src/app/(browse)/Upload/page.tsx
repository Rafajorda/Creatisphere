import FileUpload from "@/components/Upload/FileUpload"
import React from "react"

export default function Upload() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold mb-8">Carga de archivos</h1>
            <FileUpload />
        </main>
    )
}

