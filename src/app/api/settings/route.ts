import { getAuthCookie } from "@/helpers/auth";
import dbConnect from "@/lib/db.connect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
  try {
    const authData = getAuthCookie();
    if (!authData) {
      return NextResponse.json(
        {
          message: "Not authenticated",
        },
        {
          status: 401,
        }
      );
    }
    await dbConnect();

    const user = await User.findById(authData.userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    user.settings = {
      ...user._doc.settings,
      ...body,
    };

    await user.save();

    return NextResponse.json(
      {
        message: "Settings updated",
        settings: user.settings,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
