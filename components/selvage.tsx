export function Selvage({
  className = "",
  equal = false,
}: {
  className?: string;
  equal?: boolean;
}) {
  const weights = equal
    ? ["flex-1", "flex-1", "flex-1", "flex-1"]
    : ["flex-[10]", "flex-[4]", "flex-[5]", "flex-[1]"];

  return (
    <div
      className={`flex h-1.5 w-full items-stretch ${className}`}
      aria-hidden
    >
      <span className={`min-w-0 ${weights[0]} bg-[var(--green-700)]`} />
      <span className={`min-w-0 ${weights[1]} bg-[var(--teal-500)]`} />
      <span className={`min-w-0 ${weights[2]} bg-[var(--gold-500)]`} />
      <span className={`min-w-0 ${weights[3]} bg-[var(--navy-800)]`} />
    </div>
  );
}

export function SelvageMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-1 w-[120px] items-stretch ${className}`}
      aria-hidden
    >
      <span className="min-w-0 flex-[10] bg-[var(--green-700)]" />
      <span className="min-w-0 flex-[4] bg-[var(--teal-500)]" />
      <span className="min-w-0 flex-[5] bg-[var(--gold-500)]" />
      <span className="min-w-0 flex-[1] bg-[var(--navy-800)]" />
    </div>
  );
}
