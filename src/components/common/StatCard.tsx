interface StatCardProps {
  label: string
  value: string
  detail?: string
}

function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-amber-200/10 bg-black/25 p-5 shadow-[0_0_28px_rgba(0,0,0,0.18)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/65">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black text-stone-50">{value}</p>
      {detail && <p className="mt-2 text-sm text-stone-400">{detail}</p>}
    </article>
  )
}

export default StatCard
