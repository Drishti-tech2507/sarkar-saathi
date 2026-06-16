"use client";

import {
  useEffect,
  useState,
} from "react";

export default function NotificationsPage() {
  const [
    notifications,
    setNotifications,
  ] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      const uid =
        localStorage.getItem(
          "uid"
        );

      const res =
        await fetch(
          `/api/notifications?uid=${uid}`
        );

      const data =
        await res.json();

      if (data.success) {
        setNotifications(
          data.notifications
        );
      }
    };

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold">
        Notifications
      </h1>

      <div className="mt-8 space-y-4">

        {notifications.map(
          (item) => (
            <div
              key={item._id}
              className="
              rounded-xl
              bg-white
              p-5
              shadow
              "
            >
              <h3 className="font-bold">
                {item.title}
              </h3>

              <p>
                {item.message}
              </p>
            </div>
          )
        )}

      </div>

    </main>
  );
}