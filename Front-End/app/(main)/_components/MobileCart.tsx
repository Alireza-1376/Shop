"use client"

import { useState } from "react"

import {
    BsHandbag,
    BsX,
    BsTrash
} from "react-icons/bs"

import AddToCartBtns from "./AddToCartBtns"
import { CartItem } from "@/types/cartItems"
import DeleteCartBtn from "./DeleteCartBtn"

function MobileCart({ cart, totalPrice }: { cart: CartItem[], totalPrice: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* =========================================
                Mobile Bottom Bar
            ========================================= */}

            <div
                className="
                    lg:hidden
                    fixed
                    bottom-0
                    left-0
                    right-0
                    z-40
                    bg-white
                    border-t
                    border-gray-300
                    shadow-[0_-4px_15px_rgba(0,0,0,0.1)]
                    cursor-pointer
                "
                onClick={() => setIsOpen(true)}
            >

                <div className="flex items-center justify-between px-4 py-3">

                    <div className="flex items-center gap-3">

                        <div className="relative">

                            <BsHandbag size={25} />

                            <span
                                className="
                                    absolute
                                    -top-2
                                    -right-2
                                    bg-amber-600
                                    text-white
                                    text-xs
                                    w-5
                                    h-5
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                {cart.length}
                            </span>

                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                سبد خرید
                            </p>

                            <p className="font-semibold">
                                {cart.length} محصول
                            </p>
                        </div>

                    </div>


                    <div className="flex items-center gap-2">

                        <span className="text-amber-600 font-semibold">
                            مشاهده سبد
                        </span>

                        <span className="text-xl">
                            ←
                        </span>

                    </div>

                </div>

            </div>


            {/* =========================================
                Overlay
            ========================================= */}

            {isOpen && (
                <div
                    className="
                        lg:hidden
                        fixed
                        inset-0
                        z-50
                        bg-black/40
                    "
                    onClick={() => setIsOpen(false)}
                />
            )}


            {/* =========================================
                Mobile Cart Drawer
            ========================================= */}

            <div
                className={`
                    lg:hidden
                    fixed
                    top-0
                    bottom-0
                    left-0
                    z-60
                    w-[90%]
                    sm:w-105
                    bg-white
                    shadow-2xl
                    transition-transform
                    duration-300
                    ease-in-out
                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                {/* Header */}

                <div className="flex items-center justify-between p-4 border-b border-gray-300">

                    <div className="flex items-center gap-2">

                        <BsHandbag size={23} />

                        <p className="text-lg font-semibold">
                            سبد خرید ({cart.length})
                        </p>

                    </div>


                    <div className="flex items-center gap-3">

                        <DeleteCartBtn />


                        <button
                            type="button"
                            className="cursor-pointer hover:text-red-500 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            <BsX size={30} />
                        </button>

                    </div>

                </div>


                {/* Cart Items */}

                <div className="flex flex-col h-[calc(100vh-65px)]">

                    <div className="flex-1 overflow-y-auto divide-y divide-gray-300">

                        {cart.map((c, index) => {

                            const variant = c.product.variants.find((v) => {
                                return v._id == c.variant
                            })

                            return (
                                <div
                                    key={index + 1}
                                    className="flex items-center justify-between gap-3 p-4"
                                >

                                    {/* Product Information */}

                                    <div className="flex-1 min-w-0">

                                        <p className="font-medium truncate">

                                            {variant
                                                ? variant.title
                                                : c.product.title
                                            }

                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">

                                            {Number(
                                                c.product.price
                                            ).toLocaleString("en-US")}{" "}
                                            تومان

                                        </p>

                                    </div>


                                    {/* Quantity Buttons */}

                                    <AddToCartBtns
                                        productId={c.product._id}
                                        variantId={c.variant}
                                        quantity={c.quantity}
                                    />

                                </div>
                            )
                        })}

                    </div>


                    {/* Bottom Section */}

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
        </>
    )
}

export default MobileCart