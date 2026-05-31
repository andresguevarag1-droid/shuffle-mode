const items = [
  "Free shipping on orders over $150",
  "Drop 014 — Quiet Power — releasing Sunday 1PM ET",
  "Limited weekly drops · once it's gone, it's gone",
  "Join the list for early access",
];

export default function Announcement() {
  // Duplicated track gives the marquee a seamless loop.
  const track = [...items, ...items];
  return (
    <div className="bg-ink text-cream text-xs uppercase tracking-[0.18em]">
      <div className="overflow-hidden py-2.5">
        <div className="marquee">
          {track.map((item, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6">
              {item}
              <span aria-hidden className="text-ember-soft">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
