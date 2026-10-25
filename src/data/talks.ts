// Content lives in content/talks.md (newest first).
import content from "virtual:content";

export type Talk = (typeof content.talks)[number];

export const talks: Talk[] = content.talks;

// Best photos for the home page carousel (content/highlights/).
export const highlights: string[] = content.highlights;

export { homeUrl, talksUrl } from "../lib/urls";
