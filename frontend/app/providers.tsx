"use client";
import PresenceProvider from "@/components/presence-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type * as React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <PresenceProvider>{children}</PresenceProvider>
    </QueryClientProvider>
  );
}
