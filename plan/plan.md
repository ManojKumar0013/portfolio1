# MANOJ KUMAR — "System Boot" Portfolio

A one-of-a-kind personal portfolio for B. Manoj Kumar, BTech CSE student at Amrita Vishwa Vidyapeetham. It is built around his love for how systems work inside: the site "boots up" like an operating system, then tells his story as a fast, motion-led, magazine-style page.
It replaces the current 3D flip-book with a new concept inspired by the 9 reference sites, without copying any of them.

## Who it's for
- Recruiters and internship hiring teams (AI/ML and full-stack roles) who need to understand Manoj in about 30 seconds
- Peers, professors and hackathon teams who want to see his skills, projects and how to reach him
- Manoj himself, as a link to share on LinkedIn, his GitHub profile and his resume

## Core features and experience
1. **Signature loader (boot screen)**
   - "Manoj Kumar" is drawn stroke by stroke as a handwritten signature inside `< ... />`.
   - Next to it, a large counter runs from 000 to 100, with short boot-log lines underneath.
   - At 100 the screen splits open to reveal the site.
   - The whole loader lasts under 3 seconds. A **Skip** button is visible the entire time.
   - Repeat visits get a short version of about 1 second.
2. **Header**
   - Bold "MANOJ KUMAR" wordmark that scrambles into place, with a blinking cursor.
   - Light/dark switch, India time (IST), a full-screen menu, and a **Download CV** button.
3. **Hero**
   - Huge kinetic name with a scrolling role strip behind it that reads exactly: **AI/ML • FULL STACK • CYBERSECURITY • CSE STUDENT**.
   - Short tagline, a "BTech CSE '29" status chip, and a scroll cue.
   - A light, cursor-reactive grid of dots in the background.
4. **About ("/proc/manoj")**
   - His own text from the existing portfolio, revealed line by line as the visitor scrolls.
   - Key subjects (DSA, Operating Systems, Computer Networks) are highlighted.
5. **Focus areas**
   - Four big numbered rows: Cybersecurity, Artificial Intelligence, Software Development, Core CS Mastery.
   - Each row expands on hover or tap.
6. **Education timeline**
   - A "commit history" style line:
     - B.Tech CSE, Amrita Amritapuri (2025–2029)
     - Intermediate, Narayana Junior College (2023–2025)
     - Schooling, Sri Krishna Vidyaa Peet (2011–2023)
7. **Skills**
   - Only the skills already listed on the current site, with nothing added to pad it out:
     - Web: HTML, CSS, JavaScript, React
     - Languages: Python, Java, C, C++
   - Desktop shows draggable chips; mobile shows a clean grid.
8. **Projects (list of 4 cards)**
   - Card 1 is **Circle Accuracy Challenge**: tech tags, live preview and source code links.
   - Cards 2–4 are placeholders clearly marked "Coming soon".
   - The section is built as a list, so adding a real project later means adding one entry.
   - A "More on GitHub" link points to his profile.
9. **Contact**
   - Large "LET'S BUILD SOMETHING" heading.
   - Email address with a copy button.
   - Phone number hidden behind a **"Click to reveal"** button.
   - **LinkedIn and GitHub** links only.
   - A form (name, email, message) that sends a **real email to manojkumarbondada123@gmail.com**. The sender's address is set as reply-to, the form shows clear sent and error states, and it has basic spam protection.
10. **Footer**
    - Giant name and "Back to top".
    - A **"Calm mode"** toggle that turns off the heavy effects: dot grid, grain, custom cursor, draggable chips, text scramble and split-open. The choice is remembered.
    - Calm mode also switches on automatically when the visitor's device asks for reduced motion.

## User flow
1. The visitor opens the link. The signature draws while the counter reaches 100 in under 3 seconds (or they press Skip), then the screen splits open.
2. They scroll through About → Focus → Education → Skills → Projects → Contact, or jump to a section from the menu.
3. At any time they can download the CV, switch light or dark, or turn on calm mode. Both choices are remembered.
4. They open a project, or send a message that lands in Manoj's inbox and see a "message sent" confirmation.

## UI/UX feel
- An "operating system meets editorial magazine" look: precise, technical, confident and a little playful.
- **Two themes**, with the first one following the visitor's device setting:
  - Dark: near-black background with one sharp accent colour
  - Light: warm off-white paper with ink-black type
- Type:
  - a distinctive bold display font for the name and headings
  - a monospace font for labels and counters
  - a script font for the signature
- Every animation is deliberate and light.
- Performance is a firm requirement: the target is a **Lighthouse score of 90+ on mobile**. Effects are kept light enough for mid-range Android phones, and heavy effects only load on capable devices.
- Keyboard navigable, readable contrast in both themes, and responsive down to small phones.

## Implementation phases
- **Phase 1 — MVP (built now)**
  - Loader with Skip, header, hero, all sections and the 4-card projects list
  - Download CV button using Manoj's uploaded resume PDF
  - Light/dark switch, calm mode, mobile layout
  - Contact form that sends real email
  - Mobile Lighthouse 90+
- **Phase 2 (soon after launch)**
  - Replace the "Coming soon" cards with 2–3 real projects, ideally AI/ML
  - Add his real profile photo and project screenshots
  - Add a case-study page for each project
- **Phase 3**
  - Hidden terminal mode (type commands like `whoami` or `projects`)
  - A short notes/blog section on CS and cybersecurity learnings
  - Visitor analytics

## Assumptions
- All personal content comes from the existing GitHub portfolio. Nothing is invented.
- Manoj will upload his resume PDF before or during the build. Until it arrives, the Download CV button says "CV coming soon" and is not clickable, so it never leads to a broken link.
- The profile photo and project image from the repo are not available, so the build uses clearly marked placeholders that can be swapped later.
- No AI/ML tools are added to Skills until Manoj confirms which ones he has really used.
- The Instagram, Facebook and Twitter links are removed. The GitHub link points to github.com/ManojKumar0013.
- Contact email is sent through Emergent's managed email service, with no account or key needed. The sender name shows as "Manoj Kumar Portfolio".
- The old flip-book site is fully replaced.
- The reference sites are used for inspiration only. No layouts, text or assets are copied from them.
