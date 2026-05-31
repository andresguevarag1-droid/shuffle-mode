import Link from "next/link";
import { LOOKBOOK } from "@/lib/content";

export default function Lookbook() {
  return (
    <section id="lookbook" className="py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            The Lookbook
          </h2>
          <Link
            href="/journal"
            className="text-sm text-stone hover:text-ink transition-colors"
          >
            Read the journal →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {LOOKBOOK.map((shot) => (
            <figure
              key={shot.id}
              className={`editorial-frame group relative rounded-2xl ${
                shot.tall ? "row-span-2 aspect-[3/5]" : "aspect-[3/4]"
              }`}
            >
              <figcaption className="absolute bottom-4 left-4 right-4 font-display text-cream text-sm md:text-base drop-shadow translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
