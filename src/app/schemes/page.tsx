"use client";

import { useEffect, useState } from "react";

interface Scheme {
  _id: string;
  name: string;
  description: string;
  category: string;
  benefit: string;
  documents: string[];
  applyLink: string;
  officialWebsite?: string;
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [savedSchemes, setSavedSchemes] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Student",
    "Farmer",
    "Women",
    "Healthcare",
    "Housing",
    "Employment",
    "Senior Citizen",
    "MSME",
    "Disabled",
    "Widow",
  ];
  

  const saveScheme = async (schemeId: string) => {
    try {
      const response = await fetch("/api/saved-schemes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "demo-user",
          schemeId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSavedSchemes((prev) => [...prev, schemeId]);
      } else {
        alert(data.message || "Already Saved");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/schemes?search=${encodeURIComponent(search)}`
        );

        const data = await response.json();

        setSchemes(data);
        const uid =
  localStorage.getItem("uid");

if (
  uid &&
  search.trim().length > 2
) {
  await fetch(
    "/api/history",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        uid,
        query: search,
      }),
    }
  );
}

        let results = [...data];

        if (selectedCategory !== "All") {
          results = results.filter(
            (scheme: Scheme) =>
              scheme.category?.toLowerCase() ===
              selectedCategory.toLowerCase()
          );
        }

        setFilteredSchemes(results);
      } catch (error) {
        console.error(error);
        setSchemes([]);
        setFilteredSchemes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [search, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#f8f4ea] pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
            🇮🇳 Government Welfare Directory
          </span>

          <h1 className="mt-6 text-5xl font-bold text-gray-900">
            Explore Government Schemes
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Discover scholarships, pensions, healthcare benefits,
            housing assistance, farmer support, women empowerment
            schemes and more.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search schemes, scholarships, pensions, farmer benefits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-3xl
              border
              border-orange-100
              bg-white
              p-5
              text-lg
              shadow-lg
              outline-none
              focus:border-orange-500
            "
          />
        </div>
        

        {/* Categories */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 font-medium transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 shadow hover:bg-orange-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-gray-500">Available Schemes</p>
            <h3 className="mt-2 text-3xl font-bold">
              {filteredSchemes.length}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-gray-500">Categories</p>
            <h3 className="mt-2 text-3xl font-bold">
              {categories.length - 1}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-gray-500">Saved Schemes</p>
            <h3 className="mt-2 text-3xl font-bold">
              {savedSchemes.length}
            </h3>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold">
              Loading schemes...
            </h2>
          </div>
        )}

        {/* Empty */}
        {!loading && filteredSchemes.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow">
            <h2 className="text-3xl font-bold">
              No Schemes Found
            </h2>

            <p className="mt-3 text-gray-600">
              Try searching for:
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-orange-100 px-4 py-2">
                Farmer
              </span>
              <span className="rounded-full bg-orange-100 px-4 py-2">
                Scholarship
              </span>
              <span className="rounded-full bg-orange-100 px-4 py-2">
                Women
              </span>
              <span className="rounded-full bg-orange-100 px-4 py-2">
                Pension
              </span>
            </div>
          </div>
        )}

        {/* Schemes */}
        {!loading && filteredSchemes.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme._id}
                className="
                  rounded-3xl
                  border
                  border-orange-100
                  bg-white
                  p-6
                  shadow-lg
                  transition-all
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
                    {scheme.category}
                  </span>

                  <span className="text-xs text-gray-500">
                    Govt Scheme
                  </span>
                </div>

                {/* Name */}
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  {scheme.name}
                </h2>

                {/* Description */}
                <p className="mb-5 text-gray-600">
                  {scheme.description}
                </p>

                {/* Benefit */}
                <div className="mb-5 rounded-2xl bg-orange-50 p-4">
                  <p className="text-sm text-gray-500">
                    Benefit
                  </p>

                  <h3 className="font-semibold text-orange-600">
                    {scheme.benefit}
                  </h3>
                </div>

                {/* Documents */}
                {scheme.documents?.length > 0 && (
                  <div className="mb-5">
                    <h3 className="mb-2 font-semibold">
                      Required Documents
                    </h3>

                    <ul className="space-y-1 text-sm text-gray-600">
                      {scheme.documents.map((doc, index) => (
                        <li key={index}>
                          ✓ {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Website */}
                {scheme.officialWebsite && (
                  <a
                    href={scheme.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-5 block text-sm font-medium text-blue-600 hover:underline"
                  >
                    Visit Official Website →
                  </a>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => saveScheme(scheme._id)}
                    className="
                      rounded-xl
                      border
                      border-orange-300
                      px-4
                      py-3
                      font-medium
                      transition
                      hover:bg-orange-50
                    "
                  >
                    {savedSchemes.includes(scheme._id)
                      ? "❤️ Saved"
                      : "🤍 Save"}
                  </button>

                  <a
                    href={scheme.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex-1
                      rounded-xl
                      bg-orange-500
                      py-3
                      text-center
                      font-semibold
                      text-white
                      transition
                      hover:bg-orange-600
                    "
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}