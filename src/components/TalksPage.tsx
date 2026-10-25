import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  FileText,
  Globe,
  Hammer,
  Headphones,
  Megaphone,
  ExternalLink,
  MapPin,
  Mic,
  PlayCircle,
  Users,
} from "lucide-react";
import { SubpageHeader } from "./SubpageHeader";
import { Footer } from "./Footer";
import { talks, type Talk } from "../data/talks";
import { profile } from "../data/profile";
import { fadeUp, staggerContainer } from "../lib/motion";

const ALL = "All";


// Filter buttons group the session types: podcasts get their own button,
// everything else (talks, workshops, panels, organised events…) is a talk.
// Each card still shows its own type as a badge.
const categoryOf = (t: Talk) =>
  t.type.toLowerCase() === "podcast" ? "Podcasts" : "Talks";

// Groups talks by year, keeping the file's order (newest first).
function byYear(list: Talk[]) {
  const groups: { year: string; items: Talk[] }[] = [];
  for (const t of list) {
    const year = t.year ?? "Earlier";
    const g = groups.find((x) => x.year === year);
    if (g) g.items.push(t);
    else groups.push({ year, items: [t] });
  }
  return groups;
}

export function TalksPage() {
  const types = useMemo(
    () =>
      [ALL, "Talks", "Podcasts"].filter(
        (c) => c === ALL || talks.some((t) => categoryOf(t) === c),
      ),
    [],
  );
  // Years present in talks.md, newest first.
  const years = useMemo(
    () =>
      Array.from(new Set(talks.map((t) => t.year).filter(Boolean) as string[])).sort(
        (a, b) => Number(b) - Number(a),
      ),
    [],
  );
  const [filter, setFilter] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const shown = talks.filter(
    (t) =>
      (filter === ALL || categoryOf(t) === filter) &&
      (year === ALL || t.year === year),
  );

  return (
    <>
      <SubpageHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-36 sm:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
            Speaking · Community
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Talks & <span className="text-gradient">Community</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-current/70">
            Technical talks and Hands-on workshops on data and AI, alongside
            community leadership with Google Developer Group (GDG) Chennai and
            Women Techmakers (WTM) Chennai: Organising DevFest Chennai,
            International Women's Day events, hackathons and meetups.
          </p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {profile.communities.map((r) => (
              <li
                key={r.org}
                className="glass flex items-center gap-3 rounded-2xl px-4 py-2.5"
              >
                <img
                  src={r.logo}
                  alt={`${r.org} logo`}
                  className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain p-1"
                />
                <span>
                  <span className="block text-sm font-semibold">{r.org}</span>
                  <span className="block text-xs text-current/60">{r.role}</span>
                </span>
              </li>
            ))}
          </ul>

        </motion.div>

        {talks.length === 0 ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="glass mt-14 flex flex-col items-center rounded-3xl px-6 py-16 text-center"
          >
            <Mic size={28} className="text-brand-500" />
            <p className="mt-4 text-lg font-semibold">Sessions coming soon</p>
            <p className="mt-1 text-sm text-current/60">
              Talks and workshops will be listed here.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {types.length > 2 &&
                  types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      filter === t
                        ? "bg-brand-500 text-white"
                        : "border border-black/10 text-current/70 hover:text-current dark:border-white/10"
                    }`}
                  >
                    {t}
                  </button>
                  ))}
              </div>

              {years.length > 1 && (
                <label className="relative inline-flex items-center">
                  <span className="sr-only">Filter by year</span>
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3.5 text-current/50"
                  />
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={`appearance-none rounded-full py-1.5 pl-10 pr-9 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      year === ALL
                        ? "border border-black/10 bg-transparent text-current/70 hover:text-current dark:border-white/10"
                        : "border border-brand-500 bg-brand-500 text-white"
                    }`}
                  >
                    <option value={ALL} className="text-black">
                      All Years
                    </option>
                    {years.map((y) => (
                      <option key={y} value={y} className="text-black">
                        {y}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 text-current/50"
                  />
                </label>
              )}
            </div>

            {shown.length === 0 && (
              <p className="mt-12 text-current/60">
                No {filter === ALL ? "entries" : filter.toLowerCase()} in {year}.
              </p>
            )}

            <div className="mt-12 space-y-14">
              {byYear(shown).map((g) => (
                <section key={g.year}>
                  <h2 className="font-display text-2xl font-bold text-current/40">
                    {g.year}
                  </h2>
                  <motion.ol
                    key={`${filter}-${year}`}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="mt-6 space-y-5"
                  >
                    {g.items.map((t, idx) => (
                      <motion.li key={`${t.title}-${idx}`} variants={fadeUp}>
                        <TalkCard talk={t} />
                      </motion.li>
                    ))}
                  </motion.ol>
                </section>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

function TalkCard({ talk: t }: { talk: Talk }) {
  const links = [
    { href: t.slides, label: "Slides", icon: FileText },
    { href: t.video, label: "Video", icon: PlayCircle },
    { href: t.audio, label: "Listen", icon: Headphones },
    { href: t.post, label: "Post", icon: ExternalLink },
    { href: t.link, label: "Details", icon: Globe },
  ].filter((l) => l.href);

  return (
    <article className="glass flex flex-col gap-5 overflow-hidden rounded-3xl p-5 sm:flex-row sm:p-6">
      {t.image ? (
        <img
          src={t.image}
          alt={t.title}
          loading="lazy"
          className={`aspect-[16/10] w-full rounded-2xl ${t.type.toLowerCase() === "podcast" ? "bg-white object-contain" : "object-cover object-[center_25%]"} sm:w-64 sm:shrink-0`}
        />
      ) : (
        <ImagePlaceholder talk={t} />
      )}
      <div className="flex flex-1 flex-col">
        <span className="w-fit rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-500">
          {t.type}
        </span>
        <h3 className="mt-3 text-xl font-semibold">{t.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-current/60">
          <span className="font-medium text-current/80">{t.event}</span>
          {t.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} />
              {t.location}
            </span>
          )}
          {t.date && (
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={14} />
              {t.date}
            </span>
          )}
        </div>
        {t.description && (
          <p className="mt-3 text-sm leading-relaxed text-current/70">
            {t.description}
          </p>
        )}
        {(t.tags.length > 0 || links.length > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {t.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 px-2.5 py-0.5 text-xs text-current/60 dark:border-white/10"
              >
                {tag}
              </span>
            ))}
            <span className="flex-1" />
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-500 transition-colors hover:bg-brand-500 hover:text-white"
              >
                <l.icon size={14} />
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

const typeIcons: Record<string, typeof Mic> = {
  workshop: Hammer,
  panel: Users,
  podcast: Headphones,
  keynote: Megaphone,
  "opening note": Megaphone,
  organiser: CalendarCheck,
  outreach: Users,
  volunteer: Users,
};

// Shown until a photo is added via "image:" in content/talks.md.
export function ImagePlaceholder({ talk: t }: { talk: Talk }) {
  const Icon = typeIcons[t.type.toLowerCase()] ?? Mic;
  return (
    <div
      aria-hidden
      className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500/25 via-fuchsia-500/15 to-cyan-400/25 p-4 sm:w-64 sm:shrink-0"
    >
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/20 blur-2xl dark:bg-white/10" />
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/60 text-brand-500 shadow-sm dark:bg-white/10">
        <Icon size={20} />
      </span>
      <span className="relative line-clamp-2 text-sm font-semibold text-current/70">
        {t.event}
      </span>
    </div>
  );
}
