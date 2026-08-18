import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

type JWT ={
    role:string, 
}


export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value || ""
    if (token) {
        const decoded : JWT = jwtDecode(token)
        if (request.nextUrl.pathname.startsWith('/admin') && decoded.role == "user") {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    if (request.nextUrl.pathname.startsWith('/auth') && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/auth/:path*', "/admin/:path"],
}