"use client";

import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { Avatar, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiCog } from "react-icons/hi";

const Header = ({ name = "", email = "" }) => {
  const router = useRouter();
  const moveToLink = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col items-center bg-primary shadow-sm">
      <div className="flex items-center px-8 space-x-6 justify-between max-w-4xl w-full">
        <Link href="/" className="py-3">
          <Logo />
        </Link>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="text-gray-500 hover:bg-gray-100 bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2"
          >
            <HiCog className="w-5 h-5" />
          </button>
          <Dropdown inline label={<Avatar rounded />} arrowIcon={false}>
            <Dropdown.Header>
              <span className="block text-sm">{name}</span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => moveToLink("/dashboard")}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => moveToLink("/api/logout")}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
