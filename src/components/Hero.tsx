import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import { socials, contactEmail } from "../data/socials";
import { useCopy } from "../lib/useCopy";
import { resumeUrl } from "../lib/urls";
import { fadeUp, staggerContainer } from "../lib/motion";

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setI((p) => (p + 1) % profile.roles.length),
      2200,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient font-semibold"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { copied, copy } = useCopy();
  const lenis = useLenis();
  const go = (id: string) => {
    if (lenis) lenis.scrollTo(`#${id}`, { offset: -80 });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-[1.05] sm:text-6xl"
          >
            <span className="text-gradient">{profile.shortName}</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-3 text-2xl font-medium sm:text-3xl"
          >
            <RotatingRole />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-current/70 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href={resumeUrl}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-transform hover:-translate-y-0.5 hover:bg-brand-600"
            >
              View Resume
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <button
              onClick={() => go("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5"
            >
              Get in Touch
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label === "Email" ? "Copy email address" : s.label}
                title={s.label === "Email" ? (copied ? "Email copied" : "Copy email address") : s.label}
                onClick={s.label === "Email" ? () => copy(contactEmail) : undefined}
                className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-current/70 transition-colors hover:border-brand-500 hover:text-brand-500 dark:border-white/10"
              >
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xs"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-500 via-violet-500 to-accent-400 opacity-30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-tr from-brand-500/20 to-accent-400/20 p-1.5">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => go("experience")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-12 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-current/50"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}
