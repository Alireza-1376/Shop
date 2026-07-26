export type CategoryType = {
    _id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
}

export type Categories = {
    categories: CategoryType[]
    currentPage: number
    lastPage: number
    totalCategory: number
}