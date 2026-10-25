import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { homeUrl } from "../lib/urls";

// Header for pages other than the home page (Talks, Resume).
export function SubpageHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 shadow-lg shadow-black/5">
        <a href={homeUrl} className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">HN</span>
        </a>
        <a
          href={homeUrl}
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-current/70 transition-colors hover:text-current"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
