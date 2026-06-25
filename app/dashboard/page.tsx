import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Dashboard from "./dashboard";
import { SiteLayout } from "@/components/site-layout";
import ProtectedRoute from "@/components/protected-route";

export default function DashboardPage() {
  return (
    <SiteLayout>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </SiteLayout>
  );
}
