import { getCartItems } from '@/services/cartItems'
import { BsHandbag } from 'react-icons/bs'
import AddToCartBtns from './AddToCartBtns'
import MobileCart from './MobileCart'
import DeleteCartBtn from './DeleteCartBtn'


async function Cart() {
    const { cart } = await getCartItems()
    console.log(cart)
    const totalPrice = cart.reduce((acc, curr) => {
        return acc + (Number(curr.product.price) * curr.quantity)
    }, 0);

    return (
        <>
            {/* ================= Desktop Cart ================= */}
            <div className="hidden lg:block lg:col-span-3">
                {!cart || cart?.length === 0 ? (
                    <div className="bg-white border border-gray-300 rounded-md w-full max-h-[calc(100vh-100px)] overflow-auto mt-2 sticky top-22">

                        <div>
                            <p className="p-4">سبد خرید</p>
                        </div>

                        <hr className="border border-gray-300" />

                        <div className="p-4 py-8 flex flex-col justify-center gap-4">

                            <div className="flex justify-center">
                                <BsHandbag size={80} />
                            </div>

                            <p className="text-center">
                                سبد خرید خالی است
                            </p>

                        </div>

                    </div>
                ) : (
                    <div className="bg-white border border-gray-300 rounded-md w-full max-h-[calc(100vh-100px)] mt-2 sticky top-22">

                        <div className="flex text-lg items-center justify-between p-4">

                            <p>
                                سبد خرید ({cart?.length})
                            </p>

                            <DeleteCartBtn />

                        </div>

                        <hr className="border border-gray-300" />

                        <div>

                            <div className="flex flex-col divide-y max-h-96 overflow-auto scrollbar-thin divide-gray-300">

                                {cart?.map((c, index) => {

                                    const variant = c.product.variants.find((v) => {
                                        return v._id == c.variant
                                    })

                                    return (
                                        <div
                                            key={index + 1}
                                            className="flex items-center justify-between p-4"
                                        >

                                            <div>

                                                {variant ? (
                                                    <p>
                                                        {variant.title}
                                                    </p>
                                                ) : (
                                                    <p>
                                                        {c.product.title}
                                                    </p>
                                                )}

                                                <p>
                                                    {Number(
                                                        c.product.price
                                                    ).toLocaleString("en-US")}{" "}
                                                    تومان
                                                </p>

                                            </div>

                                            <AddToCartBtns
                                                productId={c.product._id}
                                                variantId={c.variant}
                                                quantity={c.quantity}
                                            />

                                        </div>
                                    )
                                })}

                            </div>



                            {/* Total */}
                            <div className="border-t border-gray-300 bg-white">
                                {/* Total */}

                                <div className="flex items-center justify-between px-4 py-3 text-lg font-semibold">

                                    <p>
                                        جمع کل
                                    </p>

                                    <p>
                                        {Number(
                                            totalPrice
                                        ).toLocaleString("en-US")}{" "}
                                        تومان
                                    </p>

                                </div>


                                {/* Checkout */}

                                <div className="px-4 pb-4">

                                    <button
                                        type="button"
                                        className="
                                    w-full
                                    bg-amber-600
                                    hover:bg-amber-700
                                    text-white
                                    p-3
                                    rounded-md
                                    cursor-pointer
                                    transition
                                "
                                    >
                                        تکمیل سفارش
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>
                )}
            </div>


            {/* ================= Mobile Cart ================= */}

            {cart && cart.length > 0 && (
                <MobileCart cart={cart} totalPrice={totalPrice} />
            )}
        </>
    )
}

export default Cart