import Link from "next/link";

import StudentRank from "./StudentRank";

const topStudents = [
  {
    rank: 1,
    name: "Aarav Patel",
    spi: 9.87,
  },
  {
    rank: 2,
    name: "Diya Shah",
    spi: 9.74,
  },
  {
    rank: 3,
    name: "Vivaan Mehta",
    spi: 9.69,
  },
  {
    rank: 4,
    name: "Anaya Desai",
    spi: 9.63,
  },
  {
    rank: 5,
    name: "Krish Joshi",
    spi: 9.58,
  },
];

export default function TopStudents() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Top Students</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Highest SPI performers this semester.
        </p>
      </div>

      <div className="space-y-3">
        {topStudents.map((student) => (
          <StudentRank
            key={student.rank}
            rank={student.rank}
            name={student.name}
            spi={student.spi}
          />
        ))}
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <Link
          href="/students"
          className="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          View all students →
        </Link>
      </div>
    </section>
  );
}
