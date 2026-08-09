export type User = {
    _id: string
    username: string
    email: string
    role: string
    createdAt: string
    phoneNumber:string
}


export type UsersType = {
    users: User[],
    currentPage: number,
    totalUsers: number,
    lastPage: number
}