import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")
    if (request.nextUrl.pathname.startsWith('/auth') && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: '/auth/:path*',
}