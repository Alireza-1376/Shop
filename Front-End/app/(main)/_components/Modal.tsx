"use client";

import Image from "next/image";
import { X, Share2, Minus, Plus } from "lucide-react";
import { ProductType } from "@/types/product";

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    product: ProductType
}

export default function ProductModal({
    open,
    onClose,
    product,
}: ProductModalProps) {
    if (!open) return null;

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
                    <div className="md:h-80 w-full h-72 p-4 pt-0">
                        <img className="object-cover w-full h-full" src={`http://localhost:4000/${product.images[0]}`} alt={product.title} />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 p-6 py-0">
                        <div>
                            <h3 className="text-xl font-bold">
                                {product.title}
                            </h3>

                            <p className="mt-2 text-sm leading-8 text-gray-600">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-2">
                            {/* <p className="text-gray-400 line-through">
                                ۱,۳۰۰,۰۰۰ تومان
                            </p> */}

                            <p className=" text-gray-900">
                                {Number(product.price).toLocaleString("en-US")} تومان
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t bg-white p-4">
                    <div className="flex gap-4 items-center justify-between">
                        {/* Button */}
                        <button className="py-3 text-xs md:text-sm cursor-pointer rounded-xl bg-amber-500 px-4 text-white transition hover:bg-amber-600 md:w-auto">
                            افزودن به سبد خرید {Number(product.price).toLocaleString("en-US")} تومان
                        </button>


                        {/* Counter */}
                        <div className="flex md:gap-4 gap-2 md:text-sm items-center justify-between rounded-xl border md:w-36">
                            <button className="cursor-pointer p-3">
                                <Plus size={14} />
                            </button>

                            <span>1</span>

                            <button className="cursor-pointer p-3">
                                <Minus size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}