import { getAllOrders } from "@/services/orders";
import Link from "next/link";
import { FiArrowRight, FiClock, FiPackage } from "react-icons/fi";

const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

export default async function OrdersPage() {
    const orders = await getAllOrders();

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6"
        >
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="mb-5 cursor-pointer flex items-center gap-2 text-sm text-gray-500 transition hover:text-amber-600"
                    >
                        <FiArrowRight size={18} />
                        <span>بازگشت</span>
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-900">
                        سفارشات من
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        لیست سفارش‌های ثبت شده
                    </p>
                </div>

                {/* Orders */}
                <div className="space-y-4">
                    {orders.length == 0 ?
                        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm">
                            <FiPackage
                                size={40}
                                className="mx-auto mb-4 text-gray-300"
                            />

                            <h2 className="text-sm font-semibold text-gray-700">
                                هیچ سفارشی وجود ندارد
                            </h2>

                            <p className="mt-2 text-xs text-gray-400">
                                هنوز سفارشی برای حساب شما ثبت نشده است.
                            </p>
                        </div>
                        :
                        <>
                            {
                                orders.map((order, index) => (
                                    <div
                                        key={order._id}
                                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                    >
                                        {/* Order Header */}
                                        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                                                <FiPackage
                                                    className="text-amber-600"
                                                    size={18}
                                                />

                                                <span>
                                                    سفارش {index + 1}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <FiClock size={14} />

                                                <span>
                                                    {formatDate(order.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Products */}
                                        <div className="space-y-3">
                                            {order.products.map((product, index) => (
                                                <div
                                                    key={index + 1}
                                                    className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                                                >
                                                    {/* Product Name */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                                                            <FiPackage size={18} />
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800">
                                                                {product.product.title}
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                تعداد:{" "}
                                                                {product.quantity.toLocaleString(
                                                                    "fa-IR"
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Price */}
                                                    <p className="text-sm font-bold text-amber-600">
                                                        {(
                                                            Number(product.product.price) *
                                                            Number(product.quantity)
                                                        ).toLocaleString("en-US")}

                                                        <span className="mr-1 text-xs font-normal text-gray-400">
                                                            تومان
                                                        </span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tracking Code */}
                                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                                            <span>کد پیگیری:</span>

                                            <span className="font-medium text-gray-600">
                                                {order.trackingCode}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    }
                </div>
            </div>
        </main>
    );
}