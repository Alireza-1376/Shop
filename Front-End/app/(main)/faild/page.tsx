import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw, FiArrowLeft } from "react-icons/fi";

export default function PaymentFailed() {
    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg border border-amber-100">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                    <FiAlertTriangle className="h-10 w-10 text-amber-600" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900">
                    پرداخت ناموفق بود
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-500">
                    متأسفانه پرداخت شما انجام نشد.
                </p>

                {/* Payment info */}
                <div className="mt-6 rounded-xl bg-amber-50 p-4 text-right">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">وضعیت پرداخت</span>
                        <span className="font-medium text-amber-600">
                            ناموفق
                        </span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 space-y-3">
                    <Link
                        href="/checkout"
                        className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl
                       bg-amber-500 px-4 py-3 font-medium text-white
                       transition hover:bg-amber-600"
                    >
                        <FiRefreshCw className="h-5 w-5" />
                        تلاش مجدد
                    </Link>

                    <Link
                        href="/"
                        className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl
                       border border-gray-200 px-4 py-3 font-medium text-gray-700
                       transition hover:bg-gray-50"
                    >
                        <FiArrowLeft className="h-5 w-5" />
                        بازگشت به فروشگاه
                    </Link>
                </div>

                {/* Help */}
                <p className="mt-6 text-xs text-gray-400">
                    اگر مبلغ از حساب شما کسر شده است، نگران نباشید؛
                    <br />
                    در صورت ناموفق بودن تراکنش، مبلغ به حساب شما بازمی‌گردد.
                </p>
            </div>
        </div>
    );
}