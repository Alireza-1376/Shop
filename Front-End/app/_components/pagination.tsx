"use client"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function getPages(currentPage: number, lastPage: number) {
    const pages = [];
    pages.push(1);

    if (currentPage > 3) {
        pages.push("...")
    }

    if (currentPage > 2) {
        pages.push(currentPage - 1)
    }

    if (currentPage != 1 && currentPage != lastPage) {
        pages.push(currentPage)
    }

    if (currentPage < lastPage - 1) {
        pages.push(currentPage + 1)
    }

    if (currentPage < lastPage - 2) {
        pages.push("...")
    }


    if (currentPage <= lastPage) {
        pages.push(lastPage)
    }

    return pages;
}

function PaginationBtns({ currentPage, lastPage }: { currentPage: number, lastPage: number }) {
    const pathname = usePathname()
    const router = useRouter();
    function handleChange(page: number) {
        router.push(`${pathname}?page=${page}`, { scroll: false })
    }
    const pages = getPages(currentPage, lastPage)

    useEffect(() => {
        if (lastPage < currentPage && currentPage != 1) {
            handleChange(currentPage - 1)
        }
    }, [lastPage, currentPage])
    return (
        <>
            {lastPage != 1 &&
                <nav dir="ltr" className="flex justify-center mt-10">
                    <ul className="flex -space-x-px text-sm gap-1">
                        <li>
                            <button onClick={() => { handleChange(currentPage - 1) }} disabled={currentPage == 1} className="flex border-gray-400 rounded-md disabled:opacity-50 cursor-pointer items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-10 focus:outline-none">قبلی</button>
                        </li>
                        {pages.map((p, index) => {
                            return (
                                <li key={index} className="flex items-center">
                                    {typeof p == "number" ?
                                        <button onClick={() => { handleChange(Number(p)) }} className={`${currentPage == p && "bg-orange-600 text-white"} rounded-md border-gray-400 flex cursor-pointer items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none`}>{p}</button>
                                        :
                                        <span>{p}</span>
                                    }
                                </li>
                            )
                        })}

                        <li>
                            <button onClick={() => { handleChange(currentPage + 1) }} disabled={currentPage == lastPage} className="flex rounded-md border-gray-400 disabled:opacity-50 cursor-pointer items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-10 focus:outline-none">بعدی</button>
                        </li>
                    </ul>
                </nav>
            }
        </>
    )
}

export default PaginationBtns;