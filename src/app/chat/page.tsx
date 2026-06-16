"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    const userMessage: Message = {
      role: "user",
      content: currentMessage,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");
    setLoading(true);

    try {
      const profile = JSON.parse(
        localStorage.getItem("profile") || "{}"
      );

      const response = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: currentMessage,
            profile,
          }),
        }
      );

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "No response generated.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to generate response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Enter" &&
      !loading
    ) {
      sendMessage();
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            🤖 Sarkar AI
          </h1>

          <p className="mt-2 text-gray-500">
            Ask about schemes,
            eligibility,
            scholarships,
            healthcare,
            pensions,
            documents and more.
          </p>
        </div>

        {/* Chat Window */}

        <div
          className="
          h-[600px]
          overflow-y-auto
          rounded-3xl
          bg-white
          p-6
          shadow-xl
          "
        >
          {messages.length === 0 && (
            <div className="text-center text-gray-400">
              <p>
                Welcome to Sarkar AI 👋
              </p>

              <p className="mt-3">
                Try asking:
              </p>

              <div className="mt-4 space-y-2">

                <div>
                  Which schemes am I eligible for?
                </div>

                <div>
                  What documents are needed for PM-KISAN?
                </div>

                <div>
                  Best scholarships for students?
                </div>

              </div>
            </div>
          )}

          {messages.map(
            (msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="text-gray-500">
              🤖 Sarkar AI is thinking...
            </div>
          )}
        </div>

        {/* Input */}

        <div className="mt-6 flex gap-3">

          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder="Ask Sarkar AI..."
            className="
            flex-1
            rounded-xl
            border
            p-4
            outline-none
            focus:border-orange-500
            "
          />

          <button
            onClick={
              sendMessage
            }
            disabled={loading}
            className="
            rounded-xl
            bg-orange-500
            px-8
            text-white
            hover:bg-orange-600
            disabled:opacity-50
            "
          >
            {loading
              ? "..."
              : "Send"}
          </button>

        </div>

      </div>
    </main>
  );
}