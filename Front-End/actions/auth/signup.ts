"use server"

import { SignupType } from "@/types/auth";

export async function signup(values: SignupType) {
    const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();

    return {
        status: response.status,
        message: data.message
    }
}