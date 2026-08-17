import { getAllOrders } from "@/services/orders";
import { FiPhone, FiMapPin } from "react-icons/fi";
import ActivityBtns from "./_components/ActivityBtns";

export default async function Orders() {
    const orders = await getAllOrders();

    return (
        <div dir="rtl" className="mt-2">

            <h1 className="mb-6 text-2xl font-bold">
                سفارشات
            </h1>

            <div className="overflow-x-auto rounded-xl bg-white shadow">
                <table className="w-full text-right">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-center">کد پیگیری</th>
                            <th className="p-4 text-center">مشتری</th>
                            <th className="p-4 text-center">آدرس</th>
                            <th className="p-4 text-center">مبلغ</th>
                            <th className="p-4 text-center">وضعیت</th>
                            <th className="p-4 text-center">عملیات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length == 0 ?
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-10 text-center text-gray-500"
                                >
                                    سفارشی وجود ندارد
                                </td>
                            </tr>
                            :
                            <>
                                {
                                    orders.map((order) => {
                                        return (
                                            <tr key={order._id} className="border-t">

                                                <td className="p-4 text-center">
                                                    {order.trackingCode}
                                                </td>

                                                <td className="p-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <FiPhone />
                                                        {order.phoneNumber}
                                                    </div>
                                                </td>

                                                <td className="p-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <FiMapPin />
                                                        {order.address}
                                                    </div>
                                                </td>

                                                <td className="p-4 text-center font-bold">
                                                    {order.amount.toLocaleString("en-US")} تومان
                                                </td>

                                                {/* وضعیت */}
                                                <td className="p-4 text-center">
                                                    <span
                                                        className={`rounded-lg text-nowrap px-3 py-2 text-sm ${order.situation == "checking"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-green-100 text-green-700"
                                                            }`}
                                                    >
                                                        {order.situation == "checking" ? "در انتظار بررسی" : "ارسال شده"}
                                                    </span>
                                                </td>

                                                {/* عملیات */}
                                                <ActivityBtns orderId={order._id}/>
                                            </tr>
                                        )
                                    })
                                }
                            </>
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
}