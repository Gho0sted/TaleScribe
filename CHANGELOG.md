# Changelog

## [Unreleased]

- Updated theme variables and Tailwind configuration.
- Added `ProtectedRoute` component for role-based access control.
- Introduced `authFetch` utility and token handling in `useAuthStore`.
- README updated with theme and language instructions.
- Added `SettingsPage` with theme controls and plugin manager.
- Added CI tests with Vitest and coverage upload.
- Introduced `.editorconfig` and contribution guidelines.
- Added templates for issues and pull requests.
- Issue templates converted to YAML and README links to CONTRIBUTING.
- English README now shows CI and coverage badges.
- Pre-commit hook checks formatting before tests.
- Unified all page components under `src/pages` and removed the obsolete
  "items" navigation link.
- Introduced reusable `useStoredState` hook and moved class data into
  `src/data/classes.ts`.
- Webpack now loads environment variables with `dotenv-webpack` and
  adds aliases `@hooks` and `@utils`.
