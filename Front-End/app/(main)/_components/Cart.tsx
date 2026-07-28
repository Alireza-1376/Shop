import { BsHandbag, BsTrash } from 'react-icons/bs'

function Cart() {
  return (
    <div className="hidden lg:block lg:col-span-3">
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
                {/* <div className='bg-white border border-gray-300 rounded-md w-full max-h-[calc(100vh-100px)] mt-2 sticky top-22'>
                    <div className="flex text-lg items-center justify-between p-4">
                        <p>سبد خرید (1)</p>
                        <button className="cursor-pointer">
                            <BsTrash size={24} />
                        </button>
                    </div>
                    <hr className="border border-gray-300" />
                    <div>
                        <div className="flex flex-col divide-y max-h-96 overflow-auto scrollbar-thin divide-gray-300">
                            <div className="flex items-center justify-between p-4">
                                <div>
                                    <p>میکس کباب خانواده</p>
                                    <p>900000 تومان</p>
                                </div>
                                <div className="bg-amber-600 text-white flex items-center gap-2 px-2 rounded-full text-lg">
                                    <button className="px-1 cursor-pointer">+</button>
                                    <p>1</p>
                                    <button className="px-1 cursor-pointer">-</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-4 border-b border-b-gray-300">
                            <p>مالیات</p>
                            <p>945000 تومان</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-between px-4 py-2 text-lg">
                                <p>جمع کل</p>
                                <p>891000 تومان</p>
                            </div>
                            <div className="p-4 mt-2">
                                <button className="w-full bg-amber-600 text-white p-2 rounded-md cursor-pointer">تکمیل سفارش</button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
  )
}

export default Cart