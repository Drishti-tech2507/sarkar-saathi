"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const saveUserToDB = async (
    
    user: any
  ) => {
    await fetch(
      "/api/users/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          name:
            user.displayName || "",
          email:
            user.email || "",
          photoURL:
            user.photoURL || "",
        }),
      }
    );
  };
  const sendWelcomeEmail = async (user: any) => {
    try {
      console.log("Sending email to:", user.email);
  
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID!,
        {
          user_name: user.displayName || "Citizen",
          user_email: user.email,
          login_time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
  
      console.log("EMAIL SUCCESS:", response);
    } catch (error) {
      console.error("EMAIL FAILED:", error);
      alert(JSON.stringify(error));
    }
  };
  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      setError("");
  
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
  
      const user =
        userCredential.user;
  
        await saveUserToDB(user);

        await sendWelcomeEmail(user);
        
        localStorage.setItem(
          "uid",
          user.uid
        );
  
      localStorage.setItem(
        "email",
        user.email || ""
      );
  
      localStorage.setItem(
        "userName",
        user.displayName || "Citizen"
      );
  
      localStorage.setItem(
        "showProfilePopup",
        "true"
      );
  
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin =
  async () => {
    try {
      setLoading(true);

      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      const user =
        result.user;

        await saveUserToDB(user);

        await sendWelcomeEmail(user);
        
        localStorage.setItem(
          "uid",
          user.uid
        );

      localStorage.setItem(
        "email",
        user.email || ""
      );

      localStorage.setItem(
        "userName",
        user.displayName ||
        "Citizen"
      );

      localStorage.setItem(
        "showProfilePopup",
        "true"
      );

      window.location.href =
        "/";
    } catch (err: any) {
      setError(
        err.message ||
        "Google login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700">

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex flex-col justify-center p-16 text-white">

          <span className="w-fit rounded-full bg-white/20 px-5 py-2 backdrop-blur">
            Government Benefits Portal
          </span>

          <h1 className="mt-8 text-6xl font-bold leading-tight">
            Discover
            <br />
            Government Benefits
          </h1>

          <p className="mt-6 text-xl text-orange-50">
            Find scholarships,
            healthcare benefits,
            farmer schemes,
            pensions and more.
          </p>

          <div className="mt-12 space-y-4">

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              ✓ Personalized Recommendations
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              ✓ Multilingual Support
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              ✓ AI Assistant
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center bg-gray-50 p-8">

        <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-2xl">

          <h2 className="text-5xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-3 text-gray-500">
            Sign in to continue exploring schemes.
          </p>

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="you@example.com"
                className="w-full rounded-2xl border p-4"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="••••••••"
                className="w-full rounded-2xl border p-4"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-600"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="px-4 text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            onClick={
              handleGoogleLogin
            }
            disabled={loading}
            className="w-full rounded-2xl border py-4 font-medium"
          >
            Continue with Google
          </button>

          <p className="mt-8 text-center text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-orange-500"
            >
              Sign Up
            </a>
          </p>

        </div>
      </div>

    </main>
  );
}