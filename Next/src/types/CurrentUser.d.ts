import { UserFollower } from "./Follow"
import { ProfileItem } from "./Profile"

export interface currentUser {
    id: int
    email: string
    // username: string
    profile: ProfileItem | null
    following: UserFollower[]
    followers: UserFollower[]
}