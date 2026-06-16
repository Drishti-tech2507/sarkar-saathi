"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      className="border rounded-lg px-3 py-2"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="pa">ਪੰਜਾਬੀ</option>
      <option value="gu">ગુજરાતી</option>
      <option value="ta">தமிழ்</option>
    </select>
  );
}