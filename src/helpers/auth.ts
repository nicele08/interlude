import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface AuthCookie {
  userId: string;
  email: string;
  name: string;
}

export const getAuthCookie = () => {
  const cookieStore = cookies();
  try {
    const token = cookieStore.get("token");

    if (!token?.value) {
      return null;
    }

    const decodedToken = jwt.verify(
      token.value,
      process.env.JWT_SECRET || "secret"
    );

    return decodedToken as AuthCookie;
  } catch (error) {
    cookieStore.delete("token");
    return null;
  }
};

export const setAuthCookie = (token: string) => {
  const cookieStore = cookies();
  cookieStore.set("token", token);
};

export const removeAuthCookie = () => {
  const cookieStore = cookies();
  cookieStore.delete("token");
};
