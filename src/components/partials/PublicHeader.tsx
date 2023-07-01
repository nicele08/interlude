"use client";

import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const PublicHeader = () => {
  const pathname = usePathname();
  const getStyle = (path: string) => {
    if (pathname === path) {
      return "border border-primary";
    }
    return "border-none";
  };
  return (
    <div className="flex items-center w-full">
      <Link href="/" className="py-3">
        <Logo />
      </Link>
      <Link href="/" className="ml-10 hidden md:block text-cyan-401">
        Home
      </Link>

      <div className="hidden md:flex items-center ml-auto pl-12 py-2">
        <Link
          href="/"
          className={`text-primary px-6 font-medium py-2 uppercase ${getStyle(
            "/"
          )}`}
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className={`text-primary px-6 font-medium py-2 uppercase ${getStyle(
            "/signup"
          )}`}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default PublicHeader;
