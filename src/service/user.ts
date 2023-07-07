import User from "@/models/User";

export const getUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user._doc;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
