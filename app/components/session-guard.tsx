"use client";

import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";

import { PageLoader } from "./page-loader";

type SessionGuardMode = "require-auth" | "require-guest";

interface SessionGuardProps {
  children: ReactNode;
  mode: SessionGuardMode;
  redirectTo: string;
  fallback?: ReactNode;
}

export const SessionGuard = ({
  children,
  mode,
  redirectTo,
  fallback,
}: SessionGuardProps) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return fallback ?? <PageLoader />;
  }

  if (mode === "require-auth" && !session) {
    redirect(redirectTo);
  }

  if (mode === "require-guest" && session) {
    redirect(redirectTo);
  }

  return <>{children}</>;
};
