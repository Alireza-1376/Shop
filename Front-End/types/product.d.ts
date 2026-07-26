import { CategoryType } from "./category"

export type ProductType = {
    _id: string
    title: string
    description: string
    images: string[]
    variants: { _id: string, title: string, price: string }[]
    category: CategoryType
    price: string
    createdAt: string
    updatedAt: string
}

export type Products = {
    products: ProductType[],
    currentPage: number,
    totalProducts: number,
    lastPage: number
}