"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 py-28 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <span
            className="
            rounded-full
            bg-white/20
            px-4
            py-2
            text-sm
            "
          >
            Government Benefits Discovery Platform
          </span>

          <h1
            className="
            mt-8
            text-5xl
            font-bold
            md:text-7xl
            "
          >
            Empowering Citizens
            <br />
            Through Awareness
          </h1>

          <p
            className="
            mt-6
            max-w-3xl
            text-lg
            text-orange-100
            "
          >
            Our platform helps citizens
            discover scholarships,
            healthcare programs,
            pensions, farmer benefits,
            women empowerment schemes
            and hundreds of government
            initiatives personalized to
            their profile.
          </p>

        </div>

      </section>

      {/* Mission */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-16 lg:grid-cols-2">

            <div>

              <h2
                className="
                text-4xl
                font-bold
                text-slate-900
                "
              >
                Our Mission
              </h2>

              <p
                className="
                mt-6
                text-lg
                leading-8
                text-slate-600
                "
              >
                Millions of citizens are
                unaware of government
                schemes they are eligible
                for.

                We aim to bridge this gap
                through AI-driven
                recommendations and
                multilingual accessibility.
              </p>

            </div>

            <div
              className="
              rounded-[32px]
              bg-white
              p-10
              shadow-xl
              "
            >

              <div className="space-y-6">

                <div>
                  <h3 className="font-bold">
                    🎓 Education
                  </h3>

                  <p className="text-gray-500">
                    Scholarships and
                    student support.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">
                    🏥 Healthcare
                  </h3>

                  <p className="text-gray-500">
                    Medical and insurance
                    schemes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">
                    🚜 Agriculture
                  </h3>

                  <p className="text-gray-500">
                    Farmer welfare
                    initiatives.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2
              className="
              text-4xl
              font-bold
              "
            >
              Why Choose Us?
            </h2>

          </div>

          <div
            className="
            mt-16
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-4
            "
          >

            <div className="rounded-3xl border p-8">
              <div className="text-4xl">
                🤖
              </div>

              <h3 className="mt-4 font-bold">
                AI Matching
              </h3>

              <p className="mt-2 text-gray-500">
                Personalized scheme
                recommendations.
              </p>
            </div>

            <div className="rounded-3xl border p-8">
              <div className="text-4xl">
                🌐
              </div>

              <h3 className="mt-4 font-bold">
                Multilingual
              </h3>

              <p className="mt-2 text-gray-500">
                Access in multiple
                Indian languages.
              </p>
            </div>

            <div className="rounded-3xl border p-8">
              <div className="text-4xl">
                🔒
              </div>

              <h3 className="mt-4 font-bold">
                Secure
              </h3>

              <p className="mt-2 text-gray-500">
                User information stays
                protected.
              </p>
            </div>

            <div className="rounded-3xl border p-8">
              <div className="text-4xl">
                ⚡
              </div>

              <h3 className="mt-4 font-bold">
                Fast Discovery
              </h3>

              <p className="mt-2 text-gray-500">
                Find benefits in seconds.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="mx-auto max-w-5xl px-6">

          <div
            className="
            rounded-[40px]
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            p-16
            text-center
            text-white
            "
          >
            <h2
              className="
              text-4xl
              font-bold
              "
            >
              Start Discovering Benefits
            </h2>

            <p className="mt-4 text-orange-100">
              Create your profile and
              find schemes tailored
              specifically for you.
            </p>

            <a
              href="/login"
              className="
              mt-8
              inline-block
              rounded-2xl
              bg-white
              px-8
              py-4
              font-semibold
              text-orange-600
              "
            >
              Get Started
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}