"use server"
import { EditProfile } from "@/types/auth";
import { revalidatePath } from "next/cache";


export async function editProfile(values: EditProfile) {
    const response = await fetch(`http://localhost:4000/auth/edit-profile`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    revalidatePath("/")
    revalidatePath("/profile")
    return {
        status: response.status,
        message: data.message
    }
}