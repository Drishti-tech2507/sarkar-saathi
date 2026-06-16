"use client";

interface Props {
  history: any[];
}

export default function SearchHistoryPanel({
  history,
}: Props) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-xl">
      <h2 className="text-xl font-bold">
        🔍 Search History
      </h2>

      <div className="mt-5 space-y-3">
        {history.length === 0 ? (
          <p className="text-gray-500">
            No searches yet.
          </p>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="rounded-xl bg-gray-50 p-3"
            >
              {item.query}
            </div>
          ))
        )}
      </div>
    </div>
  );
}