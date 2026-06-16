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

  const [messages, setMessages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const sendMessage =
    async () => {
      if (!message) return;

      const userMessage = {
        role: "user",
        content: message,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      setLoading(true);

      const response =
        await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        });

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);

      setMessage("");
      setLoading(false);
    };

  return (
    <div className="fixed inset-0 z-50 bg-black/50">

      <div
        className="
        fixed
        bottom-6
        right-6
        h-[700px]
        w-[450px]
        rounded-3xl
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
          p-5
          "
        >
          <h2 className="text-xl font-bold">
            🤖 Sarkar AI
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="h-[520px] overflow-y-auto p-5">

          {messages.map(
            (msg, i) => (
              <div
                key={i}
                className={`mb-3 ${
                  msg.role === "user"
                    ? "text-right"
                    : ""
                }`}
              >
                <div
                  className={`
                  inline-block
                  rounded-2xl
                  px-4
                  py-3
                  ${
                    msg.role ===
                    "user"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                  }
                  `}
                >
                  {msg.content}
                </div>
              </div>
            )
          )}

          {loading && (
            <p>Thinking...</p>
          )}
        </div>

        <div className="flex gap-2 p-4">

          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
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