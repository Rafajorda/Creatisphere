import { UserFollower } from "@/types/Follow";
import { UserProfileResponse } from "@/types/UserProfile";
import React from "react";
import { CardProfile } from "../shared/Cards/CardProfile";

interface ProfileFollowProps {
    profile: UserProfileResponse,
    isFollower: boolean
}

export const ProfileFollow = ({ profile, isFollower }: ProfileFollowProps) => {
    return (
        <>
            <div className="grid grid-cols-4 gap-6">
                {!isFollower ?
                    profile.following.map((follows: UserFollower) => (
                        <CardProfile profile={follows} key={follows.id} />
                    ))
                    :
                    profile.followers.map((follower: UserFollower) => (
                        <CardProfile profile={follower} key={follower.id} />
                    ))
                }
            </div>

        </>
    )
}