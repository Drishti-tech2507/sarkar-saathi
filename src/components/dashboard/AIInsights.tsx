"use client";

export default function AIInsights({
  matches,
}: any) {
  const topScheme =
    matches?.[0];

  return (
    <div className="rounded-[30px] bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white shadow-xl">
      <h2 className="text-2xl font-bold">
        🤖 Sarkar AI Insights
      </h2>

      <p className="mt-3 opacity-90">
        Based on your profile, you are highly eligible for:
      </p>

      <div className="mt-4 rounded-2xl bg-white/10 p-4">
        <h3 className="font-bold text-xl">
          {topScheme?.scheme?.name ||
            "PM YASASVI Scholarship"}
        </h3>

        <p className="mt-2">
          Match Score:
          {" "}
          {topScheme?.score || 92}%
        </p>
      </div>
    </div>
  );
}