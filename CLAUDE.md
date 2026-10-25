# Portfolio — agent instructions

Personal portfolio site (Vite + React + TypeScript + Tailwind), published to
GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.

## Content is Markdown — edit `content/`, not code

All site content lives in `content/*.md` (format documented in
`content/README.md`); images live in `content/images/`. The build-time loader
`scripts/content-plugin.ts` turns them into the `virtual:content` module that
`src/data/*.ts` re-exports to the components.

When asked to update the portfolio ("add my new talk", "I got promoted", "add
this project"):

1. Edit the matching file in `content/`, keeping the existing format and order
   (experience is newest first). Do not hard-code content in `src/`.
2. For a new image, save it into `content/images/` and reference it by file name.
   If the user didn't provide an image, ask — don't reuse an unrelated one.
3. Only use facts the user gave you. Don't invent dates, titles, or links;
   leave them out if unknown (they're optional) and mention it.
4. Run `npm run build` — it validates every content file and fails with the
   file and entry name if something is wrong. Fix and re-run until it passes.
5. Show the user the diff, then commit with a short message like
   `content: add DevFest 2026 talk`. Push to `master` only when the user asks;
   the push publishes the site.

Change code in `src/` only for layout or behaviour changes, not for content.
