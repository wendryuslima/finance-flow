"use client";

import type { ReactNode } from "react";

interface PageLoaderProps {
  label?: string;
  helper?: ReactNode;
}

export const PageLoader = ({ label = "Carregando...", helper }: PageLoaderProps) => {
  return (
    <div className="page-shell flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="relative inline-flex h-12 w-12">
          <span className="absolute inset-0 rounded-full border-2 border-muted opacity-30" />
          <span className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </span>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {helper ? <div className="text-xs text-muted-foreground/80">{helper}</div> : null}
      </div>
    </div>
  );
};
