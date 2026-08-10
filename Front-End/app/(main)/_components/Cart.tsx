import { getCartItems } from '@/services/cartItems'

import { BsHandbag, BsTrash } from 'react-icons/bs'
import AddToCartBtns from './AddToCartBtns'

async function Cart() {
    const { cart } = await getCartItems();

    return (
        <div className="hidden lg:block lg:col-span-3">
            {!cart || cart?.length == 0 ?
                <div className='bg-white border border-gray-300 rounded-md w-full max-h-[calc(100vh-100px)] overflow-auto mt-2 sticky top-22'>
                    <div>
                        <p className="p-4">سبد خرید</p>
                    </div>
                    <hr className="border border-gray-300" />
                    <div className="p-4 py-8 flex flex-col justify-center gap-4">
                        <div className="flex justify-center">
                            <BsHandbag size={80} />
                        </div>
                        <p className="text-center">سبد خرید خالی است</p>
                    </div>
                </div>
                :
                <div className='bg-white border border-gray-300 rounded-md w-full max-h-[calc(100vh-100px)] mt-2 sticky top-22'>
                    <div className="flex text-lg items-center justify-between p-4">
                        <p>سبد خرید ({cart?.length})</p>
                        <button className="cursor-pointer">
                            <BsTrash size={24} />
                        </button>
                    </div>
                    <hr className="border border-gray-300" />
                    <div>
                        <div className="flex flex-col divide-y max-h-96 overflow-auto scrollbar-thin divide-gray-300">
                            {cart?.map((c, index) => {
                                const variant = c.product.variants.find((v) => {
                                    return v._id == c.variant
                                })
                                return (
                                    <div key={index + 1} className="flex items-center justify-between p-4">
                                        <div>
                                            {variant ? <p>{variant.title}</p> : <p>{c.product.title}</p>}
                                            <p>{Number(c.product.price).toLocaleString("en-US")} تومان</p>
                                        </div>
                                        <AddToCartBtns quantity={c.quantity} />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex justify-between items-center p-4 border-b border-b-gray-300">
                            <p>مالیات</p>
                            <p>{Number(91500).toLocaleString("en-US")} تومان</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-between px-4 py-2 text-lg">
                                <p>جمع کل</p>
                                <p>{Number(891000).toLocaleString("en-US")} تومان</p>
                            </div>
                            <div className="p-4 mt-2">
                                <button className="w-full bg-amber-600 text-white p-2 rounded-md cursor-pointer">تکمیل سفارش</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart