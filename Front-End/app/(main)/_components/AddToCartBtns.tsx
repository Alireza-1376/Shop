function AddToCartBtns({ quantity }: { quantity: number }) {
    return (
        <div className="bg-amber-600 text-white flex items-center gap-2 px-2 rounded-full text-lg">
            <button className="px-1 cursor-pointer">+</button>
            <p>{quantity}</p>
            <button className="px-1 cursor-pointer">-</button>
        </div>
    )
}

export default AddToCartBtns;