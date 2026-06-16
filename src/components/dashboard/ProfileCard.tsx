"use client";

import {
  User,
  MapPin,
  IndianRupee,
  Calendar,
  ShieldCheck,
} from "lucide-react";

interface Props {
  profile: any;
}

export default function ProfileCard({
  profile,
}: Props) {
  const completion =
    profile?.profileCompletion || 85;

  return (
    <div
      className="
      rounded-[32px]
      bg-white
      shadow-xl
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        bg-gradient-to-r
        from-orange-500
        to-red-500
        p-6
        text-white
        "
      >
        <div className="flex items-center gap-4">

          {profile?.photoURL ? (
            <img
              src={profile.photoURL}
              alt="profile"
              className="
              h-20
              w-20
              rounded-full
              object-cover
              border-4
              border-white
              "
            />
          ) : (
            <div
              className="
              h-20
              w-20
              rounded-full
              bg-white/20
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {profile?.name?.charAt(0) || "C"}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold">
              {profile?.name || "Citizen"}
            </h2>

            <p className="text-orange-100">
              {profile?.occupation ||
                "Government Benefits User"}
            </p>

            <div
              className="
              mt-2
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-white/20
              px-3
              py-1
              text-xs
              "
            >
              <ShieldCheck size={14} />
              Verified Citizen
            </div>
          </div>

        </div>
      </div>

      {/* Completion */}

      <div className="p-6">

        <div className="flex justify-between">

          <h3 className="font-semibold">
            Profile Completion
          </h3>

          <span className="font-bold text-orange-600">
            {completion}%
          </span>

        </div>

        <div className="mt-3 h-3 rounded-full bg-gray-200">

          <div
            className="
            h-3
            rounded-full
            bg-gradient-to-r
            from-orange-500
            to-red-500
            "
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

        {/* Quick Info */}

        <div className="mt-6 space-y-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Age</span>
            </div>

            <span className="font-medium">
              {profile?.age || "-"}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>State</span>
            </div>

            <span className="font-medium">
              {profile?.state || "-"}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <IndianRupee size={16} />
              <span>Income</span>
            </div>

            <span className="font-medium">
              ₹
              {profile?.income
                ? profile.income.toLocaleString()
                : "0"}
            </span>

          </div>

        </div>

        {/* Eligibility */}

        <div
          className="
          mt-6
          rounded-2xl
          bg-green-50
          p-4
          border
          border-green-100
          "
        >
          <p className="text-xs text-green-700">
            Eligibility Status
          </p>

          <p className="mt-1 font-bold text-green-700">
            Eligible for
            {" "}
            14 Government Schemes
          </p>
        </div>

        {/* Last Login */}

        <div
          className="
          mt-4
          rounded-2xl
          bg-orange-50
          p-4
          "
        >
          <div className="flex items-center gap-2">

            <Calendar size={16} />

            <span className="text-sm text-gray-500">
              Last Login
            </span>

          </div>

          <p className="mt-1 font-semibold">
            {profile?.lastLogin
              ? new Date(
                  profile.lastLogin
                ).toLocaleString()
              : "Today"}
          </p>

        </div>

      </div>
    </div>
  );
}