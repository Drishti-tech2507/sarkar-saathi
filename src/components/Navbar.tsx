"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-orange-500"
      >
        Sarkar Saathi
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="font-medium hover:text-orange-500 transition"
        >
          Home
        </Link>

        <Link
          href="/about"
          className="font-medium hover:text-orange-500 transition"
        >
          About
        </Link>

        <Link
          href="/schemes"
          className="font-medium hover:text-orange-500 transition"
        >
          Schemes
        </Link>

        <Link
          href="/contact"
          className="font-medium hover:text-orange-500 transition"
        >
          Contact
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <Link
          href="/login"
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}