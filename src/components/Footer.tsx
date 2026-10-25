import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-sm text-current/60 sm:flex-row dark:border-white/10">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite,
          Tailwind & Motion.
        </p>
        <p>Designed & coded with care.</p>
      </div>
    </footer>
  );
}
