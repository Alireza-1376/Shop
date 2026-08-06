"use client"
import { SidebarContext } from "@/context/SidebarContext";
import Link from "next/link";
import { useContext } from "react";
import { RiAdminLine, RiMenuLine, RiShutDownLine } from "react-icons/ri";

function Navbar() {
    const { setOpenSidebar } = useContext(SidebarContext);
    return (

        <nav className="flex items-center justify-between h-16 px-4 md:px-8 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setOpenSidebar(true)}
                    className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
                >
                    <RiMenuLine size={24} />
                </button>

                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 text-white">
                    <RiAdminLine size={22} />
                </div>

                <div>
                    <h2 className="font-extrabold text-lg text-gray-800">
                        پنل مدیریت
                    </h2>
                </div>
            </div>

            <Link href="/" className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-all">
                <span className="hidden sm:block">خروج</span>
                <RiShutDownLine size={18} />
            </Link>
        </nav>
    )
}

export default Navbar;