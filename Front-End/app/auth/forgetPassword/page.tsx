"use client";
import { recoveryPassword } from "@/actions/auth/recovery";
import { RecoveryPassword } from "@/types/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from 'yup';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const initialValues = {
    phoneNumber: phoneNumber,
    password: "",
    confirmPassword: ""
  }

  const validationSchema = Yup.object({
    phoneNumber: Yup.string(),
    password: Yup.string().required("لطفا رمزعبور جدید را وارد کنید").min(5, "حداقل 5 کاراکتر وارد کنید"),
    confirmPassword: Yup.string().required("لطفا تکرار رمزعبور جدید را وارد کنید").oneOf([Yup.ref("password")], "رمز عبور و تکرار آن یکسان نیست")
  })

  const onSubmit = async (values: RecoveryPassword) => {
    const result = await recoveryPassword(values)
    if (result.status == 200) {
      toast.success(result.message, { rtl: true, className: "Font-BYekan" })
      router.push("/auth/login")
    } else {
      toast.error(result.message, { rtl: true, className: "Font-BYekan" })
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-amber-100 px-4">
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
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">بازیابی رمز عبور</h1>
              <p className="text-sm text-gray-500">رمز عبور جدید خود را وارد کنید</p>
            </div>

            <Form className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  شماره موبایل
                </label>
                <Field
                  name="phoneNumber"
                  type="text"
                  dir="ltr"
                  disabled
                  value={phoneNumber}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center
                         focus:outline-none focus:ring-2 focus:ring-amber-400 
                         placeholder:text-gray-400 transition-all"
                />
                <ErrorMessage name="phoneNumber">
                  {props => {
                    return <p className="text-red-500 text-sm">{props}</p>
                  }}
                </ErrorMessage>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  رمز عبور جدید
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  dir="ltr"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center
                         focus:outline-none focus:ring-2 focus:ring-amber-400 
                         placeholder:text-gray-400 transition-all"
                />
                <ErrorMessage name="password">
                  {props => {
                    return <p className="text-red-500 text-sm">{props}</p>
                  }}
                </ErrorMessage>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  تکرار رمز عبور
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         placeholder:text-gray-400 transition-all"
                />
                <ErrorMessage name="confirmPassword">
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
                تغییر رمز عبور
              </button>
            </Form>


            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-gray-400">رمزت یادت اومد؟</span>
              </div>
            </div>


            <button
              onClick={() => router.push("/auth/login")}
              className="w-full cursor-pointer py-3 border-2 border-amber-400 text-amber-600
                     hover:bg-amber-50 active:bg-amber-100
                     font-semibold rounded-xl transition-all duration-200"
            >
              برو به صفحه ورود
            </button>

          </div>
        </div>
      }}
    </Formik>
  );
}
