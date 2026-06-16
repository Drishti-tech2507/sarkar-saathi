"use client";

import { useEffect, useState } from "react";

export default function SavedSchemesPage() {
  const [schemes, setSchemes] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes =
    async () => {
      try {
        const uid =
          localStorage.getItem(
            "uid"
          );

        if (!uid) return;

        const response =
          await fetch(
            `/api/saved-schemes/${uid}`
          );

        const data =
          await response.json();

        if (data.success) {
          setSchemes(
            data.schemes || []
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const removeScheme =
    async (id: string) => {
      try {
        const response =
          await fetch(
            `/api/saved-schemes/${id}`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          const text =
            await response.text();

          console.error(
            "Delete Failed:",
            response.status,
            text
          );

          alert(
            `Failed to remove scheme (${response.status})`
          );

          return;
        }

        const data =
          await response.json();

        if (data.success) {
          setSchemes((prev) =>
            prev.filter(
              (scheme) =>
                scheme._id !== id
            )
          );
        }
      } catch (error) {
        console.error(error);

        alert(
          "Something went wrong"
        );
      }
    };

  return (
    <main className="min-h-screen bg-[#fafafa] p-10">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Saved Schemes ❤️
        </h1>

        <div
          className="
          rounded-xl
          bg-orange-100
          px-4
          py-2
          text-orange-600
          "
        >
          {schemes.length} Saved
        </div>

      </div>

      {loading ? (
        <div className="text-center py-20">

          <h2 className="text-xl font-semibold">
            Loading...
          </h2>

        </div>
      ) : schemes.length === 0 ? (
        <div
          className="
          rounded-3xl
          bg-white
          p-10
          text-center
          shadow
          "
        >
          <h2 className="text-2xl font-bold">
            No Saved Schemes
          </h2>

          <p className="mt-2 text-gray-500">
            Save schemes to view
            them here.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">

          {schemes.map(
            (scheme) => (
              <div
                key={scheme._id}
                className="
                rounded-3xl
                bg-white
                p-6
                shadow-lg
                "
              >
                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {
                        scheme.schemeName
                      }
                    </h2>

                    <p className="mt-2 text-gray-500">
                      {
                        scheme.category
                      }
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      removeScheme(
                        scheme._id
                      )
                    }
                    className="
                    rounded-xl
                    bg-red-50
                    px-4
                    py-2
                    text-red-600
                    hover:bg-red-100
                    "
                  >
                    Remove
                  </button>

                </div>

                <div
                  className="
                  mt-4
                  rounded-xl
                  bg-orange-50
                  p-4
                  "
                >
                  <p
                    className="
                    font-medium
                    text-orange-600
                    "
                  >
                    {
                      scheme.benefit
                    }
                  </p>
                </div>

              </div>
            )
          )}

        </div>
      )}

    </main>
  );
}