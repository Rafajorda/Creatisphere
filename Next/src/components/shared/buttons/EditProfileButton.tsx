"use client"

import { Edit } from "lucide-react"
import { useSession } from "next-auth/react"
import React from "react"

interface EditProfileButtonProps {
    usernameProfile: string
}

export const EditProfileButton = ({ usernameProfile }: EditProfileButtonProps) => {
    const { data } = useSession();
    const isCurrentUser = usernameProfile === data?.user.username;

    return (
        <>
            {isCurrentUser && (
                <button className="row flex">
                    Edit Profile
                    <Edit className="ml-3" />
                </button>
            )}
        </>
    )
}