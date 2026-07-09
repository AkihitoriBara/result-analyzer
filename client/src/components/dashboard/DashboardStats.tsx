import StatisticCard from "./StatisticCard";

export default function DashboardStats() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatisticCard
        title="Total Students"
        value="1,248"
        description="Students in the current database"
      />

      <StatisticCard
        title="Pass Rate"
        value="94.8%"
        description="Overall passing percentage"
      />

      <StatisticCard
        title="Average SPI"
        value="8.21"
        description="Across all uploaded results"
      />

      <StatisticCard
        title="Uploaded PDFs"
        value="12"
        description="Processed result files"
      />
    </section>
  );
}
