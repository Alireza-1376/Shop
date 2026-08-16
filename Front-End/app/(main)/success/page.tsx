import { getOneOrder } from "@/services/orders";
import Link from "next/link";
import { FiCheckCircle, FiArrowLeft, FiShoppingBag } from "react-icons/fi";

export default async function PaymentSuccess({searchParams}:{searchParams: Promise<{ [key: string]: string}>}) {
    const {orderId} = await searchParams ;
    
    const order = await getOneOrder(orderId);

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg border border-green-100">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <FiCheckCircle className="h-10 w-10 text-green-600" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900">
                    پرداخت با موفقیت انجام شد
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-500">
                    پرداخت شما با موفقیت ثبت شد.
                    <br />
                    از خرید شما متشکریم ❤️
                </p>

                {/* Payment info */}
                <div className="mt-6 rounded-xl bg-green-50 p-4 text-right">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                            مبلغ پرداختی
                        </span>

                        <span className="font-bold text-gray-800">
                            {order.amount.toLocaleString("en-US")} تومان
                        </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                            شماره پیگیری
                        </span>

                        <span className="font-medium text-gray-800">
                            {order.trackingCode}
                        </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                            وضعیت پرداخت
                        </span>

                        <span className="font-medium text-green-600">
                            موفق
                        </span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 space-y-3">

                    <Link
                        href="/orders"
                        className="flex cursor-pointer w-full items-center justify-center gap-2
                       rounded-xl bg-green-600 px-4 py-3
                       font-medium text-white transition
                       hover:bg-green-700"
                    >
                        <FiShoppingBag className="h-5 w-5" />
                        مشاهده سفارش
                    </Link>

                    <Link
                        href="/"
                        className="flex cursor-pointer w-full items-center justify-center gap-2
                       rounded-xl border border-gray-200 px-4 py-3
                       font-medium text-gray-700 transition
                       hover:bg-gray-50"
                    >
                        <FiArrowLeft className="h-5 w-5" />
                        بازگشت به فروشگاه
                    </Link>

                </div>

                {/* Footer */}
                <p className="mt-6 text-xs text-gray-400">
                    رسید پرداخت برای شما ثبت شد.
                    <br />
                    می‌توانید جزئیات سفارش خود را مشاهده کنید.
                </p>

            </div>
        </div>
    );
}