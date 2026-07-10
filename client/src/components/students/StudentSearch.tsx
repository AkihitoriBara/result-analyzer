type StudentSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function StudentSearch({ value, onChange }: StudentSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search by enrollment..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none transition focus:border-cyan-500"
    />
  );
}
