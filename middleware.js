import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  if(request.nextUrl.pathname.startsWith('/register')){

    const response = NextResponse.next()

    if(request.cookies.has('visited')) return response

    response.cookies.set({
      name:'visited',
      value:true,
      maxAge: 3600,
      httpOnly: true,
    })

    return response
  }
}

export async function testMiddleware(request) {
  const session = await getToken({ req: request });

  console.log("[session]", session);

  request.cookies.get("쿠키이름"); //출력
  request.cookies.has("쿠키이름"); //존재확인
  request.cookies.delete("쿠키이름"); //삭제

  const response = NextResponse.next();
  response.cookies.set({
    name: "mode",
    value: "dark",
    maxAge: 3600,
    httpOnly: true,
  });

  return response;

  if (request.nextUrl.pathname.startsWith("/write")) {
    if (session == null) {
      return NextResponse.redirect("http://localhost:3000/api/auth/signin");
    }
  }

  if (request.nextUrl.pathname.startsWith("/list")) {
    console.log(request.headers.get("sec-ch-ua-platform"));
    return NextResponse.next(); //return NextResponse 작성 필수
  }
}

//jwt 일경우에만 가능
//session은 db를 조회해야함

/**
 *
 * request.cookies.get('쿠키이름') //출력
 * request.cookies.has('쿠키이름') //존재확인
 * request.cookies.delete('쿠키이름') //삭제
 *
 * console.log(request.nextUrl)
 * console.log(request.cookies)
 * console.log(request.headers.get('user-agent'))
 *
 * NextResponse.next()
 * NextResponse.redirect() //주소창 주소도 변경
 * NextResponse.rewrite() //주소창 주소 그대로
 */
