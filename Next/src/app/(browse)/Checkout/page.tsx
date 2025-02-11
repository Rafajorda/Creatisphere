import getCurrentUser from '@/actions/getCurrentUser';
import { PaymentForm } from '@/components/forms/PaymentForm';
import { StripeProvider } from '@/components/StripeProvider';
import { redirect } from 'next/navigation';
import React from 'react';

const Checkout = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        redirect('/Login');
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
            <h1 className="text-4xl font-bold mb-8">Stripe Demo - Pago en Euros (€)</h1>
            <p className="mb-4">
                Tarjeta de prueba: <code>4242 4242 4242 4242</code>
            </p>
            <div className="w-full max-w-md">
                <StripeProvider>
                    <PaymentForm />
                </StripeProvider>
            </div>
        </main>
    )
};

export default Checkout;