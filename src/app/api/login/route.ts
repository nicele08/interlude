import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { setAuthCookie } from "@/helpers/auth";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const email = body.email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user?.password) {
      return NextResponse.json(
        {
          isLoggedIn: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          isLoggedIn: false,
          message: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        email,
        userId: user._id,
        name: user._doc.name,
      },
      process.env.JWT_SECRET || "secret"
    );
    
    setAuthCookie(token);

    return NextResponse.json({
      isLoggedIn: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        isLoggedIn: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
