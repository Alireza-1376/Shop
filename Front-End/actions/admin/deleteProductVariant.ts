"use server"

import { updateTag } from "next/cache"

export async function deleteVariant(variantId: string, productId: string) {
    const response = await fetch(`http://localhost:4000/admin/products/deleteVariants?variantId=${variantId}&productId=${productId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        updateTag("products")
        return { success: true , message:"مدل محصول با موفقیت حذف شد"}
    } else {
        return { success: false , message:"حذف مدل محصول با خطا مواجه شد" }
    }
}