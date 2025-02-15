import { Edit } from "lucide-react"
import Link from "next/link"
import React from "react"

export const EditProfileButton = () => {
    return (
        <>
            <Link href={'/settings'}>
                <button className="text-gray-800">
                    <Edit className="w-10 h-10" />
                </button>
            </Link>

        </>
    )
}