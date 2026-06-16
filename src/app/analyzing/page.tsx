"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnalyzingPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 4000);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50">

      <div className="text-center">

        <h1 className="text-5xl font-bold">
          AI Saathi is Analyzing...
        </h1>

        <div className="mt-8 space-y-3">

          <p>✓ Checking Central Schemes</p>
          <p>✓ Checking State Schemes</p>
          <p>✓ Checking Scholarships</p>
          <p>✓ Checking Welfare Benefits</p>

        </div>

      </div>

    </div>
  );
}