"use server"

import { updateTag } from "next/cache";

export async function changeStatus(id: string) {
    const response = await fetch("http://localhost:4000/admin/change-status", {
        method: "PUT",
        body: JSON.stringify({ id }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    updateTag("orders")
    return {
        status: response.status,
        message: data.message
    }
}