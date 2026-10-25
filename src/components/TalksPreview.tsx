import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Section } from "./Section";
import { highlights, talksUrl } from "../data/talks";
import { profile } from "../data/profile";
import { fadeUp, viewportOnce } from "../lib/motion";

// Home page Talks section: a photo-only carousel of the best pictures
// (content/highlights/) and a card into the full Talks & Community page.
// Repeat the photos so one pass is wider than any screen (no gap in the loop).
const strip = Array.from({ length: Math.ceil(8 / Math.max(highlights.length, 1)) }).flatMap(
  () => highlights,
);

export function TalksPreview() {

  return (
    <Section id="talks" eyebrow="Speaking · Community" title="Talks & Community">
      {/* Highlights carousel: photos only. Rendered twice for a seamless loop. */}
      {highlights.length > 0 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="marquee-mask -mx-5 overflow-hidden sm:-mx-8"
        >
          <div className="marquee-track flex w-max gap-5 px-5 py-2 sm:px-8">
            {[...strip, ...strip].map((src, idx) => (
              <a
                key={`${src}-${idx}`}
                href={talksUrl}
                aria-label="View all talks"
                aria-hidden={idx >= highlights.length}
                tabIndex={idx >= highlights.length ? -1 : undefined}
                className="group shrink-0 overflow-hidden rounded-3xl"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-64 w-auto object-cover transition-transform duration-500 group-hover:scale-105 sm:h-80"
                />
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Call to action into the full Talks & Community page */}
      <motion.a
        href={talksUrl}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="group glass relative mt-8 flex flex-col gap-6 overflow-hidden rounded-3xl p-7 transition-transform hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <span className="relative">
          <span className="block font-display text-2xl font-bold sm:text-3xl">
            View All Talks & Community Contributions
          </span>
          <span className="mt-2 block text-base text-current/60">
            Happiest on stage: Sharing knowledge and learning with the developer community
          </span>
        </span>
        <span className="relative flex items-center gap-4">
          <span className="flex -space-x-2">
            {profile.communities.map((c) => (
              <img
                key={c.org}
                src={c.logo}
                alt={`${c.org} logo`}
                className="h-10 w-10 rounded-full bg-white object-contain p-0.5 ring-2 ring-white/20"
              />
            ))}
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-500/10 text-brand-500 transition-all group-hover:translate-x-1 group-hover:bg-brand-500 group-hover:text-white">
            <ArrowRight size={22} />
          </span>
        </span>
      </motion.a>
    </Section>
  );
}
