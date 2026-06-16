"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import {
  sendWelcomeEmail,
} from "@/lib/email";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "Passwords do not match"
        );
        return;
      }

      try {
        setLoading(true);
        setError("");

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        await updateProfile(
          userCredential.user,
          {
            displayName: name,
          }
        );

        const user =
          userCredential.user;

          const response = await fetch(
            "/api/users/create",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                uid: user.uid,
                name,
                email,
                photoURL: "",
              }),
            }
          );
          
          const userData =
            await response.json();
          
          console.log(
            "USER CREATED:",
            userData
          );
          
          // Send Welcome Email ONLY ONCE
          
          if (
            userData.success
          ) {
          
            const mailSent =
              await sendWelcomeEmail(
                name,
                email
              );
          
            console.log(
              "WELCOME MAIL:",
              mailSent
            );
          
          }

        localStorage.setItem(
          "uid",
          user.uid
        );

        localStorage.setItem(
          "name",
          name
        );

        localStorage.setItem(
          "email",
          email
        );

        router.push(
          "/profile"
        );
      } catch (err: any) {
        setError(
          err.message ||
            "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div
        className="
        hidden
        lg:flex
        relative
        overflow-hidden
        bg-gradient-to-br
        from-orange-600
        via-orange-500
        to-orange-700
        "
      >
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex flex-col justify-center p-16 text-white">

          <span className="w-fit rounded-full bg-white/20 px-5 py-2 backdrop-blur">
            Sarkar Saathi
          </span>

          <h1 className="mt-8 text-6xl font-bold leading-tight">
            Create
            <br />
            Your Account
          </h1>

          <p className="mt-6 text-xl text-orange-50">
            Discover government
            schemes personalized
            for your profile.
          </p>

          <div className="mt-12 space-y-4">

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              ✓ Real-time Eligibility
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              ✓ AI Recommendations
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              ✓ Multilingual Support
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center bg-gray-50 p-8">

        <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-2xl">

          <h2 className="text-5xl font-bold">
            Sign Up 🚀
          </h2>

          <p className="mt-3 text-gray-500">
            Create your Sarkar
            Saathi account.
          </p>

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={
              handleRegister
            }
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border p-4"
                required
              />
            </div>

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
                className="w-full rounded-2xl border p-4"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border p-4"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              rounded-2xl
              bg-orange-500
              py-4
              font-semibold
              text-white
              hover:bg-orange-600
              "
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Already have an
            account?{" "}
            <a
              href="/login"
              className="font-semibold text-orange-500"
            >
              Login
            </a>
          </p>

        </div>
      </div>

    </main>
  );
}