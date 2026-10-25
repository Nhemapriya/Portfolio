// Content lives in content/profile.md.
import content from "virtual:content";

const { socials: _socials, email: _email, ...profileFields } = content.profile;

export const profile = profileFields;
