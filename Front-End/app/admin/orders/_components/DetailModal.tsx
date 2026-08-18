import { getOneOrder } from "@/services/orders";

import {
    FiPhone,
    FiMapPin,
    FiCreditCard,
    FiPackage,
    FiCalendar,
} from "react-icons/fi";
import BackBtn from "./BackBtn";

export default async function OrderModal({ id }: { id: string }) {
    const order = await getOneOrder(String(id));
    console.log(order)
    return (
        <div
            dir="rtl"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
            <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white">

                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b p-5">
                    <h2 className="text-xl font-bold">
                        جزئیات سفارش
                    </h2>

                    <BackBtn customClass="rounded-lg cursor-pointer p-2 hover:bg-gray-100" />
                </div>
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto scrollbar-thin p-5">

                    <div className="flex gap-3 rounded-xl bg-gray-50 p-4">
                        <FiPhone className="mt-1 text-blue-600" />

                        <div>
                            <p className="text-xs text-gray-500">
                                شماره موبایل
                            </p>
                            <p className="mt-1 font-medium">
                                {order.phoneNumber}
                            </p>
                        </div>
                    </div>

                    {/* آدرس */}
                    <div className="flex gap-3 rounded-xl bg-gray-50 p-4">
                        <FiMapPin className="mt-1 text-red-500" />

                        <div>
                            <p className="text-xs text-gray-500">
                                آدرس
                            </p>

                            <p className="mt-1 text-sm leading-6">
                                {order.address}
                            </p>
                        </div>
                    </div>

                    {/* اطلاعات */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        <div className="rounded-xl bg-gray-50 p-4">
                            <FiPackage className="mb-2 text-purple-600" />

                            <p className="text-xs text-gray-500">
                                کد پیگیری
                            </p>

                            <p className="mt-1 font-bold">
                                {order.trackingCode}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                            <FiCreditCard className="mb-2 text-green-600" />

                            <p className="text-xs text-gray-500">
                                مبلغ
                            </p>

                            <p className="mt-1 font-bold">
                                {order.amount.toLocaleString("en-US")} تومان
                            </p>
                        </div>

                    </div>

                    {/* وضعیت */}
                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs text-gray-500">
                            وضعیت سفارش
                        </p>

                        <span
                            className={`mt-2 inline-block rounded-lg px-3 py-2 text-sm ${order?.situation === "sent"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {order?.situation === "sent"
                                ? "ارسال شده"
                                : "در انتظار بررسی"}
                        </span>
                    </div>

                    {/* محصولات */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <FiPackage />
                            <h3 className="font-bold">
                                محصولات
                            </h3>
                        </div>

                        <div className="space-y-2">
                            {order.products?.map((product, index) => {
                                const variant = product.product.variants.find((v) => {
                                    return v._id == product.variant
                                })
                                return (
                                    <div key={index + 1} className="flex items-center justify-between rounded-xl border p-3">

                                        {variant ?
                                            <span className="text-sm">
                                                {variant.title}
                                            </span>
                                            :
                                            <span className="text-sm">
                                                {product.product.title}
                                            </span>
                                        }



                                        <span className="text-sm text-gray-500">
                                            تومان {Number(product.product.price).toLocaleString("en-US")} × {product.quantity}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* تاریخ */}
                    <div className="flex items-center gap-2 border-t pt-4 text-sm text-gray-500">
                        <FiCalendar />

                        {order.createdAt &&
                            new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </div>

                </div>

                {/* Footer */}
                <div className="shrink-0 border-t bg-white p-4">
                    <BackBtn title="بستن" customClass="w-full cursor-pointer flex flex-1 justify-center rounded-xl bg-gray-900 py-3 text-white transition hover:bg-gray-800" />
                </div>

            </div>
        </div >
    );
}