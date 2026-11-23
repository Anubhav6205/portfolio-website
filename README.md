# Portfolio Website

Source code for my personal portfolio site. It has sections for experience, featured projects, other projects, an about page and a contact link, with animated transitions and a custom cursor.

**Status:** live site, last updated August 2025.

## Tech stack

Next.js 13 (pages router), React 18, TypeScript, SCSS, Framer Motion. Deployed on Vercel.

## Project structure

```
src/pages/      Next.js entry points (_app.tsx, index.tsx)
src/sections/   page sections: Home, About, Experience, Projects, OtherProjects, Contact, Navbar
src/components/ shared UI (Button, Cursor, Loader, Logo, Email, SocialMediaIcons)
src/scss/       global variables, section and component styles
public/         images and resume PDF
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Limitations

- Project and experience content is written directly in the section components, not loaded from a data file.
- No automated tests.

## License

MIT, see [LICENSE](LICENSE). The images and the resume PDF in `public/` are personal and are not covered by the license.

## Contact

Anubhav Gupta, [LinkedIn](https://www.linkedin.com/in/anubhav-gupta-92410a244/)
