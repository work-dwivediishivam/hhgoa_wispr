# Please Let Me In

**Vercel deployment:** [https://hhgoawispr-au1gybyph-workdwivediishivam-6130s-projects.vercel.app](https://hhgoawispr-au1gybyph-workdwivediishivam-6130s-projects.vercel.app)  
This URL is the successful Production deployment recorded by GitHub for commit `e4ac6b2`. Vercel currently requires sign-in to view it.

Please Let Me In is a small, playful browser game about trying to get past a login form that has its own opinions. The interface escalates from an evasive login button to self-reversing agreements, an intentionally absurd image challenge, and a submit button that needs to be persuaded.

## How to play

1. Move toward **LET ME IN** and try to catch it. After a few escapes, the form gives in and reveals the next step.
2. Check both agreements. They may uncheck themselves after a short pause, so keep an eye on them.
3. Choose the images that match the strange prompt and verify. A wrong answer changes the prompt; the refresh control also deals a new challenge.
4. Ask the final button to submit. It negotiates twice before letting you through.
5. Use the replay button on the win card to start over.

This is a frontend simulation. The email and password fields are deliberately not sent to a server or stored.

## Technology

- **React 18** builds the interactive, stateful game UI.
- **Vite 6** provides the development server and production build.
- **JavaScript (ES modules)** handles game state, event behavior, random checkbox sabotage, button evasion, CAPTCHA rounds, and replay.
- **CSS** provides the responsive layout, dark editorial visual style, animations, and mobile breakpoints without a component framework.
- **Lucide React** supplies the interface icons.
- **Google Fonts** loads DM Sans, DM Mono, and Space Grotesk for the typography.
- **Vercel** hosts the production website and can deploy updates when changes are pushed to the connected Git repository.

There is no database, authentication service, analytics package, or backend API.

## Run locally

Requires Node.js 20 or newer and npm.

```sh
npm install
npm run dev
```

Vite prints the local address when the development server starts. To build and preview the production bundle:

```sh
npm run build
npm run preview
```

## Project structure

```text
index.html       Document shell, metadata, and font loading
src/main.jsx     React application and game interactions
src/style.css    Theme, responsive layout, and animation styles
```

## Deployment

The Vercel deployment above is attached to this GitHub repository. The project is built with Vite; Vercel serves the generated `dist` directory. Git pushes trigger deployments. The deployment’s access protection is controlled by the Vercel project settings.
