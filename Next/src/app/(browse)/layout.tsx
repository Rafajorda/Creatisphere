import React from 'react'
import { Metadata } from 'next'
import StoreProvider from '@/store/StoreProvider'
import { Header } from '@/components/shared/Header/Header'
import Footer from '@/components/shared/Footer'
import { Toaster } from '@/components/ui/toaster'
import { CartButton } from '@/components/Cart/CartButton'

export const metadata: Metadata = {
    title: {
        template: '%s | next.js RealWorld example app',
        default: 'Creatisphere', // a default is required when creating a template
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
                    <body suppressHydrationWarning={true} className='bg-zinc-800'>
                        <Header />
                        {children}
                        <Toaster />
                        <CartButton />
                        <Footer />
                    </body>
                </html>
            </StoreProvider>
        </>
    )
}

export default RootLayout
