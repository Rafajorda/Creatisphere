import getCurrentUser from "@/actions/getCurrentUser"
import UserProfileForm from "@/components/forms/SettingForm"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: 'Settings',
}

const Settings = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) return null

    return (
        <div className="settings-page my-10">
            <div className="container page mx-auto max-w-2xl">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <UserProfileForm user={currentUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings