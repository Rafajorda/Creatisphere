"use client"

import { fetchWrapper } from "@/utils/fetch"
import { useFollow } from "@/components/FollowProvider"
import React, { useState, useEffect } from "react"

interface FollowButtonProps {
    author: string
}

const FollowButton = ({ author }: FollowButtonProps) => {
    console.log('FollowButton author', author)
    const [loading, setLoading] = useState(false)
    const { following, setFollowing } = useFollow()
    const [localFollowing, setLocalFollowing] = useState(following)

    useEffect(() => {
        setLocalFollowing(following)
    }, [following])

    const handleFavorites = async () => {
        setLoading(true)
        setLocalFollowing(!localFollowing) // Optimistic update
        try {
            const data = localFollowing
                ? await fetchWrapper(`/api/profile/${author}/follow`, "DELETE")
                : await fetchWrapper(`/api/profile/${author}/follow`, "POST")

            if (data) {
                setFollowing(data.isFollowing)
            }
        } catch (error) {
            setLocalFollowing(!localFollowing) // Revert optimistic update if there's an error
            console.error("Error updating follow status:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button onClick={handleFavorites} disabled={loading} className="bg-black text-white px-4 py-2 rounded">
            {localFollowing ? "following" : "Not following"}
        </button>
    )
}

export default FollowButton

