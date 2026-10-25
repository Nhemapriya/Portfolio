/**
 * Creates a photo folder for every talk in content/talks.md:
 *   content/talks/<year>-<title-slug>/
 * Uses the same naming as the build (talkFolder), so the names always match.
 * Safe to re-run: existing folders and photos are left alone.
 *
 *   npm run talk-folders
 */
import fs from "node:fs";
import path from "node:path";
import { parseMarkdown, talkFolder } from "./content-plugin.ts";

const contentDir = path.resolve(import.meta.dirname, "..", "content");
const doc = parseMarkdown(
  fs.readFileSync(path.join(contentDir, "talks.md"), "utf8"),
  "content/talks.md",
);

let created = 0;
for (const item of doc.items) {
  const year = item.fields.date?.match(/\b(19|20)\d{2}\b/)?.[0];
  const dir = path.join(contentDir, "talks", talkFolder(item.title, year));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    created++;
  }
  // Keeps empty folders in git until a photo is added.
  const keep = path.join(dir, ".gitkeep");
  if (!fs.existsSync(keep)) fs.writeFileSync(keep, "");
  console.log(path.relative(contentDir, dir));
}
console.log(`\n${doc.items.length} talks, ${created} new folder(s).`);
