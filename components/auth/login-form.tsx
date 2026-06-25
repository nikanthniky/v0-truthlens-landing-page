"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  BarChart3,
  History,
  Sparkles,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export function LoginForm() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
       toast.error(data.detail || "Invalid email or password");
        return;
      }

      await login(data.access_token);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Unable to connect to server");
    }
  }

  return (
    <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden flex-col justify-center lg:flex">
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome back to TruthLens
        </h1>

        <p className="mt-5 max-w-md text-lg text-muted-foreground">
          Detect AI-generated images with confidence and track your analysis
          history.
        </p>

        <div className="mt-10 space-y-6">
          <Feature
            icon={<ShieldCheck className="size-5 text-green-500" />}
            title="AI Detection"
            description="Identify AI-generated images instantly."
          />

          <Feature
            icon={<History className="size-5 text-blue-500" />}
            title="Analysis History"
            description="View all previous image analyses."
          />

          <Feature
            icon={<BarChart3 className="size-5 text-purple-500" />}
            title="Dashboard Insights"
            description="Monitor statistics and trends."
          />

          <Feature
            icon={<Sparkles className="size-5 text-yellow-500" />}
            title="Smart Results"
            description="Confidence scores with detailed explanations."
          />
        </div>
      </div>

      {/* Right Side */}
      <Card className="glass border-border p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Sign In</h2>

          <p className="mt-2 text-muted-foreground">
            Access your TruthLens account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-brand text-primary-foreground glow-brand"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Create account
          </Link>
        </div>
      </Card>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg border border-border bg-secondary/40 p-3">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}