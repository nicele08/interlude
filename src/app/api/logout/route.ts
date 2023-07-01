import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return NextResponse.json({
    isLoggedIn: false,
    message: "Logged out successfully",
  });
}
