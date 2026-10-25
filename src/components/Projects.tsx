import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./Section";
import { projects } from "../data/projects";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Work" title="Projects I've built">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => {
          const Wrapper = p.link ? "a" : "div";
          return (
            <motion.div key={p.name} variants={fadeUp}>
              <Wrapper
                {...(p.link
                  ? { href: p.link, target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group glass flex h-full flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    {p.link && (
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-current/40 transition-colors group-hover:text-brand-500"
                      />
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-current/70">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium text-brand-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
