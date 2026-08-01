"use client"
import { logout } from "@/actions/auth/logout";
import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { toast } from "react-toastify";

function Logout() {
    const router = useRouter();
    async function handleLogout() {
        const result = await logout()
        if (result.status == 200) {
            toast.success(result.message, { rtl: true, className: "Font-BYekan" })
            router.refresh()
        }
    }
    return (
        <button onClick={() => { handleLogout() }} className="flex items-center gap-2 rounded-xl border px-5 py-2 transition hover:bg-gray-100 hover:text-amber-600 cursor-pointer">
            <RiLogoutBoxLine size={20} />
            <span>خروج</span>
        </button>
    )
}

export default Logout;