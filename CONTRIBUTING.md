# Contributing

## Adding a lesson

See the "Generating a lesson from source material" section in README.md.
The short version: run `tools/pdf_to_lesson.py` against your source
document, review the draft it writes to `src/content/generated/`, then move
it into `src/content/lessonSpecs.js` (or its own file) and wire it into
`src/content/catalog.js`.

## Adding a whole new subject

1. Add a course object to `CATALOG` in `src/content/catalog.js` with a
   `title`, `meta`, and `units` array.
2. Give at least one lesson in one unit `{ built: true, specKey: "..." }`.
3. Write that lesson spec, by hand or via `pdf_to_lesson.py`.
4. If the subject needs an active tile on the home portal, add it to the
   relevant subjects array (see `ACADEMIC_SUBJECTS` / `DEVELOPMENT_SUBJECTS`
   if those are reintroduced, or the catalog-driven nav if not).

## House style, this matters for AI-graded content specifically

- No em dashes in any UI copy or grading feedback prompts. Use semicolons,
  colons, commas, or periods depending on the grammatical relationship.
- Gender-neutral language throughout, except in factual historical
  references.
- Coach feedback is coach voice, not a grade. "Not there yet" /
  "Solid work" / "Legacy-worthy", not "Developing / Proficient /
  Exemplary" shown to the student directly.
- Colors: white, black, red, and the app's specific gold/orange accent
  only. No other hues in new UI.

## Before opening a PR

- Run `npm run build` and confirm it succeeds.
- If you touched multiple files, a quick sanity check: nothing should be
  declared in two files, and every component used in JSX should be either
  imported or defined in the same file.
