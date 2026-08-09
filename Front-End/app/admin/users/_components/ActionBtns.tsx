"use client";

import { changeRole } from "@/actions/admin/changeRole";
import { deleteUser } from "@/actions/admin/deleteUser";
import { User } from "@/types/users";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


function ActionBtns({ user }: { user: User }) {
    const router = useRouter();

    const handleDelete = async () => {
        const value = { id: user._id, phoneNumber: user.phoneNumber }
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
                const result = await deleteUser(value)
                if (result.status == 200) {
                    router.refresh()
                    Swal.fire({
                        title: "حذف !",
                        text: result.message,
                        icon: "success"
                    })
                } else {
                    Swal.fire({
                        title: "حذف !",
                        text: result.message,
                        icon: "error"
                    })
                }
            }
        });
    };

    const handleChangeRole = async () => {
        const value = { id: user._id, phoneNumber: user.phoneNumber }
        const result = await changeRole(value)
        if (result.status == 200) {
            toast.success(result.message, { rtl: true, className: "Font-BYekan" })
            router.refresh()
        } else {
            toast.error(result.message, { rtl: true, className: "Font-BYekan" })
        }
    };

    return (
        <td className="px-6 py-5">
            <div className="flex items-center justify-center gap-2">
                {/* Delete */}
                <button
                    type="button"
                    onClick={handleDelete}
                    title="حذف کاربر"
                    className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                >
                    <RiDeleteBinLine
                        size={18}
                        className="transition-transform group-hover:scale-110"
                    />
                </button>

                {/* Change Role */}
                <button
                    type="button"
                    onClick={handleChangeRole}
                    title={
                        user.role === "admin"
                            ? "تغییر به کاربر"
                            : "تغییر به مدیر"
                    }
                    className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
                >
                    <FaUserShield
                        size={18}
                        className="transition-transform group-hover:scale-110"
                    />
                </button>
            </div>
        </td>
    );
}

export default ActionBtns;
