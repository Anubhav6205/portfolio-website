# Portfolio

My personal site, live at [anubhav-gupta.vercel.app](https://anubhav-gupta.vercel.app). It covers my work at Chubb, personal AI projects with full case studies, writing and contact details.

## Features

- Single-page layout with sections for experience, projects, skills, recognition, writing and contact
- Case-study pages for three projects, each with a hand-drawn SVG architecture diagram, results and limitations
- Project filters, a command palette (Ctrl K or ⌘K) and a dark and light theme
- Blog posts pulled from my Hashnode RSS feed at build time, refreshed daily, with a static fallback
- Smooth scrolling (Lenis), a trailing cursor dot, scroll reveals and count-up metrics, all of which switch off when the visitor prefers reduced motion
- Generated Open Graph image, sitemap, robots file and Person structured data

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, static generation), React 19, TypeScript |
| Styling | Tailwind CSS 4, CSS custom properties for both themes |
| Fonts | Instrument Serif (headings), Source Serif 4 (body), Geist Mono (labels) |
| Libraries | next-themes, cmdk, lenis, lucide-react |
| Hosting | Vercel |

## Project structure

```
src/app/          routes, layout, global styles, OG image, sitemap and robots
src/components/   page sections, command palette, diagrams and small UI parts
src/content/      all site copy as typed data (profile, experience, projects, skills, awards, writing)
src/lib/          RSS reader and small hooks
scripts/          copy_lint.py, a house-style check for site copy
public/           resume PDF
```

All text lives in `src/content`, so updating the site usually means editing one file.

## Run locally

Requirements: Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
npm run lint:copy  # checks site copy for dashes, semicolons and filler words (needs Python)
```

## License

MIT, see [LICENSE](LICENSE).

## Contact

Anubhav Gupta, [LinkedIn](https://www.linkedin.com/in/anubhavgupta8)
