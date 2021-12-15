import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: any) {
    const { pathname } = req.nextUrl
    if (pathname == '/') {
        return NextResponse.redirect('/home')
    }
    return NextResponse.next()
}