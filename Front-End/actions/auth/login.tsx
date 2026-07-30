"use server"

import { PhoneNumberType } from "@/types/auth"

export async function sendPhoneNumber(phoneNumber: PhoneNumberType) {

    const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        body: JSON.stringify({ phoneNumber }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();

    if (response.ok) {
        return {
            status: response.status,
            data: data
        }
    }
    
    if (!response.ok) {
        return {
            status: response.status,
            data: data
        }
    }
}