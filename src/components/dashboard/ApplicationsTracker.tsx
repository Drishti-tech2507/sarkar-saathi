"use client";

interface Props {
  applications?: any[];
}

export default function ApplicationsTracker({
  applications = [],
}: Props) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-xl">
      <h2 className="text-xl font-bold">
        📄 Applications
      </h2>

      <div className="mt-5 space-y-4">
        {applications.length === 0 ? (
          <p className="text-gray-500">
            No applications yet.
          </p>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="rounded-xl border p-4"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {app.schemeName}
                </h3>

                <span
                  className={`text-sm font-semibold ${
                    app.status === "Approved"
                      ? "text-green-600"
                      : app.status === "Rejected"
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Applied:{" "}
                {new Date(
                  app.appliedDate
                ).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}