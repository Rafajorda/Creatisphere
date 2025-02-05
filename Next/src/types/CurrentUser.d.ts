import { $Enums } from "@prisma/client"
import { UserFollower } from "./Follow"
import { ProfileItem } from "./Profile"

export interface currentUser {
    id: int
    email: string
    // username: string
    role: $Enums.role
    profile: ProfileItem | null
    following: UserFollower[]
    followers: UserFollower[]
}