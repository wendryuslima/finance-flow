"use client";

import { useState } from "react";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton() {
  const [isPending, setIsPending] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsPending(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: new URL("/", window.location.origin).toString(),
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      size="lg"
      onClick={handleSignIn}
      disabled={isPending}
      className="h-12 w-full cursor-pointer justify-center rounded-xl bg-background/90 text-foreground hover:bg-background disabled:cursor-not-allowed"
    >
      {isPending ? "Conectando..." : "Continuar com Google"}
    </Button>
  );
}
