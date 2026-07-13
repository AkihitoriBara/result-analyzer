import AppShell from "@/components/layout/AppShell";

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentUploads from "@/components/dashboard/RecentUploads";
import TopStudents from "@/components/dashboard/TopStudents";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";

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

        {/* Performance Overview Preview */}
        <PerformanceOverview />
      </div>
    </AppShell>
  );
}
