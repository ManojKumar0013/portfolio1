# Manoj Kumar — Portfolio

An interactive portfolio with a main mode and a robotic arm mode. Built with React, Vite and Three.js, with a server route for the contact form on the hosted Site.

## Live site

[View the portfolio](https://manoj-kumar-portfolio-2026.mintyazalea4.chatgpt.site)

The current Site is private and asks visitors to sign in with ChatGPT. Sharing settings are managed separately from this repository.

## Highlights

- Animated intro and robotic arm experience with a quick switch to the main portfolio.
- About, Interests & Focus, interactive skills, projects and contact sections.
- Skills return to a neutral hat display when an icon is no longer active; dark and light themes have legible logos.
- Projects include HungryHub and NexTune, with live and source links.
- Contact form sends through `/api/contact` when the hosted runtime has an Emergent Email integration key; otherwise it opens an email draft.

## Run locally

```bash
cd frontend
npm ci
npm run dev
```

Run `npm run build` to create the Vite assets and Cloudflare Worker in `frontend/dist`. The Site manifest is `frontend/.openai/hosting.json`. The source for the contact endpoint is `frontend/worker/index.js`.

Set `EMERGENT_EMAIL_KEY` as a **secret** in the Site's production runtime environment to enable direct contact messages. Do not put the key in source, a local `.env` committed to Git, or a frontend variable. The original FastAPI backend under `backend/` is retained for the separate Emergent deployment.
