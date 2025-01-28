// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { getServerSession } from "next-auth";
// export async function middleware(request: NextRequest){
//     const session = await getServerSession();
//     console.log('session', session)
//     return NextResponse.next() ? session : NextResponse.redirect(new URL('/home', request.url)) 
// }



// export const config = {
//     matcher: [
//         "/settings-page",
//         "/join",
//     ]
// }

export { default } from "next-auth/middleware"

export const config = {matcher:
    [
        "/game",
        "/upload",
        "/login",
        "/settings-page",
        "/join",
    ]
}