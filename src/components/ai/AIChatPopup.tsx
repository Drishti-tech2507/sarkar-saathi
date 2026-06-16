"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  profile?: any;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AIChatPopup({
  profile,
  onClose,
}: Props) {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        text:
          "👋 Hello! I am Sarkar AI. Ask me anything about government schemes, scholarships, pensions, healthcare benefits, and more.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [language, setLanguage] =
    useState("en-IN");

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const speak = (
    text: string
  ) => {
    if (
      !(
        "speechSynthesis" in
        window
      )
    )
      return;

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.lang =
      language;

    utterance.rate = 1;

    window.speechSynthesis.speak(
      utterance
    );
  };

  const startListening =
    () => {
      const SpeechRecognition =
        (window as any)
          .SpeechRecognition ||
        (window as any)
          .webkitSpeechRecognition;

      if (
        !SpeechRecognition
      ) {
        alert(
          "Speech Recognition not supported in this browser."
        );
        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        language;

      recognition.start();

      recognition.onresult =
        (event: any) => {
          const transcript =
            event.results[0][0]
              .transcript;

          setInput(
            transcript
          );
        };
    };

  const sendMessage =
    async () => {
      if (
        !input.trim()
      )
        return;

      const userMessage = {
        role: "user" as const,
        text: input,
      };

      setMessages(
        (prev) => [
          ...prev,
          userMessage,
        ]
      );

      const currentInput =
        input;

      setInput("");

      try {
        setLoading(true);

        const res =
          await fetch(
            "/api/ai/chat",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                {
                  message:
                    currentInput,
                  profile,
                  language,
                }
              ),
            }
          );

          const data = await res.json();

          console.log(
            "FULL RESPONSE:",
            data
          );
          
          if (!data.success) {
            
          }
        const aiText =
          data.response ||
          "Sorry, I could not process your request.";

        setMessages(
          (prev) => [
            ...prev,
            {
              role:
                "assistant",
              text: aiText,
            },
          ]
        );

        speak(aiText);
      } catch (error) {
        console.error(
          error
        );

        setMessages(
          (prev) => [
            ...prev,
            {
              role:
                "assistant",
              text:
                "Something went wrong. Please try again.",
            },
          ]
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
      fixed
      bottom-6
      right-6
      z-[9999]
      h-[650px]
      w-[420px]
      rounded-[32px]
      bg-white
      shadow-2xl
      border
      overflow-hidden
      flex
      flex-col
      "
    >
      {/* HEADER */}

      <div
        className="
        flex
        items-center
        justify-between
        bg-orange-500
        p-4
        text-white
        "
      >
        <div>
          <h2 className="font-bold text-lg">
            🤖 Sarkar AI
          </h2>

          <p className="text-xs opacity-90">
            Multilingual Voice Assistant
          </p>
        </div>

        <button
          onClick={
            onClose
          }
          className="
          rounded-full
          bg-white/20
          px-3
          py-1
          "
        >
          ✕
        </button>
      </div>

      {/* LANGUAGE */}

      <div className="border-b p-3">
        <select
          value={
            language
          }
          onChange={(
            e
          ) =>
            setLanguage(
              e.target.value
            )
          }
          className="
          w-full
          rounded-xl
          border
          p-2
          "
        >
          <option value="en-IN">
            English
          </option>

          <option value="hi-IN">
            Hindi
          </option>

          <option value="ta-IN">
            Tamil
          </option>

          <option value="te-IN">
            Telugu
          </option>

          <option value="bn-IN">
            Bengali
          </option>

          <option value="gu-IN">
            Gujarati
          </option>

          <option value="mr-IN">
            Marathi
          </option>

          <option value="pa-IN">
            Punjabi
          </option>
        </select>
      </div>

      {/* CHAT */}

      <div
        className="
        flex-1
        overflow-y-auto
        p-4
        space-y-4
        bg-gray-50
        "
      >
        {messages.map(
          (
            msg,
            index
          ) => (
            <div
              key={index}
              className={`flex ${
                msg.role ===
                "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role ===
                  "user"
                    ? "bg-orange-500 text-white"
                    : "bg-white shadow"
                }`}
              >
                {msg.text}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="text-sm text-gray-500">
            Sarkar AI is typing...
          </div>
        )}

        <div
          ref={
            messagesEndRef
          }
        />
      </div>

      {/* INPUT */}

      <div className="border-t p-4">
        <div className="flex gap-2">
          <button
            onClick={
              startListening
            }
            className="
            rounded-xl
            bg-orange-500
            px-4
            text-white
            "
          >
            🎤
          </button>

          <input
            value={input}
            onChange={(
              e
            ) =>
              setInput(
                e.target.value
              )
            }
            onKeyDown={(
              e
            ) => {
              if (
                e.key ===
                "Enter"
              ) {
                sendMessage();
              }
            }}
            placeholder="Ask about schemes..."
            className="
            flex-1
            rounded-xl
            border
            px-4
            py-3
            outline-none
            "
          />

          <button
            onClick={
              sendMessage
            }
            disabled={
              loading
            }
            className="
            rounded-xl
            bg-orange-500
            px-5
            text-white
            "
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}