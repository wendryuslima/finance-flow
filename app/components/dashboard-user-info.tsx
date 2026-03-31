"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { authClient } from "../_lib/auth-client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardUserInfoProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const DashboardUserInfo = ({
  className,
  orientation = "horizontal",
}: DashboardUserInfoProps) => {
  const session = authClient.useSession();
  const userName = session?.data?.user?.name?.trim() || "Usuário";

  const avatarUrl = session?.data?.user?.image || "";
  const fallbackInitial = userName.charAt(0).toUpperCase() || "U";

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        orientation === "vertical" && "flex-col items-start",
        className,
      )}
    >
      <div className="flex gap-2 items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback>{fallbackInitial}</AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          className="cursor-pointer"
          size="sm"
          onClick={() => authClient.signOut()}
        >
          <LogOut className="" size={14} />
        </Button>
      </div>
    </div>
  );
};
