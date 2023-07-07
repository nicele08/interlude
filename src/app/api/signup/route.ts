import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db.connect";
import User from "@/models/User";
import { setAuthCookie } from "@/helpers/auth";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const { name, password } = body;

    const email = body.email.trim().toLowerCase();

    const existUser = await User.findOne({ email });

    if (existUser) {
      return NextResponse.json(
        {
          isLoggedIn: false,
          message: "User already exist, please login",
        },
        {
          status: 409,
        }
      );
    }

    const hashePassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashePassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email,
        name,
      },
      process.env.JWT_SECRET || "secret"
    );
    setAuthCookie(token);

    return NextResponse.json(
      {
        isLoggedIn: true,
        userId: user._id,
        email,
        name,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
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
