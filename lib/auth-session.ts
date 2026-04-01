import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const getCurrentSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

export const getCurrentUserId = async () => {
  return (await getCurrentSession())?.user?.id ?? null;
};

export const requireCurrentUserId = async () => {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/auth");
  }

  return userId;
};

export const requireCurrentUserIdOrThrow = async () => {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  return userId;
};
