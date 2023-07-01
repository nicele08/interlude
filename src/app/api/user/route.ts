import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json({
      isLoggedIn: false,
      message: "No token found",
    });
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "secret");

    return NextResponse.json(decoded);
  } catch (error: any) {
    return NextResponse.json({
      isLoggedIn: false,
      message: error.message,
    });
  }
}
