import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { Section } from "./Section";
import { awards } from "../data/awards";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export function Awards() {
  return (
    <Section id="awards" eyebrow="Recognition" title="Awards & honours">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 md:grid-cols-3"
      >
        {awards.map((a) => (
          <motion.article
            key={a.title}
            variants={fadeUp}
            className="group glass flex flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1.5"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-amber-300 backdrop-blur">
                <Trophy size={16} />
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-current/70">
                {a.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
