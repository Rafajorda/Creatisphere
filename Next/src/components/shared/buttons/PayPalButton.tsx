"use client"
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js"
import React from "react"

export default function PayPalButton({ total }: { total: number | undefined }) {
    const createOrder = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/payment/process", {
                // const response = await fetch("http://localhost:8080/api/payment/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: total,
                    paymentMethod: "paypal",
                }),
            })
            const orderData = await response.json()
            return orderData.id
        } catch (error) {
            console.error("Error creating order:", error)
            throw error
        }
    }

    const onApprove = async (data: { orderID: string }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/payment/capture/${data.orderID}`, {
                // const response = await fetch(`http://localhost:8080/api/payment/capture/${data.orderID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const orderData = await response.json()
            alert("Pago completado con éxito")
        } catch (error) {
            alert("Hubo un problema con el pago")
            console.error("Error capturing order:", error)
        }
    }

    return (
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "", currency: "EUR" }}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} fundingSource={FUNDING.PAYPAL} />
        </PayPalScriptProvider>
    )
}

