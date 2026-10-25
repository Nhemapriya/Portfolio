// Content lives in content/community.md.
import content from "virtual:content";

export type Community = (typeof content.community)[number];

export const community: Community[] = content.community;
