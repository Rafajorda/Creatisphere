import { UserProfileResponse } from "@/types/UserProfile";
import React from "react";

interface ProfileInfoProps {
    profile: UserProfileResponse
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
    return (
        <h1>{profile.username}</h1>
    )
}