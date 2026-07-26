"use client"

import { SidebarContext } from "@/context/SidebarContext"
import { useContext } from "react"
import { LiaUsersCogSolid } from "react-icons/lia"
import { RiBox3Line, RiCloseLine, RiHome5Line, RiShoppingCart2Line } from "react-icons/ri"
import { TbCategory } from "react-icons/tb"
import CustomLink from "./Links"

function Sidebar() {
    const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

    return (
        <>
            {openSidebar && (
                <div
                    onClick={() => setOpenSidebar(false)}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
            )}
            <aside className={`fixed lg:static top-0 right-0 h-screen lg:h-[calc(100vh-64px)] w-72 bg-white border-l border-gray-200 shadow-lg lg:shadow-none z-50 transition-all duration-300 ${openSidebar ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
                <div className="flex items-center justify-between p-5 border-b lg:hidden">
                    <span className="font-bold">منو</span>
                    <button className="cursor-pointer" onClick={() => setOpenSidebar(false)}>
                        <RiCloseLine size={24} />
                    </button>
                </div>
                <div className="p-4">
                    <ul className="space-y-2">
                        <CustomLink href="/admin" text="داشبورد" Icon={RiHome5Line} />
                        <CustomLink href="/admin/categories" text="دسته بندی" Icon={TbCategory} />
                        <CustomLink href="/admin/products" text="محصولات" Icon={RiBox3Line} />
                        <CustomLink href="/admin/orders" text="سفارشات" Icon={RiShoppingCart2Line} />
                        <CustomLink href="/admin/users" text="کاربران" Icon={LiaUsersCogSolid} />
                    </ul>
                </div>
            </aside >
        </>
    )
}

export default Sidebar;