"use client";

export default function SchemeDeadlines() {

  const deadlines = [
    {
      name:
        "PM YASASVI Scholarship",
      days: 5,
    },

    {
      name:
        "AICTE Pragati",
      days: 8,
    },

    {
      name:
        "PM Awas Yojana",
      days: 14,
    },
  ];

  return (
    <div className="rounded-[30px] bg-white p-6 shadow-lg">

      <h2 className="text-xl font-bold">
        ⏰ Upcoming Deadlines
      </h2>

      <div className="mt-4 space-y-4">

        {deadlines.map(
          (item) => (
            <div
              key={item.name}
              className="
              rounded-xl
              bg-red-50
              p-4
              "
            >
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-red-600">
                {item.days} days left
              </p>
            </div>
          )
        )}

      </div>

    </div>
  );
}