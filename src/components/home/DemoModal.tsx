"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DemoModal({
  open,
  onClose,
}: Props) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [speed, setSpeed] =
    useState(1);

  if (!open) return null;

  const changeSpeed = (
    value: number
  ) => {
    setSpeed(value);

    if (videoRef.current) {
      videoRef.current.playbackRate =
        value;
    }
  };

  const skipIntro = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 15;
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-[999]
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
      "
    >
      <div
        className="
        relative
        flex
        h-[92vh]
        w-full
        max-w-6xl
        flex-col
        overflow-hidden
        rounded-[32px]
        bg-white
        shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          bg-gradient-to-r
          from-orange-500
          to-red-500
          px-8
          py-5
          text-white
          "
        >
          <div>
            <h2 className="text-3xl font-bold">
              🎥 How To Use Sarkar Saathi
            </h2>

            <p className="mt-1 text-orange-100">
              Quick platform walkthrough
            </p>
          </div>

          <button
            onClick={onClose}
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-white/20
            transition
            hover:bg-white/30
            "
          >
            <X size={26} />
          </button>
        </div>

        {/* Content */}

        <div
          className="
          flex-1
          overflow-y-auto
          p-6
          "
        >
          {/* Video */}

          <video
            ref={videoRef}
            controls
            className="
            w-full
            rounded-3xl
            border
            border-gray-200
            shadow-xl
            "
          >
            <source
              src="/demo/sarkar-saathi-demo.mp4"
              type="video/mp4"
            />
          </video>

          {/* Controls */}

          <div
            className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
            "
          >
            {/* Speed Controls */}

            <div className="flex gap-3">
              {[0.5, 1, 1.5, 2].map(
                (value) => (
                  <button
                    key={value}
                    onClick={() =>
                      changeSpeed(
                        value
                      )
                    }
                    className={`
                      rounded-xl
                      px-4
                      py-2
                      font-medium
                      transition
                      ${
                        speed === value
                          ? "bg-orange-500 text-white"
                          : "bg-orange-50 text-orange-600"
                      }
                    `}
                  >
                    {value}x
                  </button>
                )
              )}
            </div>

            {/* Action Buttons */}

            <div className="flex gap-3">
              <button
                onClick={skipIntro}
                className="
                rounded-xl
                border
                px-5
                py-2
                font-medium
                hover:bg-gray-50
                "
              >
                Skip Intro
              </button>

              <button
                onClick={onClose}
                className="
                rounded-xl
                bg-orange-500
                px-6
                py-2
                font-medium
                text-white
                transition
                hover:bg-orange-600
                "
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Features */}

          <div
            className="
            mt-8
            grid
            grid-cols-2
            gap-4
            "
          >
            <div
              className="
              rounded-2xl
              bg-orange-50
              p-5
              font-medium
              "
            >
              ✓ Complete Profile
            </div>

            <div
              className="
              rounded-2xl
              bg-orange-50
              p-5
              font-medium
              "
            >
              ✓ Find Eligible Schemes
            </div>

            <div
              className="
              rounded-2xl
              bg-orange-50
              p-5
              font-medium
              "
            >
              ✓ Save Benefits
            </div>

            <div
              className="
              rounded-2xl
              bg-orange-50
              p-5
              font-medium
              "
            >
              ✓ Track Applications
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}