# First swing at Code Agents

A [Slidev](https://sli.dev/) deck.

- `npm install`
- `npm run dev`, then visit <http://localhost:3030>

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
- `components/` holds the interactive slides (Vue + TypeScript). Each takes `:step="$clicks"`, and the
  slide's `clicks:` frontmatter sets how many steps it has. Slide data (words, probabilities) lives in a
  `<script setup>` block inside the slide's markdown, not in the component.
- Hosting under a sub-path (GitHub Pages serves a project at `/<repo>/`): build with
  `npx slidev build --base /<repo>/`. Asset paths in slides must go through the base: Vite rewrites `<img src="/...">`
  and CSS `url(/...)`, but not other attributes (see the iframe on "What we build", which uses `import.meta.env.BASE_URL`).
  The workbook is built with a relative base and `WorkbookLink` works out its URL at runtime, so both follow the deck.
- `public/todo/` is the reference solution of the hands-on (one HTML, one JS, one CSS file), served at
  `/todo/index.html` and shown in an iframe on the "What we build" slide.
- `workbook/` is the students' self-paced workbook for the hands-on (Vite + TypeScript), built into
  `dist/workbook/` by `npm run build` and served at `/workbook/`. See [workbook/README.md](workbook/README.md).

To add a part, create `pages/05-something.md` and add an import block to `slides.md`:

```md
---
src: ./pages/05-something.md
---
```

Frontmatter next to `src:` overrides the imported part's first slide (e.g. `hide: true` to skip a part).
See [Importing slides](https://sli.dev/guide/syntax#importing-slides).
