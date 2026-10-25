// Content lives in content/profile.md ("email" field and "## Socials" list).
import { Mail, BookOpen, Link2 } from "lucide-react";
import content from "virtual:content";
import { GithubIcon, LinkedinIcon, XIcon } from "../components/BrandIcons";

export const contactEmail = content.profile.email;

// Opens a Gmail compose window, for visitors without a desktop mail app.
export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`;

// Icons are picked from the label, so new links need no code changes.
const iconFor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("github")) return GithubIcon;
  if (l.includes("linkedin")) return LinkedinIcon;
  if (l === "x" || l.includes("twitter")) return XIcon;
  if (l.includes("blog") || l.includes("medium")) return BookOpen;
  return Link2;
};

export const socials = [
  ...(contactEmail
    ? [
        {
          label: "Email",
          value: contactEmail,
          href: `mailto:${contactEmail}`,
          icon: Mail,
        },
      ]
    : []),
  ...content.profile.socials.map((s) => ({ ...s, icon: iconFor(s.label) })),
];
