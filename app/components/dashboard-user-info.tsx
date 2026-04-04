"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

import { authClient } from "../_lib/auth-client";
import { redirect, useRouter } from "next/navigation";

interface DashboardUserInfoProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const DashboardUserInfo = ({
  className,
  orientation = "horizontal",
}: DashboardUserInfoProps) => {
  const router = useRouter();
  const session = authClient.useSession();
  const userName = session?.data?.user?.name?.trim() || "Usuário";
  const userEmail = session?.data?.user?.email?.trim() || "";

  const avatarUrl = session?.data?.user?.image || "";
  const fallbackInitial = userName.charAt(0).toUpperCase() || "U";

  if (!session) {
    redirect("/auth");
  }

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        orientation === "vertical" && "flex-col items-start",
        className,
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full p-0"
          >
            <Avatar className="h-10 cursor-pointer w-10">
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback>{fallbackInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-52">
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-white leading-none">
              {userName}
            </span>
            {userEmail && (
              <span className="text-xs text-white">{userEmail}</span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={handleSignOut}
            className="gap-2"
          >
            <LogOut size={16} />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
