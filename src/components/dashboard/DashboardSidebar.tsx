"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  User,
  Heart,
  Bell,
  Bot,
  FileText,
  FolderKanban,
  LogOut,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  profile?: any;
  matches?: any[];
  notifications?: any[];
  applications?: any[];
}

export default function DashboardSidebar({
  profile,
  matches,
  notifications,
  applications,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      name: "Applications",
      href: "/applications",
      icon: FolderKanban,
    },
    {
      name: "Saved Schemes",
      href: "/saved-schemes",
      icon: Heart,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
    {
      name: "AI Assistant",
      href: "/ai",
      icon: Bot,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: FileText,
    },
  ];

  return (
    <aside
      className="
      w-[320px]
      h-screen
      overflow-y-auto
      bg-white
      border-r
      sticky
      top-0
      flex
      flex-col
      justify-between
      shadow-sm
      "
    >
      <div>
        {/* LOGO */}

        <div className="p-8">
          <h1 className="text-4xl font-bold text-orange-600">
            Sarkar Saathi
          </h1>

          <p className="mt-2 text-gray-500">
            Government Benefits Platform
          </p>
        </div>

        {/* USER */}

        <div className="px-6">
          <div
            className="
            rounded-3xl
            bg-gradient-to-r
            from-orange-500
            to-red-500
            p-5
            text-white
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-white/20
                text-xl
                font-bold
                "
              >
                {profile?.fullName
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  profile?.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                  "C"}
              </div>

              <div>
                <h3 className="font-bold">
                  {profile?.fullName ||
                    profile?.name ||
                    "Citizen"}
                </h3>

                <p className="text-sm text-orange-100">
                  {profile?.occupation ||
                    "Verified Citizen"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MENU */}

        <div className="mt-8 px-4 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            if (
              menu.name ===
              "Notifications"
            ) {
              return (
                <button
                  key={menu.name}
                  onClick={() =>
                    setShowNotifications(
                      true
                    )
                  }
                  className="
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  px-5
                  py-4
                  text-gray-700
                  hover:bg-orange-50
                  transition-all
                  "
                >
                  <Bell size={20} />

                  <span className="font-medium">
                    Notifications
                  </span>

                  <span
                    className="
                    ml-auto
                    rounded-full
                    bg-red-500
                    px-2
                    py-0.5
                    text-xs
                    text-white
                    "
                  >
                    {notifications?.length ||
                      0}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`
                flex
                items-center
                gap-4
                rounded-2xl
                px-5
                py-4
                transition-all
                ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-orange-50"
                }
              `}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* AI CARD */}

        <div className="mt-8 px-6">
          <div
            className="
            rounded-3xl
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            p-5
            text-white
            "
          >
            <h3 className="text-lg font-bold">
              🤖 Sarkar AI
            </h3>

            <p className="mt-2 text-sm text-indigo-100">
              Multilingual Government
              Assistant
            </p>

            <Link
              href="/ai"
              className="
              mt-4
              inline-block
              rounded-xl
              bg-white
              px-4
              py-2
              text-sm
              font-semibold
              text-indigo-600
              "
            >
              Open AI
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="p-6">
        <div
          className="
          rounded-3xl
          bg-orange-50
          p-5
          "
        >
          <h3 className="font-bold">
            Benefits Unlocked
          </h3>

          <h2
            className="
            mt-3
            text-5xl
            font-bold
            text-orange-600
            "
          >
            {matches?.length || 0}
          </h2>

          <p className="mt-1 text-gray-500">
            Eligible schemes
          </p>

          <div className="mt-4 border-t pt-3">
            <p className="text-sm text-gray-500">
              Applications Submitted
            </p>

            <p className="text-lg font-bold">
              {applications?.length ||
                0}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href =
              "/";
          }}
          className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          py-3
          text-gray-600
          hover:bg-gray-50
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* NOTIFICATION DRAWER */}

      {showNotifications && (
        <>
          <div
            className="
            fixed
            inset-0
            z-40
            bg-black/30
            "
            onClick={() =>
              setShowNotifications(
                false
              )
            }
          />

          <div
            className="
            fixed
            right-0
            top-0
            z-50
            flex
            h-screen
            w-[420px]
            flex-col
            bg-white
            shadow-2xl
            "
          >
            <div
              className="
              flex
              items-center
              justify-between
              border-b
              p-6
              "
            >
              <h2 className="text-xl font-bold">
                Notifications
              </h2>

              <button
                onClick={() =>
                  setShowNotifications(
                    false
                  )
                }
              >
                <X />
              </button>
            </div>

            <div
              className="
              flex-1
              overflow-y-auto
              p-5
              space-y-4
              "
            >
              {(notifications || [])
                .length === 0 ? (
                <div className="text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                (notifications || []).map(
                  (
                    notification,
                    index
                  ) => (
                    <div
                      key={index}
                      className="
                      rounded-2xl
                      border
                      p-4
                      transition
                      hover:shadow-md
                      "
                    >
                      <h3 className="font-semibold">
                        {notification.title ||
                          "Notification"}
                      </h3>

                      <p
                        className="
                        mt-1
                        text-sm
                        text-gray-600
                        "
                      >
                        {notification.message ||
                          ""}
                      </p>

                      <span
                        className="
                        mt-2
                        block
                        text-xs
                        text-gray-400
                        "
                      >
                        {notification.createdAt
                          ? new Date(
                              notification.createdAt
                            ).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}