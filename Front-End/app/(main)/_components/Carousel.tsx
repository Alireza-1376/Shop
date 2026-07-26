"use client"

import { useEffect, useState } from "react"
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const images = [
    { id: 1, imageUrl: "/images/slider1.png" },
    { id: 2, imageUrl: "/images/slider2.png" },
    { id: 3, imageUrl: "/images/slider3.png" }
]

export function MyCarousel() {
    const [slide, setSlide] = useState<number>(1);

    useEffect(() => {
        const id = setInterval(() => {
            setSlide((prev) => { return (prev >= images.length) ? 1 : prev + 1 })
        }, 5000)

        return () => {
            clearInterval(id)
        }
    }, [slide])


    function handlePrev() {
        setSlide((prev) => {
            return prev == 1 ? images.length : prev - 1
        })
    }
    function handleNext() {
        setSlide((prev) => {
            return prev >= images.length ? 1 : prev + 1
        })
    }

    return (
        <div className=" relative mt-20 h-80 md:h-96 container mx-auto rounded-md overflow-hidden">
            <div className="absolute w-full h-full">
                <img className="w-full h-full object-cover transition-all" src={`/images/slider${slide}.png`} alt="" />
            </div>
            <div className="absolute inset-0 bottom-1/2 h-full">
                <button onClick={() => { handleNext() }} className="bg-gray-400 text-sm md:text-base p-2 rounded-full text-white cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 ">
                    <SlArrowRight />
                </button>
                <button onClick={() => { handlePrev() }} className="bg-gray-400 test-sm md:text-base p-2 rounded-full text-white cursor-pointer absolute left-4 top-1/2 -translate-y-1/2">
                    <SlArrowLeft />
                </button>
                <div dir="ltr" className="flex gap-2 h-full w-full justify-center items-end pb-4">
                    {images.map((img) => {
                        return (
                            <button onClick={(e) => { setSlide(img.id) }} key={img.id} className={`${slide == img.id && "bg-white"} border-2 active:bg-white transition-all cursor-pointer border-gray-300 w-3 h-3 md:w-4 md:h-4  rounded-full bottom-4`}></button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
