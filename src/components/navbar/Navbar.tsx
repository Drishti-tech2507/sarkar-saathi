"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-orange-500"
        >
          Sarkar Saathi
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="font-medium hover:text-orange-500">
            Home
          </Link>

          <Link href="/about" className="font-medium hover:text-orange-500">
            About
          </Link>

          <Link href="/schemes" className="font-medium hover:text-orange-500">
            Schemes
          </Link>

          <Link
            href="/benefit-discovery"
            className="font-medium hover:text-orange-500"
          >
            Benefits
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <Link

href="/login"

className="

  bg-orange-500

  px-8

  py-3

  rounded-xl

  font-semibold

  text-white

  transition

  hover:scale-105

  hover:bg-orange-600

"

>

Login

</Link>

</div>
      </div>
    </nav>
  );
}