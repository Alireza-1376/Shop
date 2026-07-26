"use client"
import { deleteProduct } from '@/actions/admin/deleteProduct'
import { ProductType } from '@/types/product';
import Link from 'next/link';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri'
import Swal from 'sweetalert2';

function ActivityBtns({ product }: { product:ProductType }) {
    async function handleDelete(id: string) {
        Swal.fire({
            title: "حذف !",
            text: "آیا مطمئن هستید ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "بله",
            cancelButtonText: "انصراف"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await deleteProduct(id)
                if (result?.statusCode==200) {
                    Swal.fire({
                        title: "حذف !",
                        text: "عملیات با موفقیت انجام شد",
                        icon: "success"
                    })
                } else {
                    Swal.fire({
                        title: "حذف !",
                        text: "عملیات ناموفق",
                        icon: "error"
                    })
                }
            }
        });
    }
    return (
        <div className='flex gap-3'>
            <Link href={{pathname:"/admin/products/addProduct" , query:{id:product._id}}} className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 cursor-pointer transition-all">
                <RiEdit2Line size={18} />
            </Link>
            <button onClick={() => { handleDelete(product._id) }} className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all">
                <RiDeleteBinLine size={18} />
            </button>
        </div>
    )
}

export default ActivityBtns;