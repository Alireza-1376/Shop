"use client"
import { addImage } from '@/actions/admin/addProductImage'
import { useSearchParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { PiPlus } from 'react-icons/pi'
import { toast } from 'react-toastify'

function FormAddImage() {
    const params = useSearchParams();
    const productId = params.get("productId") || ""
    const [state, action, pending] = useActionState(addImage, { statusCode: 0 })
    useEffect(() => {
        if (state.statusCode == 201) {
            toast.success("تصویر با موفقیت اضافه شد", { rtl: true, className: "Font-BYekan" })
        }
    }, [state.statusCode])
    return (
        <form action={action} className="aspect-square">
            <div className="relative w-full h-full overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-white shadow-sm hover:border-orange-500 hover:bg-orange-50 transition-all duration-300">

                <button
                    type="button"
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                >
                    <PiPlus
                        size={42}
                        className="text-slate-400 transition-all duration-300 hover:text-orange-500"
                    />
                </button>

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        e.currentTarget.form?.requestSubmit();
                    }}
                    className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                />

                <input
                    type="hidden"
                    name="productId"
                    value={productId}
                />
            </div>
        </form>
    )
}

export default FormAddImage