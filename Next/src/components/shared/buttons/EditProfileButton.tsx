import { Edit } from "lucide-react"
import React from "react"

export const EditProfileButton = () => {

    return (
        <>
            <button className="row flex">
                Edit Profile
                <Edit className="ml-3" />
            </button>
        </>
    )
}