"use client";

interface Props {
  profile: any;
}

export default function TopNavbar({
  profile,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      rounded-3xl
      bg-white
      p-5
      shadow-md
      "
    >
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back,
          {" "}
          {profile?.name ||
            "Citizen"}
        </p>
      </div>

      <div
        className="
        flex
        items-center
        gap-3
        "
      >
        <div
          className="
          h-12
          w-12
          rounded-full
          bg-orange-500
          flex
          items-center
          justify-center
          text-white
          font-bold
          "
        >
          {profile?.name
            ?.charAt(0)
            ?.toUpperCase() ||
            "U"}
        </div>
      </div>
    </div>
  );
}