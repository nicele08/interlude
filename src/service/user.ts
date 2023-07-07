import dbConnect from "@/lib/db.connect";
import User from "@/models/User";
import { User as UserType } from "@/types/user.type";

export const getUser = async (userId: string): Promise<UserType | null> => {
  try {
    await dbConnect();
    const user = await User.findById(userId);
    return user._doc;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
