import { getProfileData } from "@/services/auth";
import Link from "next/link";
import {
    FaUserCircle,
    FaEnvelope,
    FaPhoneAlt,
    FaUserShield,
    FaCalendarAlt,
    FaEdit,
    FaArrowRight,
} from "react-icons/fa";



type InfoCardProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
};

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const search = await searchParams
    const userId = search.userId
    const user = await getProfileData(String(userId))
    console.log(user)
    // { searchParams }: { searchParams: Promise<{ [key: string]: string }> }
    // const user = {
    //     username: "علیرضا",
    //     email: "alireza@gmail.com",
    //     phoneNumber: "09303163279",
    //     role: "admin",
    //     createdAt: "2026-08-06T14:21:24.182+00:00",
    // };

    const createdDate = new Date(user.createdAt).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div
            dir="rtl"
            className="h-screen overflow-hidden bg-linear-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center p-3"
        >
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-lg">

                {/* Top Bar */}
                <div className="flex items-center justify-between border-b border-amber-100 bg-amber-50 px-5 py-3">

                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-amber-100 hover:text-amber-700"
                    >
                        <FaArrowRight className="text-[11px]" />
                        بازگشت
                    </Link>

                    <span className="text-sm font-bold text-gray-700">
                        پروفایل
                    </span>

                </div>

                {/* Header */}
                <div className="relative h-28 bg-linear-to-r from-amber-400 via-amber-500 to-amber-600">

                    <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">

                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg">
                            <FaUserCircle className="text-[52px] text-amber-500" />
                        </div>

                    </div>

                </div>

                {/* Body */}
                <div className="px-5 pb-5 pt-12">

                    {/* User */}
                    <div className="flex items-center justify-between">

                        <div>
                            <h1 className="text-xl font-bold text-gray-800">
                                {user.username}
                            </h1>

                            <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700">
                                {user.role.toUpperCase()}
                            </span>
                        </div>

                        <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-amber-600">
                            <FaEdit className="text-sm" />
                            ویرایش پروفایل
                        </button>

                    </div>

                    {/* Information */}
                    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">

                        <InfoCard
                            icon={<FaEnvelope />}
                            title="ایمیل"
                            value={user.email}
                        />

                        <InfoCard
                            icon={<FaPhoneAlt />}
                            title="شماره موبایل"
                            value={user.phoneNumber}
                        />

                        <InfoCard
                            icon={<FaUserShield />}
                            title="سطح دسترسی"
                            value={user.role}
                        />

                        <InfoCard
                            icon={<FaCalendarAlt />}
                            title="تاریخ عضویت"
                            value={createdDate}
                        />

                    </div>

                </div>

            </div>
        </div>
    );
}

function InfoCard({ icon, title, value }: InfoCardProps) {
    return (
        <div className="group rounded-lg border border-amber-100 bg-amber-50 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">

            <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-base text-amber-500 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white">
                    {icon}
                </div>

                <div className="flex-1">

                    <p className="text-[11px] text-gray-500">
                        {title}
                    </p>

                    <p className="mt-0.5 break-all text-sm font-semibold text-gray-800">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
}