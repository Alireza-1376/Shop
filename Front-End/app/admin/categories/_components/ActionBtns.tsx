'use client'
import { deleteCategory } from "@/actions/admin/deleteCategory";
import { useState } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri"
import Swal from "sweetalert2";
import Modal from "./Modal";
import { CategoryType } from "@/types/category";

function ActionBtns({ category}: { category :CategoryType }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleDelete(id: string) {
        Swal.fire({
            title: "حذف !",
            text: "آیا مطمئن هستید ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "بله",
            cancelButtonText: "انصراف"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteCategory(id)
                if (response.success) {
                    Swal.fire({
                        title: "حذف !",
                        text: "عملیات با موفقیت انجام شد",
                        icon: "success"
                    })
                } else {
                    Swal.fire({
                        title: "حذف !",
                        text: "عملیات ناموفق",
                        icon: "error"
                    })
                }
            }
        });
    }
    return (
            <td className="px-6 py-5 text-center">
                <div className="flex items-center justify-center gap-3">
                    <button onClick={() => { setIsModalOpen(true) }} className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all">
                        <RiEdit2Line size={18} />
                    </button>

                    <button onClick={() => { handleDelete(category._id) }} className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all">
                        <RiDeleteBinLine size={18} />
                    </button>
                </div>
                {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} category={category}/>}
            </td>
    
    )
}

export default ActionBtns;