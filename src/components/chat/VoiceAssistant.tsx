"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function VoiceAssistant({
  open,
  onClose,
}: Props) {
  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as any)
        .SpeechRecognition ||
      (window as any)
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition not supported"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult =
      async (event: any) => {
        const text =
          event.results[0][0]
            .transcript;

        askAI(text);
      };
  };

  const askAI = async (
    text: string
  ) => {
    setLoading(true);

    const response =
      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

    const data =
      await response.json();

    setResponse(data.reply);

    speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        data.reply
      )
    );

    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">

      <div className="mx-auto mt-20 max-w-xl rounded-3xl bg-white p-8">

        <div className="flex justify-between">

          <h2 className="text-3xl font-bold">
            🎤 Voice Assistant
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <button
          onClick={
            startListening
          }
          className="
          mt-8
          rounded-xl
          bg-orange-500
          px-6
          py-3
          text-white
          "
        >
          Start Speaking
        </button>

        {loading && (
          <p className="mt-4">
            Thinking...
          </p>
        )}

        {response && (
          <div className="mt-6 rounded-xl bg-orange-50 p-4">
            {response}
          </div>
        )}

      </div>

    </div>
  );
}