"use client"
import { useState } from "react"

function Tabs({ Menu, Info }: { Menu: React.ReactNode, Info: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState("menu")
    return (
        <div className="container mx-auto mt-2">
            <div>
                <button className={`${activeTab == "menu" && "bg-amber-200"} transition-all border w-36 border-gray-300 p-4 py-2 cursor-pointer`} onClick={() => { setActiveTab("menu") }}>منوی سفارش</button>
                <button className={`${activeTab == "info" && "bg-amber-200"} transition-all border w-36 border-r-0 border-gray-300 p-4 py-2 cursor-pointer`} onClick={() => { setActiveTab("info") }}>اطلاعات رستوران</button>
            </div>
            <div className="mt-4">
                {activeTab == "menu" && Menu}
                {activeTab == "info" && Info}
            </div>
        </div>
    )
}

export default Tabs