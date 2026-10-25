// Content lives in content/experience.md (newest first).
import content from "virtual:content";

export type Experience = (typeof content.experiences)[number];
export type Position = Experience["positions"][number];

export const experiences: Experience[] = content.experiences;
