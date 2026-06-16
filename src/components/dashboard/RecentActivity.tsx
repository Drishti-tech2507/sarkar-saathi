"use client";

import {
  User,
  FileText,
  Bell,
  Bot,
} from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      icon: User,
      title: "Profile Updated",
      time: "2 hours ago",
    },
    {
      icon: FileText,
      title: "PM-KISAN Viewed",
      time: "5 hours ago",
    },
    {
      icon: Bell,
      title: "New Scheme Unlocked",
      time: "Yesterday",
    },
    {
      icon: Bot,
      title: "Sarkar AI Used",
      time: "Yesterday",
    },
  ];

  return (
    <div
      className="
      mt-6
      rounded-[32px]
      bg-white
      p-6
      shadow-xl
      "
    >
      <div className="flex items-center justify-between">

        <h3 className="text-xl font-bold">
          Recent Activity
        </h3>

        <span className="text-sm text-gray-500">
          Last 7 Days
        </span>

      </div>

      <div className="mt-5 space-y-4">

        {activities.map(
          (activity, index) => {
            const Icon =
              activity.icon;

            return (
              <div
                key={index}
                className="
                flex
                items-center
                gap-4
                rounded-2xl
                bg-orange-50
                p-4
                transition
                hover:bg-orange-100
                "
              >
                <div
                  className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-500
                  text-white
                  "
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1">

                  <p className="font-medium">
                    {activity.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {activity.time}
                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>
    </div>
  );
}