# Portfolio 2.0 — Neural Aurora / Cinematic Edition

A responsive personal portfolio for **Yadhaeshwar S**, built with React, TypeScript, Tailwind CSS, Framer Motion and React Three Fiber. This is a separate project from Portfolio 1.

## Features

- Cinematic midnight-violet design with an optional softer light theme. Default is dark.
- Signature, skip-able **cinematic intro** on first visit per browser session, with a Replay Intro control. Reduced-motion accessibility support.
- Real personal identity card using your public GitHub profile avatar (not a fabricated portrait); set `portrait` to `/portrait.jpg` when you provide a real photo.
- Interactive project screenshot preview galleries that discover actual images in verified public GitHub repositories at runtime; includes enlarged lightbox and gallery controls. When screenshots are unavailable, the decorative project art remains and is not mislabelled as an authentic screenshot.
- Animated 3D neural object powered by Three.js / React Three Fiber, responding to pointer movement.
- Command-driven terminal (`help`, `whoami`, `projects`, `skills`, `contact`, `github`, `resume`, `clear`).
- Verified direct GitHub repository links plus client-side GitHub API refresh with offline fallback.
- Six project case-study routes (`/projects/<slug>`) with project facts, technical flows, and limitations.
- Local FAQ portfolio guide (not a connected large-language-model chatbot; requires no secret or API key).
- Interactive project category filters, custom cursor on desktop, scroll effects, and responsive layouts.
- Downloadable **actual user-supplied resume** (`public/Yadhaeshwar_S_Resume.pdf`).
- Deployment configuration for Vercel and Netlify. **Deployment does not happen just by extracting this ZIP.**

## Requirements

- Node.js **20.19+** or **22.12+** recommended (Node 24 also works)
- npm

## Run locally (Windows / Google Antigravity / VS Code)

### Option 1: One-Click (Recommended)
Double-click either **`start.bat`** or **`run.bat`** in the project folder. It will verify prerequisites, install dependencies if missing, and open [http://localhost:5175/](http://localhost:5175/) in your browser automatically.

### Option 2: Terminal
1. Open the project directory containing `package.json` in your terminal.
2. Run:

```powershell
npm install
npm run dev
```

3. Open the localhost URL shown in the terminal (`http://localhost:5175/`).
4. To stop the local server, press `Ctrl+C` in that terminal.

## Build for production

```powershell
npm run typecheck
npm run build
npm run preview
```

The production output will be in `dist/`. On Vercel/Netlify, import the repository, select Vite, use `npm run build` as build command and `dist` as output directory. The included rewrite rules allow direct loading of case-study routes.

## Where to edit

| Task | File |
|---|---|
| Contact info, skills, featured projects, status, repositories | `src/data/profile.ts` |
| Hero, section layout, case studies, nav | `src/App.tsx` |
| Colors, typography, responsive styling | `src/styles.css` |
| 3D hero | `src/components/NeuralScene.tsx` |
| Intro and replay logic | `src/components/IntroSplash.tsx` |
| Personal photo/avatar card | `src/components/IdentityCard.tsx`; `profile.portrait` in `src/data/profile.ts` |
| Authentic screenshot discovery and gallery | `src/components/ProjectScreenshots.tsx` |
| Terminal | `src/components/Terminal.tsx` |
| Portfolio FAQ assistant answers | `src/components/Chatbot.tsx` |
| Resume PDF | `public/Yadhaeshwar_S_Resume.pdf` |

### Chatbot

The chatbot is **rule-based and local**, not connected to Gemini, OpenAI or any API; it answers common questions using prewritten project knowledge. If you decide to add an actual LLM later, use a server-side proxy to protect API keys. Never commit credentials to this front-end project.

### GitHub data and screenshots

The repository list starts with direct public GitHub links. It attempts to refresh against the public GitHub REST API at runtime. If GitHub is rate limited, offline, or unavailable, the list continues using its fallback. Additional projects without confirmed public source URLs are clearly distinguished.

For **ClientFlow AI** and **AI Cyber Forensics**, the site queries the verified GitHub repositories at runtime to find genuine PNG/JPG/WebP/GIF UI captures with screenshot/dashboard/Kanban/evidence/preview filenames. In case studies you can move between discovered images and expand them into a lightbox. Screenshots are **not embedded in the ZIP** and require the remote repository/GitHub service to be accessible. They may not load if GitHub API rate limits requests, image files move, or no matching files exist. The fallback design is labelled conceptual. We do not invent screenshots or public demo deployments.

To replace the public GitHub avatar with your own photo, add `public/portrait.jpg` and set `portrait: '/portrait.jpg'` in `src/data/profile.ts`.

### Original resume and factual accuracy

The original resume was supplied by the user. It lists a CGPA of **6.9/10**, React JS Trainee Intern at Digiplus Agency (May–July 2025), and three featured projects: ClientFlow AI, AI digital forensics, and smart drainage monitoring. Additional project work and planning concepts appear separately. Check current factual accuracy before publishing publicly.

## Publish as a live website (Vercel)

The project is deployment-ready but **not yet deployed**; a URL exists only after publishing. The `vercel.json` SPA rewrite lets direct links to `/projects/...` work. The production output directory is `dist`.

From the project folder in Google Antigravity / VS Code:

```powershell
npm install
npm run build
npx vercel@latest --prod
```

The first Vercel CLI run prompts you to sign in and link or create your Vercel project. Select your own account and confirm that the framework is **Vite**, the build command is `npm run build`, and the output directory is **dist**. If you prefer the dashboard, push this project to a GitHub repository, then import the repo at https://vercel.com/new. You will receive your live `*.vercel.app` URL after deployment succeeds. The connection to Vercel inside ChatGPT does not automatically sign in the local Antigravity terminal.

Reference: https://vercel.com/docs/projects/deploy-from-cli and https://vercel.com/docs/frameworks/frontend/vite

## Accessibility and performance

The site includes keyboard-activatable controls, labels, reduced-motion CSS support, and responsive layout rules. The Three.js scene may be resource-intensive on very old devices and requires WebGL support. Google Fonts require a connection; system-font fallbacks are included.

## Testing status at delivery

All TS/TSX files were checked with the local TypeScript parser for syntax, and stylesheets were parsed. Automated dependency installation and complete Vite build/browser testing could **not** run in the packaging environment because DNS access to the npm registry was unavailable. After extracting, run `npm install && npm run build` in your own development environment for a complete verification. Report any errors with the terminal output.
