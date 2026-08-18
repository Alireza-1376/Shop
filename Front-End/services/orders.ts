import { Order, OrdersType } from "@/types/order";
import { cookies } from "next/headers";

export async function getOneOrder(id: string) {
    const response = await fetch("http://localhost:4000/order", {
        method: "POST",
        body: JSON.stringify({ orderId: id }),
        headers: {
            "Content-Type": `application/json`
        }
    })
    const data: Order = await response.json();
    return data;
}

export async function getAllOrders() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch("http://localhost:4000/orders", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        next: {
            tags: ["orders"]
        }
    })

    const data: Order[] = await response.json();
    return data;
}

export async function getAllOrdersForAdmin(page: number, limit?: number) {
    const response = await fetch(`http://localhost:4000/admin/get-orders?page=${page}&limit=${limit}`, {
        next: {
            tags: ["orders"]
        }
    })

    const data: OrdersType = await response.json();
    return data;
}