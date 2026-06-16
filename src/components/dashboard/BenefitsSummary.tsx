"use client";

interface Props {
  matches: any[];
}

export default function BenefitsSummary({
  matches,
}: Props) {
  const totalBenefits =
    matches.length * 50000;

  return (
    <div className="rounded-[32px] bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-xl">
      <h2 className="text-2xl font-bold">
        💰 Benefits Summary
      </h2>

      <p className="mt-3 text-green-100">
        Estimated benefits available
      </p>

      <h1 className="mt-4 text-4xl font-bold">
        ₹
        {totalBenefits.toLocaleString()}
      </h1>
    </div>
  );
}