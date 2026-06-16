"use client";

interface Props {
  notifications: any[];
}

export default function NotificationsPanel({
  notifications,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-bold">
        Notifications
      </h3>

      {notifications?.length > 0 ? (
        <div className="space-y-3">
          {notifications
            .slice(0, 3)
            .map((item: any) => (
              <div
                key={item._id}
                className="
                rounded-xl
                border
                p-3
                "
              >
                <p className="font-medium">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500">
                  {item.message ||
                    item.description}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No notifications
        </p>
      )}
    </div>
  );
}