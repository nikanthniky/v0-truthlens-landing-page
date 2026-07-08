"use client";

import {
  User,
  Mail,
  Calendar,
  Shield,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your TruthLens account.
        </p>
      </div>

      {/* Profile Card */}
      <Card className="glass border-border p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {user?.name}
            </h2>

            <p className="text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
      </Card>

      {/* Account Information */}
      <Card className="glass border-border p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Account Information
        </h3>

        <div className="space-y-4">
          <InfoRow
            icon={<User className="size-4" />}
            label="Full Name"
            value={user?.name || "-"}
          />

          <InfoRow
            icon={<Mail className="size-4" />}
            label="Email"
            value={user?.email || "-"}
          />

          <InfoRow
            icon={<Shield className="size-4" />}
            label="Account Type"
            value="Free Plan"
          />

          <InfoRow
            icon={<Calendar className="size-4" />}
            label="Member Since"
            value="Coming Soon"
          />
        </div>
      </Card>

      {/* Future Features */}
      <Card className="glass border-border p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Upcoming Features
        </h3>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• Edit Profile</p>
          <p>• Change Password</p>
          <p>• Notification Preferences</p>
          <p>• Billing & Subscription</p>
          <p>• Social Login Accounts</p>
        </div>

        <Button
          disabled
          className="mt-5"
        >
          Coming Soon
        </Button>
      </Card>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}