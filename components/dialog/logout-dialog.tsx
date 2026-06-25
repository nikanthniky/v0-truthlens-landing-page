"use client";

import { useRouter } from "next/navigation";
import { LogOut, TriangleAlert } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useAuth } from "@/lib/auth-context";

export function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger variant="outline">
        <LogOut className="mr-2 size-4" />
        Logout
      </AlertDialogTrigger>

      <AlertDialogContent className="glass max-w-md border-border">
        <AlertDialogHeader className="items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-red-500/10">
            <TriangleAlert className="size-8 text-red-500" />
          </div>

          <AlertDialogTitle className="text-2xl">
            Logout from TruthLens?
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-2 text-sm text-muted-foreground">
            You will be signed out of your account and redirected to the login
            page. Your analysis history and data will remain safe.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex-col gap-3 sm:flex-row">
          <AlertDialogCancel className="w-full sm:w-auto">
            Stay Signed In
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
          >
            <LogOut className="mr-2 size-4" />
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}