"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"


export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("token")
    revalidatePath("/")
    return {
        status:200 ,
        message:"خروج با موفقیت انجام شد"
    }
}