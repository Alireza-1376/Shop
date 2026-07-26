"use server"

import { updateTag } from "next/cache"

export async function createProductVariant(state: { success: boolean, message: string }, formData: FormData) {
    const title = formData.get("title")
    const price = formData.get("price")
    const productId = formData.get("productId")
    const variantId = formData.get("variantId")
    if (variantId) {
        const response = await fetch(`http://localhost:4000/admin/products/updateVariant?productId=${productId}&variantId=${variantId}`, {
            method: "PUT",
            body: JSON.stringify({ title, price }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            return { success: false, message: "ویرایش مدل محصول با خطا مواجه شد. لطفاً دوباره تلاش کنید." }
        }

        if (response.ok) {
            updateTag("products")
            return { success: true, message: "مدل محصول با موفقیت ویرایش شد" }
        }
    } else {
        const response = await fetch(`http://localhost:4000/admin/products/variants/${productId}`, {
            method: "POST",
            body: JSON.stringify({ title, price }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            return { success: false, message: "ثبت مدل محصول با خطا مواجه شد. لطفاً دوباره تلاش کنید." }
        }

        if (response.ok) {
            updateTag("products")
            return { success: true, message: "مدل محصول با موفقیت ثبت شد" }
        }
    }

    return state;
}