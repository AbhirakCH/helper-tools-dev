# Helper Tools Dev

A comprehensive collection of developer and web tools built with React, Vite, TypeScript, and Tailwind CSS. This project aims to provide a clean, fast, and offline-capable set of utilities for everyday development tasks.

## 🚀 Features

- **Modern Tech Stack**: Built with React 19, Vite, TypeScript, and Tailwind CSS.
- **Fast & Responsive**: Optimized for performance with lazy loading and a responsive design.
- **Clean UI**: Uses Shadcn UI components for a consistent and accessible interface.
- **Searchable**: Global search bar to quickly find the tool you need.
- **Favorites System**: Pin your most frequently used tools for easy access.
- **Categorized Tools**: Tools are organized into logical categories (Converter, Web, Development).

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router](https://reactrouter.com/)

## 📦 Available Tools

### Converter

- **Case Converter**: Convert text between camelCase, snake_case, kebab-case, etc.
- **Text to NATO Alphabet**: Convert text to NATO phonetic alphabet.
- **Text to ASCII Binary**: Convert text to ASCII binary and vice versa.
- **Text to Unicode**: Convert text to Unicode escape sequences.
- **List Converter**: Convert lists to various formats.
- **Roman Numeral Converter**: Convert integers to Roman numerals.
- **Markdown to HTML**: Preview Markdown as HTML.
- **YAML <> JSON**: Convert between YAML and JSON.
- **YAML <> TOML**: Convert between YAML and TOML.
- **JSON <> TOML**: Convert between JSON and TOML.
- **XML <> JSON**: Convert between XML and JSON.
- **Date-time Converter**: Convert dates between ISO, UTC, and other formats.
- **Integer Base Converter**: Convert numbers between binary, octal, decimal, hex.
- **Color Converter**: Convert colors between HEX, RGB, HSL, CMYK.
- **Base64 File Converter**: Convert files to Base64 strings.
- **Base64 Converter**: Encode/decode Base64 text.

### Web

- **Escape HTML Entities**: Escape or unescape HTML characters.
- **Slugify String**: Create URL-friendly slugs from strings.
- **Basic Auth Generator**: Generate HTTP Basic Auth headers.
- **HTTP Status Codes**: Reference list of HTTP status codes.
- **URL Parser**: Parse URLs into their components.
- **Device Information**: View screen size, pixel ratio, and user agent.
- **User-Agent Parser**: detailed breakdown of user agent strings.
- **JWT Parser**: Decode JWT tokens (header and payload).
- **Open Graph Meta Generator**: Generate OG tags for social sharing.
- **MIME Types**: Searchable list of MIME types.
- **Keycode Info**: View JavaScript key event information.
- **OTP Code Generator**: Generate TOTP codes (currently disabled).
- **HTML WYSIWYG Editor**: Rich text editor (currently disabled).

### Development

- **Git Cheatsheet**: Common Git commands reference.
- **Random Port Generator**: Generate random available ports.
- **Crontab Generator**: Create and explain cron schedules.
- **JSON to CSV**: Convert JSON data to CSV format.
- **SQL Prettify**: Format and beautify SQL queries.
- **Docker Run to Compose**: Convert `docker run` commands to `docker-compose.yml`.
- **Chmod Calculator**: Calculate file permissions (octal/symbolic).
- **Email Normalizer**: Normalize email addresses.
- **JSON Prettify/Minify**: Format or compact JSON.

## 🏁 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher is recommended.
- **npm**: Comes with Node.js.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd helper-tools-dev
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    _Note: If you encounter peer dependency issues (e.g., with `react-quill`), you may need to use `npm install --legacy-peer-deps`._

### Running Locally

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the application for production:

```bash
npm run build
```

The output will be in the `dist` directory. You can preview the build locally using:

```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── components/         # Shared UI components (Layout, UI primitives)
├── config/            # Configuration files (tools registry)
├── hooks/             # Custom React hooks
├── pages/             # Page components (Dashboard, etc.)
├── tools/             # Tool implementations grouped by category
│   ├── converter/
│   ├── development/
│   └── web/
├── App.tsx            # Main application component
└── main.tsx           # Entry point
```

## 🧩 How to Add a New Tool

1.  **Create the Component**: Create a new `.tsx` file in the appropriate `src/tools/<category>/` directory.
2.  **Implement the Tool**: Build your tool using existing UI components from `@/components/ui`.
3.  **Register the Tool**: Add your tool to the `tools` array in `src/config/tools.ts`.
    ```typescript
    {
      id: "my-new-tool",
      name: "My New Tool",
      description: "Description of what it does.",
      category: "Development", // or other category
      icon: FileCode, // Import from lucide-react
      component: lazy(() => import("../tools/development/MyNewTool")),
    }
    ```
4.  **Verify**: The tool will automatically appear in the dashboard and search.

## 📄 License

[MIT](LICENSE)
