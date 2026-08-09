"use server"

import { revalidatePath } from "next/cache";

export async function deleteUser(value: { id: string, phoneNumber: string }) {
    const response = await fetch(`http://localhost:4000/admin/user`, {
        method: "DELETE",
        body: JSON.stringify(value),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    revalidatePath("/admin/users")
    return {
        status: response.status,
        message: data.message
    }
}