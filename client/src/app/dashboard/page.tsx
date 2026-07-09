import AppShell from "@/components/layout/AppShell";

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentUploads from "@/components/dashboard/RecentUploads";
import TopStudents from "@/components/dashboard/TopStudents";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Statistics */}
        <DashboardStats />

        {/* Main Dashboard Grid */}
        <section className="grid gap-8 lg:grid-cols-2">
          <RecentUploads />

          <TopStudents />
        </section>

        {/* Performance Overview (Coming Soon) */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Performance Overview</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Charts and performance analytics will appear here once we connect
            the dashboard to the backend.
          </p>

          <div className="mt-6 flex h-72 items-center justify-center rounded-xl border border-dashed border-border">
            <span className="text-sm text-muted-foreground">
              Chart Placeholder
            </span>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
