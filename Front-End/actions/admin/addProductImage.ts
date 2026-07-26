"use server"

import { updateTag } from "next/cache";

export async function addImage(state: { statusCode: number }, formData: FormData) {
    const image = formData.get('image') as File;
    const productId = formData.get('productId');
    const payload = new FormData();
    payload.append("productId", String(productId))
    payload.append("image", image)
    const response = await fetch("http://localhost:4000/admin/products/image", {
        method: "POST",
        body: payload
    })
    if (response.ok) {
        updateTag("products")
        return { statusCode: response.status }
    }


    return state ;
}