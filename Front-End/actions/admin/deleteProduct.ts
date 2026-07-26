"use server"

import { updateTag } from "next/cache"

export async function deleteProduct(productId: string) {
    const response = await fetch(`http://localhost:4000/admin/products/${productId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        updateTag("products")
        return { statusCode: response.status }
    }
}