import { getProduct } from "@/actions/getProduct"
import App from "@/components/shared/Lists/List3dDetails" // Ensure this path is correct
import { notFound } from "next/navigation"
import React from "react"



const SecondScene3d = async () => {

    try {
        return (
            <div className="min-h-screen text-white">
                <App/>
            </div>
        )
    } catch (error) {
        console.error("Error fetching product:", error)

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Error</h1>
                    <p className="text-xl text-gray-600">There was an error loading the radio. Please try again later.</p>
                </div>
            </div>
        )
    }
}

export default SecondScene3d

