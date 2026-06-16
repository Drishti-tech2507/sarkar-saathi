"use client";

import { useEffect, useState } from "react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import ProfileCard from "@/components/dashboard/ProfileCard";
import ApplicationsTracker from "@/components/dashboard/ApplicationsTracker";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";
import SearchHistoryPanel from "@/components/dashboard/SearchHistoryPanel";
import RecentActivityPanel from "@/components/dashboard/RecentActivityPanel";
import AIWidget from "@/components/dashboard/AIWidget";
export default function DashboardPage() {
  const [matches, setMatches] =
    useState<any[]>([]);

  const [profile, setProfile] =
    useState<any>(null);

  const [applications, setApplications] =
    useState<any[]>([]);

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [history, setHistory] =
    useState<any[]>([]);

  const [activities, setActivities] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {
      try {
        const uid =
          localStorage.getItem(
            "uid"
          );

        const profileId =
          localStorage.getItem(
            "profileId"
          );

        if (
          !uid ||
          !profileId
        ) {
          setLoading(false);
          return;
        }

        const [
          matchRes,
          appRes,
          notifRes,
          historyRes,
          activityRes,
        ] = await Promise.all([
          fetch(
            `/api/schemes/match?profileId=${profileId}`
          ),

          fetch(
            `/api/applications?uid=${uid}`
          ),

          fetch(
            `/api/notifications?uid=${uid}`
          ),

          fetch(
            `/api/history?uid=${uid}`
          ),

          fetch(
            `/api/activity?uid=${uid}`
          ),
        ]);

        const matchData =
          await matchRes.json();

        const appData =
          await appRes.json();

        const notifData =
          await notifRes.json();

        const historyData =
          await historyRes.json();

        const activityData =
          await activityRes.json();

        if (
          matchData.success
        ) {
          setMatches(
            matchData.matches
          );

          setProfile(
            matchData.profile
          );
        }

        if (
          appData.success
        ) {
          setApplications(
            appData.applications
          );
        }

        if (
          notifData.success
        ) {
          setNotifications(
            notifData.notifications
          );
        }

        if (
          historyData.success
        ) {
          setHistory(
            historyData.history
          );
        }

        if (
          activityData.success
        ) {
          setActivities(
            activityData.activities
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-lg font-medium">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const topScore =
  matches?.length > 0
    ? Number(matches[0]?.score || 0)
    : 0;

  const totalBenefits =
    matches.length *
    50000;

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">

        {/* SIDEBAR */}

        <DashboardSidebar
  profile={profile}
  matches={matches}
  notifications={notifications}
  applications={applications}
/>

        {/* MAIN */}

        <div className="flex-1 p-8">

          <TopNavbar
            profile={profile}
          />

          {/* HERO */}

          <section
            className="
            mt-6
            rounded-[36px]
            bg-gradient-to-r
            from-orange-500
            via-orange-600
            to-red-500
            p-8
            text-white
            shadow-2xl
            "
          >
            <h1 className="text-5xl font-bold">
              Welcome Back,
              {" "}
              {profile?.name ||
 localStorage.getItem("profileName") ||
 localStorage.getItem("name") ||
 "Citizen"}
              👋
            </h1>
            <p className="mt-2 text-orange-100">
  Last Login:
  {new Date().toLocaleDateString()}
</p>

            <p className="mt-4 text-xl text-orange-100">
              We've identified
              {" "}
              {matches.length}
              {" "}
              schemes matching your profile.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white/20 p-5 backdrop-blur-md">
  <p className="text-sm">
    Profile Completion
  </p>

  <h2 className="mt-2 text-3xl font-bold">
    {profile?.profileCompletion || 100}%
  </h2>
</div>

              <div className="rounded-2xl bg-white/20 p-5 backdrop-blur-md">
                <p className="text-sm">
                  Matched Schemes
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {matches.length}
                </h2>
              </div>

              <div className="rounded-2xl bg-white/20 p-5 backdrop-blur-md">
                <p className="text-sm">
                  Applications
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {
                    applications.length
                  }
                </h2>
              </div>

              <div className="rounded-2xl bg-white/20 p-5 backdrop-blur-md">
                <p className="text-sm">
                  Match Score
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {topScore}%
                </h2>
              </div>

              <div className="rounded-2xl bg-white/20 p-5 backdrop-blur-md">
                <p className="text-sm">
                  Benefits Value
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  ₹
                  {totalBenefits.toLocaleString()}
                </h2>
              </div>

            </div>
          </section>


          {/* AI INSIGHTS */}

          <section
            className="
            mt-8
            rounded-[32px]
            bg-white
            p-8
            shadow-lg
            "
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">

              <div>

                <h2 className="text-3xl font-bold">
                  🤖 Sarkar AI Insights
                </h2>

                <p className="mt-2 text-gray-500">
                  Based on your profile, you are eligible for multiple
                  government benefits, scholarships, healthcare and
                  welfare schemes.
                </p>

              </div>

              <button
  onClick={() =>
    window.dispatchEvent(
      new Event("open-ai")
    )
  }
  className="
  mt-4
  md:mt-0
  rounded-xl
  bg-orange-500
  px-6
  py-3
  font-semibold
  text-white
  "
>
  Open AI Assistant
</button>

            </div>
          </section>

          {/* SCHEMES */}

          <section className="mt-8">

            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-bold">
                Recommended Schemes
              </h2>

              <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-600">
                {matches.length}
                {" "}
                Schemes Found
              </span>

            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">

              {matches.map(
                (match) => (
                  <div
                    key={
                      match.scheme
                        ._id
                    }
                    className="
                    rounded-[28px]
                    bg-white
                    p-6
                    shadow-lg
                    transition
                    hover:-translate-y-1
                    "
                  >
                    <div className="flex items-center justify-between">

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
                        {
                          match
                            .scheme
                            .category
                        }
                      </span>

                      <span className="font-bold text-green-600">
                        {
                          match.score
                        }
                        %
                      </span>

                    </div>

                    <h3 className="mt-4 text-2xl font-bold">
                      {
                        match
                          .scheme
                          .name
                      }
                    </h3>

                    <p className="mt-3 text-gray-500">
                      {
                        match
                          .scheme
                          .description
                      }
                    </p>

                    <div className="mt-4 rounded-xl bg-orange-50 p-4">

                      <p className="text-sm text-gray-500">
                        Benefit
                      </p>

                      <p className="font-semibold text-orange-600">
                        {
                          match
                            .scheme
                            .benefit
                        }
                      </p>

                    </div>

                    <a
                      href={
                        match
                          .scheme
                          .applyLink
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="
                      mt-5
                      block
                      rounded-xl
                      bg-orange-500
                      py-3
                      text-center
                      font-medium
                      text-white
                      "
                    >
                      Apply Now
                    </a>
                  </div>
                )
              )}

            </div>

            </section>

</div>

{/* RIGHT SIDEBAR */}

<div className="w-[380px] p-8 space-y-6">

  <ProfileCard
    profile={profile}
  />

  <NotificationsPanel
    notifications={notifications}
  />

  <ApplicationsTracker
    applications={applications}
  />

  <RecentActivityPanel
    activities={activities}
  />

  <SearchHistoryPanel
    history={history}
  />

</div>

</div>

<AIWidget />

</main>
);
}