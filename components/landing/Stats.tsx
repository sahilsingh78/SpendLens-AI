const STATS = [
  {
    value: "32%",
    label: "Average savings identified",
  },
  {
    value: "$4.8k",
    label: "Typical annual savings",
  },
  {
    value: "12+",
    label: "AI tools benchmarked",
  },
  {
    value: "<2 min",
    label: "Average audit time",
  },
];

export default function Stats() {
  return (
    <section className="py-10 px-4 border-y border-[var(--border)] bg-[var(--surface)]">

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6 text-center card-hover"
          >
            <div
              className="text-3xl md:text-4xl font-black mb-2 text-[var(--accent)] animate-count-up"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {stat.value}
            </div>

            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}