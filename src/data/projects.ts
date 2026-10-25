// Content lives in content/projects.md.
import content from "virtual:content";

export type Project = (typeof content.projects)[number];

export const projects: Project[] = content.projects;
