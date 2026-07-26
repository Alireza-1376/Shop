"use client"
import { deleteVariant } from "@/actions/admin/deleteProductVariant";
import Link from "next/link";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri"
import { toast } from "react-toastify";

function ActivityBtns({ variantId, productId }: { variantId: string, productId: string }) {

    async function handleDelete(variantId: string, productId: string) {
        const data = await deleteVariant(variantId, productId)
        if (data.success) {
            toast.success(data.message, { rtl: true, className: "Font-BYekan" })
        } else {
            toast.error(data.message, { rtl: true, className: "Font-BYekan" })
        }
    }

    return (
        <div className="flex gap-3">
            <Link href={{ pathname: "/admin/products/subbranch", query: { productId: productId, variantId: variantId } }}
                className="w-11 h-11 cursor-pointer rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition flex items-center justify-center"
            >
                <RiEdit2Line size={18} />
            </Link>

            <button
                onClick={() => { handleDelete(variantId, productId) }}
                className="w-11 h-11 cursor-pointer rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center"
            >
                <RiDeleteBinLine size={18} />
            </button>
        </div>
    )
}

export default ActivityBtns;