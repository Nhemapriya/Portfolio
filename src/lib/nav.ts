import { projects } from "../data/projects";

type NavLink = { id: string; label: string; href?: string };

// Section links scroll the home page; links with an href open another page.
// "Talks" scrolls to the home page's Talks preview, which links to /talks/.
export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "talks", label: "Talks" },
  // "Work" only shows once content/projects.md has entries.
  ...(projects.length > 0 ? [{ id: "projects", label: "Work" }] : []),
  { id: "contact", label: "Contact" },
];
