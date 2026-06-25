"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  History,
  BarChart3,
  Sparkles,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function handleRegister(e: React.FormEvent) {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast(data.detail || "Registration failed");
      return;
    }

    toast(data?.message);

    router.push("/login");
  } catch (error) {
    console.error(error);
    toast("Something went wrong");
  }
}
  return (
    <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden flex-col justify-center lg:flex">
        <h1 className="text-5xl font-bold tracking-tight">
          Join TruthLens
        </h1>

        <p className="mt-5 max-w-md text-lg text-muted-foreground">
          Create your account and start detecting AI-generated images with confidence.
        </p>

        <div className="mt-10 space-y-6">
          <Feature
            icon={<ShieldCheck className="size-5 text-green-500" />}
            title="Reliable Detection"
            description="Advanced AI image analysis."
          />

          <Feature
            icon={<History className="size-5 text-blue-500" />}
            title="Save History"
            description="Access previous analyses anytime."
          />

          <Feature
            icon={<BarChart3 className="size-5 text-purple-500" />}
            title="Dashboard Insights"
            description="Track your image statistics."
          />

          <Feature
            icon={<Sparkles className="size-5 text-yellow-500" />}
            title="Confidence Scores"
            description="Understand why images are classified."
          />
        </div>
      </div>

      {/* Right Side */}
      <Card className="glass border-border p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>

          <p className="mt-2 text-muted-foreground">
            Start using TruthLens today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-brand text-primary-foreground glow-brand"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
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