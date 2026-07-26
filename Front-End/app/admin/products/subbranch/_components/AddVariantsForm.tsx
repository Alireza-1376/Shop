"use client"
import { createProductVariant } from '@/actions/admin/addProductVariant';
import { Spinner } from '@/components/ui/spinner';
import { getOneProduct } from '@/services/adminProducts';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri'
import { toast } from 'react-toastify';

function AddVariantsForm({ productId }: { productId: string }) {
    const [state, action, pending] = useActionState(createProductVariant, { success: false, message: "" });
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const searchParams = useSearchParams();
    const variantId = searchParams.get('variantId')
    const router = useRouter();

    useEffect(() => {
        if (variantId) {
            async function getProduct() {
                const product = await getOneProduct(productId)
                const findVariant = product.variants.find((v) => {
                    return v._id == variantId
                })
                if (findVariant) {
                    setTitle(findVariant?.title)
                    setPrice(findVariant?.price)
                }
            }
            getProduct()
        }
    }, [variantId])

    useEffect(() => {
        if (!state.message) return;
        if (state.success) {
            toast.success(state.message, { rtl: true, className: "Font-BYekan" })
            cancle()
        } else {
            toast.error(state.message, { rtl: true, className: "Font-BYekan" })
        }
    }, [state])

    function cancle() {
        router.push(`/admin/products/subbranch?productId=${productId}`)
        setTitle("")
        setPrice("")
    }

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 mb-6">
                افزودن مدل جدید
            </h2>
            <form action={action} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5">
                    <label className="block mb-2 text-sm font-medium">
                        عنوان مدل
                    </label>
                    <input
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        name='title'
                        type="text"
                        placeholder=""
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>
                <input type='hidden' name='productId' value={productId} />
                {variantId && <input type='hidden' name='variantId' value={variantId} />}
                <div className="lg:col-span-4">
                    <label className="block mb-2 text-sm font-medium">
                        قیمت
                    </label>

                    <input
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        name='price'
                        type="number"
                        placeholder=""
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>
                <div className="lg:col-span-3 flex gap-2 items-end">
                    {pending ?
                        <button
                            className="px-5 w-full py-3 cursor-pointer rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
                        >
                            <div className="flex justify-center items-center gap-6">
                                <Spinner className="size-6" />
                            </div>
                        </button>
                        :
                        <div className='flex w-full gap-2'>
                            <button
                                className="w-full cursor-pointer rounded-xl bg-orange-500 hover:bg-orange-600 transition text-white py-3 font-semibold flex items-center justify-center gap-2"
                            >
                                {variantId ? "ویرایش" : "افزودن"}
                            </button>
                        </div>
                    }
                    {variantId &&
                        <button
                            onClick={() => { cancle() }}
                            type='button'
                            className="w-full cursor-pointer rounded-xl bg-red-500 hover:bg-red-600 transition text-white py-3 font-semibold flex items-center justify-center gap-2"
                        >
                            انصراف
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default AddVariantsForm;