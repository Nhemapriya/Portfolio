import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./Section";
import { socials, contactEmail } from "../data/socials";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's get connected">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="glass overflow-hidden rounded-3xl p-8 sm:p-12"
      >
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-lg text-current/75"
        >
          Have a project, an opportunity, or just want to say hi? My inbox is
          always open.
        </motion.p>

        <motion.a
          variants={fadeUp}
          href={`mailto:${contactEmail}`}
          className="group mt-6 inline-flex items-center gap-3 text-2xl font-semibold sm:text-3xl"
        >
          <span className="text-gradient">{contactEmail}</span>
          <ArrowUpRight
            className="text-current/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-500"
            size={26}
          />
        </motion.a>

        <motion.div
          variants={fadeUp}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 transition-colors hover:border-brand-500 hover:text-brand-500 dark:border-white/10"
            >
              <s.icon size={20} />
              <span className="min-w-0">
                <span className="block text-xs text-current/50">{s.label}</span>
                <span className="block truncate text-sm font-medium">
                  {s.value}
                </span>
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
