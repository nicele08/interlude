"use client";

import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { Avatar, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";

const Header = ({ name = "", email = "" }) => {
  const router = useRouter();
  const moveToLink = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex items-center space-x-6 justify-between">
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex items-center space-x-3">
        <Dropdown inline label={<Avatar rounded />}>
          <Dropdown.Header>
            <span className="block text-sm">{name}</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => moveToLink("/dashboard")}>
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item onClick={() => moveToLink("/dashboard/settings")}>
            Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => moveToLink("/api/logout")}>
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
