"use client";

interface DashboardHeroProps {
  matchedSchemes: number;
  applications: number;
  matchScore: number;
  benefitsValue: number;
  userName?: string;
}

export default function DashboardHero({
  matchedSchemes,
  applications,
  matchScore,
  benefitsValue,
  userName,
}: DashboardHeroProps) {
  return (
    <section
      className="
      mt-6
      rounded-[36px]
      bg-gradient-to-r
      from-orange-500
      to-red-500
      p-8
      text-white
      shadow-2xl
      "
    >
      <h1 className="text-5xl font-bold">
        Welcome Back {userName ? `${userName} 👋` : "👋"}
      </h1>

      <p className="mt-4 text-xl">
        {matchedSchemes} schemes matched for your profile
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white/20 p-5">
          <p>Matched Schemes</p>
          <h2 className="text-3xl font-bold">{matchedSchemes}</h2>
        </div>

        <div className="rounded-2xl bg-white/20 p-5">
          <p>Applications</p>
          <h2 className="text-3xl font-bold">{applications}</h2>
        </div>

        <div className="rounded-2xl bg-white/20 p-5">
          <p>Match Score</p>
          <h2 className="text-3xl font-bold">{matchScore}%</h2>
        </div>

        <div className="rounded-2xl bg-white/20 p-5">
          <p>Benefits Value</p>
          <h2 className="text-3xl font-bold">
            ₹{benefitsValue.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>
    </section>
  );
}