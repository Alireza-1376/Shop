// app/password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("رمز عبور:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-amber-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-amber-200/50 p-8 space-y-6">
        {/* هدر */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">رمز عبور</h1>
          <p className="text-sm text-gray-500">رمز عبور خود را وارد کنید</p>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رمز عبور
            </label>
            <input
              id="password"
              type="password"
              dir="ltr"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-lg
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         placeholder:text-gray-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600
                       text-white font-semibold rounded-xl shadow-md shadow-amber-200
                       transition-all duration-200 hover:shadow-lg"
          >
            تأیید
          </button>
        </form>

        {/* لینک فراموشی رمز عبور */}
        <div className="text-center">
          <button
            onClick={() => router.push("/forgot-password")}
            className="text-sm text-amber-600 hover:text-amber-700 hover:underline transition-all"
          >
            رمز عبور را فراموش کردید؟
          </button>
        </div>

        {/* خط جداکننده */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-400">یا</span>
          </div>
        </div>

        {/* دکمه رفتن به صفحه اصلی */}
        <button
          onClick={() => router.push("/")}
          className="w-full py-3 border-2 border-amber-400 text-amber-600
                     hover:bg-amber-50 active:bg-amber-100
                     font-semibold rounded-xl transition-all duration-200"
        >
          برو به صفحه اصلی
        </button>
      </div>
    </div>
  );
}
