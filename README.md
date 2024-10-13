# Mantra Comics Assignment

This project is a web application built with Vite, React, TypeScript, and TailwindCSS. It also includes a collection of tools for code quality, such as ESLint and Prettier. The app is structured for easy development and efficient production builds, using various UI and state management libraries like TanStack Query.

## Table of Contents

- [Project Setup](#project-setup)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Development Tools](#development-tools)

## Project Setup

Before running the application, ensure that you have Node.js installed (preferably version 16 or later). Then, clone the repository and install the dependencies.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rahulchaudhary2244/mantra-comics-assignment.git
   cd mantra-comics-assignment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run the following commands:

- **`npm run dev`**:  
  Starts the development server with hot reloading. Visit [http://localhost:5137](http://localhost:5137) in your browser.
- **`npm run build`**:  
  Builds the app for production by transpiling TypeScript files and bundling them with Vite.
- **`npm run preview`**:  
  Serves the production build locally to preview before deployment.

- **`npm run lint`**:  
  Runs ESLint to check for code quality issues across the project files.

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev) - A fast build tool and development server.
- **UI Library**: [React](https://reactjs.org) - Component-based user interface library.
- **CSS Framework**: [TailwindCSS](https://tailwindcss.com) - A utility-first CSS framework for styling.
- **State Management**: [TanStack Query](https://tanstack.com/query/v5) - Handles server-state synchronization.
- **Icons**: [Radix UI Icons](https://icons.radix-ui.com), [Lucide React](https://lucide.dev) - React icon libraries.
- **Utilities**:
  - [clsx](https://www.npmjs.com/package/clsx) - Utility for conditionally joining classNames.
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merges conflicting Tailwind CSS class names.

## Development Tools

- **TypeScript**: Strongly-typed JavaScript language to help improve code quality.
- **ESLint**: Linting utility for identifying and fixing problems in your codebase.
  - Preconfigured with `eslint-config-prettier` to work alongside Prettier.
  - Integrated with `eslint-plugin-react-hooks` for linting React hooks rules.
- **Prettier**: Opinionated code formatter for maintaining code style consistency.
- **Tailwind CSS**: TailwindCSS is used for styling and `tailwindcss-animate` provides additional animations.
