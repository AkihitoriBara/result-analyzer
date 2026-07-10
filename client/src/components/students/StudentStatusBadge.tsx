type StudentStatusBadgeProps = {
  passed: boolean;
};

export default function StudentStatusBadge({
  passed,
}: StudentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        passed
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-red-500/10 text-red-400"
      }`}
    >
      {passed ? "Passed" : "Failed"}
    </span>
  );
}
