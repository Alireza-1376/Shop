"use client"
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiMenu3Line, RiRestaurant2Line } from "react-icons/ri";

function NavbarClient({children} : {children:React.ReactNode}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="fixed z-20 left-0 right-0 bg-white shadow">
            <div className="px-4 md:px-0 top-0 container mx-auto flex items-center justify-between h-20">
                <div className="flex items-center gap-2 text-amber-600">
                    <button onClick={() => { setOpen(true) }} className="flex md:hidden cursor-pointer">
                        <RiMenu3Line size={30} />
                    </button>
                    <RiRestaurant2Line size={30} />
                    <h1 className="text-xl md:text-2xl font-bold">شمرون کباب</h1>
                </div>
                <div className={`${open ? "w-72 translate-x-0" : "translate-x-52"} transition-all md:translate-x-0 flex absolute p-4 md:p-0 h-screen md:h-auto z-20 top-0 bottom-0 md:w-auto right-0 bg-amber-50 shadow-md md:shadow-none md:bg-white md:static gap-4 md:gap-10 items-start flex-col md:flex-row`}>
                    <div className="md:hidden flex justify-between items-center w-full border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-1">
                            <RiRestaurant2Line size={30} />
                            <h2 className="text-xl md:text-2xl font-bold">شمرون کباب</h2>
                        </div>
                        <button onClick={() => { setOpen(false) }} className="cursor-pointer">
                            <IoMdClose size={20} />
                        </button>
                    </div>
                    <Link href="/" className="transition w-full hover:bg-amber-100 p-2 rounded-md lg:hover:bg-white lg:hover:text-amber-600">
                        خانه
                    </Link>

                    <Link href="/" className="transition w-full hover:bg-amber-100 p-2 rounded-md lg:hover:bg-white lg:hover:text-amber-600">
                        منو
                    </Link>

                    <Link href="/" className="transition w-full text-nowrap hover:bg-amber-100 p-2 rounded-md lg:hover:bg-white lg:hover:text-amber-600">
                        درباره ما
                    </Link>

                    <Link href="/" className="transition w-full text-nowrap hover:bg-amber-100 p-2 rounded-md lg:hover:bg-white lg:hover:text-amber-600">
                        تماس با ما
                    </Link>
                </div>

                {children}

            </div>
            {open && <div onClick={() => { setOpen(false) }} className="bg-black/50 md:hidden fixed inset-0 z-10"></div>}

        </div>
    )
}

export default NavbarClient;