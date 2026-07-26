import { Products, ProductType } from "@/types/product"

export const getAllProducts = async (page: number, limit?: number) => {
    const response = await fetch(`http://localhost:4000/admin/products?page=${page}&limit=${limit}`, {
        next: {
            tags: ["products"]
        }
    })
    const data: Products = await response.json()
    return data;
}

export const getOneProduct = async (id: string) => {
    const response = await fetch(`http://localhost:4000/admin/products/${id}`)
    const data: ProductType = await response.json()
    return data
}