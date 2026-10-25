import { motion } from "motion/react";
import { Section } from "./Section";
import { profile } from "../data/profile";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const facts = [
  { k: "Role", v: "Senior Scale Engineer @ Databricks" },
  { k: "Focus", v: "Data pipelines & AI applications" },
  { k: "Beyond code", v: "Public speaking · Tech communities" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A little about me">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-10 md:grid-cols-[1.4fr_1fr]"
      >
        <motion.p
          variants={fadeUp}
          className="text-lg leading-relaxed text-current/80"
        >
          {profile.about}
        </motion.p>

        <motion.ul variants={fadeUp} className="space-y-3">
          {facts.map((f) => (
            <li
              key={f.k}
              className="glass rounded-2xl px-5 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
                {f.k}
              </p>
              <p className="mt-1 font-medium">{f.v}</p>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </Section>
  );
}
