import { AdminTabs } from '@/components/Admin/AdminTabs'
import React from 'react'

const AdminPage = async () => {
    return (
        <div className="profile-page text-white text-xl container mx-auto">

            <AdminTabs />
        </div>
    )
}

export default AdminPage;