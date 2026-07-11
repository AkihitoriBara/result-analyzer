import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function AppShell({
  children,
  title = "Dashboard",
  description = "Welcome back to Result Analyzer",
}: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <PageHeader title={title} description={description} />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
