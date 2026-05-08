const FEATURES = [
  {
    icon: "🔍",
    title: "Per-tool audit",
    desc: "Every tool analyzed: right plan? Right tier? Right tool for your use case? Exact dollar numbers for every recommendation.",
  },
  {
    icon: "📊",
    title: "Finance-grade reasoning",
    desc: "No vague advice. Each recommendation cites the specific plan difference, seat count logic, and use-case fit. A CFO would agree.",
  },
  {
    icon: "🤖",
    title: "AI-written summary",
    desc: "Claude reads your full audit and writes a 100-word personalized summary of your biggest savings opportunity.",
  },
  {
    icon: "🔗",
    title: "Shareable report URL",
    desc: "Every audit gets a permanent public link. Screenshot it, tweet it, share it with your CTO. OG preview included.",
  },
  {
    icon: "📧",
    title: "Email your report",
    desc: "Get the full breakdown in your inbox. For high-savings audits, Credex reaches out with a concrete discount offer.",
  },
  {
    icon: "🔒",
    title: "No login, ever",
    desc: "Email is only asked after you've seen your results. We show value first. Your data isn't sold or shared.",
  },
];

export default function Features() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-[var(--accent)] font-mono uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Built for founders, not accountants
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] card-hover"
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3
                className="font-semibold mb-2 text-sm"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {f.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}