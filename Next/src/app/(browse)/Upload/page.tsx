import UploadForm from "@/components/forms/UploadForm"
import InitializeParamsProduct from "@/components/shared/creatorFetcher"

import React from "react"

export default function Upload() {
    return (
        <main className="flex min-h-screen flex-col items-center mt-10 text-white">
            <InitializeParamsProduct/>
            <UploadForm />
        </main>
    )
}

