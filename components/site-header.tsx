"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { LogoutButton } from "@/components/dialog/logout-dialog";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analyze", label: "Analyze" },
  { href: "/history", label: "History" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="TruthLens home">
          <Logo />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Button
            render={<Link href="/analyze" />}
            nativeButton={false}
            className="bg-gradient-brand text-primary-foreground glow-brand"
          >
            Analyze Image
          </Button>

          {user ? (
            <>
              {/* User Avatar */}
              <div className="flex items-center gap-2 rounded-full border border-border px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="size-4 text-primary" />
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-medium">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

            <LogoutButton />
            </>
          ) : (
            <>
              <Button
                variant="outline"
                render={<Link href="/login" />}
                nativeButton={false}
              >
                Login
              </Button>

              <Button
                render={<Link href="/register" />}
                nativeButton={false}
                className="bg-gradient-brand text-primary-foreground"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}