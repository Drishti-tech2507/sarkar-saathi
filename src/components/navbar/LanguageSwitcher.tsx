"use client";

import { useState } from "react";

const languages = [
  { code: "en", label: "English 🇬🇧" },
  { code: "hi", label: "हिन्दी 🇮🇳" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "ta", label: "தமிழ்" },
];

export default function LanguageSwitcher() {
  const [language, setLanguage] =
    useState("en");

  return (
    <select
      value={language}
      onChange={(e) =>
        setLanguage(e.target.value)
      }
      className="
      rounded-xl
      border
      bg-white
      px-4
      py-2
      text-sm
      shadow-sm
      "
    >
      {languages.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
        >
          {lang.label}
        </option>
      ))}
    </select>
  );
}