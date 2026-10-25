import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Section } from "./Section";
import { socials, contactEmail, gmailComposeUrl } from "../data/socials";
import { useCopy } from "../lib/useCopy";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export function Contact() {
  const { copied, copy } = useCopy();

  return (
    <Section id="contact" eyebrow="Contact" title="Get in Touch">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="glass overflow-hidden rounded-3xl p-8 sm:p-12"
      >
        <motion.p
          variants={fadeUp}
          className="text-lg text-current/75"
        >
          For collaborations, speaking engagements and professional
          opportunities, please get in touch by email.
        </motion.p>

        <motion.div variants={fadeUp} className="relative mt-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${contactEmail}`}
              onClick={() => copy(contactEmail)}
              title="Copy email address"
              className="group inline-flex items-center gap-3 text-2xl font-semibold sm:text-3xl"
            >
              <span className="text-gradient">{contactEmail}</span>
              {copied ? (
                <Check className="text-brand-500" size={24} />
              ) : (
                <Copy
                  className="text-current/40 transition-colors group-hover:text-brand-500"
                  size={24}
                />
              )}
            </a>
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-current/70 transition-colors hover:border-brand-500 hover:text-brand-500 dark:border-white/10"
            >
              Open in Gmail
              <ArrowUpRight size={14} />
            </a>
          </div>
          <p
            aria-live="polite"
            className={`absolute left-0 top-full mt-1.5 text-sm text-brand-500 transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}
          >
            Email copied to clipboard
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              onClick={s.label === "Email" ? () => copy(contactEmail) : undefined}
              className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 transition-colors hover:border-brand-500 hover:text-brand-500 dark:border-white/10"
            >
              <s.icon size={20} />
              <span className="min-w-0">
                <span className="block text-xs text-current/50">
                  {s.label === "Email" && copied ? "Copied" : s.label}
                </span>
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
