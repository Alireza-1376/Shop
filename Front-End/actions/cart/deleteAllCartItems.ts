"use server"

import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteAllCartItems() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch("http://localhost:4000/delete-all-cartItems", {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.json();
    updateTag("cartItems")
    return {
        status: response.status,
        message: data.message
    }

}