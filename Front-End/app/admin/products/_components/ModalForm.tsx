'use client'
import { CategoryType } from "@/types/category";
import { useActionState, useEffect, useState } from "react";
import { createProducts } from "@/actions/admin/addProducts";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { getOneProduct } from "@/services/adminProducts";

function ModalForm({ categories }: { categories: CategoryType[] }) {
    const [state, action, pending] = useActionState(createProducts, { statusCode: 0 });
    const router = useRouter();

    const searchParams = useSearchParams();
    const productId = searchParams.get("id");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        async function getProduct() {
            if (productId) {
                const product = await getOneProduct(productId)
                setTitle(product.title)
                setDescription(product.description)
                setCategory(String(product.category))
                setPrice(product.price)
            }
        }
        getProduct()
    }, [productId])


    useEffect(() => {
        if (state.statusCode == 201) {
            toast.success("محصول با موفقیت اضافه شد", { rtl: true, className: "Font-BYekan" })
            state.statusCode = 0
            router.back();
        }
        if (state.statusCode == 200) {
            toast.success("محصول با موفقیت ویرایش شد", { rtl: true, className: "Font-BYekan" })
            state.statusCode = 0
            router.back();
        }
    }, [state.statusCode])

    return (
        <>
            <div className="flex items-center justify-between px-5 py-4 border-b">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">
                        {productId ? "ویرایش محصول" : "افزودن محصول"}
                    </h2>
                </div>

                <button
                    onClick={() => router.back()}
                    className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-lg hover:bg-slate-100 transition"
                >
                    ✕
                </button>
            </div>
            <form action={action} className="p-5 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        عنوان محصول
                    </label>

                    <input
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        type="text"
                        name="title"
                        placeholder=""
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        قیمت
                    </label>

                    <input
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        type="text"
                        name="price"
                        placeholder=""
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        توضیحات
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        rows={3}
                        name="description"
                        placeholder=""
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                {productId && <input type="hidden" value={productId} name="productId" />}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        دسته‌بندی
                    </label>

                    <select
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                        name="categoryId"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="">انتخاب دسته‌بندی</option>
                        {categories.map((category) => {
                            return (
                                <option key={category._id} value={category._id}>{category.title}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex justify-end gap-2 pt-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 cursor-pointer rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                    >
                        انصراف
                    </button>

                    {pending ?
                        <button
                            className="px-5 py-3 cursor-pointer rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
                        >
                            <div className="flex items-center gap-6">
                                <Spinner className="size-6" />
                            </div>
                        </button>
                        :
                        <button
                            type="submit"
                            className="px-5 py-2 cursor-pointer rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                        >
                            {productId ? "ثبت تغییرات" : "ثبت محصول"}
                        </button>
                    }


                </div>
            </form>
        </>
    )
}

export default ModalForm;