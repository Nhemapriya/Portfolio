import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { Section } from "./Section";
import { experiences } from "../data/experience";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export function Experience() {
  if (experiences.length === 0) return null;

  return (
    <Section id="experience" eyebrow="Career" title="Work experience">
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative ml-2 border-l border-black/10 pl-7 sm:pl-9 dark:border-white/10"
      >
        {experiences.map((e) => (
          <motion.li
            key={e.company}
            variants={fadeUp}
            className="relative pb-12 last:pb-0"
          >
            {/* Company node */}
            <span className="absolute -left-[2.3rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-brand-500 ring-4 ring-brand-500/20 sm:-left-[2.8rem]" />

            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-xl font-semibold">{e.company}</h3>
              <span className="text-sm text-current/50">
                {[e.kind, e.duration].filter(Boolean).join(" · ")}
              </span>
            </div>

            {/* Positions within the company */}
            <ul className="mt-4 space-y-3">
              {e.positions.map((p) => (
                <li
                  key={p.role}
                  className="flex flex-col gap-0.5 border-l-2 border-brand-500/20 pl-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <span className="font-medium">{p.role}</span>
                  <span className="shrink-0 text-sm text-current/50">
                    {p.period}
                  </span>
                </li>
              ))}
            </ul>

            {/* Highlights (awards, recognitions) */}
            {e.highlights && e.highlights.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {e.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-300"
                  >
                    <Trophy size={13} />
                    {h}
                  </span>
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
