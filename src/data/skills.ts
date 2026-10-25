// Content lives in content/skills.md. The "icon" field picks one of these.
import {
  ArrowRightLeft,
  Brain,
  Cloud,
  Code2,
  Database,
  FlaskConical,
  Layers,
  Mic,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import content from "virtual:content";

const icons = {
  brain: Brain,
  cloud: Cloud,
  code: Code2,
  database: Database,
  flask: FlaskConical,
  mic: Mic,
  sparkles: Sparkles,
  users: Users,
  workflow: Workflow,
  layers: Layers,
  migrate: ArrowRightLeft,
};

export type SkillGroup = {
  title: string;
  icon: typeof Brain;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = content.skills.map((g) => ({
  ...g,
  icon: icons[g.icon.toLowerCase() as keyof typeof icons] ?? Code2,
}));
