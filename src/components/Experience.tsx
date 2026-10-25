import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Briefcase, CalendarDays, MapPin, Trophy, X } from "lucide-react";
import { Section } from "./Section";
import { experiences, type Experience as Company } from "../data/experience";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

// "Sirius Computer Solutions" → "SC", "CDW" → "CDW", "Databricks" → "D"
const monogram = (name: string) =>
  /^[A-Z]{2,4}$/.test(name)
    ? name
    : name
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("");

// "Aug 2026 - Present · 3 mos" → { start: "Aug 2026", end: "Present" }
const range = (period: string) => {
  const [dates] = period.split("·");
  const [start, end] = dates.split(" - ").map((s) => s.trim());
  return { start, end: end ?? start };
};

// Whole time at the company: earliest start to latest end (roles are newest first).
const companySpan = (c: Company) => {
  const newest = range(c.positions[0].period);
  const oldest = range(c.positions[c.positions.length - 1].period);
  const span = `${oldest.start} - ${newest.end}`;
  return c.duration ? `${span} · ${c.duration}` : span;
};

// Only companies with more than one role or with written contributions open a card.
const hasDetails = (c: Company) =>
  c.positions.length > 1 || c.positions.some((p) => p.points?.length);

export function Experience() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  if (experiences.length === 0) return null;

  return (
    <Section id="experience" eyebrow="Career" title="Work Experience">
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative"
      >
        {/* The timeline line: left on mobile, centred from md up. */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[7px] top-2 w-px bg-black/10 md:left-1/2 md:-translate-x-1/2 dark:bg-white/10"
        />

        {experiences.map((c, idx) => {
          const left = idx % 2 === 1; // alternate sides, newest on the right
          return (
            <motion.li
              key={c.company}
              variants={fadeUp}
              className="relative grid grid-cols-[16px_1fr] gap-x-6 pb-10 last:pb-0 md:grid-cols-[1fr_16px_1fr] md:gap-x-8"
            >
              <span
                aria-hidden
                className="relative z-10 mt-8 h-3.5 w-3.5 rounded-full bg-brand-500 ring-4 ring-brand-500/20 md:col-start-2 md:row-start-1"
              />
              <div className={`md:row-start-1 ${left ? "md:col-start-1" : "md:col-start-3"}`}>
                <CompanyCard company={c} onOpen={() => setOpenIdx(idx)} />
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

      <DetailsModal
        company={openIdx === null ? null : experiences[openIdx]}
        onClose={() => setOpenIdx(null)}
      />
    </Section>
  );
}

function Logo({ company: c, size = "h-12 w-12" }: { company: Company; size?: string }) {
  return c.logo ? (
    <img
      src={c.logo}
      alt={`${c.company} logo`}
      className={`${size} shrink-0 rounded-xl bg-white object-contain p-1`}
    />
  ) : (
    <span
      aria-hidden
      className={`${size} grid shrink-0 place-items-center rounded-xl bg-brand-500/10 font-display text-sm font-bold text-brand-500`}
    >
      {monogram(c.company)}
    </span>
  );
}

function CompanyCard({ company: c, onOpen }: { company: Company; onOpen: () => void }) {
  const latest = c.positions[0];
  const clickable = hasDetails(c);

  return (
    <article className="glass rounded-3xl p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <Logo company={c} />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug">{latest.role}</h3>
          <p className="mt-0.5 font-medium text-brand-500">{c.company}</p>
          {c.team && <p className="text-sm text-current/60">{c.team}</p>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-current/60">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} />
          {companySpan(c)}
        </span>
        {c.kind && (
          <span className="inline-flex items-center gap-1.5">
            <Briefcase size={14} />
            {c.kind}
          </span>
        )}
        {c.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {c.location}
          </span>
        )}
      </div>

      {c.highlights && c.highlights.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {c.highlights.map((h) => (
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

      {clickable && (
        <button
          onClick={onOpen}
          className="group mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-500 transition-colors hover:bg-brand-500 hover:text-white"
        >
          View Details
          {c.positions.length > 1 && (
            <span className="opacity-70">· {c.positions.length} Roles</span>
          )}
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      )}
    </article>
  );
}

// Pop-up card listing every role at the company, newest first.
function DetailsModal({ company: c, onClose }: { company: Company | null; onClose: () => void }) {
  useEffect(() => {
    if (!c) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [c, onClose]);

  return createPortal(
    <AnimatePresence>
      {c && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${c.company} roles`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-black/10 bg-white p-6 shadow-2xl sm:p-8 dark:border-white/10 dark:bg-[#14141f]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              autoFocus
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-black/10 text-current/60 transition-colors hover:border-brand-500 hover:text-brand-500 dark:border-white/10"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-4 pr-10">
              <Logo company={c} size="h-14 w-14" />
              <div>
                <h3 className="text-2xl font-bold">{c.company}</h3>
                <p className="mt-1 text-sm text-current/60">
                  {[c.team, c.kind, companySpan(c)].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>

            <ol className="relative mt-8 space-y-7 border-l border-black/10 pl-6 dark:border-white/10">
              {c.positions.map((p) => {
                const current = range(p.period).end === "Present";
                return (
                  <li key={p.role} className="relative">
                    <span
                      aria-hidden
                      className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ${
                        current ? "bg-brand-500 ring-brand-500/25" : "bg-brand-500/50 ring-brand-500/10"
                      }`}
                    />
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="text-lg font-semibold">{p.role}</h4>
                      {current && (
                        <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-500">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-current/60">
                      <CalendarDays size={14} />
                      {p.period}
                    </p>
                    {p.points && (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-current/75 marker:text-brand-500/60">
                        {p.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
