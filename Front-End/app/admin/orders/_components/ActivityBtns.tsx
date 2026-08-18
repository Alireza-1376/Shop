"use client"

import { changeStatus } from "@/actions/admin/changeStatus";
import Link from "next/link";
import { FiEye, FiTruck } from "react-icons/fi";
import { toast } from "react-toastify";

function ActivityBtns({ orderId }: { orderId: string }) {
    async function handleStatus(id: string) {
        const result = await changeStatus(id)
        if (result.status == 200) {
            toast.success(result.message, { rtl: true, className: "Font-BYekan" })
        }
    }

    return (
        <td className="p-4">
            <div className="flex justify-center gap-2">

                {/* مشاهده جزئیات */}
                <Link
                    href={{ pathname: "/admin/orders/detail", query: { id: orderId } }}
                    title="مشاهده جزئیات"
                    className="rounded-lg cursor-pointer bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                >
                    <FiEye size={20} />
                </Link>

                {/* تغییر وضعیت */}
                <button
                    onClick={() => { handleStatus(orderId) }}
                    title="تغییر وضعیت به ارسال شده"
                    className="rounded-lg cursor-pointer bg-green-50 p-2 text-green-600 transition hover:bg-green-100 disabled:opacity-40"
                >
                    <FiTruck size={20} />
                </button>

            </div>
        </td>
    )
}

export default ActivityBtns;