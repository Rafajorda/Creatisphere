import React from 'react'
import { Metadata } from 'next'
import ReduxProvider from '@/store/provider'

export const metadata: Metadata = {
    title: {
        template: '%s | next.js RealWorld example app',
        default: 'Conduit | next.js RealWorld example app', // a default is required when creating a template
    },
    description: 'Powered by Next.js',
}

interface RootLayoutProps {
    children: React.ReactNode
    params: { locale: string }
}

function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html>
                <body suppressHydrationWarning={true}>
                    <ReduxProvider>{children}</ReduxProvider>
                </body>
            </html>
        </>
    )
}

export default RootLayout
