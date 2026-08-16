"use server"

import { redirect } from "next/navigation"

export async function paymentRequest(values: { phoneNumber: string, address: string }) {
    const response = await fetch("http://localhost:4000/cart-paymentRequest", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()

    redirect(data.url)
}