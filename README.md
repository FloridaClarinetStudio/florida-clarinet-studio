# Florida Music Studio

Astro rebuild and content migration workspace for [floridaclarinetstudio.com](https://floridaclarinetstudio.com/).

## Project Notes

- [Website improvement suggestions](docs/website-improvement-suggestions.md)
- [Content migration review](content-migration-review.md)

## Commands

| Command                 | Action                                   |
| :---------------------- | :--------------------------------------- |
| `pnpm install`          | Install dependencies                     |
| `pnpm dev`              | Start local development server           |
| `pnpm build`            | Build production site to `dist/`         |
| `pnpm preview`          | Preview the production build             |
| `pnpm import:wordpress` | Import content from the WordPress export |

Per `AGENTS.md`, use Astro background mode when starting the dev server directly:

```sh
astro dev --background
```
