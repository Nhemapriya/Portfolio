// Shape of the data produced from content/*.md by scripts/content-plugin.ts.
declare module "virtual:content" {
  const content: {
    profile: {
      name: string;
      shortName: string;
      title: string;
      email: string;
      avatar: string;
      roles: string[];
      tagline: string;
      about: string;
      socials: { label: string; value: string; href: string }[];
    };
    experiences: {
      company: string;
      kind?: string;
      duration?: string;
      positions: { role: string; period: string }[];
      highlights?: string[];
    }[];
    projects: {
      name: string;
      description: string;
      image: string;
      link?: string;
      tags: string[];
    }[];
    skills: { title: string; icon: string; blurb: string; items: string[] }[];
    awards: { title: string; description: string; image: string }[];
    community: {
      title: string;
      blurb: string;
      image: string;
      date?: string;
      link?: string;
    }[];
  };
  export default content;
}
