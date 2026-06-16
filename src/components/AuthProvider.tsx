"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

const Provider = SessionProvider as any;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}