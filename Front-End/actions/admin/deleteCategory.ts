"use server"

import { updateTag } from "next/cache"

export async function deleteCategory(id: string) {
    const response = await fetch(`http://localhost:4000/admin/category/${id}`, {
        method: "DELETE"
    })

    if (!response.ok) {
        return {
            success: false,
            message: "خطا در حذف دسته‌بندی",
        }
    }

    updateTag("categories")

    return {
        success: true,
        message: "دسته‌بندی حذف شد",
    }

}