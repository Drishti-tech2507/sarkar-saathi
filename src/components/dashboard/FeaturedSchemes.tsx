"use client";

interface Props {
  matches: any[];
}

export default function FeaturedSchemes({
  matches,
}: Props) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">
        ⭐ Featured Schemes
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">
        {matches.map((match) => (
          <div
            key={match.scheme._id}
            className="
            rounded-[28px]
            bg-white
            p-6
            shadow-lg
            "
          >
            <span
              className="
              rounded-full
              bg-orange-100
              px-3
              py-1
              text-xs
              text-orange-600
              "
            >
              {match.scheme.category}
            </span>

            <h3 className="mt-4 text-xl font-bold">
              {match.scheme.name}
            </h3>

            <p className="mt-3 text-gray-500">
              {match.scheme.description}
            </p>

            <div className="mt-4">
              <div className="h-3 rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-green-500"
                  style={{
                    width: `${Math.min(
                      match.score,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <a
              href={match.scheme.applyLink}
              target="_blank"
              rel="noreferrer"
              className="
              mt-5
              block
              rounded-xl
              bg-orange-500
              py-3
              text-center
              text-white
              "
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}