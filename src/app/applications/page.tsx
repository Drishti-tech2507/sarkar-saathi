"use client";

import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications =
    async () => {
      try {
        const uid =
          localStorage.getItem("uid");

        if (!uid) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `/api/applications?uid=${uid}`
        );

        const data =
          await res.json();

        if (data.success) {
          setApplications(
            data.applications || []
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          📄 Applications
        </h1>

        <p className="mt-2 text-gray-500">
          Track all your submitted
          government scheme applications.
        </p>
      </div>

      {/* STATS */}

      <div className="mb-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Total Applications
          </p>

          <h2 className="mt-2 text-4xl font-bold text-orange-600">
            {applications.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Approved
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {
              applications.filter(
                (a) =>
                  a.status ===
                  "Approved"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="mt-2 text-4xl font-bold text-yellow-600">
            {
              applications.filter(
                (a) =>
                  a.status ===
                  "Pending"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* LOADING */}

      {loading && (
        <div className="rounded-3xl bg-white p-10 text-center shadow">
          Loading applications...
        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        applications.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow">
            <h2 className="text-3xl font-bold">
              No Applications Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Apply for a scheme to
              track it here.
            </p>
          </div>
        )}

      {/* APPLICATION LIST */}

      {!loading &&
        applications.length > 0 && (
          <div className="space-y-5">

            {applications.map(
              (app) => (
                <div
                  key={app._id}
                  className="
                  rounded-3xl
                  bg-white
                  p-6
                  shadow-lg
                  "
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <h2 className="text-xl font-bold">
                        {
                          app.schemeName
                        }
                      </h2>

                      <p className="mt-1 text-gray-500">
                        Application ID:
                        {" "}
                        {app._id}
                      </p>
                    </div>

                    <span
                      className={`
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-medium
                      ${
                        app.status ===
                        "Approved"
                          ? "bg-green-100 text-green-600"
                          : app.status ===
                            "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }
                    `}
                    >
                      {app.status}
                    </span>

                  </div>

                  {app.createdAt && (
                    <p className="mt-4 text-sm text-gray-400">
                      Submitted on{" "}
                      {new Date(
                        app.createdAt
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )
            )}

          </div>
        )}
    </main>
  );
}