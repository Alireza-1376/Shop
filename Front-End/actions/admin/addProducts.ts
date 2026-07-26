"use server"

import { updateTag } from "next/cache";

export async function createProducts(state: { statusCode: number }, formData: FormData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const categoryId = formData.get('categoryId');
    const productId = formData.get("productId");
    const price = formData.get("price");

    if (productId) {
        const response = await fetch(`http://localhost:4000/admin/products/${productId}`, {
            method: "PUT",
            body: JSON.stringify({ title, description, categoryId, price }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            updateTag("products")
            return { statusCode: response.status }
        }
    } else {
        const response = await fetch("http://localhost:4000/admin/products", {
            method: "POST",
            body: JSON.stringify({ title, description, categoryId, price }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            updateTag("products")
            return { statusCode: response.status }
        }
    }

    return state;

}