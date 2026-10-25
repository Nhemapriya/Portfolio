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
| `awards.md` | Awards |
| `community.md` | Community contributions |
| `images/` | All images used by the files above |

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

- Staff Scale Engineer | Jan 2027 — Present
- Senior Scale Engineer | Aug 2026 — Jan 2027
```

**New community post** (in `community.md`):

```markdown
## Speaker — DevFest 2026
image: devfest-2026.jpg
date: Nov 2026
link: https://www.linkedin.com/posts/...

Ran a 90-minute hands-on workshop on building agent factories with ADK and Gemini.
```

**New social link** (in `profile.md`, under `## Socials`): `- Label | shown text | https://link`

**Skill group icons** (in `skills.md`): brain, code, flask, database, cloud, sparkles, mic, users.

## Checking your edit

If a file is malformed (missing image, missing description, a role without a
period…), the build stops with a message naming the file and the entry, and
the live site stays as it was. To check locally first:

```bash
npm run dev     # live preview at http://localhost:5173, updates as you save
npm run build   # the same check GitHub runs before publishing
```
