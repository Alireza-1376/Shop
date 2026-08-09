import PaginationBtns from "@/app/_components/pagination";
import ActionBtns from "./_components/ActionBtns";
import { getAllUsers } from "@/services/adminUsers";

async function UsersPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: number }>;
}) {
    const { page } = await searchParams;
    const { users, currentPage, lastPage } = await getAllUsers(page, 4);

    return (
        <div className="space-y-6" dir="rtl">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">
                        مدیریت کاربران
                    </h1>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-212.5">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    #
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    نام کاربر
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    ایمیل
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    نقش
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    تاریخ ثبت‌نام
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    عملیات
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users?.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="border-b border-slate-100 transition-all hover:bg-slate-50"
                                >
                                    {/* Number */}
                                    <td className="px-6 py-5 text-center font-semibold text-slate-800">
                                        {index + 1}
                                    </td>

                                    {/* Name */}
                                    <td className="px-6 py-5 text-center font-semibold text-slate-800">
                                        {user.username}
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-5 text-center text-slate-600">
                                        {user.email}
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-5 text-center">
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${user.role === "admin"
                                                ? "bg-violet-100 text-violet-700"
                                                : "bg-slate-100 text-slate-600"
                                                }`}
                                        >
                                            {user.role === "admin"
                                                ? "مدیر"
                                                : "کاربر"}
                                        </span>
                                    </td>

                                    {/* Created At */}
                                    <td className="px-6 py-5 text-center text-slate-500">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleString("fa-IR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })}
                                    </td>

                                    {/* Actions */}
                                    <ActionBtns user={user} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-slate-500">
                            هیچ کاربری ثبت نشده است.
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {users.length > 0 && (
                <PaginationBtns
                    currentPage={currentPage}
                    lastPage={lastPage}
                />
            )}
        </div>
    );
}

export default UsersPage;
