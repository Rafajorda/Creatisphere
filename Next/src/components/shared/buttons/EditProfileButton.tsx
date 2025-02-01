import { Edit } from "lucide-react"
import React from "react"

export const EditProfileButton = () => {
    return (
        <>
            <button className="text-gray-800">
                <Edit className="w-10 h-10 shadow-md" />
            </button>
        </>
    )
}