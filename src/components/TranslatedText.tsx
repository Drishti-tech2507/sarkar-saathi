"use client";

import {
  useEffect,
  useState,
} from "react";

import { useLanguage }
from "@/context/LanguageContext";

import { translateText }
from "@/lib/translator";

export default function TranslatedText({
  text,
}: {
  text: string;
}) {
  const { language } =
    useLanguage();

  const [translated,
    setTranslated] =
    useState(text);

  useEffect(() => {
    async function run() {
      const result =
        await translateText(
          text,
          language
        );

      setTranslated(result);
    }

    run();
  }, [text, language]);

  return <>{translated}</>;
}