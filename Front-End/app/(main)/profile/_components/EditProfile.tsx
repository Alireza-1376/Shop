"use client";

import { editProfile } from "@/actions/auth/editProfile";
import { getProfileData } from "@/services/auth";
import { EditProfile } from "@/types/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser, FiPhone, FiMail, FiX } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import * as Yup from 'yup';

export default function EditProfileModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    userId: "",
    username: "",
    phoneNumber: "",
    email: "",
  });


  const validationSchema = Yup.object({
    username: Yup.string().required("لطفا نام کاربری خود را وارد کنید").min(3, "حداقل 3 کاراکتر را وارد کنید"),
    phoneNumber: Yup.string().required("شماره موبایل خود را وارد کنید").matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  })

  const onSubmit = async (values: EditProfile) => {
    const result = await editProfile(values)
    console.log(result)
    if (result.status == 200) {
      toast.success(result.message, { rtl: true, className: "Font-BYekan" })
      router.refresh()
      router.back()
    } else {
      toast.error(result.message, { rtl: true, className: "Font-BYekan" })
      router.back()
    }
  }

  useEffect(() => {
    async function getUserData() {
      const user = await getProfileData(String(userId))
      setInitialValues({
        userId: String(userId),
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      setLoading(false)
    }
    getUserData()
  }, [])

  const inputStyles = "w-full rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-2.5 pl-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200";

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-amber-100 px-4">
        <ImSpinner2 size={60} className="text-amber-600 animate-spin" />
      </div>
    )
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* پس‌زمینه تیره */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* کارت مودال */}
        <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
          {/* هدر */}
          <div className="flex items-center justify-between border-b border-amber-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">ویرایش پروفایل</h2>
            <button
              onClick={() => { router.back() }}
              className="rounded-full cursor-pointer p-2 text-gray-400 transition hover:bg-amber-50 hover:text-amber-600"
              aria-label="بستن"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* فرم */}
          <Form className="space-y-5 px-6 py-6">
            {/* یوزرنیم */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                نام کاربری
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
                <Field
                  type="text"
                  name="username"
                  placeholder="نام کاربری"
                  className={inputStyles}
                />
              </div>
              <ErrorMessage name="username">
                {props => {
                  return <p className="text-red-500 text-sm">{props}</p>
                }}
              </ErrorMessage>
            </div>

            {/* شماره موبایل */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                شماره موبایل
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
                <Field
                  type="tel"
                  name="phoneNumber"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className={inputStyles}
                  dir="rtl"
                />
              </div>
              <ErrorMessage name="phoneNumber">
                {props => {
                  return <p className="text-red-500 text-sm">{props}</p>
                }}
              </ErrorMessage>
            </div>

            {/* ایمیل */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                ایمیل
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
                <Field
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className={inputStyles}
                />
                <ErrorMessage name="email">
                  {props => {
                    return <p className="text-red-500 text-sm">{props}</p>
                  }}
                </ErrorMessage>
              </div>
            </div>

            {/* دکمه‌ها */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { router.back() }}
                type="button"
                className="flex-1 cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="flex cursor-pointer flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-200 transition hover:bg-amber-600 disabled:opacity-50"
              >
                ذخیره تغییرات
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
