export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 font-bold text-black">
        RA
      </div>

      <div>
        <h1 className="text-lg font-bold">Result Analyzer</h1>

        <p className="text-sm text-muted-foreground">University Analytics</p>
      </div>
    </div>
  );
}
