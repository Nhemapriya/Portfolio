import { motion } from "motion/react";
import { Section } from "./Section";
import { skillGroups } from "../data/skills";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technical Expertise">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 md:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={fadeUp}
            className="glass group rounded-3xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
              <group.icon size={22} />
            </div>
            <h3 className="text-xl font-semibold">{group.title}</h3>
            <p className="mt-1 text-sm text-current/60">{group.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-current/70 dark:border-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
