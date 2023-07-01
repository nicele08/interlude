"use client";

import Link from "next/link";
import { Button } from "flowbite-react";

export default function SignupForm() {
  return (
    <form className="flex flex-col mt-8">
      <label className="text-sm font-medium">Name</label>
      <input
        type="text"
        className="border border-gray-300 rounded px-4 py-2 mt-2"
      />
      <label className="text-sm font-medium mt-4">Email</label>
      <input
        type="email"
        className="border border-gray-300 rounded px-4 py-2 mt-2"
      />

      <label className="text-sm font-medium mt-4">Password</label>
      <input
        type="password"
        className="border border-gray-300 rounded px-4 py-2 mt-2"
      />

      <Button
        type="submit"
        className="bg-primary hover:bg-primary text-white font-medium uppercase mt-8 rounded"
      >
        Sign up
      </Button>

      <p className="text-sm mt-4">
        Already have an account?{" "}
        <Link href="/" className="text-primary">
          Log in
        </Link>
      </p>
    </form>
  );
}
