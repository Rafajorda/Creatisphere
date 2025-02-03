import getUserProfile from "@/actions/getUserProfile"
import { signOut } from "next-auth/react"

export const useLogout = async () => {
    await signOut({ callbackUrl: "/" })
}

export const useGetProfile = async (originUsername: string) => {
    const username = decodeURIComponent(originUsername).replace(/@/, '')
    const profile = await getUserProfile(username)
    return profile
}