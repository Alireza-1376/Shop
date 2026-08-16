import { getCartItems } from "@/services/cartItems";
import {
    FiShoppingBag,
    FiShield,
} from "react-icons/fi";
import FormCheckout from "./_components/FormCheckout";

export default async function CheckoutPage() {
    const { cart } = await getCartItems()
    const totalPrice = cart?.reduce((acc, curr) => {
        return acc + (Number(curr.product.price) * curr.quantity)
    }, 0);

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-amber-50/40 px-4 py-8 sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                        <FiShoppingBag className="text-3xl text-amber-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        تکمیل سفارش
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        اطلاعات ارسال سفارش خود را وارد کنید
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <FormCheckout />
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="mb-6 text-lg font-bold text-gray-900">
                                خلاصه سفارش
                            </h2>

                            <div className="space-y-4 border-b border-gray-100 pb-5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">تعداد </span>
                                    <span className="font-medium text-gray-900">
                                        {cart.length}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">مبلغ</span>
                                    <span className="font-medium text-gray-900">
                                        {totalPrice.toLocaleString("en-US")} تومان
                                    </span>
                                </div>

                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-between py-5">
                                <span className="font-bold text-gray-900">
                                    مبلغ نهایی
                                </span>

                                <span className="text-lg font-bold text-amber-600">
                                    {totalPrice.toLocaleString("en-US")} تومان
                                </span>
                            </div>

                            {/* Security */}
                            <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4">
                                <FiShield className="mt-0.5 shrink-0 text-xl text-amber-600" />

                                <p className="text-xs leading-6 text-gray-600">
                                    اطلاعات شما با امنیت کامل پردازش می‌شود و برای
                                    تکمیل سفارش استفاده خواهد شد.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}