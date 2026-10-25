# Editing the portfolio

Everything on the site comes from the Markdown files in this folder. Edit a
file, commit, push to `master`, and GitHub Actions rebuilds and republishes the
site in about a minute. You can even edit the files directly on github.com.

| File | Section |
|---|---|
| `profile.md` | Name, title, rotating roles, tagline, about, email, social links |
| `experience.md` | Work experience (newest first) |
| `projects.md` | Projects |
| `skills.md` | Skill groups |
| `talks.md` | Community & Talks page: talks, workshops, organised events, volunteering |
| `images/` | Images for profile and projects |
| `talks/` | One photo folder per talk (see below) |
| `highlights/` | Best photos for the home page carousel, shown in name order (`highlight-01.jpg`, `highlight-02.jpg`…) |

## The format

```markdown
## Item title            ← each "## " heading is one entry (company, project, award…)
key: value               ← fields go on the lines right under the heading
key: value

A paragraph of text.     ← the description

- a bullet               ← a list (roles, skills…)

### Highlights           ← a named list (used by experience.md)
- a bullet
```

- Order on the page = order in the file.
- `image:` is a file name inside `content/images/` (for example `image: talk.jpg`).
- Text inside `<!-- -->` is a comment and is ignored.

## Examples

**New job role** (in `experience.md`, roles are `Role | Period`):

```markdown
## Databricks
kind: Full-time
duration: 2 yrs

- Staff Scale Engineer | Jan 2027 - Present
- Senior Scale Engineer | Aug 2026 - Jan 2027
```

**New talk or community entry** (in `talks.md`, newest first):

```markdown
## Speaker: DevFest 2026
type: Talk
event: GDG Chennai
date: Nov 2026
post: https://www.linkedin.com/posts/...

One-sentence professional description.
```

Then run `npm run talk-folders` and drop its photo into the new folder.

**Team or practice** (optional, shown under the company name): `team: Data and Analytics`

**Achievements under a role**: indent bullets under the role line by two spaces:

```markdown
- Senior Scale Engineer | Aug 2026 - Present
  - One achievement in this role
```

**New social link** (in `profile.md`, under `## Socials`): `- Label | shown text | https://link`

**Skill group icons** (in `skills.md`): brain, code, flask, database, cloud, sparkles, workflow, layers, migrate, mic, users.

## Talk photos

Every talk has its own folder in `content/talks/`, named by year and title,
for example `content/talks/2024-devfest-2024-keynote/`. Drop the photo into
that folder: the card uses it automatically, no `image:` line needed.

- Name the photo after its folder, e.g. `2024-devfest-2024-keynote.jpg` (any name works, but this keeps things tidy).
- Several photos in one folder? Name the one you want shown `cover.jpg`
  (otherwise the first by file name is used).
- Added a new talk? Run `npm run talk-folders` to create its folder.
- Renamed a talk or changed its year? Rename its folder to match. If a folder
  with photos no longer matches any talk, the build stops and tells you which.

## Checking your edit

If a file is malformed (missing image, missing description, a role without a
period…), the build stops with a message naming the file and the entry, and
the live site stays as it was. To check locally first:

```bash
npm run dev     # live preview at http://localhost:5173, updates as you save
npm run build   # the same check GitHub runs before publishing
```
