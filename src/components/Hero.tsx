"use client";

import Link from "next/link";

interface HeroProps {
  onWatchDemo: () => void;
}

export default function Hero({
  onWatchDemo,
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content */}
      <div
        className="
          relative z-10
          mx-auto
          flex
          min-h-[90vh]
          max-w-7xl
          flex-col
          items-center
          justify-center
          gap-16
          px-6
          lg:flex-row
          lg:justify-between
        "
      >
        {/* Left Content */}
        <div className="max-w-3xl text-center lg:text-left">
          <p
            className="
              mb-6
              uppercase
              tracking-[6px]
              text-orange-400
            "
          >
            AI Powered Welfare Discovery
          </p>

          <h1
            className="
              text-5xl
              font-bold
              leading-tight
              text-white
              md:text-6xl
              lg:text-7xl
            "
          >
            Every Benefit.
            <br />

            <span className="text-orange-500">
              One Simple Platform.
            </span>
          </h1>

          <p
            className="
              mt-8
              text-lg
              text-gray-200
              md:text-xl
            "
          >
            Discover every government scheme,
            subsidy, scholarship and welfare
            benefit your family is eligible for.
          </p>

          <div
            className="
              mt-10
              flex
              flex-wrap
              justify-center
              gap-4
              lg:justify-start
            "
          >
            <Link
              href="/benefit-discovery"
              className="
                rounded-xl
                bg-orange-500
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:scale-105
              "
            >
              Find My Benefits
            </Link>

            <button
              onClick={onWatchDemo}
              className="
                rounded-xl
                border
                border-white
                px-8
                py-4
                text-white
                transition
                hover:bg-white
                hover:text-black
              "
            >
              🎥 Watch Demo
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="hidden lg:block">
          <div
            className="
              w-[420px]
              rounded-3xl
              border
              border-white/20
              bg-white/10
              p-8
              backdrop-blur-xl
              shadow-2xl
            "
          >
            <h3
              className="
                mb-6
                text-3xl
                font-bold
                text-white
              "
            >
              AI Saathi
            </h3>

            <div className="space-y-4">
              <div
                className="
                  rounded-xl
                  bg-green-500/20
                  p-4
                  text-white
                "
              >
                ✓ PM Scholarship Found
              </div>

              <div
                className="
                  rounded-xl
                  bg-green-500/20
                  p-4
                  text-white
                "
              >
                ✓ Ayushman Bharat Eligible
              </div>

              <div
                className="
                  rounded-xl
                  bg-green-500/20
                  p-4
                  text-white
                "
              >
                ✓ Widow Pension Found
              </div>

              <div
                className="
                  rounded-xl
                  bg-green-500/20
                  p-4
                  text-white
                "
              >
                ✓ LPG Subsidy Available
              </div>
            </div>

            <div
              className="
                mt-6
                text-xl
                font-bold
                text-orange-400
              "
            >
              Benefit Score: 91%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}