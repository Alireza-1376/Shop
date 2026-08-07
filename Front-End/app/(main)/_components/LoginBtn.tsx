import { cookies } from "next/headers";
import Link from "next/link";
import { RiLoginBoxLine } from "react-icons/ri";
import Logout from "./Logout";
import { getUserInfo } from "@/services/auth";

async function LoginBtn() {
    const cookieStrore = await cookies()
    const token = cookieStrore.get("token")
    
    return (
        <div>
            {token ?
                <Logout />
                :
                <Link href="/auth/login" className="flex items-center gap-2 rounded-xl border px-5 py-2 transition hover:bg-gray-100 hover:text-amber-600 cursor-pointer">
                    <RiLoginBoxLine size={20} />
                    <span>ورود</span>
                    <span className="text-gray-400">/</span>
                    <span>ثبت نام</span>
                </Link>
            }
        </div>
    )
}

export default LoginBtn;