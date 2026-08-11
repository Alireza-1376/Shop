"use client"
import { addToCart } from "@/actions/cart/addToCart";
import { deleteFromCart } from "@/actions/cart/deleteFromCart";

function AddToCartBtns({ quantity, productId, variantId }: { quantity: number, productId: string, variantId?: string }) {

    async function handleAddToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productId: string, variantId?: string) {
        e.stopPropagation()
        const result = await addToCart(productId, variantId)
    }

    async function handleDeleteFromCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productId: string, variantId?: string) {
        e.stopPropagation()
        const result = await deleteFromCart(productId, variantId)
    }

    return (
        <div className="bg-amber-600 text-white flex items-center gap-2 px-2 rounded-full text-lg">
            <button onClick={(e) => { handleAddToCart(e, productId, variantId) }} className="px-1 cursor-pointer">+</button>
            <p>{quantity}</p>
            <button onClick={(e) => { handleDeleteFromCart(e, productId, variantId) }} className="px-1 cursor-pointer">-</button>
        </div>
    )
}

export default AddToCartBtns;