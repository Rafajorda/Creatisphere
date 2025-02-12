import { $Enums } from "@prisma/client"
import { UserFollower } from "./Follow"
import { ProfileItem } from "./Profile"
import { CartResponse } from "./Cart"

export interface currentUser {
    id: int
    email: string
    // username: string
    role: $Enums.role
    cart: CartResponse[]
    profile: ProfileItem | null
    following: UserFollower[]
    followers: UserFollower[]
}