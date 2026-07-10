import { SubjectResult } from "@/services/student.service";

type SubjectTableProps = {
  subjects: SubjectResult[];
};

export default function SubjectTable({ subjects }: SubjectTableProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-border">
      <table className="w-full">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-4 py-3 text-left text-sm">Subject</th>

            <th className="px-4 py-3 text-center text-sm">Internal</th>

            <th className="px-4 py-3 text-center text-sm">External</th>

            <th className="px-4 py-3 text-center text-sm">Total</th>

            <th className="px-4 py-3 text-center text-sm">Grade</th>

            <th className="px-4 py-3 text-center text-sm">Credits</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.subjectCode} className="border-t border-border">
              <td className="px-4 py-3">{subject.subjectName}</td>

              <td className="text-center">{subject.internal}</td>

              <td className="text-center">{subject.external}</td>

              <td className="text-center font-medium">{subject.total}</td>

              <td className="text-center">{subject.grade}</td>

              <td className="text-center">{subject.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
