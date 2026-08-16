"use client"

import { ProductType } from "@/types/product"
import { useState } from "react";
import ProductModal from "./Modal";
import { addToCart } from "@/actions/cart/addToCart";
import { CartItem, CartItemsType } from "@/types/cartItems";
import AddToCartBtns from "./AddToCartBtns";
import { toast } from "react-toastify";

function Product({ product, cart }: { product: ProductType, cart: CartItemsType }) {
    const [open, setOpen] = useState(false);
    function handleModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setOpen(true)
    }

    async function handleAddProduct(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productId: string) {
        e.stopPropagation()
        const result = await addToCart(productId)
        if (result.status != 200) {
            toast.error(result.message, { rtl: true, className: "Font-BYekan" })
        }
    }

    const findItem = cart.cart?.find((c) => {
        return c.product._id == product._id
    })

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
                        {product.variants.length > 0 ?
                            <button className="border hover:bg-amber-100 border-amber-300 text-amber-400 cursor-pointer px-4 py-1 rounded-full">افزودن</button>
                            :
                            <>
                                {findItem ?
                                    <AddToCartBtns productId={product._id} quantity={findItem.quantity} />
                                    :
                                    <button onClick={(e) => { handleAddProduct(e, product._id) }} className="border hover:bg-amber-100 border-amber-300 text-amber-400 cursor-pointer px-4 py-1 rounded-full">افزودن</button>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                product={product}
                cart={cart}
            />
        </>
    )
}

export default Product