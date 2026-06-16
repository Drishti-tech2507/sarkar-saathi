"use client";

export default function QuickActions() {
  return (
    <div
      className="
      rounded-[32px]
      bg-white
      p-6
      shadow-xl
      "
    >
      <h3 className="text-xl font-bold">
        Quick Actions
      </h3>

      <div className="mt-5 space-y-3">

        <a
          href="/profile"
          className="
          block
          rounded-xl
          bg-orange-50
          p-4
          "
        >
          ✏️ Update Profile
        </a>

        <a
          href="/applications"
          className="
          block
          rounded-xl
          bg-orange-50
          p-4
          "
        >
          📄 Applications
        </a>

        <a
          href="/saved-schemes"
          className="
          block
          rounded-xl
          bg-orange-50
          p-4
          "
        >
          ❤️ Saved Schemes
        </a>

        <a
          href="/notifications"
          className="
          block
          rounded-xl
          bg-orange-50
          p-4
          "
        >
          🔔 Notifications
        </a>

      </div>
    </div>
  );
}