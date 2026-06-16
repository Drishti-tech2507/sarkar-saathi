"use client";

import AIChatAssistant
from "@/components/ai/AIChatAssistant";

export default function AIPage() {

  const profile =
    typeof window !==
    "undefined"
      ? {
          name:
            localStorage.getItem(
              "userName"
            ),
          email:
            localStorage.getItem(
              "email"
            ),
        }
      : null;

  return (
    <div className="h-screen">
      <AIChatAssistant
        profile={profile}
      />
    </div>
  );
}