"use client";

import { useRouter } from "next/navigation";

interface Props {
  userName?: string;
  onClose: () => void;
}

export default function ProfileCompletionModal({
  userName,
  onClose,
}: Props) {
  const router = useRouter();

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      "
    >
      <div
        className="
        w-full
        max-w-xl
        rounded-[36px]
        bg-white
        p-10
        shadow-2xl
        "
      >
        <div className="flex justify-center">
          <div
            className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-orange-50
            text-5xl
            "
          >
            🎯
          </div>
        </div>

        <h2
          className="
          mt-6
          text-center
          text-5xl
          font-bold
          "
        >
          Welcome,
          {" "}
          {userName || "Citizen"}!
        </h2>

        <p
          className="
          mt-4
          text-center
          text-lg
          text-gray-600
          "
        >
          Complete your profile to discover
          government schemes, scholarships,
          healthcare benefits, pensions and
          welfare programs personalized for you.
        </p>

        <div className="mt-8 space-y-4 text-lg">

          <div>✅ Personalized Scheme Matching</div>

          <div>✅ AI Eligibility Analysis</div>

          <div>✅ Save & Track Applications</div>

          <div>✅ Scholarship Discovery</div>

          <div>✅ Multi-language Support</div>

        </div>

        <div className="mt-10 flex gap-4">

          <button
            onClick={() =>
              router.push("/profile")
            }
            className="
            flex-1
            rounded-2xl
            bg-orange-500
            py-4
            font-semibold
            text-white
            "
          >
            Complete Profile
          </button>

          <button
            onClick={onClose}
            className="
            flex-1
            rounded-2xl
            border
            py-4
            font-semibold
            "
          >
            Later
          </button>

        </div>

        <p
          className="
          mt-5
          text-center
          text-sm
          text-gray-400
          "
        >
          Profile completion takes less than
          2 minutes.
        </p>

      </div>
    </div>
  );
}