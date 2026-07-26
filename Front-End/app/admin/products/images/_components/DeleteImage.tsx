'use client'
import { deleteProductImage } from "@/actions/admin/deleteImage";
import { RiDeleteBinLine } from "react-icons/ri"
import { toast } from "react-toastify";

function DeleteImage({ image, productId }: { image: string, productId: string }) {
    async function handleDelete(image: string, productId: string) {
        const result = await deleteProductImage(image, productId)
        if (result?.statusCode == 200) {
            toast.success("تصویر با موفقیت حذف شد", { rtl: true, className: "Font-BYekan" })
        }
    }
    return (
        <button
            onClick={() => { handleDelete(image, productId) }}
            type="button"
            className="absolute cursor-pointer top-3 left-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:scale-110"
        >
            <RiDeleteBinLine size={20} />
        </button>
    )
}

export default DeleteImage;