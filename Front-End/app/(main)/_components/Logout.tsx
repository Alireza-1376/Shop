"use client"
import { logout } from "@/actions/auth/logout";
import { getUserInfo } from "@/services/auth";
import { UserInfoType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiUser } from "react-icons/hi2";
import { RiLogoutBoxLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";

function Logout() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfoType>()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    async function handleLogout() {
        const result = await logout()
        if (result.status == 200) {
            toast.success(result.message, { rtl: true, className: "Font-BYekan" })
            router.refresh()
        }
    }

    useEffect(() => {
        async function getUser() {
            const data = await getUserInfo()
            setUserInfo(data)
            router.refresh()
        }
        getUser();

        document.addEventListener("click", (e: MouseEvent) => {
            const event = e.target as Node;
            if (!ref.current?.contains(event)) {
                setOpen(false)
            }
        })
    }, [])

    return (

        <div ref={ref} className="relative">
            <button onClick={(e) => { setOpen(!open); e.preventDefault() }} className="flex items-center gap-2 rounded-xl border px-5 py-2 transition hover:bg-gray-100 hover:text-amber-600 cursor-pointer">
                <HiUser size={20} />
                <p>{userInfo?.username}</p>
            </button>
            <div ref={ref} className={`${open ? "h-auto opacity-100" : "h-0 opacity-0 border-0"} transition-all overflow-hidden bg-amber-50 border border-amber-100 rounded-md absolute left-0 top-11 w-40 flex flex-col shadow-2xl`}>
                <Link href={`/profile?userId=${userInfo?.userId}`} className={`${open ? "flex" : "hidden"} hover:bg-amber-100 flex items-center gap-2 py-2 px-2 w-full cursor-pointer`}>
                    <CgProfile size={20} />
                    <span>پروفایل</span>
                </Link>
                {userInfo?.role == "admin" &&
                    <button onClick={() => { router.push("/admin") }} className={` ${open ? "flex" : "hidden"} hover:bg-amber-100 flex items-center gap-2 py-2 px-2 w-full cursor-pointer`}>
                        <IoMdSettings size={20} />
                        <span>پنل ادمین</span>
                    </button>
                }
                <button onClick={() => { handleLogout() }} className={` ${open ? "flex" : "hidden"} hover:bg-amber-100 flex items-center gap-2 py-2 px-2 w-full cursor-pointer`}>
                    <RiLogoutBoxLine size={20} />
                    <span>خروج</span>
                </button>
            </div>
        </div>
    )
}

export default Logout;