"use client";

interface Props {
  totalSchemes?: number;
  topScore?: number;
}

export default function StatsCards({
  totalSchemes = 0,
  topScore = 0,
}: Props) {
  const cards = [
    {
      title: "Eligible Schemes",
      value: totalSchemes,
    },
    {
      title: "Highest Match",
      value: `${Number(topScore)}%`,
    },
    {
      title: "Applications",
      value: "7",
    },
    {
      title: "Benefits Value",
      value: "₹2.4L",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-[28px] bg-white p-6 shadow-lg"
        >
          <p className="text-gray-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}