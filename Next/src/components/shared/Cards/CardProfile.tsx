import { UserFollower } from "@/types/Follow";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProfileProps {
    profile: UserFollower
}

export const CardProfile = ({ profile }: CardProfileProps) => {
    return (
        <>
            <Link href={`/Profile/${profile.username}`}>
                <div className={`bg-white shadow-sm rounded-lg overflow-hidden mx-auto my-5`}>
                    <div className={`relative h-24 bg-gradient-to-r from-light-gold to-dark-gold shadow-md`}>
                        {/* <div className={`absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-1/3`}> */}
                        <div className={`absolute bottom-0 translate-x-4 translate-y-10`}>
                            <Image
                                src={profile.avatar || "/placeholder.svg?height=200&width=200"}
                                alt={profile.username}
                                width={120}
                                height={120}
                                className="rounded-full border-4 border-zinc-800 shadow-md"
                            />
                        </div>
                    </div>
                    <div className={`pt-10 pb-4 px-4 text-end`}>
                        <h1 className={`text-xl font-bold text-gray-800 mb-1`}>{profile.username}</h1>
                        <p className="text-gray-600 text-base italic">{profile.bio}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}