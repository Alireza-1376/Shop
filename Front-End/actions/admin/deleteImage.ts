"use server"

import { updateTag } from "next/cache"

export async function deleteProductImage(image: string, productId: string) {
    const response = await fetch(`http://localhost:4000/admin/products/image/${productId}`, {
        method: "DELETE",
        body: JSON.stringify({ image }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(response.ok){
        updateTag("products")
        return {statusCode:response.status}
    }
}