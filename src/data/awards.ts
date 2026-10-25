// Content lives in content/awards.md.
import content from "virtual:content";

export type Award = (typeof content.awards)[number];

export const awards: Award[] = content.awards;
