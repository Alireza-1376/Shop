"use server"

import { OtpType } from "@/types/auth";


export async function veryfyOtp(otp: OtpType) {
    const response = await fetch("http://localhost:4000/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otp }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    if (response.ok) {
        return {
            status: response.status,
            message: data.message
        }
    }
    if (!response.ok) {
        return {
            status: response.status,
            message: data.message
        }
    }
}