import React from 'react'
import { Metadata } from 'next'
import StoreProvider from '@/store/StoreProvider'
import { Header } from '@/components/shared/Header/Header'

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
            <StoreProvider>
                <html>
                    <body suppressHydrationWarning={true}>
                        <Header />
                        {children}
                    </body>
                </html>
            </StoreProvider>
        </>
    )
}

export default RootLayout
