"use client"

import { useState } from "react";
import { RiAddLine } from "react-icons/ri"
import Modal from "./Modal";

function AddCategoryBtn() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl border cursor-pointer border-orange-500 text-orange-500 font-medium hover:bg-amber-500 hover:text-white transition-all duration-300"
            >
                <RiAddLine size={20} />
                <span>افزودن دسته‌بندی</span>
            </button>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} category={null}/>}
        </div>
    )
}

export default AddCategoryBtn