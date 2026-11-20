# First swing at Code Agents

A HackYourFuture workshop: a [Slidev](https://sli.dev/) deck and a workbook for the hands-on, published together
on GitHub Pages.

- `npm install`
- `npm run dev`, then visit <http://localhost:3030> (the deck)
- `npm run dev:workbook` for the workbook, `npm run test:workbook` for its tests
- `npm run dev:variants` for the preview of three layouts for the hands-on steps (`variants.md`, issue #5)

## The published site

`npm run build` writes one static site to `dist/`:

| Path         | What                                                   | Source      |
| ------------ | ------------------------------------------------------ | ----------- |
| `/`          | landing page, routes to the slides or the workbook     | `home/`     |
| `/slides/`   | the deck                                               | `slides.md` |
| `/workbook/` | the students' workbook                                 | `workbook/` |

Every part is built with relative paths, so the site works at a domain root or under `/<repo>/` on GitHub
Pages without any setting. The deck uses hash URLs (`/slides/#/18`), because GitHub Pages has no per-folder
fallback page. `.github/workflows/pages.yml` tests, builds and publishes on every push to `main`.

## Layout

- `slides.md` holds the deck settings (theme, title), the cover slide and one `src:` import per part.
- `pages/NN-*.md` holds one part each; slides inside a part are separated by `---`:
  `01-introduction`, `02-llm-basics` (Part 1), `03-agent-loop` (Part 2), `04-hands-on` (Part 3).
- `style.css` holds the HackYourFuture look: brand colours as `--hyf-*` CSS variables, used by the slides
  and the components. The font (Barlow, standing in for the brand font) is set in the headmatter of `slides.md`.
- `layouts/presenter.vue` is the presenter slide (slide 2), the only slide in Paul's own brand (colours, self-hosted
  fonts in `public/fonts/paul/` with their OFL licences). Its bio, links and photo are set in `pages/01-introduction.md`.
- `global-top.vue` puts the small HackYourFuture wordmark on every slide but the cover (`HyfLogo` component).
  `public/logos/` holds Paul's wordmark, copied from their design system: keep its brand rules (see the comment on
  the cover in `slides.md`).
- `setup/shortcuts.ts` makes ↓ and ↑ step through animations like → and ←, so the whole deck is one linear
  path. Shift + → / ← still jump a whole slide.
- `components/` holds the interactive slides (Vue + TypeScript). Each takes `:step="$clicks"`, and the
  slide's `clicks:` frontmatter sets how many steps it has. Slide data (words, probabilities) lives in a
  `<script setup>` block inside the slide's markdown, not in the component.
- Paths to `public/` files in slides must stay relative to the deck: Vite rewrites `<img src="/...">` and CSS
  `url(/...)`, but not other attributes (see the iframe on "What we build", which uses `import.meta.env.BASE_URL`).
- `public/todo/` is the reference solution of the hands-on (one HTML, one JS, one CSS file), served at
  `/todo/index.html` and shown in an iframe on the "What we build" slide.
- `workbook/` is the students' self-paced workbook for the hands-on (Vite + TypeScript), built into
  `dist/workbook/` by `npm run build` and served at `/workbook/`. The deck links to it with `WorkbookLink`.
- `home/` is the landing page (plain HTML and CSS, colours from `workbook/src/styles/tokens.css`). See [workbook/README.md](workbook/README.md).

To add a part, create `pages/05-something.md` and add an import block to `slides.md`:

```md
---
src: ./pages/05-something.md
---
```

Frontmatter next to `src:` overrides the imported part's first slide (e.g. `hide: true` to skip a part).
See [Importing slides](https://sli.dev/guide/syntax#importing-slides).
