"use client";

import { X, Minus, Plus } from "lucide-react";
import { ProductType } from "@/types/product";
import { addToCart } from "@/actions/cart/addToCart";
import { CartItemsType } from "@/types/cartItems";
import AddToCartBtns from "./AddToCartBtns";

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    product: ProductType
    cart: CartItemsType
}

export default function ProductModal({
    open,
    onClose,
    product,
    cart
}: ProductModalProps) {
    if (!open) return null;

    const totalPrice = cart.cart.reduce((acc, curr) => {
        return acc + (curr.product._id == product._id ? curr.quantity * Number(curr.product.price) : 0)
    }, 0)

    const count = cart.cart.reduce((acc, curr) => {
        return acc + (curr.product._id == product._id ? curr.quantity : 0)
    }, 0)


    async function handleAddToCart(productId: string, variantId?: string) {
        const result = await addToCart(productId, variantId)
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm">

            <div
                dir="rtl"
                className="relative flex h-auto w-full max-w-xl flex-col gap-4 overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">
                    <h2 className="text-lg font-bold md:text-xl">
                        {product.title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 cursor-pointer transition hover:text-black"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto">
                    {/* Image */}
                    {product.variants.length == 0 &&
                        <div className="md:h-80 w-full h-72 p-4 pt-0">
                            <img className="object-cover w-full h-full" src={`http://localhost:4000/${product.images[0]}`} alt={product.title} />
                        </div>
                    }

                    {/* Content */}
                    <div className="space-y-2 p-6 py-0">
                        {product.variants.length == 0 &&
                            <>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {product.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-8 text-gray-600">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className=" text-gray-900">
                                        {Number(product.price).toLocaleString("en-US")} تومان
                                    </p>
                                </div>
                            </>
                        }

                        {product.variants.length > 0 &&
                            <div className="flex flex-col gap-6 mb-8">
                                {product.variants.map((variant) => {
                                    const hasVariant = cart.cart.some((c) => {
                                        return String(c.variant) === String(variant._id);
                                    });
                                    const find = cart.cart.find((c) => {
                                        return String(c.variant) === String(variant._id);
                                    });

                                    return (
                                        <div key={variant._id} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <img className="w-20 md:w-24" src={`http://localhost:4000/${product.images[0]}`} alt="" />
                                                </div>
                                                <div>
                                                    <div>
                                                        <h3 className="md:text-lg text-base font-bold">
                                                            {variant.title}
                                                        </h3>

                                                        <p className="mt-2 text-sm leading-8 text-gray-600">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className=" text-gray-900">
                                                            {Number(variant.price).toLocaleString("en-US")} تومان
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    hasVariant ? <AddToCartBtns quantity={Number(find?.quantity)} /> : <button onClick={() => { handleAddToCart(product._id, variant._id) }} className="border hover:bg-amber-100 border-amber-300 text-amber-400 cursor-pointer px-4 py-1 rounded-full">افزودن</button>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>

                {/* Footer */}
                {product.variants.length == 0 &&
                    <div className="border-t bg-white p-4">
                        <div className="flex gap-4 items-center justify-between">
                            {/* Button */}
                            <p className="py-3 text-xs md:text-sm cursor-pointer rounded-xl transition md:w-auto">
                                قیمت کل : {totalPrice.toLocaleString("en-US")} تومان
                            </p>

                            {/* Counter */}
                            <div className="flex md:gap-4 gap-2 md:text-sm items-center justify-between rounded-xl border md:w-36">
                                <button onClick={() => { handleAddToCart(product._id) }} className="cursor-pointer p-3">
                                    <Plus size={14} />
                                </button>
                                <span>{count}</span>
                                <button className="cursor-pointer p-3">
                                    <Minus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </div>
    );
}