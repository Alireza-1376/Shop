import { UsersType } from "@/types/users";

export async function getAllUsers(page: number, limit?: number) {
    const response = await fetch(`http://localhost:4000/admin/users?page=${page}&limit=${limit}`);
    const data: UsersType = await response.json();
    return data;
}