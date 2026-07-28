"use client"

import { ProductType } from "@/types/product"
import { useState } from "react";
import ProductModal from "./Modal";

function Product({ product }: { product: ProductType }) {
    const [open, setOpen] = useState(false);

    function handleModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setOpen(true)
    }

    function handleAddProduct(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
    }
    return (
        <>
            <div onClick={(e) => { handleModal(e) }} className="flex flex-col border cursor-pointer border-gray-300 rounded-md overflow-hidden">
                <div>
                    <img src={`http://localhost:4000/${product.images[0]}`} alt="" />
                </div>
                <div className="p-4">
                    <p className="pb-2 text-lg">
                        {product.title}
                    </p>
                    <div className="flex justify-between">
                        <div>
                            <p>{Number(product.price).toLocaleString("en-US")} تومان</p>
                        </div>
                        <button onClick={(e) => { handleAddProduct(e) }} className="border hover:bg-amber-100 border-amber-300 text-amber-400 cursor-pointer px-4 py-1 rounded-full">افزودن</button>
                    </div>
                </div>
            </div>
            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                product={product}
            />
        </>
    )
}

export default Product