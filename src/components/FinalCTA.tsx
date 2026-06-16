import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-gray-950 py-24 text-white">

      <div className="mx-auto max-w-5xl text-center">

        <h2 className="text-5xl font-bold">
          Discover Your Benefits Today
        </h2>

        <Link
          href="/benefit-discovery"
          className="mt-10 inline-block rounded-xl bg-orange-500 px-8 py-4 text-xl"
        >
          Start Assessment
        </Link>

      </div>

    </section>
  );
}