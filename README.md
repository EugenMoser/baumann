# Folder Structure

/src
├── /app # App-Router Verzeichnis
│ ├── /api # API-Routen (Server Actions, Middleware)
│ ├── /dashboard # Beispielseite mit Komponenten
│ │ ├── /components # Seitenbezogene Komponenten
│ │ ├── page.tsx # Seite
│ │ └── layout.tsx # Layout
│ ├── layout.tsx # Hauptlayout
│ └── page.tsx # Root-Seite
├── /components # Globale, wiederverwendbare Komponenten
│ ├── Navbar.tsx
│ └── Button.tsx
├── /constants # Konstanten oder Config-Dateien
│ └── api-urls.ts
├── /db # Datenbank-Logik
│ ├── drizzle.config.ts
│ ├── migrations/
│ └── schema.prisma
├── /hooks # Wiederverwendbare React-Hooks
│ ├── useAuth.ts
│ └── useTheme.ts
├── /lib # Utility-Funktionen
│ └── fetcher.ts
├── /services # API- oder externe Services
│ ├── auth.ts
│ └── user.ts
├── /styles # Globale Styles
│ ├── globals.css
│ └── variables.css
├── /types # Globale Typen
│ ├── api.ts
│ └── user.ts
