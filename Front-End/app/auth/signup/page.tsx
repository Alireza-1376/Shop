"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("ثبت‌نام:", form);
    // اینجا منطق ثبت‌نام رو اضافه کن
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">ثبت‌نام</h1>
        </div>

        {/* فرم */}
        <form className="space-y-4">
          {/* نام کاربری */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نام کاربری
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="مثال: ali_123"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-right
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         placeholder:text-gray-400 transition-all"
              required
            />
          </div>

          {/* ایمیل */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         placeholder:text-gray-400 transition-all"
            />
          </div>

          {/* رمز عبور */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="حداقل ۸ کاراکتر"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-md shadow-amber-200 transition-all duration-200 hover:shadow-lg">
            ثبت‌نام
          </button>
        </form>

        {/* خط جداکننده */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-400">قبلاً ثبت‌ نام کردی؟</span>
          </div>
        </div>

        <button
          onClick={() => {router.push("/auth/login")}}
          className="w-full cursor-pointer py-3 border-2 border-amber-400 text-amber-600 hover:bg-amber-50 active:bg-amber-100 font-semibold rounded-xl transition-all duration-200">
          برو به صفحه ورود
        </button>

      </div>
    </div>
  );
}
