import type { UserProfileResponse } from "@/types/UserProfile"
import React from "react"

interface ProfileFavoritesProps {
    profile: UserProfileResponse
}

export const ProfileOrders = ({ profile }: ProfileFavoritesProps) => {
    return (
        <>
            <div className="grid grid-cols-4 mb-5">
                <h1>orders {profile.username}</h1>
            </div>
        </>
    )
}

