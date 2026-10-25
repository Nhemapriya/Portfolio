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
      socials: { label: string; value: string; href: string }[];
      communities: { org: string; role: string; logo: string }[];
    };
    experiences: {
      company: string;
      kind?: string;
      duration?: string;
      location?: string;
      team?: string;
      logo?: string;
      positions: { role: string; period: string; points?: string[] }[];
      highlights?: string[];
    }[];
    projects: {
      name: string;
      description: string;
      image?: string;
      link?: string;
      tags: string[];
    }[];
    skills: { title: string; icon: string; blurb: string; items: string[] }[];
    talks: {
      title: string;
      type: string;
      event: string;
      date?: string;
      year?: string;
      location?: string;
      description?: string;
      image?: string;
      slides?: string;
      video?: string;
      post?: string;
      link?: string;
      audio?: string;
      tags: string[];
    }[];
    highlights: string[];
  };
  export default content;
}
