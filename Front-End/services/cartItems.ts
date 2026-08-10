import { CartItemsType } from "@/types/cartItems";
import { cookies } from "next/headers";

export async function getCartItems() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch("http://localhost:4000/cart", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: {
            tags: ["cartItems"]
        }
    })
    const data: CartItemsType = await response.json()
    return data;
}