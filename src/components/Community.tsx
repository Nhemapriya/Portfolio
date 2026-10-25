import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./Section";
import { community } from "../data/community";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export function Community() {
  if (community.length === 0) return null;

  return (
    <Section
      id="community"
      eyebrow="Giving back"
      title="Community contribution"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {community.map((c, idx) => {
          const Wrapper = c.link ? "a" : "div";
          return (
            <motion.div key={`${c.title}-${idx}`} variants={fadeUp}>
              <Wrapper
                {...(c.link
                  ? { href: c.link, target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group glass flex h-full flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    {c.link && (
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-current/40 transition-colors group-hover:text-brand-500"
                      />
                    )}
                  </div>
                  {c.date && (
                    <p className="mt-1 text-xs text-current/50">{c.date}</p>
                  )}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-current/70">
                    {c.blurb}
                  </p>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
