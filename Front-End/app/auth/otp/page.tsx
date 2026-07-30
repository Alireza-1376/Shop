"use client";

import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Field } from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { sendPhoneNumber } from "@/actions/auth/login";
import { OtpType, PhoneNumberType } from "@/types/auth";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import { veryfyOtp } from "@/actions/auth/verifyOtp";

export default function OtpPage() {
    const router = useRouter();
    const [timer, setTimer] = useState<number>();
    const [phoneNumber, setPhonenumber] = useState<string>()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "")
        const time = (new Date(userInfo.expiresAt).getTime() - new Date().getTime()) / 1000
        setPhonenumber(userInfo.phoneNumber)
        if (time > 0) {
            setTimer(Math.ceil(time))
        } else {
            setTimer(0)
        }
    }, [])

    useEffect(() => {
        if (timer == 0) {
            return
        }
        const id = setInterval(() => {
            setTimer((prev) => {
                if (prev) {
                    return prev - 1
                }
            })
        }, 1000)

        return () => {
            clearInterval(id)
        }
    }, [timer])

    if (!timer && !phoneNumber) {
        return <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-amber-100 px-4">
            <ImSpinner2 size={60} className="text-amber-600 animate-spin" />
        </div>
    }
    const getOtp = async (values: PhoneNumberType) => {
        const result = await sendPhoneNumber(values)
        if (result?.status == 200) {
            toast.success("کد 4 رقمی به شماره موبایل شما ارسال شد", { rtl: true, className: "Font-BYekan" })
            const time = (new Date(result.data.expiresAt).getTime() - new Date().getTime()) / 1000
            setTimer(time)
            localStorage.setItem("userInfo", JSON.stringify({ phoneNumber: result.data.phoneNumber, expiresAt: result.data.expiresAt }))
            router.refresh();
        } else {
            toast.error(result?.data.message, { rtl: true, className: "Font-BYekan" })
        }
    }

    const initialValues: OtpType = {
        otp: ""
    }
    const validationSchema = Yup.object({
        otp: Yup.string().required("ورود کد تایید الزامی است")
    })
    const onSubmit = async (values: OtpType) => {
        const result = await veryfyOtp(values)
        if (result?.status == 200) {
            toast.success(result.message, { rtl: true, className: "Font-BYekan" })
            router.push("/auth/signup")
        }
        if (result?.status == 400) {
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
                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800">کد تأیید</h1>
                                <p className="text-sm text-gray-500">
                                    {phoneNumber && ` کد ۴ رقمی به شماره ${phoneNumber} ارسال شده است`}
                                </p>
                            </div>

                            {/* فرم OTP */}
                            <Form className="space-y-6">
                                <div className="flex justify-center gap-3 mb-0 " dir="ltr">
                                    <Field className="w-fit">
                                        <InputOTP className="pb-0" onChange={(value) => { formik.setFieldValue("otp", value) }} id="digits-only" maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                                            <InputOTPGroup className="">
                                                <InputOTPSlot index={0} className="w-12 h-12" />
                                                <InputOTPSlot index={1} className="w-12 h-12" />
                                                <InputOTPSlot index={2} className="w-12 h-12" />
                                                <InputOTPSlot index={3} className="w-12 h-12" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </Field>
                                </div>
                                <ErrorMessage name="otp">
                                    {props => {
                                        return <p className="text-red-500 text-sm text-center">{props}</p>
                                    }}
                                </ErrorMessage>
                                <p className="text-center pt-4">{timer && `${timer.toFixed()} `} ثانیه</p>

                                <button
                                    type="submit"
                                    className="w-full py-3 cursor-pointer bg-amber-500 hover:bg-amber-600
                       text-white font-semibold rounded-xl shadow-md shadow-amber-200
                       transition-all duration-200 hover:shadow-lg"
                                >
                                    تأیید کد
                                </button>
                            </Form>

                            {/* خط جداکننده */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-3 text-gray-400">کد را دریافت نکردی؟</span>
                                </div>
                            </div>

                            {/* دکمه ارسال مجدد */}
                            <button
                                onClick={() => { getOtp({ phoneNumber: String(phoneNumber) }) }}
                                disabled={Number(timer) > 0}
                                type="button"
                                className="w-full disabled:opacity-50 cursor-pointer py-3 border-2 border-amber-400 text-amber-600
                     hover:bg-amber-50 active:bg-amber-100
                     font-semibold rounded-xl transition-all duration-200"
                            >
                                ارسال مجدد کد
                            </button>

                        </div>
                    </div>
                )
            }}

        </Formik>
    );
}
