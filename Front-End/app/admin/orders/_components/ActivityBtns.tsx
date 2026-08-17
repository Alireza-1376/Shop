"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiTruck } from "react-icons/fi";

function ActivityBtns({ orderId }: { orderId: string }) {
    const router = useRouter();
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