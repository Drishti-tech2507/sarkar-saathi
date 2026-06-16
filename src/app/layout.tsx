import "./globals.css";

import { ThemeProvider }
from "@/components/ThemeProvider";

export const metadata = {
  title: "Sarkar Saathi",
  description:
    "AI-powered government scheme discovery platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}