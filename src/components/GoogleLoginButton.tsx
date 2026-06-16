"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="
        w-full
        rounded-xl
        bg-orange-500
        py-3
        font-semibold
        text-white
      "
    >
      Continue with Google
    </button>
  );
}