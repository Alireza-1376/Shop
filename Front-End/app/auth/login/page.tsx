"use client";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { PhoneNumberType } from "@/types/auth";
import { sendPhoneNumber } from "@/actions/auth/sendPhoneNumber";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();
    const initialValues: PhoneNumberType = {
        phoneNumber: ""
    }
    const validationSchema = Yup.object({
        phoneNumber: Yup.string().matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
    })

    const onSubmit = async (values: PhoneNumberType) => {
        const result = await sendPhoneNumber(values)
        if (result?.status == 409) {
            router.push(`/auth/password?phoneNumber=${values.phoneNumber}`);
            return;
        }
        if (result?.status == 200) {
            toast.success("کد 4 رقمی به شماره موبایل شما ارسال شد", { rtl: true, className: "Font-BYekan" })
            localStorage.setItem("userInfo", JSON.stringify({ phoneNumber: result.data.phoneNumber, expiresAt: result.data.expiresAt , otp : result.data.otp }))
            router.push(`/auth/otp?phoneNumber=${values.phoneNumber}`);
        } else {
            toast.error(result?.data.message, { rtl: true, className: "Font-BYekan" })
            router.push(`/auth/otp?phoneNumber=${values.phoneNumber}`);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-amber-100 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-amber-200/50 p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="mx-auto w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">ورود</h1>
                        <p className="text-sm text-gray-500">
                            برای ورود شماره تلفن را وارد کنید
                        </p>
                    </div>

                    {/* فرم */}
                    <Form className="space-y-4">
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                شماره تلفن
                            </label>
                            <Field
                                id="phone"
                                type="tel"
                                dir="ltr"
                                placeholder="09123456789"
                                name="phoneNumber"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-lg
                         focus:outline-none focus:ring-2 focus:ring-amber-400 
                         placeholder:text-gray-400 transition-all"
                            />
                            <ErrorMessage name="phoneNumber">
                                {props => {
                                    return <p className="text-red-500 text-sm">{props}</p>
                                }}
                            </ErrorMessage>
                        </div>

                        <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-md shadow-amber-200 transition-all duration-200 hover:shadow-lg cursor-pointer">
                            ورود
                        </button>
                    </Form>

                    {/* خط جداکننده */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-3 text-gray-400">یا</span>
                        </div>
                    </div>

                    <button onClick={() => { router.push("/"); localStorage.removeItem("userInfo") }} className="w-full py-3 border-2 border-amber-400 text-amber-600 hover:bg-amber-50 active:bg-amber-100 font-semibold rounded-xl transition-all duration-200 cursor-pointer">
                        برو به صفحه اصلی
                    </button>
                </div>
            </div>
        </Formik>
    );
}
