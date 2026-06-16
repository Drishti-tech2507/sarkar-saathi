"use client";

interface Props {
  activities?: any[];
}

export default function RecentActivityPanel({
  activities = [],
}: Props) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          📊 Recent Activity
        </h2>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
          {activities.length}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {activities.length > 0 ? (
          activities.slice(0, 5).map((activity: any) => (
            <div
              key={activity._id}
              className="
              rounded-xl
              border
              border-orange-100
              bg-orange-50
              p-4
              "
            >
              <h3 className="font-medium text-gray-800">
                {activity.action}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {activity.description}
              </p>

              {activity.createdAt && (
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(
                    activity.createdAt
                  ).toLocaleString()}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-gray-50 p-4 text-center">
            <p className="text-gray-500">
              No recent activity found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}