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

For the ChatGPT Site, set `EMERGENT_EMAIL_KEY` as a **secret** in the Site's production runtime environment. Its Worker handles `/api/contact` on the same origin.

For a separately hosted frontend (such as Vercel) with the FastAPI service on Render:

1. Keep `EMERGENT_EMAIL_KEY`, `OWNER_EMAIL`, `EMAIL_FROM_NAME`, `MONGO_URL`, and `DB_NAME` in the **Render backend** environment. Do not put these secrets in frontend variables or GitHub.
2. Set `REACT_APP_BACKEND_URL` on the **frontend host** to the Render service origin, such as `https://your-service.onrender.com` (no `/api` suffix). Redeploy the frontend so Vite includes the URL at build time.
3. Configure Render's `CORS_ORIGINS` to include the frontend's exact origin. The frontend checks `GET /api/` for readiness and posts the form to `POST /api/contact`.

If the backend is unavailable, the form offers an email draft instead. The Render URL and frontend origin are deployment-specific and are not stored in this repository.
