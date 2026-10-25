/**
 * Markdown content loader.
 *
 * Every section of the site is written as a Markdown file in `content/`.
 * This Vite plugin parses those files at build time and exposes them as the
 * virtual module `virtual:content`. A malformed file fails the build (and
 * shows the Vite error overlay in dev) with the file name and the reason, so
 * a bad edit never reaches the live site.
 *
 * File format (see content/README.md for the full guide):
 *
 *   # Section title          ← ignored, just for readability
 *   key: value               ← optional file-level fields
 *
 *   ## Item title            ← starts an item
 *   key: value               ← item fields (the lines right under the heading)
 *
 *   Free text paragraphs     ← the item's body
 *   - bullet                 ← goes to the default list ("items")
 *     - sub-bullet           ← indented: attached to the bullet above
 *   ### Named list           ← following bullets go to this list instead
 *   - bullet
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const VIRTUAL_ID = "virtual:content";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

type Item = {
  title: string;
  fields: Record<string, string>;
  body: string;
  lists: Record<string, string[]>;
  // Indented bullets, by list name and parent bullet index.
  subs: Record<string, string[][]>;
};

type Doc = {
  file: string;
  fields: Record<string, string>;
  items: Item[];
};

class ContentError extends Error {}

// "Short name" → "shortname", "Kind" → "kind"
const normKey = (k: string) => k.toLowerCase().replace(/[\s_-]+/g, "");
const FIELD_RE = /^([A-Za-z][A-Za-z0-9 _-]{0,30}):\s*(.*)$/;

export function parseMarkdown(src: string, file: string): Doc {
  const lines = src.replace(/<!--[\s\S]*?-->/g, "").split(/\r?\n/);
  const doc: Doc = { file, fields: {}, items: [] };

  let item: Item | null = null;
  let list = "items";
  // Fields are only read in the block straight after a heading. Blank lines
  // before the first field are allowed; after it, a blank line ends the block.
  let inFieldBlock = true;
  let sawField = false;
  let para: string[] = [];

  const flushPara = () => {
    if (item && para.length) {
      item.body += (item.body ? "\n\n" : "") + para.join(" ").trim();
    }
    para = [];
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (/^#\s/.test(line)) {
      inFieldBlock = true;
      sawField = false;
      continue;
    }
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flushPara();
      item = { title: h2[1].trim(), fields: {}, body: "", lists: {}, subs: {} };
      doc.items.push(item);
      list = "items";
      inFieldBlock = true;
      sawField = false;
      continue;
    }
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushPara();
      if (!item) throw new ContentError(`"### ${h3[1]}" appears before any "## " item`);
      list = normKey(h3[1]);
      inFieldBlock = false;
      continue;
    }
    if (line === "") {
      flushPara();
      if (sawField) inFieldBlock = false;
      continue;
    }
    const field = inFieldBlock ? line.match(FIELD_RE) : null;
    if (field) {
      (item ? item.fields : doc.fields)[normKey(field[1])] = field[2].trim();
      sawField = true;
      continue;
    }
    inFieldBlock = false;
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushPara();
      if (!item) throw new ContentError(`bullet "${bullet[1]}" appears before any "## " item`);
      const parents = (item.lists[list] ??= []);
      if (/^\s{2,}/.test(raw) && parents.length > 0) {
        ((item.subs[list] ??= [])[parents.length - 1] ??= []).push(bullet[1].trim());
      } else {
        parents.push(bullet[1].trim());
      }
      continue;
    }
    if (item) para.push(line);
  }
  flushPara();
  return doc;
}

// ---------------------------------------------------------------- helpers

function need(where: string, value: string | undefined, what: string): string {
  if (!value) throw new ContentError(`${where}: missing "${what}"`);
  return value;
}

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

/** "DevFest Chennai 2026: Opening Note" + "2026" → "2026-devfest-chennai-2026-opening-note" */
export function talkFolder(title: string, year?: string): string {
  const words = title
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  // Keep whole words, up to ~60 characters.
  let slug = "";
  for (const w of words) {
    if (slug && slug.length + 1 + w.length > 60) break;
    slug = slug ? `${slug}-${w}` : w;
  }
  return `${year ?? "undated"}-${slug}`;
}

const csv = (v?: string) =>
  v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];

/** Splits "a | b | c" into trimmed parts. */
const pipes = (v: string) => v.split("|").map((s) => s.trim());

// --------------------------------------------------------------- builder

/**
 * Turns the parsed docs into a JS module. Images become real imports so Vite
 * fingerprints and bundles them like any other asset.
 */
function buildModule(contentDir: string): { code: string; files: string[] } {
  const files: string[] = [];
  const read = (name: string) => {
    const file = path.join(contentDir, name);
    files.push(file);
    if (!fs.existsSync(file)) throw new ContentError(`missing file content/${name}`);
    return parseMarkdown(fs.readFileSync(file, "utf8"), `content/${name}`);
  };

  const imports: string[] = [];
  const optionalImage = (where: string, name: string | undefined) =>
    name ? image(where, name) : undefined;
  const image = (where: string, name: string | undefined) => {
    const file = need(where, name, "image");
    const abs = path.join(contentDir, "images", file);
    if (!fs.existsSync(abs)) {
      throw new ContentError(`${where}: image "${file}" not found in content/images/`);
    }
    const id = `__img${imports.length}`;
    imports.push(`import ${id} from ${JSON.stringify(abs)};`);
    return { __img: id };
  };

  // profile.md
  const p = read("profile.md");
  const section = (title: string) =>
    p.items.find((i) => normKey(i.title) === normKey(title));
  const profile = {
    name: need(p.file, p.fields.name, "name"),
    shortName: p.fields.shortname || p.fields.name,
    title: need(p.file, p.fields.title, "title"),
    email: p.fields.email || "",
    avatar: image(p.file, p.fields.avatar),
    roles: section("Roles")?.lists.items ?? [],
    tagline: need(p.file, section("Tagline")?.body, "## Tagline text"),
    socials: (section("Socials")?.lists.items ?? []).map((line) => {
      const [label, value, href] = pipes(line);
      if (!label || !value || !href) {
        throw new ContentError(
          `${p.file}: social "${line}" must be "Label | shown text | https://link"`,
        );
      }
      return { label, value, href };
    }),
    communities: (section("Communities")?.lists.items ?? []).map((line) => {
      const [org, role, logo] = pipes(line);
      if (!org || !role || !logo) {
        throw new ContentError(
          `${p.file}: community "${line}" must be "Organization | Role | logo-file"`,
        );
      }
      return { org, role, logo: image(`${p.file} → ${org}`, logo) };
    }),
  };

  // experience.md
  const e = read("experience.md");
  const experiences = e.items.map((i) => {
    const where = `${e.file} → ${i.title}`;
    const positions = (i.lists.items ?? []).map((line, idx) => {
      const [role, period] = pipes(line);
      if (!role || !period) {
        throw new ContentError(`${where}: role "${line}" must be "Role | Period"`);
      }
      const points = i.subs.items?.[idx];
      return points?.length ? { role, period, points } : { role, period };
    });
    if (positions.length === 0) throw new ContentError(`${where}: list at least one role`);
    return {
      company: i.title,
      kind: i.fields.kind,
      duration: i.fields.duration,
      location: i.fields.location || undefined,
      team: i.fields.team || undefined,
      logo: optionalImage(where, i.fields.logo),
      positions,
      highlights: i.lists.highlights,
    };
  });

  // projects.md
  const pr = read("projects.md");
  const projects = pr.items.map((i) => {
    const where = `${pr.file} → ${i.title}`;
    return {
      name: i.title,
      description: need(where, i.body, "description text"),
      image: optionalImage(where, i.fields.image),
      link: i.fields.link || undefined,
      tags: csv(i.fields.tags),
    };
  });

  // skills.md
  const s = read("skills.md");
  const skills = s.items.map((i) => ({
    title: i.title,
    icon: i.fields.icon || "code",
    blurb: i.fields.blurb || "",
    items: i.lists.items ?? [],
  }));

  // talks.md: each talk has a photo folder content/talks/<year>-<title-slug>/.
  // A cover photo dropped there is used automatically ("cover.*" wins,
  // otherwise the first image by name); an explicit "image:" field overrides.
  const t = read("talks.md");
  const talksDir = path.join(contentDir, "talks");
  const usedFolders = new Set<string>();
  // The cover photo of a talk's folder ("cover.*" first, else first by name).
  const folderPhotos = (folder: string) => {
    const dir = path.join(talksDir, folder);
    if (!fs.existsSync(dir)) return [];
    const photos = fs.readdirSync(dir).filter((f) => IMAGE_RE.test(f)).sort();
    photos.sort((a, b) => Number(/^cover\./i.test(b)) - Number(/^cover\./i.test(a)));
    // Only the cover is shown, so only the cover is bundled.
    return photos.slice(0, 1).map((f) => {
      const id = `__img${imports.length}`;
      imports.push(`import ${id} from ${JSON.stringify(path.join(dir, f))};`);
      return { __img: id };
    });
  };

  const talks = t.items.map((i) => {
    const where = `${t.file} → ${i.title}`;
    const year = i.fields.date?.match(/\b(19|20)\d{2}\b/)?.[0];
    const folder = talkFolder(i.title, year);
    usedFolders.add(folder);
    const photos = folderPhotos(folder);
    return {
      title: i.title,
      type: i.fields.type || "Talk",
      event: need(where, i.fields.event, "event"),
      date: i.fields.date || undefined,
      year,
      location: i.fields.location || undefined,
      description: i.body || undefined,
      image: optionalImage(where, i.fields.image) ?? photos[0],
      slides: i.fields.slides || undefined,
      video: i.fields.video || undefined,
      post: i.fields.post || undefined,
      link: i.fields.link || undefined,
      audio: i.fields.audio || undefined,
      tags: csv(i.fields.tags),
    };
  });

  // A folder with photos but no matching talk means a talk was renamed or
  // removed: fail loudly instead of silently dropping the photos.
  if (fs.existsSync(talksDir)) {
    for (const folder of fs.readdirSync(talksDir)) {
      const dir = path.join(talksDir, folder);
      if (!fs.statSync(dir).isDirectory() || usedFolders.has(folder)) continue;
      if (fs.readdirSync(dir).some((f) => IMAGE_RE.test(f))) {
        throw new ContentError(
          `content/talks/${folder}/ has photos but no talk in talks.md matches it ` +
            `(was the talk renamed? expected folders: content/talks/<year>-<title>)`,
        );
      }
    }
  }

  // Highlights: the best photos, shown as a photo-only carousel on the home
  // page. Any image dropped into content/highlights/ is included, by name.
  const highlightsDir = path.join(contentDir, "highlights");
  const highlights = fs.existsSync(highlightsDir)
    ? fs
        .readdirSync(highlightsDir)
        .filter((f) => IMAGE_RE.test(f))
        .sort()
        .map((f) => {
          const id = `__img${imports.length}`;
          imports.push(`import ${id} from ${JSON.stringify(path.join(highlightsDir, f))};`);
          return { __img: id };
        })
    : [];

  const data = { profile, experiences, projects, skills, talks, highlights };
  // Swap the {__img: id} placeholders for the imported identifiers.
  const json = JSON.stringify(data, null, 2).replace(
    /\{\s*"__img":\s*"(__img\d+)"\s*\}/g,
    "$1",
  );
  return {
    code: `${imports.join("\n")}\nexport default ${json};\n`,
    files,
  };
}

export function contentPlugin(): Plugin {
  let contentDir = "";
  return {
    name: "portfolio-content",
    configResolved(config) {
      contentDir = path.resolve(config.root, "content");
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      try {
        const { code, files } = buildModule(contentDir);
        files.forEach((f) => this.addWatchFile(f));
        return code;
      } catch (err) {
        if (err instanceof ContentError) {
          this.error(`Content error — ${err.message}`);
        }
        throw err;
      }
    },
    configureServer(server) {
      // Reload the page when any content file changes in dev.
      server.watcher.add(contentDir);
      server.watcher.on("all", (_event, file) => {
        if (!file.startsWith(contentDir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}
