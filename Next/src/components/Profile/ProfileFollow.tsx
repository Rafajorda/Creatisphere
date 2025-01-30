import { UserFollower } from "@/types/Follow";
import { UserProfileResponse } from "@/types/UserProfile";
import Link from "next/link";
import React from "react";

interface ProfileFollowProps {
    profile: UserProfileResponse,
    isFollower: boolean
}

export const ProfileFollow = ({ profile, isFollower }: ProfileFollowProps) => {
    return (
        <>
            {!isFollower ?
                <h1>Following ({profile.following.length}):</h1>
                :
                <h1>Followers ({profile.followers.length}):</h1>
            }

            {!isFollower ?
                profile.following.map((follows: UserFollower) => (
                    <Link key={follows.id} href={`/Profile/${follows.username}`}>
                        <img
                            src={follows.avatar || '/default-avatar.png'}
                            alt={follows.username}
                            width={100}
                            height={100}
                        />
                        <h5>{follows.username}</h5>
                    </Link>
                ))
                :
                profile.followers.map((follower: UserFollower) => (
                    <Link key={follower.id} href={`/Profile/${follower.username}`}>
                        <img
                            src={follower.avatar || '/default-avatar.png'}
                            alt={follower.username}
                            width={100}
                            height={100}
                        />
                        <h5>{follower.username}</h5>
                    </Link >
                ))
            }
        </>
    )
}