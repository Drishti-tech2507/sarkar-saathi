"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import translations from "../lib/translations";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: any;
};

const LanguageContext =
  createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] =
    useState("en");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t:
          translations[
            language as keyof typeof translations
          ] || translations.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}