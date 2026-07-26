"use client"
import { createCategory } from '@/actions/admin/addCategory';
import { Spinner } from '@/components/ui/spinner';
import { CategoryType } from '@/types/category';
import { Dispatch, SetStateAction, useActionState, useEffect, useState, } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';



function Modal({ setIsModalOpen, category }: { setIsModalOpen: Dispatch<SetStateAction<boolean>>, category: CategoryType | null }) {
    const [state, action, pending] = useActionState(createCategory, { statusCode: 0 })
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (category) {
            setTitle(category.title)
            setDescription(category.description)
        }
    }, [])


    useEffect(() => {
        if (state.statusCode == 201) {
            toast.success("دسته بندی با موفقیت اضافه شد", { rtl: true, className: "Font-BYekan" })
            setIsModalOpen(false)
        }
        if (state.statusCode == 200) {
            toast.success("دسته بندی با موفقیت ویرایش شد", { rtl: true, className: "Font-BYekan" })
            setIsModalOpen(false)
        }
    }, [state.statusCode])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <form action={action} className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800">
                        {category ? "ویرایش دسته‌بندی" : " افزودن دسته‌بندی"}
                    </h2>

                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-xl hover:bg-slate-100 transition"
                    >
                        <RiCloseLine size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block mb-2 text-start text-sm font-medium text-slate-700">
                            عنوان دسته‌بندی
                        </label>

                        <input
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            name='title'
                            type="text"
                            placeholder=""
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    {category && <input type='hidden' name='categoryId' value={category._id} />}

                    <div>
                        <label className="block text-start mb-2 text-sm font-medium text-slate-700">
                            توضیحات
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            name='description'
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end px-6 py-4 border-t border-slate-200 bg-slate-50">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-5 py-3 cursor-pointer rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
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
                            className="px-5 py-3 cursor-pointer rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
                        >
                            {category ? "ثبت تغییرات" : "ثبت دسته‌بندی"}
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default Modal