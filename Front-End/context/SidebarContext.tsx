"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

type ContextType = {
    openSidebar: boolean;
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext({} as ContextType);

export default function SidebarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}