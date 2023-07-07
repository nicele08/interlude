import { removeAuthCookie } from "@/helpers/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  removeAuthCookie();
  const loginUrl = new URL('/', request.url)
  return NextResponse.redirect(loginUrl);
}
