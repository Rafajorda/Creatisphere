"use client"

import type React from "react"
import { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import PayPalButton from "../shared/buttons/PayPalButton"

export function PaymentForm({ total }: { total: number | undefined }) {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState<string | null>(null)
    const [processing, setProcessing] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!stripe || !elements || !total) return

        setProcessing(true)
        setError(null)

        const cardElement = elements.getElement(CardElement)
        if (!cardElement) return

        try {
            // Crear PaymentIntent en el backend de Spring Boot
            const response = await fetch("http://localhost:4000/api/payment/process", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total, paymentMethod: "stripe" }),
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
            console.log(err)
            setError("Ha ocurrido un error al procesar el pago.")
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className="space-y-8">
            <div className="mb-4">
                <h1 className="font-semibold text-center">Total amount: {total ? `€${total.toFixed(2)}` : "Cargando..."}</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">
                        Card details:
                    </label>
                    <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm">
                        <CardElement
                            id="card-element"
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                    },
                                    invalid: {
                                        color: "#9e2146",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <Button
                    type="submit"
                    disabled={!stripe || processing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                >
                    {processing ? "Processing..." : "Pay now"}
                </Button>
            </form>
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Or pay with PayPal</h2>
                <PayPalButton total={total} />
            </div>
        </div>
    )
}

