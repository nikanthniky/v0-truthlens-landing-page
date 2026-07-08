"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Settings, CreditCard, Bell, LogOut } from "lucide-react";

import { useAuth } from "@/lib/auth-context";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 px-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <span className="hidden sm:block">{user?.name || "Profile"}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl border border-border bg-background p-2 shadow-lg"
      >
        {/* User Info */}
        <div className="px-3 py-3">
          <p className="truncate text-sm font-semibold">
            {user?.name || "User"}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {user?.email || "No email"}
          </p>
        </div>

        <DropdownMenuSeparator />

        {/* Profile */}
        <DropdownMenuItem render={<Link href="/profile" />}>
          <User className="mr-2 size-4" />
          Profile
        </DropdownMenuItem>

        {/* Future Features */}
        <DropdownMenuItem disabled>
          <Settings className="mr-2 size-4" />
          Account Settings
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <CreditCard className="mr-2 size-4" />
          Billing
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <Bell className="mr-2 size-4" />
          Notifications
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
