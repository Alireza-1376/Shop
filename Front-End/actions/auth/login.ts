"use server"

import { PasswordType } from "@/types/auth";
import { cookies } from "next/headers";

export async function login(password: PasswordType, phoneNumber: string) {
    const response = await fetch("http://localhost:4000/auth/password", {
        method: "POST",
        body: JSON.stringify({ password, phoneNumber }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    console.log(data)
    const cookieStore = await cookies()
    cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/"
    });

    return {
        status: response.status,
        message: data.message,
    }
}