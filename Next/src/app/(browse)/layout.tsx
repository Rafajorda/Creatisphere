import React from 'react'
import { Metadata } from 'next'
import StoreProvider from '@/store/StoreProvider'
import { Header } from '@/components/shared/Header/Header'
import Footer from '@/components/shared/Footer'
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
                    <html lang='en'>
                        <body suppressHydrationWarning={true}>
                            <Header />
                            {children}
                            <Footer />
                        </body>
                    </html>
            </StoreProvider>
        </>
    )
}

export default RootLayout
