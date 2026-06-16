"use client";

import { useEffect, useState } from "react";

export default function BenefitsPage() {
  const [loading, setLoading] =
    useState(true);

  const [matches, setMatches] =
    useState<any[]>([]);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const profileId =
        localStorage.getItem(
          "profileId"
        );

      if (!profileId) {
        setLoading(false);
        return;
      }

      const response =
        await fetch(
          `/api/schemes/match?profileId=${profileId}`
        );

      const data =
        await response.json();

      if (data.success) {
        setMatches(data.matches);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveScheme = async (
    scheme: any
  ) => {
    try {
      const uid =
        localStorage.getItem(
          "uid"
        );

      const response =
        await fetch(
          "/api/saved-schemes",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              uid,

              schemeId:
                scheme._id,

              schemeName:
                scheme.name,

              category:
                scheme.category,

              benefit:
                scheme.benefit,
            }),
          }
        );
        const applyScheme = async (
          scheme: any
        ) => {
          const uid =
            localStorage.getItem(
              "uid"
            );
        
          await fetch(
            "/api/applications",
            {
              method: "POST",
        
              headers: {
                "Content-Type":
                  "application/json",
              },
        
              body: JSON.stringify({
                uid,
        
                schemeId:
                  scheme._id,
        
                schemeName:
                  scheme.name,
        
                category:
                  scheme.category,
        
                benefit:
                  scheme.benefit,
              }),
            }
          );
        
          alert(
            "Application submitted successfully 🎉"
          );
        };

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Scheme saved successfully ❤️"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save scheme"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Benefits Discovery
          </h1>

          <p className="mt-3 text-gray-500">
            Based on your profile,
            we found these schemes
            for you.
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold">
              Finding schemes...
            </h2>
          </div>
        )}

        {/* Empty State */}

        {!loading &&
          matches.length === 0 && (
            <div className="rounded-3xl bg-white p-10 shadow-lg">

              <h2 className="text-3xl font-bold">
                No Schemes Found
              </h2>

              <p className="mt-3 text-gray-500">
                Complete your profile
                with accurate details.
              </p>

            </div>
          )}

        {/* Scheme Cards */}

        {!loading &&
          matches.length > 0 && (
            <div className="grid gap-8 lg:grid-cols-2">

              {matches.map(
                (match) => (
                  <div
                    key={
                      match.scheme._id
                    }
                    className="
                    rounded-[30px]
                    bg-white
                    p-6
                    shadow-lg
                    hover:shadow-2xl
                    transition
                    "
                  >
                    {/* Top */}

                    <div className="flex justify-between">

                      <span
                        className="
                        rounded-full
                        bg-orange-100
                        px-4
                        py-1
                        text-sm
                        text-orange-600
                        "
                      >
                        {
                          match.scheme
                            .category
                        }
                      </span>

                      <span className="font-bold text-green-600">
                        {Math.min(
                          match.score,
                          100
                        )}
                        %
                      </span>

                    </div>

                    {/* Title */}

                    <h2 className="mt-5 text-2xl font-bold">
                      {
                        match.scheme
                          .name
                      }
                    </h2>

                    {/* Description */}

                    <p className="mt-3 text-gray-500">
                      {
                        match.scheme
                          .description
                      }
                    </p>

                    {/* Progress */}

                    <div className="mt-5 h-3 rounded-full bg-gray-200">

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

                    {/* Benefit */}

                    <div className="mt-5 rounded-2xl bg-orange-50 p-4">

                      <p className="text-sm text-gray-500">
                        Benefit
                      </p>

                      <p className="font-semibold text-orange-600">
                        {
                          match.scheme
                            .benefit
                        }
                      </p>

                    </div>

                    {/* Reasons */}

                    <div className="mt-5">

                      <h3 className="font-semibold">
                        Why Eligible?
                      </h3>

                      <ul className="mt-3 space-y-2 text-sm text-gray-600">

                        {match.reasons?.map(
                          (
                            reason: string,
                            index: number
                          ) => (
                            <li
                              key={
                                index
                              }
                            >
                              ✓ {reason}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                    {/* Documents */}

                    <div className="mt-5">

                      <h3 className="font-semibold">
                        Documents Required
                      </h3>

                      <ul className="mt-2 space-y-2 text-sm text-gray-600">

                        {match.scheme.documents?.map(
                          (
                            doc: string,
                            index: number
                          ) => (
                            <li
                              key={
                                index
                              }
                            >
                              📄 {doc}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                    {/* Actions */}

                    <div className="mt-6 flex gap-3">

                      <button
                        onClick={() =>
                          saveScheme(
                            match.scheme
                          )
                        }
                        className="
                        flex-1
                        rounded-xl
                        border
                        py-3
                        font-medium
                        hover:bg-gray-100
                        "
                      >
                        ❤️ Save
                      </button>

                      {match.scheme
                        .applyLink ? (
                        <a
                          href={
                            match
                              .scheme
                              .applyLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                          flex-1
                          rounded-xl
                          bg-orange-500
                          py-3
                          text-center
                          font-medium
                          text-white
                          "
                        >
                          Apply Now
                        </a>
                      ) : (
                        <button
                          disabled
                          className="
                          flex-1
                          rounded-xl
                          bg-gray-300
                          py-3
                          "
                        >
                          Coming Soon
                        </button>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        {/* Continue */}

        {!loading &&
          matches.length > 0 && (
            <div className="mt-12 text-center">

              <a
                href="/dashboard"
                className="
                inline-flex
                rounded-xl
                bg-orange-500
                px-8
                py-4
                font-semibold
                text-white
                hover:bg-orange-600
                "
              >
                Continue to Dashboard →
              </a>

            </div>
          )}

      </div>
    </main>
  );
}