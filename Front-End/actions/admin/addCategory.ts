"use server"

import { updateTag } from "next/cache";

export async function createCategory(state: { statusCode: number }, formData: FormData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const categoryId = formData.get('categoryId');

    if (categoryId) {
        const response = await fetch(`http://localhost:4000/admin/category/${categoryId}`, {
            method: "PUT",
            body: JSON.stringify({ title, description }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.status == 200) {
            updateTag("categories")
            return { statusCode: response.status }
        }
    } else {
        const response = await fetch("http://localhost:4000/admin/category", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.status == 201) {
            updateTag("categories")
            return { statusCode: response.status }
        }
    }

    return state;

}