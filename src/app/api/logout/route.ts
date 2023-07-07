import { removeAuthCookie } from "@/helpers/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  removeAuthCookie();
  return NextResponse.redirect("/");
}
