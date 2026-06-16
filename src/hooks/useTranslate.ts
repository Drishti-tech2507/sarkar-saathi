"use client";

import {
  useEffect,
  useState,
} from "react";

import { useLanguage }
  from "@/context/LanguageContext";

export function useTranslate(
  text: string
) {
  const { language } =
    useLanguage();

  const [translated,
    setTranslated] =
    useState(text);

  useEffect(() => {
    if (language === "en") {
      setTranslated(text);
      return;
    }

    const translate =
      async () => {
        const res =
          await fetch(
            "/api/translate",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                text,
                target: language,
              }),
            }
          );

        const data =
          await res.json();

        setTranslated(
          data.translated
        );
      };

    translate();
  }, [language, text]);

  return translated;
}