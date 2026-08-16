"use client"

import { paymentRequest } from "@/actions/cart/paymentRequest";
import { getUserInfo } from "@/services/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiMapPin, FiPhone } from "react-icons/fi";
import { toast } from "react-toastify";
import * as Yup from 'yup';

function FormCheckout() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const searchParams = useSearchParams()
    const message = searchParams.get("error")
    useEffect(() => {
        if (message) {
            toast.error(message, { rtl: true, className: "Font-BYekan" })
        }
        router.replace("/checkout");
        async function userInfo() {
            const data = await getUserInfo()
            setPhoneNumber(data.phoneNumber)
        }
        userInfo()
    }, [])

    const initialValue = {
        phoneNumber,
        address: ""
    }
    const validationSchema = Yup.object({
        address: Yup.string().required("لطفا آدرس خود را وارد کنید"),
    })
    const onSubmit = async (values: { phoneNumber: string, address: string }) => {
        const result = await paymentRequest(values)
        console.log(result)
    }
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValue}
            onSubmit={onSubmit}
            enableReinitialize
        >
            <Form
                className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-7"
            >
                <div className="mb-7">
                    <h2 className="text-lg font-bold text-gray-900">
                        اطلاعات ارسال
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        شماره موبایل و آدرس خود را وارد کنید.
                    </p>
                </div>

                {/* Phone */}
                <div className="mb-6">
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        شماره موبایل
                    </label>

                    <div className="relative">
                        <FiPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                        <Field
                            id="phone"
                            type="tel"
                            name="phoneNumber"
                            dir="rtl"
                            disabled
                            className="w-full opacity-70 rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-amber-100"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="mb-7">
                    <label
                        htmlFor="address"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        آدرس
                    </label>

                    <div className="relative">
                        <FiMapPin className="absolute right-4 top-4 text-xl text-gray-400" />

                        <Field
                            as="textarea"
                            name="address"
                            id="address"
                            placeholder="استان، شهر، خیابان، کوچه، پلاک..."
                            rows={5}
                            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm leading-7 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-amber-100"
                        />
                        <ErrorMessage name="address">
                            {props => {
                                return <p className="text-sm text-red-500">{props}</p>
                            }}
                        </ErrorMessage>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="group cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600 active:scale-[0.99]"
                >
                    ثبت و ادامه پرداخت

                    <FiArrowLeft className="text-lg transition-transform group-hover:-translate-x-1" />
                </button>
            </Form>
        </Formik>
    )
}

export default FormCheckout;