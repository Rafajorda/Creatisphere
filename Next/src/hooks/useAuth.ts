"use client"

import { signOut } from "next-auth/react"

export const useLogout = async () => {
    await signOut({ callbackUrl: "/" })
}