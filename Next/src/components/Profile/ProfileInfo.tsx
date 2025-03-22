import getCurrentUser from "@/actions/getCurrentUser"
import type { UserProfileResponse } from "@/types/UserProfile"
import Image from "next/image"
import React from "react"
import { EditProfileButton } from "../shared/buttons/EditProfileButton"
import FollowButton from "../shared/buttons/followButton"

interface ProfileInfoProps {
    profile: UserProfileResponse
}

export const ProfileInfo = async ({ profile }: ProfileInfoProps) => {
    const currentUser = await getCurrentUser()
    const isCurrentUser = currentUser?.profile?.username === profile.username

    return (
        <>
            <div className={`bg-white shadow-xl rounded-3xl overflow-hidden max-w-md mx-auto my-5`}>
                <div className={`relative h-64 bg-gradient-to-r from-teal-200 to-teal-800 shadow-md`}>
                    <Image
                        src={profile.avatar || "/placeholder.svg?height=200&width=200"}
                        alt={profile.username}
                        fill
                    />
                </div>
                <div className={`py-5 px-4 grid grid-cols-5`}>
                    <div className="col-span-4 ml-3">
                        <h1 className={`text-xl font-bold text-gray-800 mb-1`}>{profile.username}</h1>
                        <p className="text-gray-600 text-base italic">{profile.bio}</p>
                    </div>
                    <div className="col-span-1 text-end mr-4">
                        {isCurrentUser && (
                            <EditProfileButton />
                        )}
                        {!isCurrentUser && (
                            
                            <FollowButton author={profile.username} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

