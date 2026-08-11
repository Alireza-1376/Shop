"use client"
import { deleteAllCartItems } from "@/actions/cart/deleteAllCartItems"
import { BsTrash } from "react-icons/bs"

function DeleteCartBtn() {
    async function handleDeleteAllCartItems() {
        const result = await deleteAllCartItems()
    }
    return (
        <button onClick={() => { handleDeleteAllCartItems() }} className="cursor-pointer hover:text-red-500">
            <BsTrash size={24} />
        </button>
    )
}

export default DeleteCartBtn