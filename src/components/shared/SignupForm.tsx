"use client";

import React from "react";
import Link from "next/link";
import { Button } from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (data.isLoggedIn) {
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      const err = error.response?.data?.error || "Something went wrong";
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8">
      <label className="text-sm font-medium">Name</label>
      <input
        type="text"
        name="name"
        value={credentials.name}
        onChange={onChange}
        className="border border-gray-300 rounded px-4 py-2 mt-2"
      />
      <label className="text-sm font-medium mt-4">Email</label>
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={onChange}
        className="border border-gray-300 rounded px-4 py-2 mt-2"
      />

      <label className="text-sm font-medium mt-4">Password</label>
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={onChange}
        className="border border-gray-300 rounded px-4 py-2 mt-2"
      />

      <Button
        type="submit"
        isProcessing={submitting}
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
      <ToastContainer />
    </form>
  );
}
