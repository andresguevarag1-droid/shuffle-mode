const stats = [
  { value: "Sun", label: "New drop, every week" },
  { value: "200", label: "Pieces per drop, never more" },
  { value: "0", label: "Restocks. When it's gone, it's gone" },
];

export default function Philosophy() {
  return (
    <section id="about" className="py-20 md:py-28 bg-ink text-cream">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="reveal lg:col-span-7">
          <span className="text-xs uppercase tracking-[0.22em] text-ember-soft">
            The philosophy
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-6xl font-semibold leading-[1.02] tracking-tight">
            Fewer pieces.
            <span className="block italic text-ember-soft">More you.</span>
          </h2>
          <p className="mt-7 max-w-xl text-lg text-cream/75 leading-relaxed">
            We don&rsquo;t chase seasons or trends. Each week we design a small,
            considered set of pieces that work as hard as you do — then we let
            them go. No overstock, no markdowns, no noise. Just a wardrobe that
            shifts with your mood instead of the calendar.
          </p>
        </div>

        <div className="lg:col-span-5 grid gap-px bg-cream/10 rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-7 flex items-baseline gap-5">
              <span className="font-display text-4xl md:text-5xl text-ember-soft">
                {s.value}
              </span>
              <span className="text-cream/70">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
