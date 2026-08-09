"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { PasswordType } from "@/types/auth";
import { login } from "@/actions/auth/login";
import { toast } from "react-toastify";
import { Suspense } from "react";


export default function PasswordPage() {
  return (
    <Suspense>
      <MainContent />
    </Suspense>
  )
}


function MainContent() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phoneNumber") || "";

  const initialValues = {
    password: ""
  }

  const validationSchema = Yup.object({
    password: Yup.string().required("رمزعبور خود را وارد کنید").min(5, "حداقل 5 کاراکتر را وارد کنید")
  })

  const onSubmit = async (values: PasswordType) => {
    const result = await login(values, phoneNumber)
    if (result.status == 200) {
      toast.success(result.message, { rtl: true, className: "Font-BYekan" })
      router.push("/")
    } else {
      toast.error(result.message, { rtl: true, className: "Font-BYekan" })
    }
  }

  const forgetPassword = async () => {
    router.push(`/auth/forgetPassword?phoneNumber=${phoneNumber}`)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
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
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                رمز عبور
              </label>
              <Field
                id="password"
                type="password"
                name="password"
                dir="ltr"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-lg
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         placeholder:text-gray-400 transition-all"
              />
              <ErrorMessage name="password">
                {props => {
                  return <p className="text-red-500 text-sm">{props}</p>
                }}
              </ErrorMessage>
            </div>

            <button
              type="submit"
              className="w-full py-3 cursor-pointer bg-amber-500 hover:bg-amber-600
                       text-white font-semibold rounded-xl shadow-md shadow-amber-200
                       transition-all duration-200 hover:shadow-lg"
            >
              تأیید
            </button>
          </Form>

          {/* لینک فراموشی رمز عبور */}
          <div className="text-center">
            <button
              onClick={() => { forgetPassword() }}
              className="text-sm cursor-pointer text-amber-600 hover:text-amber-700 hover:underline transition-all"
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
            onClick={() => router.push(`/auth/login`)}
            className="w-full py-3 border-2 border-amber-400 cursor-pointer text-amber-600
                     hover:bg-amber-50 active:bg-amber-100
                     font-semibold rounded-xl transition-all duration-200"
          >
            برو به صفحه ورود
          </button>
        </div>
      </div>
    </Formik>
  );
}