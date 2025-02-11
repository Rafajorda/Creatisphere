"use client"

import React, { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PayPalButton from "../shared/buttons/PayPalButton"

export function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState<string | null>(null)
    const [processing, setProcessing] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!stripe || !elements) return

        setProcessing(true)
        setError(null)

        const cardElement = elements.getElement(CardElement)
        if (!cardElement) return

        const amount = (event.target as HTMLFormElement).amount.value

        try {
            // Crear PaymentIntent en el backend de Spring Boot
            const response = await fetch("http://localhost:4000/api/payments/payment/process", {
                // const response = await fetch("http://localhost:8080/api/payment/process", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Number.parseInt(amount), paymentMethod: 'stripe' }), // Convertir a centavos
            })

            if (!response.ok) {
                throw new Error("Error al crear el PaymentIntent")
            }

            const data = await response.json()

            // Confirmar el pago en el cliente
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card: cardElement },
            })

            if (stripeError) {
                setError(stripeError.message || "Ha ocurrido un error al procesar el pago.")
            } else if (paymentIntent?.status === "succeeded") {
                alert("¡Pago realizado con éxito!")
                // Aquí puedes redirigir al usuario o actualizar el estado de la aplicación
            }
        } catch (err) {
            console.log(err);
            setError("Ha ocurrido un error al procesar el pago.")
        } finally {
            setProcessing(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Monto a pagar (EUR):
                    </label>
                    <Input type="number" id="amount" name="amount" required min="1" defaultValue="10" />
                </div>
                <div>
                    <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
                        Detalles de la tarjeta:
                    </label>
                    <div className="mt-1">
                        <CardElement id="card-element" options={{ style: { base: { fontSize: "16px" } } }} />
                    </div>
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <Button type="submit" disabled={!stripe || processing}>
                    {processing ? "Procesando..." : "Pagar"}
                </Button>
            </form>
            <h1>paga con paypal</h1>
            <PayPalButton />
        </>

    )
}

