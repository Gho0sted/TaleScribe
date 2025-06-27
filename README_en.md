# 🎲 Talescribe - Advanced D&D Assistant

Full-featured application for playing Dungeons & Dragons with support for multiple editions, character management, dice rolls, spells and more.

## ✨ Features

### 🎯 Core Functionality

- **Edition support**: D&D 5e, 3.5e, Pathfinder, Pathfinder 2e
- **Character management**: Complete creation and editing system
- **Dice system**: Advanced rolls with modifiers and history
- **Spell database**: Full list of spells with filters
- **Bestiary**: Database of monsters and creatures
- **Inventory**: Manage items and equipment
- **Campaigns**: Manage game sessions

### 🎨 Interface

- Dark theme with gradient elements
- Responsive design for all devices
- CSS animations and transitions
- Glassmorphism effects
- Lucide React icons

### 💾 Data

- Local storage of data
- Autosave system
- Export/import of data
- Offline support

## 🚀 Quick Start

```bash
npm install
npm start
```

After `npm install` the `npm run prepare` script runs automatically, installing husky hooks. The message `husky - Git hooks installed` is expected and not an error.

To build production files run:

```bash
npm run build
```

You can also run webpack manually:

```bash
npx webpack --config webpack.config.js
```

In an isolated environment the command may fail with `403` due to no access to registry.npmjs.org.

Important: run `npm start` and `npm run build` separately.

## 🖥️ Working in Visual Studio Code

The `.vscode` folder contains sample tasks and launch configuration. After opening the project in VS Code press `Ctrl+Shift+B` to run the `npm:start` task and start the dev server. Use the **Run Dev Server** configuration to launch Chrome with the built-in debugger.

## 📱 Installing on a Phone

The application is shipped as a PWA. Run `npm run build` (or `npx webpack --config webpack.config.js`) and the `dist` folder will contain the final files. Serve them with a local server such as `npx serve dist` and open the site on your smartphone. In the browser menu choose "Add to Home Screen"—the app will install and work like a native one.

### 📲 Building APK/IPA with Capacitor

To get a full installer, use [Capacitor](https://capacitorjs.com/):

1. Run `npm install` to install dependencies including `@capacitor/*`.
2. Initialize the project with `npx cap init` (the repo already has `capacitor.config.ts` with `webDir: dist`).
3. Add a platform: `npx cap add android` or `npx cap add ios`.
4. Build the web version `npm run build`.
5. Copy files to the native project `npx cap sync`.
6. Run `npx cap open android` (or `ios`) and build the APK/IPA in Android Studio or Xcode.
7. Install the app on the device using the connected IDE.

### Theme and Language settings

- Toggle light/dark theme in the settings menu.
- Adjust scale, fonts and accent colors in the settings.
- The `LanguageSwitcher` component in the header allows instant switching between Russian and English.

## 📁 Project Structure
(simplified for example)

## 🛠️ Technologies
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Context API for state management
- LocalStorage for data persistence

## 📱 Pages and Features

### 🏠 Dashboard

- Overview of current data
- Quick actions
- Edition statistics
- Quick dice rolls

### 👤 Characters

- List of all characters
- Detailed stats
- Skill and spell system
- Inventory and equipment

### 🎲 Dice

- Standard dice
- Custom rolls with modifiers
- Roll history
- Formulas for complex calculations
- Calculations are done in a Web Worker so the UI stays responsive

### 📜 Spells

- Database by editions
- Filter by schools of magic
- Detailed spell descriptions
- System of levels and components

### 🏗️ Character Generator

- Random hero creation
- Edition-specific settings
- Automatic stat calculation
- Suggested equipment

### 🗺️ Maps

- Interactive `MapViewer` component to load background images
- Place markers and tokens with drag-and-drop and paths
- Map state is saved automatically in LocalStorage

### ⚙️ Settings

- Manage app theme and interface scale
- Manage plugins via `PluginManager`

## ⚙️ Configuration

### Tailwind CSS

Customized with colors, fonts and animations. Includes themes and utilities for glassmorphism effects.

### TypeScript

Strict typing for all components, utilities and game data.

## 🔧 Development

### Adding a new edition

- Update the Edition type in `src/types/index.ts`
- Add the new edition to `DND_EDITIONS` in `src/constants/index.ts`
- Create initial data in `src/utils/DataInitializer.ts`

### Adding a new page

- Create a component in `src/components/pages/`
- Add a route to `NAVIGATION` in `src/constants/index.ts`
- Update paths in `src/constants/routes.ts` and routing in `TalescribeApp.tsx`

### Setting up Google API

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable Calendar and Gmail APIs.
3. Create an OAuth client of type "Web" and set the authorized origin to `http://localhost`.
4. Copy the client ID and API key to `.env` based on `.env.example`.

## 📄 License

MIT License - free for personal and commercial projects.

🤝 Contributions are welcome! Follow the existing code style and add tests for new functionality.

Created with ❤️ for the D&D community
