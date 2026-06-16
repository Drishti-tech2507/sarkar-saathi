"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChatBotModal({
  open,
  onClose,
}: Props) {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<
      {
        role: string;
        content: string;
      }[]
    >([]);

  if (!open) return null;

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message,
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
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40">

      <div
        className="
        fixed
        bottom-5
        right-5
        h-[700px]
        w-[450px]
        rounded-3xl
        bg-white
        shadow-2xl
        flex
        flex-col
        "
      >
        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            🤖 Sarkar AI
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-5">

          {messages.length === 0 && (
            <div className="text-gray-400">
              Ask anything...
            </div>
          )}

          {messages.map(
            (msg, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  msg.role ===
                  "user"
                    ? "text-right"
                    : ""
                }`}
              >
                <div
                  className={`inline-block rounded-2xl px-4 py-3 ${
                    msg.role ===
                    "user"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            )
          )}

          {loading && (
            <div>
              Thinking...
            </div>
          )}
        </div>

        <div className="border-t p-4 flex gap-2">

          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Ask Sarkar AI..."
            className="
            flex-1
            rounded-xl
            border
            p-3
            "
          />

          <button
            onClick={sendMessage}
            className="
            rounded-xl
            bg-orange-500
            px-5
            text-white
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}