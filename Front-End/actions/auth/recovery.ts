"use server"
import { RecoveryPassword } from "@/types/auth";

export async function recoveryPassword(value: RecoveryPassword) {
    const response = await fetch("http://localhost:4000/auth/recovery", {
        method: "PUT",
        body: JSON.stringify(value),
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