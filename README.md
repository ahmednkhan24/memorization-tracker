# GitHub Pages URL
https://ahmednkhan24.github.io/memorization-tracker

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Syncing data between computers

Progress lives in the browser's localStorage, with `public/memorization.csv` as the saved copy.

- **Save:** click **Export CSV**, replace `public/memorization.csv` with the download, commit to `main`.
- **Load:** the app loads the deployed CSV on every startup. The exception is when this browser has edits
  you haven't exported yet; those are kept until you export. Click **Load saved** to discard them and
  reload the CSV.
