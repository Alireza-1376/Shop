"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function changeRole(value: { id: string, phoneNumber: string }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch(`http://localhost:4000/admin/change-role`, {
        method: "PUT",
        body: JSON.stringify(value),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    revalidatePath("/admin/users")
    return {
        status: response.status,
        message: data.message
    }
}