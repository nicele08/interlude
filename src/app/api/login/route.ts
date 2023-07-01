import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const body = await request.json();

  const email = body.email.trim().toLowerCase();

  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET || "secret"
  );

  cookieStore.set("token", token);

  return NextResponse.json({
    isLoggedIn: true,
  });
}
