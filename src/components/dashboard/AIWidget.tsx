"use client";

import { useState, useEffect } from "react";
import AIChatAssistant from "@/components/ai/AIChatAssistant";

export default function AIWidget() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const handleOpenAI = () => {
      setOpen(true);
    };

    window.addEventListener("open-ai", handleOpenAI);

    const savedProfile =
      localStorage.getItem("profile");

    if (savedProfile) {
      try {
        setProfile(
          JSON.parse(savedProfile)
        );
      } catch {
        console.log(
          "Profile parse error"
        );
      }
    }

    return () => {
      window.removeEventListener(
        "open-ai",
        handleOpenAI
      );
    };
  }, []);

  return (
    <>
      {/* Floating AI Button */}

      {!open && (
        <>
          <button
            onClick={() => setOpen(true)}
            className="
            fixed
            bottom-8
            right-8
            z-50
            h-16
            w-16
            rounded-full
            bg-gradient-to-r
            from-orange-500
            to-red-500
            text-white
            text-2xl
            shadow-2xl
            transition-all
            hover:scale-110
            "
          >
            🤖
          </button>

          <div
            className="
            fixed
            bottom-28
            right-8
            z-40
            rounded-2xl
            bg-white
            px-4
            py-2
            shadow-lg
            text-sm
            font-medium
            "
          >
            Ask Sarkar AI
          </div>
        </>
      )}

      {/* CHAT POPUP */}

      {open && (
        <div
          className="
          fixed
          inset-0
          z-[999]
          bg-black/40
          backdrop-blur-sm
          flex
          justify-end
          items-end
          p-6
          "
        >
          <div
            className="
            relative
            h-[85vh]
            w-[460px]
            overflow-hidden
            rounded-[32px]
            bg-white
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={() =>
                setOpen(false)
              }
              className="
              absolute
              top-4
              right-4
              z-50
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white/20
              text-white
              text-3xl
              hover:bg-white/30
              "
            >
              ✕
            </button>

            {/* CHAT AREA */}

            <div className="h-full">
              <AIChatAssistant
                profile={profile}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}