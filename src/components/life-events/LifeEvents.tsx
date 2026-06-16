const events = [
  "👶 Child Born",
  "💍 Married",
  "🧕 Widow Support",
  "💼 Lost Job",
  "🌾 Started Farming",
  "🏪 Started Business",
  "♿ Disability",
  "👴 Senior Citizen",
];

export default function LifeEvents() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-10 text-center text-4xl font-bold">
          What happened recently?
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {events.map((event) => (
            <div
              key={event}
              className="cursor-pointer rounded-2xl border p-6 text-center transition hover:border-orange-500 hover:shadow-lg"
            >
              {event}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}