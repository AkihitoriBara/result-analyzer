import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <PageHeader
          title="Dashboard"
          description="Welcome back to Result Analyzer"
        />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
