"use client";

import { useEffect, useState } from "react";

import AppShell from "@/components/layout/AppShell";

import StudentSearch from "@/components/students/StudentSearch";
import StudentTable from "@/components/students/StudentTable";

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  return (
    <AppShell>
      <div className="space-y-6">
        <StudentSearch value={search} onChange={setSearch} />

        <StudentTable search={search} />
      </div>
    </AppShell>
  );
}
