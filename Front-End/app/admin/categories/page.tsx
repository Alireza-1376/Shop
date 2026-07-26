import { getAllCategories } from "@/services/adminCategories";
import ActionBtns from "./_components/ActionBtns";
import AddCategoryBtn from "./_components/AddCategory";
import PaginationBtns from "@/app/_components/pagination";


async function CategoriesPage({ searchParams }: { searchParams: Promise<{ [key: string]: number }> }) {
    const { page } = await searchParams;
    const { categories, currentPage, lastPage } = await getAllCategories(page, 4)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">
                        مدیریت دسته‌بندی‌ها
                    </h1>
                </div>
                <AddCategoryBtn />
            </div>
            {/* Table */}
            <div className="overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-175">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    #
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    عنوان
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    توضیحات
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    تاریخ
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                                    عملیات
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories?.map((category, index) => (
                                <tr
                                    key={category._id}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-all"
                                >
                                    <td className="px-6 py-5 text-center font-semibold text-slate-800">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-5 text-center font-semibold text-slate-800">
                                        {category.title}
                                    </td>

                                    <td className="px-6 py-5 text-center text-slate-600">
                                        {category.description}
                                    </td>

                                    <td className="px-6 py-5 text-center text-slate-500">
                                        {new Date(category.createdAt).toLocaleString("fa-IR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit"
                                        })}
                                    </td>

                                    <ActionBtns category={category} />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {categories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-slate-500">
                            هیچ دسته‌بندی‌ای ثبت نشده است.
                        </p>
                    </div>
                )}
            </div>

            {categories.length > 0 &&
                <PaginationBtns currentPage={currentPage} lastPage={lastPage} />
            }
        </div>
    );
}

export default CategoriesPage;