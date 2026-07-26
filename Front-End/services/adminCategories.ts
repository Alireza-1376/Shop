import { Categories, CategoryType } from "@/types/category"


export const getAllCategories = async (page: number, limit?: number) => {
    const response = await fetch(`http://localhost:4000/admin/category?page=${page}&limit=${limit}`, {
        next: {
            tags: ["categories"]
        }
    })
    const data: Categories = await response.json()
    return data
}