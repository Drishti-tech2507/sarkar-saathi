"use client";

import { useState } from "react";

export default function AIAssistant({
  profile,
  matches,
}: any) {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const askAI = async () => {
    if (!question) return;

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/ai/recommend",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              question,
              profile,
              schemes: matches,
            }),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        setAnswer(
          data.response
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <h2 className="text-xl font-bold">
        AI Assistant
      </h2>

      <p className="mt-2 text-gray-500">
        Ask about schemes and eligibility
      </p>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
        placeholder="Which scheme is best for me?"
        className="
        mt-4
        w-full
        rounded-xl
        border
        p-3
        "
      />

      <button
        onClick={askAI}
        className="
        mt-4
        rounded-xl
        bg-orange-500
        px-5
        py-3
        text-white
        "
      >
        {loading
          ? "Thinking..."
          : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-5 rounded-xl bg-orange-50 p-4 whitespace-pre-wrap">
          {answer}
        </div>
      )}

    </div>
  );
}