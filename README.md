# carbon-react-app

React + Vite financial dashboard (local dev & deploy instructions)

## Quick commands

Install:
```bash
npm install
```

Run dev server:
```bash
npm run dev
```

Build production bundle:
```bash
npm run build
```

Serve `dist` locally:
```bash
npx serve dist
```

## Deploy

### Netlify
1. Connect your Git repository to Netlify.
2. Set build command to `npm run build` and publish directory to `dist`.
3. This repo includes `netlify.toml` for SPA redirect to `index.html`.

### Docker
Build image and run:
```bash
docker build -t carbon-react-app:latest .
docker run -p 80:80 carbon-react-app:latest
```

### Vercel
You can also use Vercel (recommended). Import the repo, use `npm run build` and output directory `dist`.

CI via GitHub Actions: this repo includes a `.github/workflows/deploy-vercel.yml` workflow that builds and deploys to Vercel on pushes to `main`.

Requirements for automatic deploy:
- Add `VERCEL_TOKEN` as a repository secret (Vercel personal token).
- Optionally configure project via Vercel dashboard (organization/project) for additional settings.

## Notes
- Avoid committing sensitive files (e.g., `.env*`) and large folders (`node_modules`).
- The project uses Vite; SPA routing requires the redirect rule included in `netlify.toml`.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
