import { StudentResultRow } from "@/services/student.service";
import StudentStatusBadge from "./StudentStatusBadge";
import StudentDetails from "./StudentDetails";

type StudentRowProps = {
  student: StudentResultRow;

  expanded: boolean;

  onToggle: () => void;
};

export default function StudentRow({
  student,
  expanded,
  onToggle,
}: StudentRowProps) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-border transition-colors hover:bg-accent/30"
      >
        <td className="px-6 py-4 font-medium">{student.enrollment}</td>

        <td className="px-6 py-4">{student.rollNumber}</td>

        <td className="px-6 py-4">Semester {student.semester}</td>

        <td className="px-6 py-4 font-semibold">{student.sgpa.toFixed(2)}</td>

        <td className="px-6 py-4">
          <StudentStatusBadge passed={student.passed} />
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={5}>
            <StudentDetails enrollment={student.enrollment} />
          </td>
        </tr>
      )}
    </>
  );
}
