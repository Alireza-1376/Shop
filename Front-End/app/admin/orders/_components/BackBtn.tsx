"use client"
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

function BackBtn({ customClass, title }: { customClass: string, title?: string }) {
    const router = useRouter();
    return (
        <button
            onClick={() => { router.back() }}
            className={customClass}
        >
            {title ? title : <FiX size={20} />}
        </button>
    )
}

export default BackBtn;