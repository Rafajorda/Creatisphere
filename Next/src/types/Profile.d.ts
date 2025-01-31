import { Profile } from "@prisma/client";

export interface ProfileItem extends Omit<Profile, 'updatedAt'> {
    id: number;
    createdAt: Date;
    username: string;
    bio: string | null;
    avatar: string | null;
    userId: number;
}

export interface ProfileResponse {
    profile: ProfileItem[];
}