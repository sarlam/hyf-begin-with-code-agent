// Builds the workbook into the deck's dist/, so it is served at <deck URL>/workbook/ next to the slides.
// Relative base: works wherever the deck is hosted, at a domain root or under /<repo>/ on GitHub Pages.
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: '../dist/workbook',
    emptyOutDir: true, // only dist/workbook: run it after `slidev build`, which empties dist/
  },
})
