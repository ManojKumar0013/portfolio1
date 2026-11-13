# Manoj Kumar — "System Boot" Portfolio (PRD)

## Original problem
Replace the imported GitHub flip-book portfolio with a unique, award-level portfolio for B. Manoj Kumar (BTech CSE, Amrita Amritapuri), inspired by 9 reference sites. Needs a loader and his name in a signature style. Must be fast and accessible.

## Architecture
- Frontend: Vite + React 18 (/app/frontend, `yarn start` = vite on :3000), plain CSS (styles.css), lucide-react plus inline brand SVGs
- Backend: FastAPI (/app/backend/server.py) with POST /api/contact, using Emergent managed email (email_service.py) to send to OWNER_EMAIL. Messages are also stored in MongoDB `messages`. Spam protection: honeypot, elapsed-time check and a 5/hour IP rate limit
- Content lives in /app/frontend/src/data.js (PROJECTS list, CV_URL=null)

## Implemented (2026-06)
- Signature loader (stroke-drawn script name in < />, 000–100 counter, boot log, split-open, Skip/Esc, shorter on repeat visits)
- Header: scramble wordmark, IST clock, theme toggle, full-screen menu, "CV coming soon"
- Hero: kinetic name, orange role strip, status chip, cursor-reactive dot grid (desktop only)
- About (/proc), Focus accordion, Education git-log, Skills (draggable chips / grid), Projects (1 live + 3 coming soon), Contact (copy email, reveal phone, LinkedIn/GitHub, real email form), Footer with Calm mode
- Dark/light themes and Calm mode are saved; Calm mode turns on automatically for reduced-motion users
- Removed the old index.html/script.js/style.css

## Backlog
- P0: Upload the resume PDF, put it in public/ and set CV_URL
- P1: 2–3 real projects with screenshots, case-study pages
- P2: Hidden terminal mode, notes/blog, analytics
