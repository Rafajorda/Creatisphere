import getCurrentUser from "@/actions/getCurrentUser"
import type { UserProfileResponse } from "@/types/UserProfile"
import Image from "next/image"
import React from "react"
import { EditProfileButton } from "../shared/buttons/EditProfileButton"

interface ProfileInfoProps {
    profile: UserProfileResponse
}

export const ProfileInfo = async ({ profile }: ProfileInfoProps) => {
    const currentUser = await getCurrentUser()
    const isCurrentUser = currentUser?.profile?.username === profile.username

    return (
        <>
            <div className={`bg-white shadow-xl rounded-3xl overflow-hidden max-w-md mx-auto my-5`}>
                <div className={`relative h-64 bg-gradient-to-r from-light-gold to-dark-gold shadow-md`}>
                    <Image
                        src={profile.avatar || "/placeholder.svg?height=200&width=200"}
                        alt={profile.username}
                        fill
                    />
                </div>
                <div className={`py-5 px-4 grid grid-cols-5`}>
                    <div className="col-span-4 ml-3">
                        <h1 className={`text-xl font-bold text-gray-800 mb-1`}>{profile.username}</h1>
                        {/* <p className="text-gray-600 text-base italic">{profile.bio}</p> */}
                        <p className="text-gray-600 text-base italic">ASDLASLHD KLASDHJK LSAHJK JAH KSDHJK SAJKDSA JHSAJHK D JHKAS JKSAJK</p>
                    </div>
                    <div className="col-span-1 text-end mr-4">
                        {isCurrentUser && (
                            <EditProfileButton />
                        )}
                    </div>
                </div>
            </div>
        </>
        // <div className="bg-white rounded-lg overflow-hidden max-w-md mx-auto">
        //     <div className="relative h-48 bg-zinc-800">
        //         <div className="absolute bottom-0">
        //             <Image
        //                 src={profile.avatar || "/placeholder.svg?height=200&width=200"}
        //                 alt={profile.username}
        //                 width={128}
        //                 height={128}
        //                 className="rounded-full border-4 border-white shadow-md"
        //             />
        //         </div>
        //     </div>
        //     <div className="pt-16 pb-8 px-6 text-center">
        //         <h1 className="text-2xl font-bold text-gray-800 mb-2">{profile.username}</h1>
        //         <p className="text-gray-600 text-sm mb-4">{profile.bio}</p>
        //         <div className="">
        //             {isCurrentUser && (
        //                 <EditProfileButton />
        //             )}
        //         </div>
        //     </div>
        // </div>
    )
}

