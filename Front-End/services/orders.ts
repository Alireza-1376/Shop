import { Order } from "@/types/order";
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
        }
    })

    const data: Order[] = await response.json();
    return data;
}