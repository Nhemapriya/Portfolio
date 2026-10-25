# Hemapriya Nagarajan — Portfolio

A modern, animated personal portfolio built with **Vite + React + TypeScript**,
**Tailwind CSS v4**, **Motion** (animations) and **Lenis** (smooth scroll).

## Tech stack

| Area        | Tool                                   |
| ----------- | -------------------------------------- |
| Build       | Vite + TypeScript                      |
| UI          | React 19                               |
| Styling     | Tailwind CSS v4 (class-based dark mode)|
| Animation   | Motion (`motion/react`)                |
| Smooth scroll | Lenis (`lenis/react`)                |
| Icons       | lucide-react                           |

## Develop

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Editing content

All content is Markdown in `content/`, with images in `content/images/`. Edit a
file and push; no code changes needed. See [`content/README.md`](content/README.md)
for the format and examples.

| File                     | What it holds                                    |
| ------------------------ | ------------------------------------------------ |
| `content/profile.md`     | Name, title, roles, tagline, about, email, socials |
| `content/experience.md`  | Work experience                                  |
| `content/projects.md`    | Projects grid                                    |
| `content/skills.md`      | Skill groups                                     |
| `content/talks.md`       | Community & Talks page (talks, events, volunteering) |

`scripts/content-plugin.ts` parses these at build time, so a malformed file
fails the build with the file and entry name instead of breaking the live site.
`CLAUDE.md` tells AI coding agents how to make content updates the same way.

The Experience section auto-hides when its file has no entries.

## Deploy (GitHub Pages)

The site is published at `https://nhemapriya.github.io/Portfolio/`. Every push
to `master` runs `.github/workflows/deploy.yml`, which builds the site (validating
the content) and publishes `dist/`. Pages source must be set to
**Settings → Pages → Build and deployment → Source = GitHub Actions**.
