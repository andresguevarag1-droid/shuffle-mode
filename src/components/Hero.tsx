import DropCountdown from "./DropCountdown";

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="container-x grid lg:grid-cols-12 gap-8 lg:gap-12 pt-12 md:pt-20 pb-16 md:pb-24 items-center">
        <div className="lg:col-span-6 animate-fade-up">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone">
            <span className="h-px w-8 bg-ember" /> Weekly Drops · Est. Boston
          </span>

          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] font-semibold tracking-tight">
            You don&rsquo;t dress for the occasion.
            <span className="block italic text-ember">You dress for the mood.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-stone leading-relaxed">
            Minimal pieces that elevate your wardrobe instantly — elevated
            silhouettes with maximum presence. New drop every Sunday.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-cream hover:bg-ember transition-colors"
            >
              Shop the drop
            </a>
            <a
              href="#shuffle"
              className="inline-flex items-center gap-2 px-2 py-3.5 text-ink/80 hover:text-ink transition-colors"
            >
              Find your mood
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-10">
            <DropCountdown />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-5 grid-rows-6 gap-3 h-[clamp(360px,52vw,560px)]">
            <div className="editorial-frame col-span-3 row-span-6 rounded-2xl" />
            <div className="editorial-frame col-span-2 row-span-4 rounded-2xl" />
            <div className="editorial-frame col-span-2 row-span-2 rounded-2xl flex items-end p-4">
              <span className="font-display text-cream/90 text-sm">
                Drop 01
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
