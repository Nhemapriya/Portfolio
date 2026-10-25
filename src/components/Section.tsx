import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "../lib/motion";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 ${className}`}
    >
      {(eyebrow || title) && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-12"
        >
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}
