"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AIChatAssistant({
  profile,
}: any) {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        text:
          "👋 Welcome to Sarkar AI Assistant. How can I help you today?",
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
          "Voice recognition not supported."
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

      const userText =
        input;

      setMessages(
        (prev) => [
          ...prev,
          {
            role: "user",
            text: userText,
          },
        ]
      );

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
                    userText,
                  profile,
                  language,
                }
              ),
            }
          );

        const data =
          await res.json();

        const reply =
          data.response ||
          "No response.";

        setMessages(
          (prev) => [
            ...prev,
            {
              role:
                "assistant",
              text: reply,
            },
          ]
        );

        speak(reply);

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
                "❌ Something went wrong.",
            },
          ]
        );

      } finally {
        setLoading(false);
      }
    };
    return (
        <div className="flex h-full flex-col bg-slate-50">
    
          {/* HEADER */}
    
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
    
            <h2 className="text-xl font-bold">
              🤖 Sarkar AI
            </h2>
    
            <p className="text-sm opacity-90">
              Multilingual Voice Assistant
            </p>
    
          </div>
    
          {/* LANGUAGE SELECTOR */}
    
          <div className="border-b bg-white p-3">
    
            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-xl
              border
              p-3
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
    
              <option value="mr-IN">
                Marathi
              </option>
    
              <option value="gu-IN">
                Gujarati
              </option>
    
              <option value="pa-IN">
                Punjabi
              </option>
    
            </select>
    
          </div>
    
          {/* SUGGESTED QUESTIONS */}
    
          <div className="bg-white border-b p-3 flex flex-wrap gap-2">
    
            {[
              "Scholarships",
              "Women Welfare",
              "Healthcare Benefits",
              "Housing Schemes",
              "Farmer Schemes",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setInput(item)
                }
                className="
                rounded-full
                bg-orange-100
                px-3
                py-1
                text-sm
                text-orange-600
                "
              >
                {item}
              </button>
            ))}
    
          </div>
    
          {/* CHAT AREA */}
    
          <div
            className="
            flex-1
            overflow-y-auto
            p-4
            "
          >
    
            {messages.map(
              (
                msg,
                index
              ) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.role ===
                    "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
    
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
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
              <div className="mb-4">
    
                <div
                  className="
                  inline-block
                  rounded-2xl
                  bg-gray-200
                  px-4
                  py-3
                  "
                >
                  Sarkar AI is typing...
                </div>
    
              </div>
            )}
    
            <div
              ref={
                messagesEndRef
              }
            />
    
          </div>
    
          {/* INPUT BAR */}
    
          <div className="border-t bg-white p-4">
    
            <div className="flex gap-2">
    
              {/* MIC */}
    
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
    
              {/* INPUT */}
    
              <input
                value={input}
                onChange={(e) =>
                  setInput(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    sendMessage();
                  }
                }}
                placeholder="Ask anything..."
                className="
                flex-1
                rounded-xl
                border
                px-4
                py-3
                outline-none
                "
              />
    
              {/* SEND */}
    
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