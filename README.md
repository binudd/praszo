# Binu — personal portfolio

A cinematic, editorial portfolio for product engineering, UI/UX, frontend development, and AI-assisted work.

## Configure

Personal details live in `src/content/site.ts`. Update these fields when they change:

- `email` — leave empty until a public address is confirmed. LinkedIn is the primary contact.
- `linkedin`, `github`, `behance`
- `resumeHref` — resume is served from `public/binu-resume.pdf`
- `NEXT_PUBLIC_SITE_URL` — set in `.env.local` for canonical URLs and sitemap

Project copy lives in `src/content/projects.ts`.

## Develop

```bash
npm install
npm run dev
```

## Check

```bash
npx tsc --noEmit
npm run lint
npm run build
```
