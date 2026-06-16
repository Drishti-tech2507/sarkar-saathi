import Link from "next/link";

export default function FamilyAnalyzer() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 text-orange-600">
            Unique Feature
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Family Benefit Analyzer
          </h2>

          <p className="mt-5 text-xl text-gray-600">
            Analyze benefits for your entire family
            in one click.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-4">

          <div className="rounded-3xl border bg-orange-50 p-8">
            <div className="text-5xl">👨</div>

            <h3 className="mt-4 text-2xl font-bold">
              Father
            </h3>

            <p className="mt-2 text-gray-600">
              Farmer
            </p>

            <div className="mt-6 rounded-xl bg-white p-4">
              PM Kisan
            </div>
          </div>

          <div className="rounded-3xl border bg-orange-50 p-8">
            <div className="text-5xl">👩</div>

            <h3 className="mt-4 text-2xl font-bold">
              Mother
            </h3>

            <p className="mt-2 text-gray-600">
              Pregnant
            </p>

            <div className="mt-6 rounded-xl bg-white p-4">
              PMMVY
            </div>
          </div>

          <div className="rounded-3xl border bg-orange-50 p-8">
            <div className="text-5xl">🎓</div>

            <h3 className="mt-4 text-2xl font-bold">
              Student
            </h3>

            <p className="mt-2 text-gray-600">
              Undergraduate
            </p>

            <div className="mt-6 rounded-xl bg-white p-4">
              NSP Scholarship
            </div>
          </div>

          <div className="rounded-3xl border bg-orange-50 p-8">
            <div className="text-5xl">👵</div>

            <h3 className="mt-4 text-2xl font-bold">
              Grandmother
            </h3>

            <p className="mt-2 text-gray-600">
              Senior Citizen
            </p>

            <div className="mt-6 rounded-xl bg-white p-4">
              Pension Scheme
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">

          <div className="inline-block rounded-3xl bg-green-50 px-10 py-8">

            <h3 className="text-3xl font-bold">
              Total Family Benefits
            </h3>

            <p className="mt-3 text-5xl font-bold text-green-600">
              ₹1.87 Lakhs+
            </p>

          </div>

        </div>

        <div className="mt-12 text-center">

          <Link
            href="/family-analysis"
            className="rounded-xl bg-orange-500 px-8 py-4 text-white"
          >
            Analyze My Family
          </Link>

        </div>

      </div>

    </section>
  );
}