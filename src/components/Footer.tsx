import Link from "next/link";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "This drop", href: "/#drop" },
      { label: "Shop all", href: "/shop" },
      { label: "Shuffle my mood", href: "/#shuffle" },
      { label: "Lookbook", href: "/#lookbook" },
      { label: "Gift cards", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Size guide", href: "#" },
      { label: "Contact", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Shuffle Mode",
    links: [
      { label: "Our story", href: "/#about" },
      { label: "Journal", href: "/journal" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-2xl font-semibold uppercase tracking-[0.18em]">
              Shuffle Mode<span className="text-ember-soft">.</span>
            </p>
            <p className="mt-4 max-w-xs text-cream/70">
              Dress for the mood, not the occasion. Limited weekly drops, made in
              small batches.
            </p>
            <div className="mt-6 flex gap-4 text-cream/70">
              {["Instagram", "TikTok", "Pinterest"].map((s) => (
                <a key={s} href="#" className="hover:text-ember-soft transition-colors text-sm">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs uppercase tracking-[0.18em] text-cream/50">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/") ? (
                        <Link
                          href={l.href}
                          className="text-cream/80 hover:text-cream transition-colors"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          className="text-cream/80 hover:text-cream transition-colors"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-cream/10 pt-6 text-sm text-cream/50">
          <p>© {new Date().getFullYear()} Shuffle Mode. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms</a>
            <a href="#" className="hover:text-cream transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
